import { message } from 'antd';

const errorMsgCode = (data) => {
  if (data.code >= 1011015 && data.code <= 1011018) {
    // message.error('登陆已失效');
    window.location.href = '/auth';
  } else if (data.code !== 1011023) {
    message.error(data.msg);
  }
};

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16);
};

const funDownload = (content, filename) => {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

export { errorMsgCode, uuid, funDownload };
