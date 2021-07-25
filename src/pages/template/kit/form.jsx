import React, { Component, createRef } from 'react';
import {
  Drawer,
  Form,
  Button,
  Space,
  Col,
  Row,
  Input,
  Select,
  Switch,
} from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Option } = Select;

class ControlForm extends Component {
  formRef = createRef();

  state = {
    width: 900,
    bodyStyle: {
      paddingBottom: 80,
    },
    title: '',
    show: false,
  };

  // 监听组件传递的值
  componentDidUpdate(prevProps) {
    const { config, values } = this.props;

    if (this.props.config.show !== prevProps.config.show) {
      this.setState({
        title: config.title,
        show: config.show,
      });
      if (this.formRef.current) {
        this.formRef.current.resetFields();
        if (Object.keys(values).length > 0)
          this.formRef.current.setFieldsValue(values);
      }
    }
  }

  onFinish = async () => {
    const { onFinish, onClose } = this.props;
    try {
      const values = await this.formRef.current.validateFields();

      onFinish(values);
      onClose();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  render() {
    const { values, onClose } = this.props;
    const { width, bodyStyle, title, show } = this.state;

    return (
      <Drawer
        title={title}
        width={width}
        onClose={onClose}
        visible={show}
        bodyStyle={bodyStyle}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={onClose}
              style={{ marginRight: 8, minWidth: '80px', fontSize: '14px' }}
            >
              返回
            </Button>
            <Button
              onClick={this.onFinish}
              type="primary"
              style={{ minWidth: '80px', fontSize: '14px' }}
            >
              保存
            </Button>
          </div>
        }
      >
        <Form ref={this.formRef} layout="vertical" initialValues={values}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '控件名称必填' }]}
          >
            <Input placeholder="请输入控件名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '控件类型必填' }]}
          >
            <Select placeholder="请选择控件类型">
              <Option value={1}>布局控件</Option>
              <Option value={2}>基础控件</Option>
              <Option value={3}>增强控件</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="default"
            valuePropName="checked"
            label="是否默认标签"
            rules={[{ required: true, message: '是否默认标签必填' }]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="identifier"
            label="标签名"
            rules={[{ required: true, message: '控件名称必填' }]}
          >
            <Input placeholder="请输入控件名称" />
          </Form.Item>
          <Form.List name="properties" label="属性">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="center"
                  >
                    <Form.Item
                      {...restField}
                      label="属性名称"
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: '属性名称必填' }]}
                    >
                      <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="提示语句"
                      name={[name, 'prompt']}
                      fieldKey={[fieldKey, 'prompt']}
                      rules={[{ required: true, message: '提示语必填' }]}
                    >
                      <Input placeholder="请输入提示语" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="数据类型"
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                      rules={[{ required: true, message: '数据类型必填' }]}
                    >
                      <Select placeholder="请选择控件类型">
                        <Option value="String">字符串</Option>
                        <Option value="Number">数字</Option>
                        <Option value="Array">数组</Option>
                        <Option value="Object">对象</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="数据来源"
                      name={[name, 'data']}
                      fieldKey={[fieldKey, 'data']}
                      rules={[{ required: true, message: '数据来源必填' }]}
                    >
                      <Select placeholder="请选择控件类型">
                        <Option value="User">自定义</Option>
                        <Option value="Database">数据字典</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="默认值"
                      name={[name, 'default_val']}
                      fieldKey={[fieldKey, 'default_val']}
                    >
                      <Input placeholder="请输入默认值" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加属性
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    );
  }
}

export default ControlForm;
