import {
  Heading,
  Stack,
  Divider,
  Flex,
  Container,
  Text,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Checkbox,
  useToast,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { IoAddCircleOutline } from 'react-icons/io5';

import { useState } from 'react';
import { nanoid } from 'nanoid';
// import cardsTodoStatic from '../../lib/objects/cardsTodo.json';
// import cardsDoingStatic from '../../lib/objects/cardsDoing.json';
// import cardsDoneStatic from '../../lib/objects/cardsDone.json';
// import cardsTodo from '../../lib/objects/cardsTodo.json';
// import cardsDoing from '../../lib/objects/cardsDoing.json';
// import cardsDone from '../../lib/objects/cardsDone.json';
import tags from '../../lib/objects/tags.json';
import Card from '../Card';

const cardsTodo = localStorage.getItem('To do')
  ? JSON.parse(localStorage.getItem('To do'))
  : [];
const cardsDoing = localStorage.getItem('Doing')
  ? JSON.parse(localStorage.getItem('Doing'))
  : [];
const cardsDone = localStorage.getItem('Done')
  ? JSON.parse(localStorage.getItem('Done'))
  : [];

function defineCards(title) {
  if (title === 'To do') return cardsTodo;

  return title === 'Doing' ? cardsDoing : cardsDone;
}

function organizeTags(namedTags) {
  const organizedTags = [];
  tags.forEach((tag) => {
    if (namedTags.includes(tag.name)) organizedTags.push(tag);
  });

  return organizedTags;
}

const ListSection = ({ title }) => {
  const [cards, setCards] = useState(defineCards(title));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [tagsActive, setTags] = useState([]);
  const [titleNewCard, handleTitle] = useState('');

  return (
    <Stack w="100%" border="1px" h="80vh" boxShadow="xl" rounded="md">
      <Flex justify="space-between" w="98%" align="center" pt={1}>
        <Heading as="h3" size="md" pl={2}>
          {title}
        </Heading>
        <IconButton
          icon={<AddIcon />}
          size="sm"
          isRound="true"
          onClick={onOpen}
        />
      </Flex>
      <Divider bg="white" />
      <Container id="container" key={title}>
        {cards &&
          cards.map(
            ({ id, title: cardTitle, tags: cardTags, user, description }) => (
              <Card
                sectionTitle={title}
                cardId={id}
                title={cardTitle}
                tags={cardTags}
                user={user}
                description={description}
                key={id}
              />
            ),
          )}
      </Container>
      <Flex align="center" justify="center">
        <Button
          colorScheme="teal"
          variant="outline"
          w="85%"
          leftIcon={<IoAddCircleOutline size={25} />}
          onClick={onOpen}
        >
          Add new task
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                variant="flushed"
                placeholder="Task title"
                onChange={(e) => {
                  const { value } = e.target;
                  handleTitle(value);
                }}
              />
              <Text fontWeight="600">Select Tags</Text>
              <Flex>
                {tags.map(({ name, color }) => (
                  <Checkbox
                    key={color}
                    colorScheme={color}
                    px={1}
                    value={name}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const { value } = e.target;
                      if (isChecked && !tagsActive.includes(value)) {
                        tagsActive.push(value);
                      } else if (!isChecked && tagsActive.includes(value)) {
                        tagsActive.splice(tagsActive.indexOf(value), 1);
                      }
                      setTags(tagsActive);
                    }}
                  >
                    {name}
                  </Checkbox>
                ))}
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} size="sm">
              Close
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              size="sm"
              onClick={() => {
                if (!titleNewCard || !tagsActive.length) {
                  toast({
                    title: titleNewCard
                      ? 'Select one or more tags'
                      : 'Task must have a title',
                    variant: 'top-accent',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                  });
                  return;
                }
                cards.push({
                  id: nanoid(),
                  title: titleNewCard,
                  tags: organizeTags(tagsActive),
                  user: 'Default',
                  description: 'Desc',
                });
                setCards(cards);
                console.log(cards);
                localStorage.setItem(title, JSON.stringify(cards));
                onClose();
                toast({
                  title: 'Task Added',
                  variant: 'top-accent',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
                handleTitle('');
                setTags([]);
              }}
            >
              Add new task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ListSection;
