import React, { Component } from 'react';
import { Layout, Tabs, Button, Space, Result } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import BaseSetting from './baseSetting';
import FormDesign from './form';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

@connect(({ template }) => ({
  template,
}))
class ControlForm extends Component {
  state = {
    detail: {},
    content: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'template/getControlList',
      payload: {},
    });

    dispatch(
      {
        type: 'template/getProcessDetail',
        payload: {},
      },
      (detail) => {
        console.log(detail);
        this.setState({ detail });
      },
    );
  }

  onUpdateBaseSetting = (_, values) => {
    this.setState({
      detail: values,
    });
  };

  onUpdateContent = (schemas) => {
    console.log(schemas);
  };

  render() {
    const {
      template: { control },
    } = this.props;
    const { content, detail } = this.state;

    return (
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Space>
            <Button
              onClick={() => {
                history.goBack();
              }}
              shape="circle"
              icon={<LeftOutlined />}
              style={{
                minWidth: '32px',
                fontSize: '16px',
                height: '32px',
                lineHeight: '1.5715',
                borderRadius: '50%',
              }}
              ghost
            />
            <p style={{ color: '#fff', fontSize: '16px', marginBottom: 0 }}>
              OA审批流程设计
            </p>
          </Space>
          <Space>
            <Button
              shape="round"
              style={{
                minWidth: '32px',
                fontSize: '14px',
                lineHeight: '1.5715',
                borderRadius: '32px',
              }}
              ghost
            >
              {' '}
              预览{' '}
            </Button>
            <Button
              type="primary"
              shape="round"
              style={{
                minWidth: '32px',
                fontSize: '14px',
                lineHeight: '1.5715',
                borderRadius: '32px',
              }}
            >
              {' '}
              导出JSON{' '}
            </Button>
          </Space>
        </Header>
        <Content style={{ height: 'calc(100vh - 64px)' }}>
          <Tabs
            defaultActiveKey="baseSetting"
            tabBarStyle={{ background: '#fff', marginBottom: 0 }}
            centered
          >
            <TabPane tab="基础设置" key="baseSetting">
              <BaseSetting
                item={detail}
                onUpdateChange={this.onUpdateBaseSetting}
              />
            </TabPane>
            <TabPane tab="表单设计" key="form">
              <FormDesign
                content={content}
                controlTree={control}
                onUpdateContent={this.onUpdateContent}
              />
            </TabPane>
            <TabPane tab="流程设计" key="process">
              <Result
                status="403"
                title="待开发"
                subTitle="抱歉，该功能正在努力研发中"
              />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}

export default ControlForm;
