import React, { Component } from 'react';
import { Typography, Space, Button, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Styles from './style.less';

const { Title, Text } = Typography;

class AppHelper extends Component {
  layoutSchemas = (schemas) => {
    if (schemas.length == 0) return null;

    return schemas.map((item) => {
      switch (item.type) {
        case 1:
          return this.layoutContainer(item);
        default:
          return this.controlContainer(item);
      }
    });
  };

  layoutContainer = (item) => {
    const { activeItem, onUpdateActive } = this.props;
    const { props } = item;
    console.log(item);
    return (
      <div
        key={props.id}
        className={Styles.layout_card}
        style={{ border: '1px dashed #ccc' }}
        data-active={props.id == activeItem.props.id}
        onClick={() => onUpdateActive(item)}
      >
        <div className={Styles.layout_group}>
          <Title level={5}>{props.label || '分栏'}</Title>
          <div>
            {'children' in item ? (
              this.layoutSchemas(item.children)
            ) : (
              <Empty
                style={{ margin: 'auto' }}
                description="选中容器，可添加多个组件"
              />
            )}
          </div>
        </div>
        <div className={Styles.btn_group}>{this.operateTool(item)}</div>
      </div>
    );
  };

  controlContainer = (item) => {
    const { activeItem, onUpdateActive } = this.props;
    const { props } = item;

    return (
      <div
        key={props.id}
        className={Styles.layout_card}
        data-active={props.id == activeItem.props.id}
        onClick={() => onUpdateActive(item)}
      >
        <div className={Styles.layout_group}>
          <Title level={5}>{props.label}</Title>
          <Text>{props.placeholder}</Text>
        </div>
        <div className={Styles.btn_group}>{this.operateTool(item)}</div>
      </div>
    );
  };
  operateTool = (item) => {
    return (
      <Space>
        <Button
          type="link"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => this.removeContainer(item)}
          style={{
            height: '24px',
            padding: '0px 7px',
            fontSize: '14px',
            minWidth: 'initial',
          }}
        />
      </Space>
    );
  };

  removeContainer = (item) => {};

  render() {
    const { schemas } = this.props;
    console.log(schemas);
    return (
      <div style={{ padding: '20px' }}>
        <Space direction="vertical" style={{ width: '600px', margin: 'auto' }}>
          {this.layoutSchemas(schemas)}
        </Space>
      </div>
    );
  }
}

export default AppHelper;
