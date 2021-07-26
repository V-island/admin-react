import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import ControlTask from './controlTask';

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

export default class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <ControlTask key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
