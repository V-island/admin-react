import React from 'react';
import { Ratio, Form, Input, Switch, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const CreateBasicField = (FieldComponent) => (props) => {
  console.log(props);
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
  const onChange = (value) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <FormItem
      label={label}
      hasFeedback={
        (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
      }
      help={submittedError || touchedError ? hasError : false}
      validateStatus={submittedError || touchedError ? 'error' : 'success'}
    >
      <FieldComponent
        {...field}
        {...props}
        onBlur={onBlur}
        onChange={type ? onInputChange : onChange}
      >
        {selectOptions &&
          selectOptions.map((name) => <Option key={name}>{name}</Option>)}
      </FieldComponent>
    </FormItem>
  );
};

const SelectSetter = CreateBasicField(Select);
// const RatioSetter = CreateBasicField(Ratio);
const InputSetter = CreateBasicField(Input);
const SwitchSetter = CreateBasicField(Switch);

export default {
  SelectSetter,
  // RatioSetter,
  InputSetter,
  SwitchSetter,
};
