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
} from '@chakra-ui/react';

import { AddIcon, Icon } from '@chakra-ui/icons';

import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

import AddTaskButton from '../AddTaskButton';

import cardsTodo from '../../lib/objects/cardsTodo.json';
import cardsDoing from '../../lib/objects/cardsDoing.json';
import cardsDone from '../../lib/objects/cardsDone.json';

export function defineCards(title) {
  if (title === 'To do') return cardsTodo;

  return title === 'Doing' ? cardsDoing : cardsDone;
}

const ListSection = ({ title }) => {
  const cards = defineCards(title);

  return (
    <Stack w="100%" border="1px" h="80vh" boxShadow="xl" rounded="md">
      <Flex justify="space-between" w="98%" align="center" pt={1}>
        <Heading as="h3" size="md" pl={2}>
          {title}
        </Heading>
        <IconButton icon={<AddIcon />} size="sm" isRound="true" />
      </Flex>
      <Divider bg="white" />
      <Container key={title}>
        {cards.map((items) => (
          <Box
            w="90%"
            mx="auto"
            my={2}
            py={1}
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
                  {items.user}
                </Text>
                <Text fontSize="sm">{items.description}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Container>
      <AddTaskButton title={title} cards={cards} />
    </Stack>
  );
};

export default ListSection;
