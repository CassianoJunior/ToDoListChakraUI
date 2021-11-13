import {
  Flex,
  IconButton,
  Heading,
  Spacer,
  useColorMode,
  Text,
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const displayUser = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'auto',
  });

  return (
    <Flex
      py={5}
      px={2}
      align="center"
      justify="center"
      m="auto"
      maxW={['360px', '490px', '760px', '990px', '1280px', '1440px']}
    >
      <Flex align="center" justify="center">
        <Avatar size="sm" icon={<AiOutlineUser />} />
        <Flex
          flexDir="column"
          justify="flex-start"
          ml={1}
          display={displayUser}
        >
          <Text fontSize="sm" mb="-5px">
            Default user
          </Text>
          <Text fontSize="xs">Description</Text>
        </Flex>
      </Flex>
      <Spacer />
      <Heading as="h2" size="lg" ml={-10}>
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
