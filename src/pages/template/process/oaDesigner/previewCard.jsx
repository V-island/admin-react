import React, { useRef } from 'react';
import { Typography, Space, Button, Empty } from 'antd';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ControlCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 38px;
  background: #fff;
  border-left: 3px solid #fff;
  transition: 0.3s all ease;

  &[data-active='true'] {
    border-left: 3px solid #0089ff;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
  }
  &:hover,
  &[data-active='true']:hover {
    border-left: 3px solid #bfc1c2;
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
    cursor: grab;
  }
`;

const ContainerCard = styled(ControlCard)`
  border: 1px dashed #ccc;
  border-left-width: 3px;
`;

const ChildrenContainer = styled.div`
  border: 1px dashed #ccc;
  background: ${(props) => props.isEmpty} ? #ddeff3 : #fff;
  padding: ${(props) => props.isEmpty} ? 20px : 10px 0;
  color: #aaa;
`;

const Content = styled.div`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.3;
  background: #fff;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: none;
  padding: 4px 8px;
  background: rgba(17, 31, 44, 0.04);
  border-radius: 16px;

  ${ControlCard}[data-active='true'] & {
    display: block;
  }
`;

const LayoutContainer = ({ schema, activeKey, index, onUpdateActive }) => {
  const EmptyCard = (schemas) => {
    if (schemas.length == 0)
      return <Empty style={{ margin: 'auto' }} description="点击添加控件" />;
  };

  if (!schema.children) schema.children = [];

  return (
    <ContainerCard
      data-active={schema.props.id == activeKey}
      onClick={() => onUpdateActive(schema.props.id)}
    >
      <Content>
        <Title level={5}>{schema.props.label}</Title>
        <ChildrenContainer isEmpty={schema.children.length == 0}>
          {schema.children.map((_schema, _index) => (
            <ControlContainer
              key={_schema.props.id}
              schema={_schema}
              activeKey={activeKey}
              index={_index}
              onUpdateActive={onUpdateActive}
            />
          ))}
          {EmptyCard(schema.children)}
        </ChildrenContainer>
      </Content>
      <OperateTool schema={schema} />
    </ContainerCard>
  );
};
const ControlContainer = ({
  schema,
  activeKey,
  index,
  onDropEnd,
  onUpdateActive,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'oaDesigner',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onDropEnd(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'oaDesigner',
    item: () => {
      return { schema, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <ControlCard
      ref={ref}
      data-handler-id={handlerId}
      data-active={schema.props.id == activeKey}
      onClick={() => onUpdateActive(schema.props.id)}
    >
      <Content>
        <Title level={5}>{schema.props.label}</Title>
        <Text>{schema.props.placeholder}</Text>
      </Content>
      <OperateTool schema={schema} />
    </ControlCard>
  );
};
const OperateTool = (props) => {
  return (
    <ButtonGroup>
      <Space>
        <Button
          type="link"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => {}}
        />
      </Space>
    </ButtonGroup>
  );
};
const PreviewCard = ({
  schema,
  activeKey,
  index,
  onDropEnd,
  onUpdateActive,
}) => {
  if (schema.type == 1)
    return (
      <LayoutContainer
        schema={schema}
        activeKey={activeKey}
        index={index}
        onDropEnd={onDropEnd}
        onUpdateActive={onUpdateActive}
      />
    );
  else
    return (
      <ControlContainer
        schema={schema}
        activeKey={activeKey}
        index={index}
        onDropEnd={onDropEnd}
        onUpdateActive={onUpdateActive}
      />
    );
};

export default PreviewCard;
