import React, { Component } from 'react';
import { Button, Table, Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import request from '@/utils/request';
import { uuid, funDownload } from '@/utils/utils';
import ControlForm from './form';

const { Column } = Table;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin: 0 10px 10px 0;
  }
`;

const OperateSpace = styled(Toolbar)`
  > * {
    margin: 0 8px;
  }
`;

class Control extends Component {
  state = {
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 50,
    },
    loading: false,
    formConfig: {
      title: '',
      show: false,
      isEdit: false,
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
        isEdit: false,
      },
      formObj: {
        name: '',
        type: undefined,
        default: true,
        identifier: '',
        properties: [],
        props: {},
      },
    });
  };

  editControl = (row) => {
    this.setState({
      formConfig: {
        title: '编辑控件',
        show: true,
        isEdit: true,
      },
      formObj: row,
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

  refreshControl = (row, edit) => {
    const newData = [...this.state.dataSource];

    if (edit) {
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({
        dataSource: newData,
      });
    } else {
      row.id = `${row.componentName}_${uuid()}`;
      this.setState({
        dataSource: [...newData, row],
      });
    }
  };

  exportJson = () => {
    const { dataSource } = this.state;

    funDownload(JSON.stringify({ code: 1, data: dataSource }), 'control.json');
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
        dataSource: results.data,
        pagination: {
          ...params.pagination,
          total: 20,
        },
      });
    });
  };

  render() {
    const { formConfig, formObj, dataSource, pagination, loading } = this.state;

    return (
      <Container>
        <Toolbar>
          <Button type="primary" onClick={this.addControl}>
            添加控件
          </Button>
          <Button onClick={this.exportJson}>导出JSON</Button>
        </Toolbar>
        <Table
          rowKey={(record) => record.id}
          dataSource={dataSource}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        >
          <Column title="名称" dataIndex="title" />
          <Column title="标签名" dataIndex="componentName" />
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
              <OperateSpace>
                <a onClick={() => this.editControl(record)}>编辑</a>
              </OperateSpace>
            )}
          />
        </Table>
        <ControlForm
          config={formConfig}
          values={formObj}
          onClose={this.closeControl}
          onFinish={this.refreshControl}
        />
      </Container>
    );
  }
}

export default Control;
