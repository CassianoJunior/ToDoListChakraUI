import {
  Heading,
  Stack,
  Divider,
  Box,
  HStack,
  Tag,
  Flex,
  Container,
  Avatar,
  Text,
  theme,
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

import { AddIcon, Icon } from '@chakra-ui/icons';

import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

import { IoAddCircleOutline } from 'react-icons/io5';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import cardsTodo from '../../lib/objects/cardsTodo.json';
import cardsDoing from '../../lib/objects/cardsDoing.json';
import cardsDone from '../../lib/objects/cardsDone.json';
import tags from '../../lib/objects/tags.json';

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

  const tagsActive = [];

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
          cards.map((card) => (
            <Box
              w="90%"
              mx="auto"
              my={2}
              py={1}
              border="1px"
              borderColor="blue.100"
              borderRadius="lg"
              key={card.id}
            >
              <Heading as="h4" size="md" px={3} display="flex" align="center">
                <Icon
                  as={
                    title !== 'Done' ? AiOutlineCheckCircle : AiFillCheckCircle
                  }
                  alignSelf="center"
                  color={title === 'Done' ? 'green' : ''}
                />
                <Text px={1}>{card.title}</Text>
              </Heading>
              <HStack py={2} px={1} ml={5}>
                {card.tags.map(({ name, color }) => (
                  <Tag
                    size="sm"
                    key={name}
                    variant="solid"
                    bgColor={color}
                    px={5}
                  >
                    <Text as="p" fontFamily={theme.fonts.body}>
                      {name}
                    </Text>
                  </Tag>
                ))}
              </HStack>
              <Flex py={2} ml={3}>
                <Avatar size="sm" icon={<AiOutlineUser />} />
                <Box ml="3">
                  <Text fontWeight="bold" fontSize="sm">
                    {card.user}
                  </Text>
                  <Text fontSize="sm">{card.description}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
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
                  organizeTags(tagsActive);
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
                cards.push({
                  id: nanoid(),
                  title: titleNewCard,
                  tags: organizeTags(tagsActive),
                  user: 'Default',
                  description: 'Desc',
                });
                setCards(cards);
                onClose();
                toast({
                  title: 'Task Added',
                  variant: 'top-accent',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
                console.log(cards);
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
