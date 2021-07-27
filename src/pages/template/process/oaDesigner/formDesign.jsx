import React, { Component } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { uuid } from '@/utils/utils';
import PropertyLibrary from '@/components/propertyLibrary';
import ControlColumn from './controlColumn';
import PreviewContainer from './previewContainer';

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
    placeholderProps: {},
    activeCard: {}, // 当前选中控件
    container: {}, // 容器树
    containerOrder: [], // 容器组
    tasksMap: {}, // 控件地图
    cardTree: [], // 表单树形图
  };

  selectControl = (item) => {
    const newSchemas = [...this.state.schemas];
    const { componentName, type, props } = item;
    const activeCard = {
      type,
      componentName,
      props: {
        ...props,
        id: `${componentName}_${uuid()}`,
      },
    };

    if (this.state.activeCard.type == 1) {
      const newActive = { ...this.state.activeCard };
      const index = newSchemas.findIndex(
        (_item) => newActive.props.id === _item.props.id,
      );

      if ('children' in newActive) newActive.children.push(activeCard);
      else newActive.children = [activeCard];

      newSchemas.splice(index, 1, {
        ...newActive,
      });

      this.setState({
        activeCard: newActive,
        schemas: newSchemas,
      });
    } else {
      newSchemas.push(activeCard);
      this.setState({
        activeCard: activeCard,
        schemas: newSchemas,
      });
    }
  };

  onUpdateProperty = (_, values) => {
    const newItem = { ...this.state.activeCard };
    newItem.props = {
      ...newItem.props,
      ...values,
    };
    this.setState({
      activeCard: newItem,
    });
  };

  onUpdateActive = (values) => {
    this.setState({
      activeCard: values,
    });
  };

  handleDragEnd = (item) => {
    console.log(item);
    const activeCard = {
      type,
      componentName,
      props: {
        ...props,
        id: `${componentName}_${uuid()}`,
      },
    };
  };

  // 拖拽结束事件
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = this.state.container[source.droppableId];
    const finish = this.state.container[destination.droppableId];

    // 同级容器内拖拽
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newContainer = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        container: {
          ...this.state.container,
          [newContainer.id]: newContainer,
        },
      };
      setPlaceholderProps({});
      this.setState(newState);
      return;
    }

    // 非同级容器内拖拽
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      container: {
        ...this.state.container,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setPlaceholderProps({});
    this.setState(newState);
  };

  render() {
    console.log(this.props.controlTree);
    return (
      <DndProvider backend={HTML5Backend}>
        <LayoutWrapper>
          <LayoutSide>
            <SideContainer>
              {this.props.controlTree.map((column) => (
                <ControlColumn
                  key={column.id}
                  column={column}
                  tasks={column.children}
                  onDrop={this.handleDragEnd}
                />
              ))}
            </SideContainer>
          </LayoutSide>
          <LayoutContent>
            <PreviewContainer
              cardTree={this.state.cardTree}
              activeCard={this.state.activeCard}
            />
          </LayoutContent>
          <LayoutConfig>
            {Object.keys(this.state.activeCard).length == 0 || (
              <PropertyLibrary
                control={this.state.activeCard}
                onUpdateSelect={this.onUpdateProperty}
              />
            )}
          </LayoutConfig>
        </LayoutWrapper>
      </DndProvider>
    );
  }
}

export default FormDesign;
