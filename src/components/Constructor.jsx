import React from 'react';
import { useDrop } from 'react-dnd';

const Constructor = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item) => {
      // Handle drop logic here
      console.log('Dropped item:', item); // Log the dropped item
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`constructor ${isOver ? 'highlight' : ''}`}>
      Drop Here
    </div>
  );
};

export default Constructor;
