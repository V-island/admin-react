import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const Container = styled.div`
  position: absolute;
  top: 122px;
  right: 0;
  bottom: 12px;
  left: 50%;
  width: 660px;
  padding: 24px;
  overflow: auto;
  background: #fff;
  border-radius: 8px;
  transform: translateX(-50%);
`;

class baseSetting extends Component {
  render() {
    const { values, onUpdateChange } = this.props;

    return (
      <Container>
        <Form
          ref={this.formRef}
          layout="vertical"
          onValuesChange={onUpdateChange}
          initialValues={values}
        >
          <Form.Item
            name="flowTitle"
            label="表单名称"
            rules={[{ required: true, message: '表单名称必填' }]}
          >
            <Input placeholder="请输入表单名称" />
          </Form.Item>
          <Form.Item
            name="dirName"
            label="所在分组"
            rules={[{ required: true, message: '所在分组必填' }]}
          >
            <Select placeholder="请选择所在分组">
              <Option value={1}>账户认证</Option>
              <Option value={2}>提现/汇款</Option>
              <Option value={3}>其它</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="visible"
            label="谁可以发起"
            rules={[{ required: true, message: '可见范围必填' }]}
          >
            <Select placeholder="请选择可见范围">
              <Option value="全部可见">全部可见</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="表单说明">
            <Input.TextArea
              showCount
              rows={4}
              maxLength={100}
              placeholder="请输入表单说明"
            />
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

export default baseSetting;
