import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class PaySelect extends Component {
  render() {
    return (
      <Select defaultValue="lucy" style={{ width: 120 }}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
      </Select>
    );
  }
}

export default PaySelect;
