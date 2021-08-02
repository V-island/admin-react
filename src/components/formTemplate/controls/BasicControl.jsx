import { Form, Input } from 'antd';

// 单行输入框
const TextField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 多行输入框
const TextareaField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 数字输入框
const NumberField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 单选框
const SelectField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 多选框
const MultiSelectField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 日期
const DateField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 日期区间
const DateRangeField = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 说明文字
const TextNote = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

export default {
  TextField,
  TextareaField,
  NumberField,
  SelectField,
  MultiSelectField,
  DateField,
  DateRangeField,
  TextNote,
};
