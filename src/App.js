import React, { Component } from 'react';
import EventCalendar from './EventCalendar';
import OnlineFormBuilder from './OnlineForm';
import AppointmentCaldendar from './AppointmentCalendar';
import { availability_fields } from './AppointmentCalendar/mockdata';

export default class App extends Component {
  state = {
    month: 10,
    year: 2018
  };
  render() {
    return (
      <div>
        {/* <OnlineFormBuilder />
        <br />
        <h1 className="header">
          Event Calendar
        </h1>
        <EventCalendar /> */}
        <AppointmentCaldendar
          availability_field_data={availability_fields}
          selected_location="123"
        />
      </div>
    );
  }
}
