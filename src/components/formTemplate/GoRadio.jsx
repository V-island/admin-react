import React, { Component } from 'react';
import { Form, Radio } from 'antd';
import GoTemplate from '@/utils/goTemplate';

class PayInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formItem: {
        label: props.label,
        name: props.name,
        rules: props.rules,
      },
      radioGroup: {
        value: props.value,
        options: props.options,
      },
      content: props.content,
    };
  }

  onChange = (e) => {
    const { dispatch, apiUrl, name } = this.props;

    dispatch({
      type: 'template/getContent',
      payload: {
        url: apiUrl,
        name: name,
        value: e.target.value,
      },
    });
  };

  render() {
    const { formItem, radioGroup, content } = this.state;
    const Template = new GoTemplate(this.props);

    return (
      <>
        <Form.Item {...formItem}>
          <Radio.Group onChange={this.onChange}>
            {radioGroup.options.map((item) => (
              <Radio key={item.label} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {Object.keys(content).length == 0 || Template.createElement(content)}
      </>
    );
  }
}

export default PayInput;
