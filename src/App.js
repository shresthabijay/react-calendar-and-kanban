import React, { Component } from 'react'
import EventCalendar from "./EventCalendar"

export default class App extends Component {

   
  render() {


    return (
      <div>
        <h1 className="header">
           Event Calendar
        </h1>
        <EventCalendar/>
      </div>
    )
  }
}
