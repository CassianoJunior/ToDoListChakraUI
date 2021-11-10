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
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';

import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

const cardsTodo = [
  {
    id: 0,
    title: 'Todo',
    tags: [
      { name: 'Ola', color: 'tomato' },
      { name: 'Oi', color: 'blue' },
    ],
    user: 'Cassiano',
    description: 'Student',
  },
];

const cardsDoing = [
  {
    id: 0,
    title: 'Doing',
    tags: [
      { name: 'Como', color: 'tomato' },
      { name: 'Vai', color: 'blue' },
    ],
    user: 'Amarildo',
    description: 'Student',
  },
];

const cardsDone = [
  {
    id: 0,
    title: 'Done',
    tags: [
      { name: 'Tudo', color: 'tomato' },
      { name: 'Bem', color: 'blue' },
    ],
    user: 'Joseph',
    description: 'Student',
  },
];

function defineCards(title) {
  if (title === 'To do') return cardsTodo;

  return title === 'Doing' ? cardsDoing : cardsDone;
}

const ListSection = ({ title }) => {
  const cards = defineCards(title);

  return (
    <Stack w="100%" border="1px" h="80vh" boxShadow="xl" rounded="md">
      <Flex align="center">
        <Heading as="h3" size="md" px={4} py={1}>
          {title}
        </Heading>
      </Flex>
      <Divider bg="white" m="2px" />
      <Container key={title}>
        {cards.map((items) => (
          <Box
            w="90%"
            mx="auto"
            my={1}
            border="1px"
            borderColor="blue.100"
            borderRadius="lg"
            key={items.id}
          >
            <Heading as="h4" size="md" px={3} display="flex" align="center">
              <Icon
                as={title !== 'Done' ? AiOutlineCheckCircle : AiFillCheckCircle}
                alignSelf="center"
                color={title === 'Done' ? 'green' : ''}
              />
              <Text px={1}>{items.title}</Text>
            </Heading>
            <HStack py={2} px={1} ml={5}>
              {items.tags.map(({ name, color }) => (
                <Tag
                  size="sm"
                  key={name}
                  variant="solid"
                  bgColor={color}
                  px={5}
                >
                  {name}
                </Tag>
              ))}
            </HStack>
            <Flex py={2} ml={3}>
              <Avatar size="sm" icon={<AiOutlineUser />} />
              <Box ml="3">
                <Text fontWeight="bold" fontSize="sm">
                  {items.user}
                </Text>
                <Text fontSize="sm">{items.description}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Container>
    </Stack>
  );
};

export default ListSection;
