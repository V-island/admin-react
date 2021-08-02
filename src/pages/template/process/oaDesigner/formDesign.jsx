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

  // 创建控件地图
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

  // 遍历控件树
  findSchemas = (schemas, path, event, schema) => {
    if (path.length == 1) {
      const index = Number(path.join());
      if (event == 'click') schemas.splice(index + 1, 0, schema);

      if (event == 'copy' && schemas.length > 0)
        schemas.splice(index, 0, schema);

      if (event == 'copy' && schemas.length == 0) schemas.push(schema);

      if (event == 'remove') schemas.splice(index, 1);

      if (event == 'update') schemas[index].props = schema;
    } else {
      const key = path[0];
      const newSchemas = schemas[key] || [];
      path.shift();
      schemas[key] = this.findSchemas(newSchemas, path, event, schema);
    }

    return schemas;
  };

  // 获取其他选中状态
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

  // 添加控件
  onAddControl = (schema, event, index, parentKey) => {
    const activeId = event == 'copy' ? parentKey : this.state.activeKey;
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
      this.props.onUpdateContent(newSchemas);
      return;
    }
    const schemas = [...this.state.schemas];
    const startSchema = activeId ? this.state.schemaMap[activeId] : {};
    const swapPath = activeId ? startSchema._ctx.swapPath : `/${index}`;
    const newSwapPath =
      startSchema.type == 1 && event == 'copy'
        ? `${swapPath}/children/${
            startSchema.children ? startSchema.children.length : index
          }`
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
    this.props.onUpdateContent(newSchemas);
    return;
  };

  // 移动控件
  onMoveControl = ({ schema, dragIndex, dragId, hoverIndex, hoverId }) => {
    console.log('Move', dragIndex, dragId, hoverIndex, hoverId);
    const schemas = [...this.state.schemas];
    const startPath = this.state.schemaMap[dragId]._ctx.swapPath;
    const finishPath = this.state.schemaMap[hoverId]._ctx.swapPath;
    const startSchemas = this.findSchemas(
      schemas,
      startPath.split('/').slice(1),
      'remove',
    );
    const finishSchemas = this.findSchemas(
      startSchemas,
      finishPath.split('/').slice(1),
      'copy',
      schema,
    );
    const newSchemaMap = this.createSchemaMap(finishSchemas, '', '/');

    const newState = {
      ...this.state,
      activeKey: dragId,
      schemaMap: newSchemaMap,
      schemas: finishSchemas,
    };

    this.setState(newState);
    this.props.onUpdateContent(finishSchemas);
    return;
  };

  // 移除添加控件
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
    this.props.onUpdateContent(newState);
    return;
  };

  // 更新控件信息
  onUpdateProperty = (_, values) => {
    const schemas = [...this.state.schemas];
    const schemaId = values.id;
    const {
      _ctx: { swapPath },
    } = this.state.schemaMap[schemaId];
    const newSwapPath = swapPath.split('/').slice(1);
    const newSchemas = this.findSchemas(schemas, newSwapPath, 'update', values);
    const newSchemaMap = this.createSchemaMap(newSchemas, '', '/');

    const newState = {
      ...this.state,
      activeKey: schemaId,
      schemaMap: newSchemaMap,
      schemas: newSchemas,
    };

    this.setState(newState);
    this.props.onUpdateContent(newSchemas);
    return;
  };

  // 更新选中控件
  onUpdateActive = (key) => {
    this.setState({
      activeKey: key,
    });
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
              onAddControl={this.onAddControl}
              onMoveControl={this.onMoveControl}
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
