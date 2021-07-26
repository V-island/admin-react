import React, { Component } from 'react';
import { Button, Table, Switch, Tag, Space } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import { uuid } from '@/utils/utils';
import ControlForm from './form';

const { Column } = Table;

class Kit extends Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    formConfig: {
      title: '',
      show: false,
    },
    formObj: {},
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  addControl = () => {
    this.setState({
      formConfig: {
        title: '添加控件',
        show: true,
      },
      formObj: {
        name: '',
        type: undefined,
        default: true,
        identifier: '',
        properties: [],
      },
    });
  };

  editControl = (item) => {
    this.setState({
      formConfig: {
        title: '编辑控件',
        show: true,
      },
      formObj: item,
    });
  };

  closeControl = () => {
    this.setState({
      formConfig: {
        title: '',
        show: false,
      },
    });
  };

  refreshControl = (item) => {
    this.setState({ loading: true });
    const data = [...this.state.data];

    data.push({
      id: uuid(),
      ...item,
    });

    this.setState({
      loading: false,
      data: data,
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    const response = request('/GoTemplate/control.json', params);

    response.then((results) => {
      this.setState({
        loading: false,
        data: results.data,
        pagination: {
          ...params.pagination,
          total: 10,
        },
      });
    });
  };

  render() {
    const { formConfig, formObj, data, pagination, loading } = this.state;

    return (
      <>
        <Button
          type="primary"
          style={{ marginBottom: '20px', minWidth: '80px', fontSize: '14px' }}
          onClick={this.addControl}
        >
          添加套件
        </Button>
        <Table
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        >
          <Column title="名称" dataIndex="name" />
          <Column title="标签名" dataIndex="identifier" />
          <Column
            title="类型"
            dataIndex="type"
            render={(text) => {
              let dom = null;
              switch (text) {
                case 1:
                  dom = <Tag color="magenta">布局控件</Tag>;
                  break;
                case 2:
                  dom = <Tag color="orange">基础控件</Tag>;
                  break;
                default:
                  dom = <Tag color="blue">增强控件</Tag>;
                  break;
              }
              return dom;
            }}
          />
          <Column
            title="是否默认标签"
            dataIndex="default"
            render={(text) => (
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={text}
                disabled
              />
            )}
          />
          <Column
            title="操作"
            dataIndex="options"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => this.editControl(record)}>编辑</a>
              </Space>
            )}
          />
        </Table>
        <ControlForm
          config={formConfig}
          values={formObj}
          onClose={this.closeControl}
          onFinish={this.refreshControl}
        />
      </>
    );
  }
}

export default Kit;
