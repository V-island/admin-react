import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Empty } from 'antd';
import { uuid } from '@/utils/utils';
import TemplateCard from './templateCard';

const Container = styled.div`
  width: 100%;
  height: ${(props) => (props.isEmpty ? '100%' : 'auto')};
  margin: ${(props) => (props.isEmpty ? 'auto' : 0)};
  transition: 0.3s all ease;
`;

const EmptyPrompt = styled.div`
  display: ${(props) => (props.isEmpty ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

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
  onFinish = (values) => {
    console.log('Success:', values);
  };
  render() {
    const { schemas } = this.props;
    console.log(this.props);
    return (
      <Container isEmpty={schemas.length == 0}>
        <Form onFinish={this.onFinish}>
          {schemas.map((schema, index) => (
            <TemplateCard key={index} schema={schema} />
          ))}
          <EmptyPrompt isEmpty={schemas.length == 0}>
            <Empty style={{ margin: 'auto' }} description="暂无OA审批表单" />
          </EmptyPrompt>
        </Form>
      </Container>
    );
  }
}

export default GoTemplate;
