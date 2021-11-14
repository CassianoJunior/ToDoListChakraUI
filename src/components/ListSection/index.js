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

function defineCards(title) {
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

// Recebe um array de nomes e transforma no objeto task
// ex: ['Web', 'High'] -> [{name: 'Web', color: 'green'}, {name: 'High', color: 'red'}]
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
  const [editedTitle, handleEditedTitle] = useState('');
  const [isEditing, setEditing] = useState(false);
  const [editActiveTags, setEditedTags] = useState([]);

  const check = (name) => {
    let isCheck = false;
    if (editActiveTags.includes(name)) isCheck = true;

    return isCheck;
  };

  const getId = (id) => {
    const cardSelected = cards.filter((card) => card.id === id);

    return cardSelected[0];
  };

  const modalSize = useBreakpointValue({ base: 'xs', md: 'lg', lg: 'lg' });

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
                editing={[
                  onOpen,
                  setEditing,
                  handleEditedTitle,
                  setEditedTags,
                  setTags,
                ]}
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
          onClick={() => {
            setEditing(false);
            onOpen();
          }}
        >
          Add new task
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setEditing(false);
          setEditedTags([]);
          setTags([]);
          onClose();
        }}
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit task' : title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                variant="flushed"
                placeholder="Task title"
                value={isEditing ? editedTitle : titleNewCard}
                onChange={(e) => {
                  const { value } = e.target;
                  if (isEditing) {
                    handleEditedTitle(value);
                  } else {
                    handleTitle(value);
                  }
                }}
              />
              <Text fontWeight="600">Select Tags</Text>
              <Flex wrap="wrap">
                {tags.map(({ name, color }) => (
                  <Checkbox
                    key={color}
                    colorScheme={color}
                    defaultChecked={isEditing ? check(name) : false}
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
              {isEditing ? 'Cancel' : 'Close'}
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              size="sm"
              onClick={() => {
                if ((!titleNewCard && !editedTitle) || !tagsActive.length) {
                  toast({
                    title:
                      titleNewCard || editedTitle
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
                let newCard;
                if (!isEditing) {
                  newCard = {
                    id: nanoid(),
                    title: titleNewCard,
                    tags: organizeTags(tagsActive),
                    user: 'Default',
                    description: 'Desc',
                  };
                } else {
                  newCard = {
                    id: getId(),
                  };
                }
                setCards([...cards, newCard]);
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
              {isEditing ? 'Update task' : 'Add task'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ListSection;
