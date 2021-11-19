import { useState } from 'react';
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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import nookies from 'nookies';
import { useRouter } from 'next/router';

function checkFields(user, password, toast) {
  if (!user) {
    toast({
      title: 'User can not be empty',
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 1000,
    });
    return false;
  }

  if (!password) {
    toast({
      title: 'Password can not be empty',
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 1000,
    });
    return false;
  }

  if (password.length < 8) {
    toast({
      title: 'Password must be at least 8 characters ',
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 1000,
    });
    return false;
  }

  return true;
}

const SingIn = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        w={['90%', '40%']}
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
            color="white"
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
              color="white"
              value={password}
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
              setLoading(true);

              if (!checkFields(user, password, toast)) {
                setLoading(false);
                return;
              }

              const response = await fetch(
                'https://to-do-list-chakra-ui.vercel.app/api/auth',
                {
                  method: 'POST',
                  headers: {
                    'Content-type': 'aplication/json',
                  },
                  body: JSON.stringify({ user, password }),
                },
              );

              const { message, token } = await response.json();

              if (message && message !== 'Login success') {
                toast({
                  title: message,
                  status: 'error',
                  variant: 'top-accent',
                  duration: 1000,
                  isClosable: true,
                });
                setLoading(false);
                setPassword('');
              } else {
                toast({
                  title: message,
                  status: 'success',
                  variant: 'top-accent',
                  duration: 1000,
                  isClosable: true,
                });
                nookies.set(null, 'ToDoListUSER_TOKEN', token, {
                  path: '/',
                  maxAge: 60 * 60 * 1, // 1 Hour
                });
                setLoading(false);
                router.push('/');
              }
            }}
          >
            Sign in {loading ? <Spinner size="sm" mx={3} /> : ''}
          </Button>
          <Text size="sm" color="white">
            Don&apos;t have an account? <Link href="/signup">Sign up!</Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SingIn;
