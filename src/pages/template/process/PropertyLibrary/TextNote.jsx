import React, { Component, useState } from 'react';
import { Form, Input, Switch } from 'antd';

class PropertyForm extends Component {
  render() {
    const { control, onUpdateSelect } = this.props;

    return (
      <div style={{ padding: '20px' }}>
        <Form
          layout="vertical"
          onValuesChange={onUpdateSelect}
          initialValues={control.props}
        >
          <Form.Item name="id" label="ID" noStyle hidden>
            <Input placeholder="请输入ID" />
          </Form.Item>
          <Form.Item name="content" label="说明文字">
            <Input.TextArea rows={2} placeholder="请输入说明文字" />
          </Form.Item>
          <Form.Item name="link" label="可以输入链接跳转地址">
            <Input.TextArea rows={2} placeholder="请输入" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PropertyForm;
