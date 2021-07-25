import React, { Component } from 'react';
import { Typography, Space, Button, Empty } from 'antd';
import PropertyLibrary from './PropertyLibrary';
import AppHelper from './appHelper';
import Styles from './style.less';

const { Text } = Typography;

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16);
};

class form extends Component {
  state = {
    activeItem: {},
    schemasMap: [],
    schemas: [],
  };

  selectControl = (item) => {
    const newSchemas = [...this.state.schemas];
    const { componentName, type, props } = item;
    const activeItem = {
      type,
      componentName,
      props: {
        ...props,
        id: `${componentName}_${uuid()}`,
      },
    };

    if (this.state.activeItem.type == 1) {
      const newActive = { ...this.state.activeItem };
      const index = newSchemas.findIndex(
        (_item) => newActive.props.id === _item.props.id,
      );

      if ('children' in newActive) newActive.children.push(activeItem);
      else newActive.children = [activeItem];

      newSchemas.splice(index, 1, {
        ...newActive,
      });

      this.setState({
        activeItem: newActive,
        schemas: newSchemas,
      });
    } else {
      newSchemas.push(activeItem);
      this.setState({
        activeItem: activeItem,
        schemas: newSchemas,
      });
    }
  };

  onUpdateProperty = (_, values) => {
    const newItem = { ...this.state.activeItem };
    newItem.props = {
      ...newItem.props,
      ...values,
    };
    this.setState({
      activeItem: newItem,
    });
  };

  onUpdateActive = (values) => {
    this.setState({
      activeItem: values,
    });
  };

  onUpdateSchemas = (item) => {
    console.log(item);
  };

  render() {
    const { controlTree } = this.props;
    const { activeItem, schemas } = this.state;

    return (
      <div className={Styles.form_wrapper}>
        <div className={Styles.form_side}>
          <Space direction="vertical">
            {controlTree.map((item, index) => (
              <Space key={index} direction="vertical">
                <Text>{item.name}</Text>
                <Space size={[8, 16]} wrap>
                  {item.children.map((_item) => (
                    <Button
                      key={_item.id}
                      className={Styles.btn_control}
                      onClick={() => {
                        this.selectControl(_item);
                      }}
                    >
                      {_item.title}
                    </Button>
                  ))}
                </Space>
              </Space>
            ))}
          </Space>
        </div>
        <div className={Styles.form_content}>
          {schemas.length > 0 ? (
            <AppHelper
              schemas={schemas}
              activeItem={activeItem}
              onUpdateActive={this.onUpdateActive}
              onUpdateSchemas={this.onUpdateSchemas}
            />
          ) : (
            <Empty style={{ margin: 'auto' }} description="点击添加控件" />
          )}
        </div>
        <div className={Styles.form_right}>
          {Object.keys(activeItem).length == 0 || (
            <PropertyLibrary
              control={activeItem}
              onUpdateSelect={this.onUpdateProperty}
            />
          )}
        </div>
      </div>
    );
  }
}

export default form;
