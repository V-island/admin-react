import React, { Component } from 'react';
import { connect, history, injectIntl } from 'umi';
import Base from '@/pages/BaseComponent';
import GoTemplate from '@/utils/goTemplate';

@connect(({ template }) => ({
  template,
}))
class TestLayout extends Base {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'template/getTemplate',
      payload: {
        locales: 'zh',
      },
    });
  }

  render() {
    const Template = new GoTemplate(this.props);

    return Template.init();
  }
}

export default injectIntl(TestLayout);
