import { Flex, Button } from '@chakra-ui/react';
import { IoAddCircleOutline } from 'react-icons/io5';

import cardsTodo from '../../lib/objects/cardsTodo.json';
import cardsDoing from '../../lib/objects/cardsDoing.json';
import cardsDone from '../../lib/objects/cardsDone.json';

import { defineCards } from '../ListSection';

export function addingTask(title, cards) {
  const cardsToUpdate = defineCards(title);
}

const AddTaskButton = ({ title, cards }) => (
  <Flex align="center" justify="center">
    <Button
      colorScheme="teal"
      variant="outline"
      w="85%"
      leftIcon={<IoAddCircleOutline size={25} />}
      onClick={addingTask(title, cards)}
    >
      Add new task
    </Button>
  </Flex>
);

export default AddTaskButton;
