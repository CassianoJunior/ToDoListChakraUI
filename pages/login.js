import { useState, useEffect } from 'react';
// import { hash } from 'bcrypt';

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
  Text,
  Link,
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
            px={1}
          />
          <InputGroup>
            <Input
              variant="flushed"
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              px={1}
            />
            <InputRightElement>
              <IconButton
                size="xs"
                icon={showPass ? <RiEyeCloseLine /> : <RiEyeLine />}
                onClick={() => setShowPass(!showPass)}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            w="100%"
            colorScheme={useColorModeValue('blue', 'teal')}
            variant="outline"
            onClick={async (e) => {
              e.preventDefault();

              const response = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: {
                  'Content-type': 'aplication/json',
                },
                body: JSON.stringify({ user, password }),
              });
              console.log(response);
            }}
          >
            Sign in
          </Button>
          <Text size="sm" color="white">
            Don't have an account? <Link href="/signup">Sign up!</Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SingIn;
