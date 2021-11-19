import {
  Flex,
  Box,
  IconButton,
  Button,
  Heading,
  Spacer,
  useColorMode,
  Text,
  Stack,
  Avatar,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import {
  AiOutlineMenu,
  AiOutlineDoubleLeft,
  AiOutlineEdit,
} from 'react-icons/ai';

import { useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

const Header = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const showUserInfo = () => (
    <>
      <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
        {user.username}
      </Heading>
      <Text color="gray.500">{user.description && user.description}</Text>
    </>
  );

  const editUserInfo = () => (
    <Stack width="100%">
      <Input
        placeholder="Username"
        value={username}
        variant="flushed"
        mb={2}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        placeholder="Description"
        value={description}
        variant="flushed"
        onChange={(e) => {
          e.preventDefault();
          setDescription(e.target.value);
        }}
      />
      <Button
        variant="outline"
        colorScheme="green"
        w="100%"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Done
      </Button>
    </Stack>
  );

  return (
    <>
      <Flex
        p={5}
        align="center"
        justify="center"
        m="auto"
        maxW={['360px', '490px', '760px', '990px', '1280px', '1440px']}
      >
        <IconButton icon={<AiOutlineMenu />} size="sm" onClick={onOpen} />
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
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display="flex"
            align="center"
            justifyContent="space-between"
          >
            User Section{' '}
            <IconButton
              icon={<AiOutlineDoubleLeft />}
              onClick={onClose}
              size="sm"
            />
          </DrawerHeader>
          <DrawerBody>
            <Flex justify="center" mt={2}>
              <Avatar
                size="xl"
                name={user.username}
                alt="User"
                css={{
                  border: '2px solid gray',
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align="center" mb={5}>
                {!isEditing && showUserInfo()}
                {isEditing && editUserInfo()}
              </Stack>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme="red"
              align="center"
              rightIcon={<FaSignOutAlt />}
              onClick={(e) => {
                e.preventDefault();

                nookies.destroy(null, 'ToDoListUSER_TOKEN');
                router.push('/login');
              }}
            >
              Sign out
            </Button>
            <Spacer />
            <Button
              colorScheme="blue"
              rightIcon={<AiOutlineEdit />}
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
