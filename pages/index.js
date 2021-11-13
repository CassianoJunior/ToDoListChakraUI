import { Grid } from '@chakra-ui/react';
import Header from '../src/components/Header';
import ListSection from '../src/components/ListSection';

export default function Home() {
  return (
    <>
      <Header />
      <Grid
        templateColumns={['1fr', '1fr', 'repeat(3, minmax(0,1fr))']}
        gap={4}
        mx="auto"
        maxW={['360px', '490px', '760px', '990px', '1280px', '1440px']}
        justify="center"
      >
        <ListSection title="To do" />
        <ListSection title="Doing" />
        <ListSection title="Done" />
      </Grid>
    </>
  );
}
