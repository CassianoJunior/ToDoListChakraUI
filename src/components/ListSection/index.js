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

function parseTags(namedTags) {
  const organizedTags = [];
  tags.forEach((tag) => {
    if (namedTags.includes(tag.name)) organizedTags.push(tag);
  });

  return organizedTags;
}

function stringifyTags(cardTags) {
  const namedTags = [];
  cardTags.forEach((tag) => {
    namedTags.push(tag.name);
  });

  return namedTags;
}

const ListSection = ({ title, tasks, setTasks, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [exist, setExist] = useState(false);
  const [tagsActive, setTags] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [titleNewTask, handleTitle] = useState(
    cardToUpdate && isEditing ? cardToUpdate.title : '',
  );
  const modalSize = useBreakpointValue({ base: 'xs', md: 'lg', lg: 'lg' });

  useEffect(() => {
    handleTitle(cardToUpdate && isEditing ? cardToUpdate.title : '');
  }, [isEditing]);

  useEffect(() => {
    setTags(tagsActive);
  }, [tagsActive]);

  const removeTask = (id) => {
    const tasksUpdated = tasks.filter((task) => task.id !== id);
    toast({
      title: 'Task removed',
      variant: 'top-accent',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
    setTasks(tasksUpdated);
  };

  const getTask = (id) => {
    const taskSelected = tasks.filter((task) => task.id === id);

    return taskSelected[0];
  };
  const check = (name) => {
    let isCheck = false;
    if (stringifyTags(cardToUpdate.tags).includes(name)) {
      if (!tagsActive.includes(name)) tagsActive.push(name);
      isCheck = true;
    }
    return isCheck;
  };

  const moveTask = (id, to) => {
    const task = getTask(id);
    task.status = to;
    setTasks([...tasks]);
  };

  return (
    <Stack
      w="100%"
      border="1px"
      h={['50vh', '75vh']}
      boxShadow="xl"
      rounded="md"
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
      <Flex
        key={title}
        flexDir="column"
        overflowY="scroll"
        sx={{
          '::-webkit-scrollbar': {
            width: '3px',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: 'gray.800',
            borderRadius: '15px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.300',
            borderRadius: '12px',
          },
        }}
      >
        {tasks &&
          tasks
            .filter(({ status }) => title === status)
            .map(
              ({
                id,
                title: cardTitle,
                tags: cardTags,
                status,
                user: cardUser,
                description,
              }) => (
                <Card
                  sectionTitle={title}
                  cardId={id}
                  title={cardTitle}
                  tags={cardTags}
                  status={status}
                  user={cardUser}
                  description={description}
                  remove={removeTask}
                  editing={[onOpen, setCardToUpdate, getTask, setEditing]}
                  key={id}
                  moving={moveTask}
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
            setTags([]);
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
          handleTitle(cardToUpdate && isEditing ? cardToUpdate.title : '');
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
                value={titleNewTask}
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
                    defaultChecked={isEditing ? check(name) : false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const { value } = e.target;
                      if (isChecked && !tagsActive.includes(value)) {
                        tagsActive.push(value);
                      } else if (!isChecked && tagsActive.includes(value)) {
                        tagsActive.splice(tagsActive.indexOf(value), 1);
                      }
                    }}
                  >
                    {name}
                  </Checkbox>
                ))}
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setEditing(false);
                setTags([]);
                onClose();
              }}
              size="sm"
            >
              Close
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              size="sm"
              onClick={() => {
                if (!titleNewTask || !tagsActive.length) {
                  toast({
                    title: titleNewTask
                      ? 'Select one or more tags'
                      : 'Task must have a title',
                    variant: 'top-accent',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                  });
                  return;
                }

                tasks.forEach(({ title: cardTitle }) => {
                  if (cardTitle === titleNewTask && !isEditing) setExist(true);
                });
                if (exist) {
                  toast({
                    title: 'Task already exists',
                    variant: 'top-accent',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                  });
                  setExist(false);
                  return;
                }

                if (isEditing) {
                  cardToUpdate.title = titleNewTask;
                  cardToUpdate.tags = parseTags(tagsActive);
                  setTasks([...tasks]);
                } else {
                  const cardAdded = {
                    id: nanoid(),
                    title: titleNewTask,
                    tags: parseTags(tagsActive),
                    status: title,
                    user: user.username,
                    description: user.description,
                  };
                  const newTasks = [...tasks, cardAdded];
                  setTasks(newTasks);
                }

                onClose();
                toast({
                  title: isEditing ? 'Task updated' : 'Task Added',
                  variant: 'top-accent',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
                handleTitle('');
                setTags([]);
                setEditing(false);
                setExist(false);
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
