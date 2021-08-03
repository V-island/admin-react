import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import DisplayBookingForm from '../../components/DisplayBookingForm/DisplayBookingForm';
import {
  dateFormat,
  timeFormat,
} from '../../components/FieldFormats/FieldFormats';
import moment from 'moment';

const initialValues = {
  bookingClient: '',
  bookingDate: moment(Date.now()),
  bookingTime: moment(Date.now()),
  selectOptions: ['Mark', 'Bob', 'Anthony'],
};

export default class BookingForm extends PureComponent {
  handleSubmit = (formProps) => {
    const { bookingClient, bookingDate, bookingTime, email } = formProps;
    const selectedDate = moment(bookingDate).format(dateFormat);
    const selectedTime = moment(bookingTime).format(timeFormat);
    alert(
      `Email: ${email} \nSelected Date: ${selectedDate} \nSelected Time: ${selectedTime}\nSelected Client: ${bookingClient}`,
    );
  };

  render = () => (
    <Formik
      initialValues={initialValues}
      onSubmit={this.handleSubmit}
      render={DisplayBookingForm}
    />
  );
}
