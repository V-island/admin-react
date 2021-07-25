import React, { Component } from 'react';
// components
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Divider, Row, Col } from 'antd';
import GoForm from '@/components/GoTemplate/GoForm';
import GoInput from '@/components/GoTemplate/GoInput';
import GoSelect from '@/components/GoTemplate/GoSelect';
import GoRadio from '@/components/GoTemplate/GoRadio';

// 随机uuid
const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16);
};

class GoTemplate {
  constructor(props) {
    this.props = props;
    this.template = props.template;
  }

  components = {
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

  // 初始化
  init = () => {
    const { list } = this.template;
    return this.createElement(list);
  };
}

export default GoTemplate;
