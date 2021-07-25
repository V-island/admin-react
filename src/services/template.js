import request from '@/utils/request';

// 获取模版
export async function getTemplate(params) {
  return request(`/GoTemplate/template.json`);
}

// 动态获取模版
export async function getContent(params) {
  const apiUrl =
    params.value == 1
      ? '/GoTemplate/templateItem1.json'
      : '/GoTemplate/templateItem2.json';
  return request(apiUrl, params);
}

// 保存模版
export async function postTemplate(params) {
  return request(`/GoTemplate/template.json`, params);
}

// 获取控件列表
export async function getControlList(params) {
  return request(`/GoTemplate/control.json`);
}

// 获取流程详情
export async function getProcessDetail(params) {
  return request(`/GoTemplate/processDetail.json`);
}
