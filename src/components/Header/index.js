import {
  Flex,
  IconButton,
  Heading,
  Spacer,
  useColorMode,
  Text,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      p={5}
      align="center"
      justify="center"
      m="auto"
      maxW={['360px', '490px', '760px', '990px', '1280px', '1440px']}
    >
      <Spacer />
      <Heading as="h2" size="lg">
        <Text fontSize={['sm', 'lg', 'xl', '4xl']}>My Team To Do List</Text>
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
