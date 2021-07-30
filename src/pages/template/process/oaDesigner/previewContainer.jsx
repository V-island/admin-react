import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import { useDrop } from 'react-dnd';
import PreviewCard from './previewCard';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  background-color: ${(props) => (props.isActive ? '#298dff' : '#eee')};
  margin: ${(props) => (props.isEmpty ? 'auto' : 0)};

  & > * {
    margin: 8px;
  }
`;

const EmptyPrompt = styled.div`
  display: ${(props) => (props.isEmpty ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PreviewContainer = ({
  schemas,
  activeKey,
  moveSchema,
  onAddControl,
  onUpdateActive,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'oaDesigner',
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) return;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onAddControl, moveSchema],
  );
  return (
    <Container
      ref={drop}
      isActive={canDrop && isOver}
      isEmpty={schemas.length == 0}
    >
      {schemas.map((schema, index) => (
        <PreviewCard
          key={schema.props.id}
          index={index}
          schema={schema}
          activeKey={activeKey}
          onMoveSchema={moveSchema}
          onUpdateActive={onUpdateActive}
        />
      ))}
      <EmptyPrompt isEmpty={schemas.length == 0}>
        <Empty style={{ margin: 'auto' }} description="点击或拖拽添加控件" />
      </EmptyPrompt>
    </Container>
  );
};

export default PreviewContainer;
