import React, { Component } from 'react';
import { Form, Input, Switch, Button, Space, Typography } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

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
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <Space direction="vertical">
                <Text>选项</Text>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: '10px' }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      fieldKey={[fieldKey, 'key']}
                      style={{ marginBottom: 0 }}
                      rules={[{ required: true, message: '选项引索不能为空' }]}
                    >
                      <Input placeholder="请输入引索" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                      style={{ marginBottom: 0 }}
                      rules={[{ required: true, message: '选项内容不能为空' }]}
                    >
                      <Input placeholder="请输入内容" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Space>
                    <Button
                      type="link"
                      onClick={() => add()}
                      size="small"
                      style={{
                        height: '24px',
                        padding: '0px 7px',
                        fontSize: '14px',
                        minWidth: 'initial',
                      }}
                    >
                      添加选项
                    </Button>
                    <Button
                      type="link"
                      onClick={() => add()}
                      size="small"
                      style={{
                        height: '24px',
                        padding: '0px 7px',
                        fontSize: '14px',
                        minWidth: 'initial',
                      }}
                    >
                      选项关联
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            )}
          </Form.List>
          <Form.Item name="required" valuePropName="checked" label="必填">
            <Switch />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PropertyForm;
