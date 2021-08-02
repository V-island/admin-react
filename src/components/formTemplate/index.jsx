import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Button, Divider, Row, Col } from 'antd';
import { uuid } from '@/utils/utils';

// User Components
import GoForm from './GoForm';
import GoInput from './GoInput';
import GoSelect from './GoSelect';
import GoRadio from './GoRadio';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px 20px;
  border: 1px dashed transparent;
  border-color: ${(props) => (props.isOver ? '#298dff' : 'transparent')};
  background-color: #eee;
  margin: ${(props) => (props.isEmpty ? 'auto' : 0)};
  transition: 0.3s all ease;

  & > * {
    margin: 8px 0;
  }
`;

const EmptyPrompt = styled.div`
  display: ${(props) => (props.isEmpty ? 'flex' : 'none')};
  width: 100%;
  height: calc(100% - 16px);
  justify-content: center;
  align-items: center;
`;

const UserComponent = {
  // 通用
  GoButton: Button,

  // 布局
  GoDivider: Divider,
  GoRow: Row,
  GoCol: Col,

  // 数据录入
  GoForm: GoForm,
  GoFormItem: Form.Item,
  GoSelect: GoSelect,
  GoInput: GoInput,
  GoRadio: GoRadio,
};

class GoTemplate extends Component {
  // 构建DOM
  createElement = (option) => {
    if (Object.keys(option).length == 0) return null;

    const e = React.createElement;
    const Template = option.default
      ? option.identifier
      : this.components[option.identifier];
    let children = null;
    let props = {
      key: uuid(),
      ...option.props,
    };

    if ('child' in option && option.child.length > 0)
      children = option.child.map((item) => {
        return this.createElement(item);
      });

    if ('properties' in option && option.properties.length > 0)
      children = option.properties[0].default_val;

    if ('apiUrl' in props && props.apiUrl) props = { ...props, ...this.props };

    if (option.identifier == 'payForm')
      return e(Template, { ...props, ...this.template, children });
    else return e(Template, props, children);
  };
  render() {
    return (
      <Container isEmpty={schemas.length == 0}>
        {schemas.map((schema, index) => (
          <PreviewCard />
        ))}
        <EmptyPrompt isEmpty={schemas.length == 0}>
          <Empty style={{ margin: 'auto' }} description="点击或拖拽添加控件" />
        </EmptyPrompt>
      </Container>
    );
  }
}

export default GoTemplate;
