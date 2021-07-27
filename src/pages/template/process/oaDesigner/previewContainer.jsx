import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import PreviewCard from './previewCard';

const Container = styled.div`
  width: 600px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  backgroundC-color: ${(props) => props.isActive} ? #298dff : #eee;

  & > * {
    margin: 8px;
  }
`;

const PreviewContainer = ({ cardTree, activeCard, onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'oaDesigner',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: () => ({
      containerId: 'root',
    }),
  }));

  return (
    <Container ref={drop} isActive={canDrop && isOver}>
      {cardTree.map((card, index) => (
        <PreviewCard key={card.id} task={card} index={index} />
      ))}
    </Container>
  );
};

export default PreviewContainer;
