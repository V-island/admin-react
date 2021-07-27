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

const PreviewContainer = ({
  schemas,
  activeKey,
  onDropEnd,
  onUpdateActive,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'oaDesigner',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const EmptyCard = (schemas) => {
    if (schemas.length == 0)
      return (
        <Empty style={{ margin: 'auto' }} description="点击或拖拽添加控件" />
      );
  };

  return (
    <Container ref={drop} isActive={canDrop && isOver}>
      {schemas.map((schema, index) => (
        <PreviewCard
          key={schema.props.id}
          schema={schema}
          activeKey={activeKey}
          index={index}
          onDropEnd={onDropEnd}
          onUpdateActive={onUpdateActive}
        />
      ))}
      {EmptyCard(schemas)}
    </Container>
  );
};

export default PreviewContainer;
