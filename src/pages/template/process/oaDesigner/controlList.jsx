import React, { Component } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { uuid } from '@/utils/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h5`
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

  opacity: ${(props) => (props.isDragging ? 0.4 : 1)};

  &:nth-child(odd) {
    margin-right: 8px;
  }

  &:hover {
    border-color: #0089ff;
    box-shadow: 0 4px 8px 0 rgb(17 31 44 / 8%);
  }
`;

const ControlTask = ({ schema, onAddControl }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'oaDesigner',
      item: { schema, copy: true },
      options: {
        dropEffect: 'copy',
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [schema, onAddControl],
  );

  return (
    <Task
      ref={drag}
      isDragging={isDragging}
      onClick={() => onAddControl(schema, 'click')}
    >
      {schema.props.label}
    </Task>
  );
};

const ControlList = ({ control, onAddControl }) => {
  const schemas = control.children || [];
  return (
    <Container>
      <Title>{control.title}</Title>
      <TaskList>
        {schemas.map((schema, index) => (
          <ControlTask
            key={index}
            schema={schema}
            onAddControl={onAddControl}
          />
        ))}
      </TaskList>
    </Container>
  );
};

export default ControlList;
