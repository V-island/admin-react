import React, { Component } from 'react';
import { Form, Input, Switch, Select } from 'antd';

const { Option } = Select;

class PropertyForm extends Component {
  onGenderChange = (_, values) => {
    const { onUpdateSelect } = this.props;

    switch (values.format) {
      case 'yyyy-MM-dd':
        onUpdateSelect(_, {
          ...values,
          unit: '天',
        });
        return;
      case 'yyyy-MM-dd HH:mm':
        onUpdateSelect(_, {
          ...values,
          unit: '小时',
        });
        return;
    }
  };

  render() {
    const { control } = this.props;

    return (
      <div style={{ padding: '20px' }}>
        <Form
          ref={this.formRef}
          layout="vertical"
          onValuesChange={this.onGenderChange}
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
          <Form.Item name="format" label="日期类型">
            <Select placeholder="请选择日期类型">
              <Option value="yyyy-MM-dd">年-月-日</Option>
              <Option value="yyyy-MM-dd HH:mm">年-月-日 时:分</Option>
            </Select>
          </Form.Item>
          <Form.Item name="required" valuePropName="checked" label="必填">
            <Switch />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PropertyForm;
