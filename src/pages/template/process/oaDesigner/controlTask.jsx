import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
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

  &:nth-child(odd) {
    margin-right: 8px;
  }
`;

class ControlTask extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.title}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default ControlTask;
