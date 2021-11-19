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
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { MdClose, MdEditNote } from 'react-icons/md';

const Card = ({
  sectionTitle,
  cardId,
  title,
  tags,
  user,
  description,
  remove,
  editing,
  moving,
}) => {
  const getMenuOptions = () => {
    const sections = ['To do', 'Doing', 'Done'];
    const options = sections.filter((section) => section !== sectionTitle);

    return options;
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
            onClick={() => {
              editing[1](editing[2](cardId));
              editing[3](true);
              editing[0]();
            }}
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
        <Avatar size="sm" name={user} icon={<AiOutlineUser />} />
        <Box ml="3">
          <Text fontWeight="bold" fontSize="sm">
            {user}
          </Text>
          <Text fontSize="sm">{description}</Text>
        </Box>
        <Spacer />
        <Menu closeOnSelect>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            size="sm"
            mr={2}
          >
            Move to
          </MenuButton>
          <MenuList>
            {getMenuOptions().map((option) => (
              <MenuItem
                onClick={() => {
                  moving(cardId, option);
                }}
                key={option}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Card;
