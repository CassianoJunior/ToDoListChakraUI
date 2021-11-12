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
} from '@chakra-ui/react';
import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

import { MdClose, MdEditNote } from 'react-icons/md';

const Card = ({
  sectionTitle,
  cardId,
  title,
  tags,
  user,
  description,
  remove,
}) => (
  <Box
    w="90%"
    mx="auto"
    my={2}
    py={1}
    border="1px"
    borderColor="blue.100"
    borderRadius="lg"
    key={cardId}
  >
    <Heading as="h4" size="md" px={3} display="flex">
      <Flex>
        <Icon
          as={
            sectionTitle !== 'Done' ? AiOutlineCheckCircle : AiFillCheckCircle
          }
          alignSelf="center"
          color={sectionTitle === 'Done' ? 'green' : ''}
        />
        <Text px={1}>{title}</Text>
      </Flex>
      <Spacer />
      <Flex flexDir="row">
        {/* <IconButton
          icon={<MdEditNote />}
          size="xs"
          isRound="true"
          onClick={() => {}}
          mx={1}
        /> */}
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
          <Text as="p" fontFamily={theme.fonts.body}>
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
  </Box>
);

export default Card;
