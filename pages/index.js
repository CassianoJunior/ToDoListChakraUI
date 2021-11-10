import { Grid } from '@chakra-ui/react';
import Header from '../src/components/Header';
import ListSection from '../src/components/ListSection';

export default function Home() {
  return (
    <>
      <Header />
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mx={4} justify="center">
        <ListSection title="To do" />
        <ListSection title="Doing" />
        <ListSection title="Done" />
      </Grid>
    </>
  );
}
