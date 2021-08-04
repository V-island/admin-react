import React from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import UserComponent from '@/components/formTemplate/setters';

const getSetter = {
  TextField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  TextareaField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  NumberField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  SelectField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  RadioField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  CheckboxField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  SwitchField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  DateField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  DateRangeField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  DateTimeField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  TitleNote: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  ParagraphNote: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  TextNote: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  PhotoField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  Attachment: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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
  AddressField: [
    {
      propName: 'label',
      setterName: 'InputSetter',
      props: {
        label: '标题',
        maxLength: 50,
      },
    },
    {
      propName: 'placeholder',
      setterName: 'InputSetter',
      props: {
        label: '提示文字',
        maxLength: 50,
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

const FormAttributes = ({ activeKey, schemaMap, onUpdateSelect }) => {
  const [form] = Form.useForm();
  const schema = schemaMap[activeKey];

  if (!schema) return null;
  schema.setters = getSetter[schema.componentName] || [];

  const onFinish = (_, values) => {
    console.log('Received values of form:', values);
    onUpdateSelect(values);
  };

  form.setFieldsValue(schema.props);

  return (
    <Container>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onFinish}
        initialValues={schema.props}
      >
        {schema.setters.map((setter, index) => {
          const SetterFields = UserComponent[setter.setterName];
          if (!SetterFields) return null;

          return <SetterFields key={index} form={form} setter={setter} />;
        })}
      </Form>
    </Container>
  );
};

export default FormAttributes;
