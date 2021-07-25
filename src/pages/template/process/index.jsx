import React, { Component } from 'react';
import { history } from 'umi';
import { Button, Table, Tag, Space } from 'antd';
import request from '@/utils/request';

const { Column } = Table;

class Logic extends Component {
  state = {
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 50,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  addProcess = () => {
    history.push('/template/process/oaDesigner');
  };

  editProcess = (row) => {
    history.push(`/template/process/oaDesigner?processCode=${row.id}`);
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
    const response = request('/GoTemplate/processList.json', params);

    response.then((results) => {
      this.setState({
        loading: false,
        dataSource: results.data,
        pagination: {
          ...params.pagination,
          total: 1,
        },
      });
    });
  };

  render() {
    const { dataSource, pagination, loading } = this.state;

    return (
      <>
        <Space>
          <Button
            type="primary"
            style={{ marginBottom: '20px', minWidth: '80px', fontSize: '14px' }}
            onClick={this.addProcess}
          >
            添加流程
          </Button>
        </Space>
        <Table
          rowKey={(record) => record.id}
          dataSource={dataSource}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        >
          <Column title="名称" dataIndex="flowTitle" />
          <Column title="表单说明" dataIndex="description" />
          <Column
            title="所在分组"
            dataIndex="dirName"
            render={(text) => {
              let dom = null;
              switch (text) {
                case 1:
                  dom = <Tag color="magenta">账户认证</Tag>;
                  break;
                case 2:
                  dom = <Tag color="orange">提现/汇款</Tag>;
                  break;
                default:
                  dom = <Tag color="blue">其它</Tag>;
                  break;
              }
              return dom;
            }}
          />
          <Column title="可见范围" dataIndex="visible" />
          <Column title="最后更新" dataIndex="update" />
          <Column
            title="操作"
            dataIndex="options"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => this.editProcess(record)}>编辑</a>
              </Space>
            )}
          />
        </Table>
      </>
    );
  }
}

export default Logic;
