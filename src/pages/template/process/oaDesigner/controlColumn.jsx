import React, { Component } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { uuid } from '@/utils/utils';

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
  overflow: hidden;
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

const ControlTask = ({ task, onDragEnd, onClickControl }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'oaDesigner',
    item: task,
    options: {
      dropEffect: 'copy',
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) onDragEnd(item, dropResult);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Task
      ref={drag}
      isDragging={isDragging}
      onClick={() => onClickControl(task)}
    >
      {task.title}
    </Task>
  );
};

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TaskList>
        {props.tasks.map((task) => (
          <ControlTask
            key={task.id}
            task={task}
            onDragEnd={props.onDragEnd}
            onClickControl={props.onClickControl}
          />
        ))}
      </TaskList>
    </Container>
  );
};

export default Column;
