import React, { Component } from 'react';
import { Layout, Tabs, Button, Drawer, Result } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styled from 'styled-components';
import { funDownload } from '@/utils/utils';
import FormTemplate from '@/components/formTemplate';
import BaseSetting from './baseSetting';
import FormDesign from './formDesign';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MainContent = styled.div`
  height: calc(100vh - 64px);
`;
const HeaderTitle = styled.p`
  color: #fff;
  font-size: 16px;
  margin-bottom: 0;
`;
const SpaceBox = styled.div`
  color: #fff;
  display: flex;
  align-items: center;

  > * {
    margin: 0 8px;
  }
`;

@connect(({ template }) => ({
  template,
}))
class OADesigner extends Component {
  state = {
    detail: {},
    content: [],
    previewConfig: {
      title: '表单预览',
      placement: 'right',
      width: '80vw',
      bodyStyle: {
        paddingBottom: 80,
      },
      onClose: () => {
        const config = { ...this.state.previewConfig };
        const newConfig = {
          ...config,
          visible: false,
        };
        this.setState({
          previewConfig: newConfig,
        });
      },
      visible: false,
    },
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
    this.setState({
      content: schemas,
    });
  };

  onPreviewEvent = () => {
    const config = { ...this.state.previewConfig };
    const newConfig = {
      ...config,
      visible: true,
    };
    this.setState({
      previewConfig: newConfig,
    });
  };

  exportJson = () => {
    const { dataSource } = this.state;

    funDownload(JSON.stringify({ code: 1, data: dataSource }), 'control.json');
  };

  render() {
    const {
      template: { control },
    } = this.props;
    const { content, detail, previewConfig } = this.state;

    return (
      <Layout>
        <Header>
          <HeaderContent>
            <SpaceBox>
              <Button
                shape="circle"
                icon={<LeftOutlined />}
                onClick={() => history.goBack()}
                ghost
              />
              <HeaderTitle>OA审批流程设计</HeaderTitle>
            </SpaceBox>
            <SpaceBox>
              <Button shape="round" onClick={() => this.onPreviewEvent()} ghost>
                预览
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => this.exportJson()}
              >
                导出JSON
              </Button>
            </SpaceBox>
          </HeaderContent>
        </Header>
        <Content>
          <MainContent>
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
          </MainContent>
          <Drawer {...previewConfig}>
            <FormTemplate />
          </Drawer>
        </Content>
      </Layout>
    );
  }
}

export default OADesigner;
