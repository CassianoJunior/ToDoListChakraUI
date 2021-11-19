import {
  Flex,
  IconButton,
  Heading,
  Spacer,
  useColorMode,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineDoubleLeft } from 'react-icons/ai';

const Header = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <DrawerBody>{user.username}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
