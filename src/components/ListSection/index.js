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

import { AiOutlineUser } from 'react-icons/ai';

const cards = [
  {
    id: 0,
    title: 'Todo',
    tags: ['Ola', 'Oi'],
  },
];

const ListSection = ({ title }) => (
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
          <Heading as="h4" size="md" px={3}>
            {items.title}
          </Heading>
          <HStack py={2} px={1} ml={5}>
            {items.tags.map((tag) => (
              <Tag size="sm" key={tag} variant="solid" bgColor="tomato" px={5}>
                {tag}
              </Tag>
            ))}
          </HStack>
          <Flex py={2} ml={3}>
            <Avatar size="sm" icon={<AiOutlineUser />} />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Nome pessoa
              </Text>
              <Text fontSize="sm">Description</Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </Container>
  </Stack>
);

export default ListSection;
