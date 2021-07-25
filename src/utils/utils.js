import { message } from 'antd';

const errorMsgCode = (data) => {
  if (data.code >= 1011015 && data.code <= 1011018) {
    // message.error('登陆已失效');
    window.location.href = '/auth';
  } else if (data.code !== 1011023) {
    message.error(data.msg);
  }
};

export { errorMsgCode };
