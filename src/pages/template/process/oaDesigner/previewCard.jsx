import React from 'react';
import { Button, Empty } from 'antd';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { DeleteOutlined } from '@ant-design/icons';

const Card = styled.div`
  position: relative;
  width: 100%;
  min-height: 38px;
  background: #fff;
  transition: 0.3s all ease;
  border: ${(props) =>
    props.isLayout ? '1px dashed #ccc' : '1px solid transparent'};
  border-left-width: ${(props) => (props.isLayout ? '3px' : 0)};
  border-left: ${(props) =>
    props.isActive ? '3px solid #0089ff' : '3px solid #fff'};
  border-radius: ${(props) => (props.isActive ? '0 8px 8px 0' : 0)};
  box-shadow: ${(props) =>
    props.isActive ? '0 1px 10px 0 rgb(226 226 226 / 50%)' : 'none'};
  opacity: ${(props) => (props.isDragging ? 0 : 1)};

  &:hover {
    border-left: ${(props) =>
      props.isActive ? '3px solid #0089ff' : '3px solid #bfc1c2'};
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
    cursor: grab;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.3;
  background: #fff;
`;

const Container = styled.div`
  border: 1px dashed #ccc;
  background: ${(props) => (props.isEmpty ? '#ddeff3' : '#fff')};
  padding: ${(props) => (props.isEmpty ? '20px' : '10px 0')};
  color: #aaa;
`;

const EmptyPrompt = styled.div`
  display: ${(props) => (props.isEmpty ? 'block' : 'none')};
`;

const CardTitle = styled.h4`
  line-height: 2;
`;

const CardText = styled.p`
  margin: 0;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  padding: 4px 8px;
  background: rgba(17, 31, 44, 0.04);
  border-radius: 16px;
`;

const ControlCard = (props) => {
  const { schema, activeKey, findSchema, onMoveSchema, onUpdateActive } = props;
  const {
    props: { id },
  } = schema;
  const originalIndex = findSchema(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'oaDesigner',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) onMoveSchema(droppedId, originalIndex);
      },
    }),
    [id, originalIndex, onMoveSchema],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'oaDesigner',
      canDrop: () => false,
      hover(props, monitor, component) {
        console.log(props, monitor, component);
      },
      // hover({ id: draggedId }) {
      //   if (draggedId !== id) {
      //     const { index: overIndex } = findSchema(id);
      //     onMoveSchema(draggedId, overIndex);
      //   }
      // },
    }),
    [findSchema, onMoveSchema],
  );

  return (
    <Card
      ref={(node) => drag(drop(node))}
      isLayout={schema.type == 1}
      isDragging={isDragging}
      isActive={schema.props.id == activeKey}
      onClick={() => onUpdateActive(schema.props.id)}
    >
      <Content>
        <CardTitle>{schema.props.label}</CardTitle>
        <CardChildren {...props} />
      </Content>
      <ButtonGroup isActive={schema.props.id == activeKey}>
        <Button
          type="link"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => {}}
        />
      </ButtonGroup>
    </Card>
  );
};

const CardChildren = (props) => {
  const { schema } = props;

  if (schema.type != 1) return <CardText>{schema.props.placeholder}</CardText>;

  const newSchemas = schema.children || [];

  return (
    <Container isEmpty={newSchemas.length == 0}>
      {newSchemas.map((item) => (
        <ControlCard {...props} key={item.props.id} schema={item} />
      ))}
      <EmptyPrompt isEmpty={newSchemas.length == 0}>
        <Empty style={{ margin: 'auto' }} description="点击添加控件" />
      </EmptyPrompt>
    </Container>
  );
};

const PreviewCard = (props) => {
  return <ControlCard {...props} />;
};

export default PreviewCard;
