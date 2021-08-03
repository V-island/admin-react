import React, { createElement } from 'react';
import ColumnLayout from './ColumnLayout';
import TextField from './TextField';
import TextareaField from './TextareaField';
import NumberField from './NumberField';
import SelectField from './SelectField';
import MultiSelectField from './MultiSelectField';
import DateField from './DateField';
import DateRangeField from './DateRangeField';
import TextNote from './TextNote';
import PhotoField from './PhotoField';
import Attachment from './Attachment';
import AddressField from './AddressField';

const UserComponent = {
  // 布局控件
  ColumnLayout: ColumnLayout,

  // 基础控件
  TextField,
  TextareaField,
  NumberField,
  SelectField,
  MultiSelectField,
  DateField,
  DateRangeField,
  TextNote,

  // 增强控件
  PhotoField,
  Attachment,
  AddressField,
};

const PropertyLibrary = ({ activeKey, schemaMap, onUpdateSelect }) => {
  if (!activeKey) return null;

  const control = schemaMap[activeKey];
  const Card = UserComponent[control.componentName];

  if (!control) return null;

  return <Card control={control} onUpdateSelect={onUpdateSelect} />;
};

export default PropertyLibrary;
