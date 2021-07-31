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
  background: #eee;
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
        const children = this.createSchemaMap(
          item.children,
          item.props.id,
          `${newPath}/children/`,
        );
        for (const key in children) {
          if (Object.hasOwnProperty.call(children, key)) {
            map[key] = children[key];
          }
        }
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

  findSchemas = (schemas, path, event, schema) => {
    if (path.length == 1) {
      const index = Number(path.join());
      if (event == 'click') schemas.splice(index + 1, 0, schema);

      if (event == 'add' && schemas.length > 0)
        schemas.splice(index + 1, 0, schema);

      if (event == 'add' && schemas.length == 0) schemas.push(schema);

      if (event == 'remove') schemas.splice(index, 1);
    } else {
      const key = path[0];
      const newSchemas = schemas[key] || [];
      path.shift();
      schemas[key] = this.findSchemas(newSchemas, path, event, schema);
    }
    return schemas;
  };

  getActionId = (schemaMap, parentId, path) => {
    const index = Number(path.pop());
    const parentSchemas =
      parentId !== '' ? schemaMap[parentId].children : Object.keys(schemaMap);
    const parentIndex =
      parentSchemas.length > 0
        ? parentSchemas.length - 1
        : parentSchemas.length;

    if (parentIndex == 0) return parentId;
    if (parentIndex == index)
      return parentId !== ''
        ? parentSchemas[index].props.id
        : parentSchemas[index];
    if (parentIndex < index)
      return parentId !== ''
        ? parentSchemas[parentIndex].props.id
        : parentSchemas[parentIndex];
    if (parentIndex > index)
      return parentId !== ''
        ? parentSchemas[index + 1].props.id
        : parentSchemas[index + 1];
  };

  onAddControl = (schema, event, index, parentKey) => {
    const activeId = event == 'add' ? parentKey : this.state.activeKey;
    const schemaId = `${schema.componentName}_${uuid()}`;
    const newSchema = { ...schema, props: { ...schema.props, id: schemaId } };

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
    const schemas = [...this.state.schemas];
    const startSchema = activeId ? this.state.schemaMap[activeId] : {};
    const swapPath = activeId ? startSchema._ctx.swapPath : `/${index}`;
    const newSwapPath =
      startSchema.type == 1 && event == 'add'
        ? `${swapPath}/children/${index}`
        : swapPath;
    const newSchemas = this.findSchemas(
      schemas,
      newSwapPath.split('/').slice(1),
      event,
      newSchema,
    );
    const newSchemaMap = this.createSchemaMap(newSchemas, '', '/');
    const newState = {
      ...this.state,
      activeKey: schemaId,
      schemaMap: newSchemaMap,
      schemas: newSchemas,
    };
    this.setState(newState);
    return;
  };

  onRemoveControl = (schemaId) => {
    const schemas = [...this.state.schemas];
    const {
      _ctx: { swapPath, parentKey },
    } = this.state.schemaMap[schemaId];
    const newSwapPath = swapPath.split('/').slice(1);
    const newSchemas = this.findSchemas(schemas, newSwapPath, 'remove');
    const newSchemaMap = this.createSchemaMap(newSchemas, '', '/');
    const newActiveId = this.getActionId(newSchemaMap, parentKey, newSwapPath);
    const newState = {
      ...this.state,
      activeKey: newActiveId,
      schemaMap: newSchemaMap,
      schemas: newSchemas,
    };

    this.setState(newState);
    return;
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

  handleDragAdd = (schema, parentKey, event) => {
    if (event == 'add') {
      const schemaId = `${schema.componentName}_${uuid()}`;
      const newSchema = { ...schema, props: { ...schema.props, id: schemaId } };
    }

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
                  onAddControl={this.onAddControl}
                />
              ))}
            </SideContainer>
          </LayoutSide>
          <LayoutContent>
            <PreviewContainer
              schemas={this.state.schemas}
              activeKey={this.state.activeKey}
              moveSchema={this.moveSchema}
              onAddControl={this.onAddControl}
              onRemoveControl={this.onRemoveControl}
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
