import { useState, useEffect } from 'react';

import {
  Flex,
  VStack,
  Stack,
  Input,
  InputGroup,
  Heading,
  useColorMode,
  IconButton,
  InputRightElement,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

const SingIn = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      bg={useColorModeValue('gray.50')}
    >
      <IconButton
        icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        isRound="true"
        onClick={toggleColorMode}
        pos="absolute"
        right="20px"
        top="20px"
      />
      <Flex
        flexDir="column"
        w="40%"
        p={10}
        rounded="xl"
        bg={useColorModeValue('gray.800')}
      >
        <Stack align="center">
          <Heading fontSize="3xl" color="white">
            Sign in
          </Heading>
        </Stack>
        <VStack mx="auto" my={5} spacing={4} w="100%">
          <Input
            variant="flushed"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              e.preventDefault();
              setUser(e.target.value);
            }}
          />
          <InputGroup>
            <Input
              variant="flushed"
              type={showPass ? 'password' : 'text'}
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
            <InputRightElement>
              <IconButton
                size="xs"
                icon={showPass ? <RiEyeLine /> : <RiEyeCloseLine />}
                onClick={() => setShowPass(!showPass)}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            w="100%"
            colorScheme={useColorModeValue('blue', 'teal')}
            variant="outline"
          >
            Sign in
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SingIn;
