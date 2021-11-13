import {
  Flex,
  Text,
  Heading,
  Icon,
  HStack,
  Tag,
  Avatar,
  Box,
  theme,
  IconButton,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Checkbox,
  useToast,
  // useBreakpointValue,
  Button,
  Stack,
} from '@chakra-ui/react';
import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

import { useState } from 'react';

import { MdClose, MdEditNote } from 'react-icons/md';

function parseTags(cardTags) {
  const arrayTags = [];
  cardTags.forEach(({ name }) => {
    arrayTags.push(name);
  });

  return arrayTags;
}

const Card = ({
  sectionTitle,
  cardId,
  title,
  tags,
  user,
  description,
  remove,
  cards,
  allTags,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [taskTitle, handleTaskTitle] = useState(title);
  const [cardTags, setCardTags] = useState(tags);

  const [tagsActive, setTagsActive] = useState(parseTags(cardTags));
  const [cardToUpdate, setCardUpdated] = useState([]);

  const check = (name) => {
    let str = false;
    cardTags.forEach((tag) => {
      if (tag.name === name) str = true;
    });

    return str;
  };

  return (
    <Flex
      w="100%"
      maxW={['300px', '450px', '230px', '300px', '350px']}
      mx="auto"
      my={2}
      py={1}
      flexDir="column"
      justify="center"
      border="1px"
      borderColor="blue.100"
      borderRadius="lg"
    >
      <Heading as="h4" size="md" px={3} display="flex">
        <Flex align="center">
          <Icon
            as={
              sectionTitle !== 'Done' ? AiOutlineCheckCircle : AiFillCheckCircle
            }
            alignSelf="center"
            color={sectionTitle === 'Done' ? 'green' : ''}
          />
          <Text px={1} mb={1} fontSize={['xs', 'sm', 'md', '']}>
            {title}
          </Text>
        </Flex>
        <Spacer />
        <Flex flexDir="row">
          <IconButton
            icon={<MdEditNote />}
            size="xs"
            isRound="true"
            onClick={onOpen}
            mx={1}
          />
          <IconButton
            icon={<MdClose />}
            size="xs"
            isRound="true"
            onClick={() => {
              remove(cardId);
            }}
          />
        </Flex>
      </Heading>
      <HStack py={2} px={1} ml={5} wrap="wrap">
        {tags.map(({ name, color }) => (
          <Tag
            size="sm"
            key={name}
            variant="solid"
            bgColor={color}
            borderRadius="full"
            px={5}
          >
            <Text
              as="p"
              fontFamily={theme.fonts.body}
              fontSize={['xs', 'xs', 'sm', 'sm', 'sm']}
            >
              {name}
            </Text>
          </Tag>
        ))}
        ;
      </HStack>
      <Flex py={2} ml={3}>
        <Avatar size="sm" icon={<AiOutlineUser />} />
        <Box ml="3">
          <Text fontWeight="bold" fontSize="sm">
            {user}
          </Text>
          <Text fontSize="sm">{description}</Text>
        </Box>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          handleTaskTitle(title);
          setTagsActive(parseTags(cardTags));
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                variant="flushed"
                value={taskTitle}
                placeholder="New title"
                onChange={(e) => {
                  const { value } = e.target;
                  handleTaskTitle(value);
                }}
              />
              <Text fontWeight="600">Select Tags</Text>
              <Flex wrap="wrap">
                {allTags.map(({ name, color }) => (
                  <Checkbox
                    key={color}
                    colorScheme={color}
                    px={1}
                    defaultChecked={check(name)}
                    value={name}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const { value } = e.target;
                      if (isChecked && !tagsActive.includes(value)) {
                        tagsActive.push(value);
                      } else if (!isChecked && tagsActive.includes(value)) {
                        tagsActive.splice(tagsActive.indexOf(value), 1);
                      }
                      setTagsActive(tagsActive);
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
              Cancel
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              size="sm"
              onClick={() => {
                if (!title || !tagsActive.length) {
                  toast({
                    title: title
                      ? 'Select one or more tags'
                      : 'Task must have a title',
                    variant: 'top-accent',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                  });
                  return;
                }

                cards.forEach((card, index) => {
                  if (card.id === cardId) {
                    const cardUpdated = card;
                    cardUpdated.title = taskTitle;
                    console.log(cardUpdated);
                    setCardUpdated([card, index]);
                  }
                });

                console.log(cardToUpdate);
                onClose();
                toast({
                  title: 'Task Updated',
                  variant: 'top-accent',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
                handleTaskTitle(title);
                setTagsActive([]);
              }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Card;
