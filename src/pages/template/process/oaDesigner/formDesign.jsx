import React, { Component } from 'react';
import { Typography, Empty } from 'antd';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { uuid } from '@/utils/utils';
import PropertyLibrary from '@/components/propertyLibrary';
import PreviewHelper from './previewHelper';
import ControlColumn from './controlColumn';

const { Text } = Typography;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 64px - 46px);
  background: #fff;
`;

const LayoutSide = styled.div`
  width: 280px;
  overflow-y: auto;
  background: #f5f6f6;
  border-right: 1px solid #ecedef;
`;

const LayoutContent = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background: #eee;
  padding: 20px;
`;

const LayoutConfig = styled.div`
  width: 300px;
  overflow-y: auto;
  background: #fff;
  border-left: 1px solid #ecedef;
`;

const SideContainer = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

class FormDesign extends Component {
  state = {
    activeItem: {},
    schemasMap: [],
    schemas: [],
  };

  creatSchemasMap = (item) => {};

  selectControl = (item) => {
    const newSchemas = [...this.state.schemas];
    const { componentName, type, props } = item;
    const activeItem = {
      type,
      componentName,
      props: {
        ...props,
        id: `${componentName}_${uuid()}`,
      },
    };

    if (this.state.activeItem.type == 1) {
      const newActive = { ...this.state.activeItem };
      const index = newSchemas.findIndex(
        (_item) => newActive.props.id === _item.props.id,
      );

      if ('children' in newActive) newActive.children.push(activeItem);
      else newActive.children = [activeItem];

      newSchemas.splice(index, 1, {
        ...newActive,
      });

      this.setState({
        activeItem: newActive,
        schemas: newSchemas,
      });
    } else {
      newSchemas.push(activeItem);
      this.setState({
        activeItem: activeItem,
        schemas: newSchemas,
      });
    }
  };

  onUpdateProperty = (_, values) => {
    const newItem = { ...this.state.activeItem };
    newItem.props = {
      ...newItem.props,
      ...values,
    };
    this.setState({
      activeItem: newItem,
    });
  };

  onUpdateActive = (values) => {
    this.setState({
      activeItem: values,
    });
  };

  onUpdateSchemas = (item) => {
    console.log(item);
  };

  // 拖拽结束事件
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(destination, source, draggableId);
  };

  render() {
    const { activeItem, schemas } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <LayoutWrapper>
          <LayoutSide>
            <SideContainer>
              {this.props.controlTree.map((column) => (
                <ControlColumn
                  key={column.id}
                  column={column}
                  tasks={column.children}
                />
              ))}
            </SideContainer>
          </LayoutSide>
          <LayoutContent>
            <PreviewHelper
              schemas={schemas}
              activeItem={activeItem}
              onUpdateActive={this.onUpdateActive}
              onUpdateSchemas={this.onUpdateSchemas}
            />
          </LayoutContent>
          <LayoutConfig>
            {Object.keys(activeItem).length == 0 || (
              <PropertyLibrary
                control={activeItem}
                onUpdateSelect={this.onUpdateProperty}
              />
            )}
          </LayoutConfig>
        </LayoutWrapper>
      </DragDropContext>
    );
  }
}

export default FormDesign;
