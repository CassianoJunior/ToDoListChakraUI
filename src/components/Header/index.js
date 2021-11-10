import { Flex, IconButton, Heading, Spacer } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => (
  <Flex p={5} align="center" justify="center">
    <Spacer />
    <Heading as="h2" size="lg">
      My To Do List
    </Heading>
    <Spacer />
    <IconButton icon={<FaSun />} isRound="true" pos="right" />
  </Flex>
);

export default Header;
