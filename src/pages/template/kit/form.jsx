import React, { Component, createRef } from 'react';
import { Drawer, Form, Button, Input, Select, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Option } = Select;

const DrawerFooter = styled.div`
  text-align: right;

  > * {
    margin: 0 8px;
  }
`;

class KitForm extends Component {
  formRef = createRef();

  state = {
    width: 450,
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

  onFinish = (values) => {
    const {
      onFinish,
      onClose,
      config: { isEdit },
    } = this.props;
    onFinish(values, isEdit);
    onClose();
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
      >
        <Form
          ref={this.formRef}
          layout="vertical"
          initialValues={values}
          onFinish={this.onFinish}
        >
          <Form.Item name="id" label="ID" hidden>
            <Input placeholder="请输入ID" />
          </Form.Item>
          <Form.Item
            name="title"
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
            name="componentName"
            label="标签名"
            rules={[{ required: true, message: '控件名称必填' }]}
          >
            <Input placeholder="请输入控件名称" />
          </Form.Item>
          <Form.Item name={['props', 'label']} label="标题">
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item name={['props', 'placeholder']} label="提示文字">
            <Input placeholder="请输入提示文字" />
          </Form.Item>
          <Form.Item
            name={['props', 'required']}
            valuePropName="checked"
            label="必填"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <DrawerFooter>
              <Button onClick={onClose}>返回</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </DrawerFooter>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default KitForm;
