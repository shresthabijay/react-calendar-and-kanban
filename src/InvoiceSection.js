import React, { Component } from 'react'

let invoiceData={
  "job": 1234,
  "customer": "John Smith Consulting",
  "date": "11/11/2019",
  "timesheets": [
      {
          "id":1,
          "duration": 1.5,
          "description": "Hello",
          "date": "1/1/2019",
      },
      {
          "id":2,
          "duration": 5,
          "description": "Hello 2",
          "date": "2/1/2019"
      }
  ]
}

class RadioButtons extends Component{

  state={
      ignore:false,
      invoice:false,
      writeoff:false
  }

  

  onChange=(e)=>{
    let obj={ignore:false,invoice:false,writeoff:false}
    obj[e.target.value]=true
    this.props.onSelect(this.props.timesheetID,e.target.value)
    this.setState({...obj})
  }

  render(){
    
    return(
        <ul onChange={this.onChange} key={this.props.timesheetID}>
            <li>
              <label>
                <input
                  type="radio"
                  value={"ignore"}
                  checked={this.state.ignore}
                  onChange={()=>{}}
                />
                Ignore
              </label>
            </li>
            
            <li>
              <label>
                <input
                  type="radio"
                  value={"invoice"}
                  checked={this.state.invoice}
                  onChange={()=>{}}
                />
                Invoice
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value={"writeoff"}
                  checked={this.state.writeoff}
                  onChange={()=>{}}
                />
                Write Off
              </label>
            </li>
          </ul>
    )
  }
}

export default class InvoiceSection extends Component {

  state={
    invoiceData:invoiceData
  }

  onSelect=(timesheetID,action)=>{
    for(let x in this.state.invoiceData.timesheets){
      if(this.state.invoiceData.timesheets[x].id===timesheetID){
        let updatedTimesheets=[...this.state.invoiceData.timesheets]
        updatedTimesheets[x]={...this.state.invoiceData.timesheets[x],action:action}
        this.setState({invoiceData:{...this.state.invoiceData,timesheets:updatedTimesheets}})
      }
    }
  }

  render() {



    let tableRows=invoiceData.timesheets.map(data=>{
      return (
        <tbody key={data.id}>
          <tr> 
            <td>{invoiceData.job}</td>          
            <td>{invoiceData.customer}</td>          
            <td>{data.date}</td>          
            <td>{data.description}</td>          
            <td>{data.duration}</td>          
            <td><RadioButtons timesheetID={data.id} onSelect={this.onSelect}/></td>          
          </tr>
        </tbody>
      )
    })

    return (
      <div id="invoice-section" >
        <table 
          style={{
              width:"100%"
          }}
        >
         <tbody>
          <tr>
              <th>Job</th>
              <th>Customer</th> 
              <th>Date</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </tbody>
         {
           tableRows
         }
        </table>
        <div>
            <div className="submit-button">
                Submit Request
            </div>
        </div>

      </div>
    )
  }
}
