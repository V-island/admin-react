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
  border: 1px dashed transparent;
  border-color: ${(props) => (props.isOver ? '#298dff' : 'transparent')};
  background-color: #eee;
  margin: ${(props) => (props.isEmpty ? 'auto' : 0)};
  transition: 0.3s all ease;

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
  onAddControl,
  onMoveControl,
  onRemoveControl,
  onUpdateActive,
}) => {
  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: 'oaDesigner',
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        const isOver = monitor.isOver();
        const canDrop = monitor.canDrop();
        const isOverCurrent = monitor.isOver({ shallow: true });
        const isDrop = canDrop && isOver && isOverCurrent;

        if (didDrop && !isDrop) return;

        console.log(
          'root',
          item,
          didDrop,
          isOver,
          canDrop,
          isOverCurrent,
          isDrop,
        );
        if (item.copy)
          return onAddControl(item.schema, 'copy', schemas.length, null);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [schemas, onAddControl],
  );
  return (
    <Container
      ref={drop}
      isOver={canDrop && isOver && isOverCurrent}
      isEmpty={schemas.length == 0}
    >
      {schemas.map((schema, index) => (
        <PreviewCard
          key={schema.props.id}
          index={index}
          schema={schema}
          parentId={schema.props.id}
          activeKey={activeKey}
          onAddControl={onAddControl}
          onMoveControl={onMoveControl}
          onRemoveControl={onRemoveControl}
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
