import { Grid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Header from '../src/components/Header';
import ListSection from '../src/components/ListSection';
import Footer from '../src/components/Footer';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks =
      typeof window !== 'undefined' && localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    setTasks(loadTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
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
        <ListSection title="To do" tasks={tasks} setTasks={setTasks} />
        <ListSection title="Doing" tasks={tasks} setTasks={setTasks} />
        <ListSection title="Done" tasks={tasks} setTasks={setTasks} />
      </Grid>
      <Footer />
    </>
  );
}
