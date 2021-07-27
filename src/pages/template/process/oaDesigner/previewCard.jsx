import React from 'react';
import { Typography, Space, Button, Empty } from 'antd';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ControlCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 38px;
  background: #fff;
  border-left: 3px solid #fff;
  transition: 0.3s all ease;

  &[data-active='true'] {
    border-left: 3px solid #0089ff;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
  }
  &:hover {
    border-left: 3px solid #bfc1c2;
    box-shadow: 0 1px 10px 0 rgb(226 226 226 / 50%);
    cursor: grab;
  }
`;

const ContainerCard = styled(ControlCard)`
  border: 1px dashed #ccc;
  border-left-width: 3px;
`;

const ChildrenContainer = styled.div`
  border: 1px dashed #ccc;
  background: ${(props) => props.isEmpty} ? #ddeff3 : #fff;
  padding: ${(props) => props.isEmpty} ? 20px : 10px 0;
  color: #aaa;
`;

const Content = styled.div`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.3;
  background: #fff;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: none;
  padding: 4px 8px;
  background: rgba(17, 31, 44, 0.04);
  border-radius: 16px;

  ${ControlCard}[data-active='true'] & {
    display: block;
  }
`;

const PreviewCard = (props) => {
  return <ControlCard>{props.title}</ControlCard>;
};

export default PreviewCard;
