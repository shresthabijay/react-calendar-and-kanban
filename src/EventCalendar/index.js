import React, { Component } from 'react'
import Moment from "moment"
import {extendMoment} from "moment-range"
import {monthNames,dayNames,dateRangeForMonth,weekRange,findFirstSunday} from "./date"

let moment=extendMoment(Moment)


class DayCard extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       showAddEvent:false
    }
  }
  
  onMouseEnter=()=>{
    this.setState({showAddEvent:true})
  }

  onMouseLeave=()=>{
    this.setState({showAddEvent:false})
  }

  render(){
    return(
      <div className={`day ${this.props.disabled && "disabled"} ${this.props.className && this.props.className}`} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
              <div className="day-top">
                <span className={`date ${this.props.isCurrent && "current"} round-border6`}>{this.props.date}</span>
                {this.state.showAddEvent && 
                  <div className="add-logo">
                    <i class="fas fa-plus"></i>
                  </div>
                }
              </div>
              <div className="day-bottom">
              
              </div>
      </div>
    )
  }
}


export default class EventCalendar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       date:moment(),
       view:{type:"month"}
    }
  }
  
  onBack=()=>{
    switch(this.state.view.type){
      case"month":
        this.setState({date:this.state.date.clone().subtract(1,"months")})
        break; 
      case"week":
        this.setState({date:this.state.date.clone().subtract(7,"days")})
        break;
      case"day":
        this.setState({date:this.state.date.clone().subtract(1,"days")})
        break;
    }
  }

  onNext=()=>{
    switch(this.state.view.type){
      case"month":
        this.setState({date:this.state.date.clone().add(1,"months")})
        break;
      case"week":
        this.setState({date:this.state.date.clone().add(7,"days")})
        break
      case"day":
        this.setState({date:this.state.date.clone().add(1,"days")})
        break
    }
  }

  onTodayClick=()=>{
    switch(this.state.view.type){
      case"month":
        this.setState({date:moment()})
        break;
      case"week":
        this.setState({date:moment().day(0)})
        break;
      case"day":
        this.setState({date:moment()})
        break;
    }
  }

  onViewSelection=(e)=>{

    switch(e.target.id){
      case"month":
        this.setState({view:{type:e.target.id}})
        break;
      case"week":
        this.setState({date:findFirstSunday(this.state.date),view:{type:e.target.id,number:parseInt(e.target.getAttribute("data"))}})
        break;
      case"day":
        this.setState({view:{type:e.target.id,number:parseInt(e.target.getAttribute("data"))}})
        break;
    }


  }

  render() {

    console.log(this.state)

    let viewbardata=null
    let dates=null
    let calendarStyle=null
    let dayCards=null
    let dayNamesArr=dayNames.map(d=>d)

    if(this.state.view.type==="month"){
      viewbardata=`${monthNames[this.state.date.month()]} ${this.state.date.year()}` 
      dates=dateRangeForMonth(this.state.date)
      calendarStyle={gridTemplateColumns:"repeat(7,1fr)"}
      dayCards=dates.map(date=>{
        let isDisabled=date.clone().month()!==this.state.date.clone().month()
        let isCurrent=date.isSame(moment(),"date")
        return(<DayCard key={date.toString()} disabled={isDisabled} isCurrent={isCurrent} date={date.date()}/>)
      })
    }

    if(this.state.view.type==="week"){
      dates=weekRange(this.state.date.clone().day(0),this.state.view.number)
      let startingDate=dates[0]
      let endDate=dates[dates.length-1]
      let startingMonth=monthNames[parseInt(startingDate.month())].substring(0,3)
      let endMonth=monthNames[parseInt(endDate.month())].substring(0,3)
      calendarStyle={gridTemplateColumns:"repeat(7,1fr)"}
      viewbardata=`${startingMonth} ${startingDate.date()} - ${endMonth} ${endDate.date()}, ${endDate.year()}` 
      dayCards=dayCards=dates.map(date=>{
        let isCurrent=date.isSame(moment(),"date")
        return(<DayCard key={date.toString()} isCurrent={isCurrent} date={date.date()}/>)
      })
    }

    if(this.state.view.type==="day"){
      dates=Array.from(moment.range(this.state.date.clone(),this.state.date.clone().add(this.state.view.number-1,"days")).by("days"))
      let startingDate=dates[0]
      let endDate=dates[dates.length-1]
      let startingMonth=monthNames[parseInt(startingDate.month())].substring(0,3)
      let endMonth=monthNames[parseInt(endDate.month())].substring(0,3)
      calendarStyle={gridTemplateColumns:`repeat(${this.state.view.number},1fr)`}
      dayNamesArr=[]

      for(let i in dates){
        dayNamesArr.push(dayNames[parseInt(dates[i].day().toString())].substring(0,3))
      }

      viewbardata=dates.length!==1?`${startingMonth} ${startingDate.date()} - ${endMonth} ${endDate.date()}, ${endDate.year()}`: `${startingMonth} ${startingDate.date()}, ${endDate.year()}` 

      dayCards=dayCards=dates.map(date=>{
        let isCurrent=date.isSame(moment(),"date")
        return(<DayCard key={date.toString()} isCurrent={isCurrent} date={date.date()}/>)
      })
    }

    return (
      <div className="main tealShade">
        <div className="calendar-body">
         <div className="viewbar">
          <div className="today-button round-border6" onClick={this.onTodayClick}>Today</div>
          <div className="current-view-time">
            <i className="fas fa-angle-left" onClick={this.onBack}></i>
            <i className="fas fa-angle-right" onClick={this.onNext}></i>
            <span className="unselectable">{viewbardata}</span>
          </div>
          <div className="view-selection">
            <div className={`view-button ${this.state.view.type==="month" && "active"}`} id="month" onClick={this.onViewSelection}>Month</div>
            <div className={`view-button ${this.state.view.type==="week" && this.state.view.number===2 && "active"}`}   id="week" data="2" onClick={this.onViewSelection}>2 Week</div>
            <div className={`view-button ${this.state.view.type==="week" && this.state.view.number===1 && "active"}`}  id="week" data="1" onClick={this.onViewSelection}>Week</div>
            <div className={`view-button ${this.state.view.type==="day" && this.state.view.number===3 && "active"}`}  id="day" data="3" onClick={this.onViewSelection}>3 Day</div>
            <div className={`view-button ${this.state.view.type==="day" && this.state.view.number===1 && "active"}`}  id="day" data="1" onClick={this.onViewSelection}>Day</div>
          </div>
         </div>
         <div className="top" style={calendarStyle}>
          {dayNamesArr.map(name=>{
            return <div className="day-names">{name.substring(0,3)}</div>
          })}
         </div>
         <div className="bottom" style={calendarStyle}>
            {dayCards}
         </div>
         
        </div>
      </div>
    )
  }
}
