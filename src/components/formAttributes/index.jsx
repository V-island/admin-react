import React from 'react';
import styled from 'styled-components';
import { Form, Empty } from 'antd';
import CreateFields from './CreateFields';

const FormData = {
  category: 'basic',
  componentName: 'TextField',
  description: '',
  dropToColumnEnable: true,
  icon: 'logo_input2',
  name: '单行输入框',
  props: {
    label: '单行输入框',
    placeholder: '请输入',
    ratio: 50,
  },
  setters: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
        subLabel: '最多50字',
        validateMessage: {
          required: '标题不能为空',
        },
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
        subLabel: '最多50字',
      },
    },
    {
      propName: 'ratio',
      setterName: 'RatioSetter',
      props: {
        label: '字段占比',
      },
    },
    {
      propName: 'required',
      setterName: 'SwitchSetter',
      props: {
        label: '必填',
      },
    },
  ],
};

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

const SetterFields = (props) => {
  const Card = CreateFields[props.setter.setterName];
  console.log(props);
  if (!Card) return null;

  return <Card {...props} />;
};

const FormAttributes = (props) => {
  const { schema } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  console.log(props);

  return (
    <Container>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onFinish}
        initialValues={FormData.props}
      >
        {FormData.setters.map((setter, index) => (
          <SetterFields key={index} form={form} setter={setter} />
        ))}
      </Form>
    </Container>
  );
};

export default FormAttributes;
