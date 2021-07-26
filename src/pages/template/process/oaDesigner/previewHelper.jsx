import React, { Component } from 'react';
import { Typography, Space, Button, Empty } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import { Droppable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;

const LayoutContainer = styled.div`
  width: 600px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 8px;
  }
`;

const ControlCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 38px;
  background: #fff;
  border-left: 3px solid #fff;
  transition: 0.3s all ease;

  &[data-active='true'] {
    border-left: 3px solid #0089ff !important;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
  }
  &:hover {
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

class PreviewHelper extends Component {
  layoutSchemas = (schemas) => {
    if (schemas.length == 0)
      return <Empty style={{ margin: 'auto' }} description="点击添加控件" />;

    return schemas.map((item) => {
      switch (item.type) {
        case 1:
          return this.layoutContainer(item);
        default:
          return this.controlContainer(item);
      }
    });
  };

  layoutContainer = (item) => {
    const { activeItem, onUpdateActive } = this.props;
    const { props } = item;
    console.log(item);
    return (
      <ContainerCard
        key={props.id}
        data-active={props.id == activeItem.props.id}
        onClick={() => onUpdateActive(item)}
      >
        <Content>
          <Title level={5}>{props.label || '分栏'}</Title>
          <ChildrenContainer isEmpty={item.children.length == 0}>
            {this.layoutSchemas(item.children)}
          </ChildrenContainer>
        </Content>
        {this.operateTool(item)}
      </ContainerCard>
    );
  };
  controlContainer = (item) => {
    const { activeItem, onUpdateActive } = this.props;
    const { props } = item;

    return (
      <ControlCard
        key={props.id}
        data-active={props.id == activeItem.props.id}
        onClick={() => onUpdateActive(item)}
      >
        <Content>
          <Title level={5}>{props.label}</Title>
          <Text>{props.placeholder}</Text>
        </Content>
        {this.operateTool(item)}
      </ControlCard>
    );
  };
  operateTool = (item) => {
    return (
      <ButtonGroup>
        <Space>
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => this.removeContainer(item)}
          />
        </Space>
      </ButtonGroup>
    );
  };
  removeContainer = (item) => {};

  render() {
    const { schemas } = this.props;
    console.log(schemas);

    return (
      <Droppable droppableId="root-preview" type="OADesigner">
        {(provided, snapshot) => (
          <LayoutContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {this.layoutSchemas(this.props.schemas)}
          </LayoutContainer>
        )}
      </Droppable>
    );
  }
}

export default PreviewHelper;
