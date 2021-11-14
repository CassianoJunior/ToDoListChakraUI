import { Text, Flex, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Footer = () => (
  <Flex aling="center" justify="center" mt={4}>
    <Text as="p">
      Made with love &#128156; by{' '}
      <Link href="https://github.com/CassianoJunior" isExternal>
        Cassiano Junior <ExternalLinkIcon mx={1} />
      </Link>
    </Text>
  </Flex>
);

export default Footer;
