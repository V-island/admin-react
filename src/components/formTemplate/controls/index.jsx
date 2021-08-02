import { Button, Row, Col } from 'antd';

// User Components
import BasicControl from './BasicControl';
import PhotoField from './PhotoField';
import Attachment from './Attachment';
import AddressField from './AddressField';

export default {
  // 通用
  GoButton: Button,

  // 布局控件
  // ColumnLayout,
  // GoRow: Row,
  // GoCol: Col,

  // 基础控件
  ...BasicControl,

  // 增强控件
  PhotoField,
  Attachment,
  AddressField,
};
