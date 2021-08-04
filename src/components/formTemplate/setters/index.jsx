import { Form, Input, Select, Radio, Switch } from 'antd';

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

// 字段占比
const RatioSetter = ({ form, setter }) => {
  const options = [
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
    { label: '75%', value: 70 },
    { label: '100%', value: 100 },
  ];

  return (
    <Form.Item name={setter.propName} {...setter.props}>
      <Radio.Group options={options} optionType="button" buttonStyle="solid" />
    </Form.Item>
  );
};

export default {
  InputSetter,
  TextareaSetter,
  SelectSetter,
  RadioSetter,
  SwitchSetter,
  RatioSetter,
};
