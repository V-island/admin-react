import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import PreviewTask from './previewTask';

const LayoutContainer = styled.div`
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

const PreviewHelper = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'oaDesigner',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <LayoutContainer ref={drop} role={'Dustbin'} isActive={canDrop && isOver}>
      <PreviewTask tasksTree={props.tasksTree} />
    </LayoutContainer>
  );
};

export default PreviewHelper;
