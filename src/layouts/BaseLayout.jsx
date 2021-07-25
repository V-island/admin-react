import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import styles from './BaseLayout.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class layout extends Component {
  currentRoute = {};
  parentRoute = {};

  parseRoute = (targetRoutes, targetParent) => {
    for (let i in targetRoutes) {
      const targetRoute = targetRoutes[i];
      const regExp = new RegExp(
        `^${(targetRoute.path || '').replace(
          /:[a-zA-Z0-9_-]+/g,
          '[a-zA-Z0-9_-]+',
        )}$`,
      );
      if (regExp.test(location.pathname)) {
        this.currentRoute = targetRoute;
        this.parentRoute = targetParent;
        return;
      }
      if (targetRoute.routes) this.parseRoute(targetRoute.routes, targetRoute);
    }
  };

  render() {
    const {
      children,
      route: { routes },
    } = this.props;

    this.parseRoute(routes, {});

    return (
      <>
        {!this.currentRoute.hideInMenu ? (
          <Layout>
            <Sider breakpoint="sm" collapsedWidth="80">
              <div className={styles.logo}>GoGo 实验室</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <SubMenu
                  key="template"
                  icon={<AppstoreAddOutlined />}
                  title="动态表单"
                >
                  <Menu.Item key="control">
                    <Link to="/template/control">控件列表</Link>
                  </Menu.Item>
                  <Menu.Item key="kit">
                    <Link to="/template/kit">套件列表</Link>
                  </Menu.Item>
                  <Menu.Item key="process">
                    <Link to="/template/process">流程场景</Link>
                  </Menu.Item>
                  <Menu.Item key="preview">
                    <Link to="/template/preview">表单预览</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              />
              <Content
                style={{
                  minHeight: 'calc(100vh - 64px - 70px)',
                  padding: '24px 16px 0',
                }}
              >
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  {children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Pay Test ©2021 Created by GoGo Allen Li
              </Footer>
            </Layout>
          </Layout>
        ) : (
          children
        )}
      </>
    );
  }
}

export default layout;
