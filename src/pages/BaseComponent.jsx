import React, { Component } from 'react';
import { getLocale } from 'umi';

class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  formatMessage = (id, data = {}) => {
    const { intl } = this.props;
    if (intl && id) return intl.formatMessage({ id: id }, data);
    else return '';
  };

  getLocale = () => {
    return getLocale() === 'zh-CN';
  };

  signMix = (str, params) => {
    let param = params;
    if (typeof param === 'object') {
      for (let key in param)
        str = str.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]);
      return str;
    } else {
      for (let i = 0; i < param.length; i++)
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), param[i]);
      return str;
    }
  };

  render() {
    return <div></div>;
  }
}

export default BaseComponent;
