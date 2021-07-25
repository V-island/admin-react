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

const components = {
  // 布局控件
  GoColumnLayout: ColumnLayout,

  // 基础控件
  GoTextField: TextField,
  GoTextareaField: TextareaField,
  GoNumberField: NumberField,
  GoSelectField: SelectField,
  GoMultiSelectField: MultiSelectField,
  GoDateField: DateField,
  GoDateRangeField: DateRangeField,
  GoTextNote: TextNote,

  // 增强控件
  GoPhotoField: PhotoField,
  GoAttachment: Attachment,
  GoAddressField: AddressField,
};

const PropertyLibrary = (props) => {
  const { control } = props;

  return createElement(components[control.componentName], props);
};

export default PropertyLibrary;
