import React, { Component } from 'react';
import { Form } from 'antd';

class PayInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: props.className,
      layout: props.layout,
      labelCol: props.labelCol,
      wrapperCol: props.wrapperCol,
      style: props.style,
      initialValues: props.data,
    };
  }

  onFinish = (values) => {
    const { dispatch, apiUrl, list } = this.props;

    dispatch({
      type: 'template/postTemplate',
      payload: {
        url: apiUrl,
        template: list,
        data: values,
      },
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Form {...this.state} name="form" onFinish={this.onFinish}>
        {children}
      </Form>
    );
  }
}

export default PayInput;
