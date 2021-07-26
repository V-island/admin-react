import React, { Component } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  transition: background-color 0.2s ease;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  height: 40px;
  margin-bottom: 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: grab;
  background-color: #fff;
  transition: all 0.2s ease;
  opacity: ${(props) => props.isDragging} ? 0.4 : 1;

  &:nth-child(odd) {
    margin-right: 8px;
  }

  &:hover{
    border-color: #0089ff;
    box-shadow: 0 4px 8px 0 rgb(17 31 44 / 8%);
  }
`;

const ControlTask = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'oaDesigner',
    item: props.task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        alert(`You dropped ${item.title} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Task ref={drag} isDragging={isDragging}>
      {props.task.title}
    </Task>
  );
};

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TaskList>
        {props.tasks.map((task, index) => (
          <ControlTask key={task.id} task={task} index={index} />
        ))}
      </TaskList>
    </Container>
  );
};

export default Column;
