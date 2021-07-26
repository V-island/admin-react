import { message } from 'antd';
import {
  getTemplate,
  getContent,
  postTemplate,
  getControlList,
  getProcessDetail,
} from '../services/template';

// 格式化初始数据
const getFormData = (option, data) => {
  if (Object.keys(option).length == 0) return {};
  const props = option.props || {};
  const child = option.child || [];

  if ('name' in props) data[props.name] = props.value;

  if ('content' in props && Object.keys(props.content).length > 0)
    getFormData(props.content, data);

  if (child.length > 0)
    child.forEach((item) => {
      getFormData(item, data);
    });

  return data;
};

// 格式话提交模版数据
const postFormData = (list, data) => {
  if (Object.keys(data).length == 0) return list;
  const props = list.props || {};
  const child = list.child || [];

  if ('name' in props) list.props.value = data[props.name];

  if ('content' in props && Object.keys(props.content).length > 0)
    list.props.content = postFormData(props.content, data);

  if (child.length > 0)
    list.child = child.map((item) => {
      return postFormData(item, data);
    });

  return list;
};

// 格式化模板数据
const getTemplateList = (name, list, option) => {
  const props = list.props || {};
  const child = list.child || [];

  if ('name' in props && props.name == name) list.props.content = option;
  else if ('content' in props && Object.keys(props.content).length > 0)
    list.props.content = getTemplateList(name, props.content, option);

  if (child.length > 0)
    list.child = child.map((item) => {
      return getTemplateList(name, item, option);
    });

  return list;
};

const Template = {
  namespace: 'template',
  state: {
    data: {}, // 表单对象数据
    list: {}, // 业务模版数据
    control: [], // 控件列表
    processDetail: {}, // 渲染详情
  },
  effects: {
    *getTemplate({ payload }, { call, put }) {
      const response = yield call(getTemplate, payload);
      yield put({
        type: 'saveTemplate',
        payload: response.data || {},
      });
      yield put({
        type: 'saveData',
        payload: getFormData(response.data || {}, {}),
      });
    },
    *getContent({ payload }, { call, put }) {
      const { name, value } = payload;
      const response = yield call(getContent, payload);
      yield put({
        type: 'updateTemplate',
        payload: {
          name,
          list: response.data || {},
          data: { [name]: value },
        },
      });
    },
    *postTemplate({ payload }, { call, put }) {
      const response = yield call(postTemplate, {
        ...payload,
        template: postFormData(payload.template, payload.data),
      });

      if (response.code === 1) {
        message.success('提交成功');
        yield put({ type: 'getAccount' });
      }
    },
    *getControlList({ payload }, { call, put }) {
      const response = yield call(getControlList, payload);
      yield put({
        type: 'saveControlList',
        payload: response.data || [],
      });
    },
    *getProcessDetail({ payload, callBack }, { call, put }) {
      const response = yield call(getProcessDetail, payload);
      yield put({
        type: 'saveProcessDetail',
        payload: response.data || [],
      });
      if (response.code === 1) {
        if (callBack) callBack(response.data);
      }
    },
  },
  reducers: {
    // 保存业务模版数据
    saveTemplate(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    // 更新业务模版数据
    updateTemplate(state, { payload }) {
      const { name, list, data } = payload;
      const _list = getTemplateList(name, state.list, list);
      const _data = getFormData(list, data);

      if (Object.keys(list).length > 0)
        return {
          ...state,
          data: { ...state.data, ..._data },
          list: { ..._list },
        };
    },
    // 保存表单对象数据
    saveData(state, { payload }) {
      return {
        ...state,
        data: { ...payload },
      };
    },
    // 保存控件列表
    saveControlList(state, { payload }) {
      const list = [
        { id: 'layout-control', title: '布局控件', children: [] },
        { id: 'base-control', title: '基础控件', children: [] },
        { id: 'enhance-control', title: '增强控件', children: [] },
      ];

      payload.forEach((item) => {
        list[item.type - 1].children.push(item);
      });

      return {
        ...state,
        control: list,
      };
    },
  },
};

export default Template;
