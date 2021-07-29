import React, { Component } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { uuid } from '@/utils/utils';
import PropertyLibrary from '@/components/propertyLibrary';
import ControlList from './controlList';
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
    activeKey: null, // 当前选中控件
    schemaMap: {}, // 控件地图
    schemas: [], // 容器组
  };

  createSchemaMap = (schemas, parentKey, path) => {
    const map = {};

    schemas.forEach((item, index) => {
      const newPath = `${path}${index}`;

      if (Array.isArray(item.children)) {
        const children = this.traverseSchemas(
          item.children,
          item.props.id,
          `${newPath}/children/`,
        );
        map = { ...map, children };
      }

      map[item.props.id] = {
        ...item,
        _ctx: {
          parentKey: parentKey,
          swapKey: item.props.id,
          swapPath: newPath,
        },
      };
    });

    return map;
  };

  traverseSchemas = (pop) => {};

  onClickControl = (schema, event) => {
    const schemaId = `${schema.componentName}_${uuid()}`;
    const newSchema = { ...schema };
    newSchema.props.id = schemaId;

    // 控件容器为空
    if (!this.state.activeKey) {
      const newSchemas = [...this.state.schemas, newSchema];
      const newSchemaMap = this.createSchemaMap(newSchemas, '', '/');
      const newState = {
        ...this.state,
        activeKey: schemaId,
        schemaMap: newSchemaMap,
        schemas: newSchemas,
      };
      this.setState(newState);
      return;
    }

    // 点击添加控件
    if (event == 'click') {
      console.log(schema, this.state.activeKey);
      const startId = this.state.activeKey;
      const {
        _ctx: { swapPath },
      } = this.state.schemaMap[startId];
      console.log(startSchema);
      const newSchemas = Array.from(this.state.schemas);
      const newState = {
        ...this.state,
        activeKey: schemaId,
        schemaMap: {
          [schemaId]: newSchema,
        },
        schemas: [newSchema],
      };

      console.log(newState);
      // this.setState(newState);
      return;
    }

    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    };
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

  onUpdateActive = (key) => {
    this.setState({
      activeKey: key,
    });
  };

  handleDragAdd = ({ task, index, parentKey }) => {
    const schemaId = `${componentName}_${uuid()}`;
    const newSchema = { ...task };
    newSchema.props.id = schemaId;

    console.log(task, index, newSchema, parentKey);
  };

  handleDragEnd = (schema, result) => {
    const { componentName, type, props } = schema;
    const schemaId = `${componentName}_${uuid()}`;
    const newSchema = {
      type,
      componentName,
      props: {
        ...props,
        id: schemaId,
      },
      __ctx: {
        parentKey: result ? result.id : '',
        swapKey: schemaId,
        swapPath: '',
      },
    };
    const newState = {
      ...this.state,
      activeKey: schemaId,
      schemaMap: {
        ...this.state.schemaMap,
        [schemaId]: newSchema,
      },
      schemas: [...this.state.schemas, newSchema],
    };
    console.log(newState);
    this.setState(newState);
  };

  findSchema = (id) => {
    const schema = this.state.schemas.filter((item) => item.props.id === id)[0];

    return {
      schema,
      index: this.state.schemas.indexOf(schema),
    };
  };

  moveSchema = (id, atIndex) => {
    console.log(id, atIndex);
    const { schema, index } = this.findSchema(id);

    const newSchemas = Array.from(this.state.schemas);
    newSchemas.splice(index, 1);
    newSchemas.splice(atIndex, 0, schema);

    const newState = {
      ...this.state,
      activeKey: id,
      schemas: newSchemas,
    };
    console.log(newState);
    this.setState(newState);
  };

  onDropEnd = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <LayoutWrapper>
          <LayoutSide>
            <SideContainer>
              {this.props.controlTree.map((control) => (
                <ControlList
                  key={control.id}
                  control={control}
                  onClickControl={this.onClickControl}
                />
              ))}
            </SideContainer>
          </LayoutSide>
          <LayoutContent>
            <PreviewContainer
              schemas={this.state.schemas}
              activeKey={this.state.activeKey}
              moveSchema={this.moveSchema}
              handleDragAdd={this.handleDragAdd}
              onUpdateActive={this.onUpdateActive}
            />
          </LayoutContent>
          <LayoutConfig>
            <PropertyLibrary
              activeKey={this.state.activeKey}
              schemaMap={this.state.schemaMap}
              onUpdateSelect={this.onUpdateProperty}
            />
          </LayoutConfig>
        </LayoutWrapper>
      </DndProvider>
    );
  }
}

export default FormDesign;
