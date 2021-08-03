import {
  Typography,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
} from 'antd';

// ============= 表单 ============ //
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
  const { TextArea } = Input;

  return (
    <Form.Item {...props}>
      <TextArea placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 数字输入框
const NumberField = (props) => {
  return (
    <Form.Item {...props}>
      <InputNumber placeholder={props.placeholder} />
    </Form.Item>
  );
};

// 选择框
const SelectField = (props) => {
  const { Option } = Select;
  return (
    <Form.Item {...props}>
      <Select placeholder={props.placeholder}>
        {props.options.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

// 单选
const RadioField = (props) => {
  return (
    <Form.Item {...props}>
      <Radio.Group>
        {props.options.map((item, index) => (
          <Radio key={index} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

// 多选
const CheckboxField = (props) => {
  return (
    <Form.Item {...props}>
      <Checkbox.Group>
        {props.options.map((item, index) => (
          <Checkbox key={index} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};

// 开关
const SwitchField = (props) => {
  return (
    <Form.Item {...props} valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

// 日期
const DateField = (props) => {
  return (
    <Form.Item {...props}>
      <DatePicker placeholder={props.placeholder} picker={props.picker} />
    </Form.Item>
  );
};

// 日期区间
const DateRangeField = (props) => {
  const { RangePicker } = DatePicker;

  return (
    <Form.Item {...props}>
      <RangePicker placeholder={props.placeholder} picker={props.picker} />
    </Form.Item>
  );
};

// 时间选择框
const DateTimeField = (props) => {
  return (
    <Form.Item {...props}>
      <TimePicker placeholder={props.placeholder} />
    </Form.Item>
  );
};

// ============= 排版 ============ //
// 标题组件
const TitleNote = (props) => {
  const { Title } = Typography;

  return <Title {...props}>{props.children}</Title>;
};

// 多行文本
const ParagraphNote = (props) => {
  const { Paragraph } = Typography;
  return <Paragraph {...props}>{props.children}</Paragraph>;
};

// 文本组件
const TextNote = (props) => {
  const { Text } = Typography;
  return <Text {...props}>{props.children}</Text>;
};

export default {
  TextField,
  TextareaField,
  NumberField,
  SelectField,
  RadioField,
  CheckboxField,
  SwitchField,
  DateField,
  DateRangeField,
  DateTimeField,
  TitleNote,
  ParagraphNote,
  TextNote,
};
