import { Row, Col, Divider } from 'antd';
import styled from 'styled-components';

// 栅格化系统-Row
const GridRow = (props) => {
  return <Row {...props}>{props.children}</Row>;
};

// 栅格化系统-Col
const GridCol = (props) => {
  return <Col {...props}>{props.children}</Col>;
};

// 分割线
const LayoutDivider = (props) => {
  return <Divider {...props}>{props.children}</Divider>;
};

// 间距
const LayoutSpace = (props) => {
  const SpaceContainer = styled.div`
    width: 100%;
    height: 100%;
    & > * {
      margin: 8px 0;
    }
  `;
  return <SpaceContainer {...props}>{props.children}</SpaceContainer>;
};

export default {
  GridRow,
  GridCol,
  LayoutDivider,
  LayoutSpace,
};
