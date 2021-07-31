import React, { useRef } from 'react';
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
  border: 1px solid transparent;
  border-left: ${(props) => {
    if (props.isActive) return '3px solid #0089ff';
    if (props.isLayout) return '3px dashed #ccc';
    return '3px solid #fff';
  }};
  box-shadow: ${(props) =>
    props.isActive ? '0 1px 10px 0 rgb(226 226 226 / 50%)' : 'none'};
  opacity: ${(props) => (props.isDragging ? 0.4 : 1)};
  outline: ${(props) => (props.isOver ? 'rgb(0, 137, 255) solid 1px' : 'none')};
  // pointer-events: none;
  z-index: ${(props) => (props.isActive ? 999 : 1)};

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
  border: ${(props) =>
    props.isOver ? '1px dashed #0089ff' : '1px dashed #ccc'};
  background: ${(props) => (props.isEmpty ? '#ddeff3' : '#fff')};
  padding: ${(props) => (props.isEmpty ? '20px' : '10px 0')};
  color: #aaa;
  transition: 0.3s all ease;

  & > * {
    margin: 8px 0;
  }
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
  const ref = useRef(null);
  const {
    schema,
    activeKey,
    index,
    parentId,
    onAddControl,
    onRemoveControl,
    onUpdateActive,
  } = props;
  const {
    props: { id },
  } = schema;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'oaDesigner',
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // end: (item, monitor) => {
      //   const { id: droppedId, index } = item;
      //   const didDrop = monitor.didDrop();
      //   if (!didDrop) onMoveSchema(droppedId, index);
      // },
    }),
    [id, index],
  );

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
        onAddControl(item.schema, 'add', index, id);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
      // hover(item, monitor) {
      //   if (!ref.current) return;
      //   const dragIndex = item.index;
      //   const hoverIndex = index;

      //   if (dragIndex === hoverIndex) return;

      //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
      //   const hoverMiddleY =
      //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      //   const clientOffset = monitor.getClientOffset();
      //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      //   console.log(item, dragIndex, hoverIndex);

      //   item.index = hoverIndex;
      // },
    }),
    [id, index, parentId, onAddControl],
  );
  drag(drop(ref));
  return (
    <Card
      ref={ref}
      data-swap-key={schema.props.id}
      isLayout={schema.type == 1}
      isDragging={isDragging}
      isOver={canDrop && isOver && isOverCurrent}
      isActive={schema.props.id == activeKey}
      onClick={(e) => {
        e.stopPropagation();
        onUpdateActive(schema.props.id);
      }}
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
          onClick={() => onRemoveControl(schema.props.id)}
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
      {newSchemas.map((item, index) => (
        <ControlCard
          {...props}
          key={item.props.id}
          parentKey={item.props.id}
          schema={item}
          index={index}
          parentId={schema.props.id}
        />
      ))}
      <EmptyPrompt isEmpty={newSchemas.length == 0}>
        <Empty style={{ margin: 'auto' }} description="可拖入多个组件" />
      </EmptyPrompt>
    </Container>
  );
};

const PreviewCard = (props) => {
  return <ControlCard {...props} />;
};

export default PreviewCard;
