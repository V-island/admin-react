import { Form, Input, InputNumber, Select, Radio, Switch } from 'antd';

// ============= 表单 ============ //
// 单行输入框
const InputSetter = ({ form, setter }) => {
  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <Input />
    </Form.Item>
  );
};

// 多行输入框
const TextareaSetter = ({ form, setter }) => {
  const { TextArea } = Input;

  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <TextArea />
    </Form.Item>
  );
};

// 数字输入框
const NumberSetter = ({ form, setter }) => {
  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <InputNumber />
    </Form.Item>
  );
};

// 选择框
const SelectSetter = ({ form, setter }) => {
  const { Option } = Select;
  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <Select>
        {setter.props.options.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

// 单选
const RadioSetter = ({ form, setter }) => {
  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <Radio.Group>
        {setter.props.options.map((item, index) => (
          <Radio key={index} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

// 开关
const SwitchSetter = ({ form, setter }) => {
  return (
    <Form.Item name={setter.propName} {...setter.props} valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

export default {
  InputSetter,
  TextareaSetter,
  NumberSetter,
  SelectSetter,
  RadioSetter,
  SwitchSetter,
};
