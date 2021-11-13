import {
  Heading,
  Stack,
  Divider,
  Flex,
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
  useBreakpointValue,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { IoAddCircleOutline } from 'react-icons/io5';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import tags from '../../lib/objects/tags.json';
import Card from '../Card';

export function defineCards(title) {
  if (title === 'To do')
    return localStorage.getItem('To do') !== null
      ? JSON.parse(localStorage.getItem('To do'))
      : [];

  if (title === 'Doing')
    return localStorage.getItem('Doing')
      ? JSON.parse(localStorage.getItem('Doing'))
      : [];

  return localStorage.getItem('Done')
    ? JSON.parse(localStorage.getItem('Done'))
    : [];
}

function organizeTags(namedTags) {
  const organizedTags = [];
  tags.forEach((tag) => {
    if (namedTags.includes(tag.name)) organizedTags.push(tag);
  });

  return organizedTags;
}

const ListSection = ({ title }) => {
  const [cards, setCards] = useState(
    typeof window !== 'undefined' ? defineCards(title) : [],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const modalSize = useBreakpointValue({ base: 'xs', md: 'lg', lg: 'lg' });

  const removeTask = (id) => {
    const cardsUpdated = cards.filter((card) => card.id !== id);
    setCards(cardsUpdated);
  };

  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(cards));
  }, [cards]);

  const [exist, setExist] = useState(false);
  const [tagsActive, setTags] = useState([]);
  const [titleNewCard, handleTitle] = useState('');

  return (
    <Stack
      w="100%"
      border="1px"
      h={['50vh', '80vh', '60vh']}
      boxShadow="xl"
      rounded="md"
      overflowY="scroll"
    >
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
      <Flex key={title} flexDir="column">
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
                remove={removeTask}
                cards={cards}
                allTags={tags}
              />
            ),
          )}
      </Flex>
      <Flex justify="center" mx="auto" w="100%">
        <Button
          colorScheme="teal"
          variant="outline"
          w="100%"
          mx="auto"
          maxW={['300px', '450px', '230px', '300px', '350px']}
          leftIcon={<IoAddCircleOutline size={25} />}
          mb={2}
          onClick={onOpen}
        >
          Add new task
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                id="input"
                variant="flushed"
                placeholder="Task title"
                onChange={(e) => {
                  const { value } = e.target;
                  handleTitle(value);
                }}
              />
              <Text fontWeight="600">Select Tags</Text>
              <Flex wrap="wrap">
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

                cards.forEach(({ title: cardTitle }) => {
                  if (cardTitle === titleNewCard) setExist(!exist);
                });
                if (exist) {
                  toast({
                    title: 'Task already exists',
                    variant: 'top-accent',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                  });
                  setExist(!exist);
                  return;
                }

                const cardAdded = {
                  id: nanoid(),
                  title: titleNewCard,
                  tags: organizeTags(tagsActive),
                  user: 'Default',
                  description: 'Desc',
                };
                setCards([...cards, cardAdded]);
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
              Add task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ListSection;
