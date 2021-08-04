import React, { PureComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import CreateFields from './CreateFields';

const initialValues = {
  bookingClient: '',
  selectOptions: ['Mark', 'Bob', 'Anthony'],
};

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

export default class FormAttributes extends PureComponent {
  handleSubmit = (formProps) => {
    console.log('formProps', formProps);
  };

  render = () => (
    <Formik initialValues={initialValues}>
      <Form onSubmit={this.handleSubmit}>
        {FormData.setters.map((setter, index) => (
          <Field
            component={CreateFields[setter.setterName]}
            key={index}
            name={setter.propName}
            label={setter.props.label}
          />
        ))}
      </Form>
    </Formik>
  );
}
