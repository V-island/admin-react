import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
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
  findSchema,
  moveSchema,
  handleDragEnd,
  onUpdateActive,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'oaDesigner',
      drop({ add, task, id, originalIndex }, monitor) {
        const didDrop = monitor.didDrop();
        console.log(add, task, id, originalIndex, didDrop);
        if (didDrop) return;
        if (add) handleDragEnd(task);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [handleDragEnd],
  );

  return (
    <Container ref={drop} isActive={canDrop && isOver}>
      {schemas.map((schema) => (
        <PreviewCard
          key={schema.props.id}
          schema={schema}
          activeKey={activeKey}
          findSchema={findSchema}
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
