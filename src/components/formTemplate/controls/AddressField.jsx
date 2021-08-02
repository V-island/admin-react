import React, { Component } from 'react';
import { Form, Input } from 'antd';

class Control extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formItem: {
        label: props.label,
        name: props.name,
        rules: props.rules,
      },
      input: {
        placeholder: props.placeholder,
      },
    };
  }

  render() {
    const { formItem, input } = this.state;

    return (
      <Form.Item {...formItem}>
        <Input {...input} />
      </Form.Item>
    );
  }
}

export default Control;
