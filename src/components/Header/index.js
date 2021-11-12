import {
  Flex,
  IconButton,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex p={5} align="center" justify="center">
      <Spacer />
      <Heading as="h2" size="lg">
        My Team To Do List
      </Heading>
      <Spacer />
      <IconButton
        icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        isRound="true"
        pos="right"
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
