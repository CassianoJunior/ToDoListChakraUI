import { useState } from 'react';
import { useRouter } from 'next/router';
import { hash } from 'bcryptjs';
import nookies from 'nookies';

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

function checkFields(user, password, confirmPassword, toast) {
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

  if (!password || !confirmPassword) {
    toast({
      title: 'Password can not be empty',
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 1000,
    });
    return false;
  }

  if (password !== confirmPassword) {
    toast({
      title: 'Passwords do not match',
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
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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
            Sign up
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
          <InputGroup>
            <Input
              variant="flushed"
              type={showConfirmPass ? 'text' : 'password'}
              placeholder="Confirm password"
              onChange={(e) => {
                e.preventDefault();
                setConfirmPassword(e.target.value);
              }}
              px={1}
            />
            <InputRightElement>
              <IconButton
                size="xs"
                icon={showConfirmPass ? <RiEyeCloseLine /> : <RiEyeLine />}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            w="100%"
            colorScheme={useColorModeValue('blue', 'teal')}
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);

              if (!checkFields(user, password, confirmPassword, toast)) return;

              hash(password, 10, async (err, hashKey) => {
                const newUser = await fetch(
                  'http://localhost:3000/api/register',
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ user, password: hashKey }),
                  },
                );

                const { message, token } = await newUser.json();

                if (message) {
                  toast({
                    title: message,
                    status: 'error',
                    variant: 'top-accent',
                    duration: 1000,
                    isClosable: true,
                  });
                  setLoading(false);
                } else {
                  nookies.set(null, 'ToDoListUSER_TOKEN', token, {
                    path: '/',
                    maxAge: 60 * 60 * 1, // 1 Hour
                  });
                  router.push('/');
                  toast({
                    title: 'User created successfully',
                    status: 'success',
                    variant: 'top-accent',
                    isClosable: true,
                    duration: 1000,
                  });
                  setPassword('');
                  setConfirmPassword('');
                  setUser('');
                  setLoading(false);
                }
              });
            }}
          >
            Sign up {loading ? <Spinner size="sm" mx={3} /> : ''}
          </Button>
          <Text size="sm" color="white">
            Already have an account? <Link href="/login">Sing in!</Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SingIn;
