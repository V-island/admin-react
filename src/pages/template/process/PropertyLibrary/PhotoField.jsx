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
          <Form.Item
            name="label"
            label="标题"
            rules={[{ required: true, message: '标题不能为空' }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item name="placeholder" label="提示文字">
            <Input.TextArea
              showCount
              rows={2}
              maxLength={50}
              placeholder="请输入提示文字"
            />
          </Form.Item>
          <Form.Item name="required" valuePropName="checked" label="必填">
            <Switch />
          </Form.Item>
          <Form.Item name="ocr" valuePropName="checked" label="OCR识别">
            <Switch />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PropertyForm;
