import React,{Component} from 'react';
import './TodoApp.css';
import tachyons from 'tachyons';
// import {CollapsibleComponent, CollapsibleHead,CollapsibleContent } from "react-collapsible-component";
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';
import {Auth} from 'aws-amplify';

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} 
              removeItem={this.props.removeItem} 
              markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.state={
    	done:false
    }
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
    this.setState({done:!this.state.done})
  }


  render () {
  	var x=moment(this.props.item.date, 'YYYY-MM-DD');
  	var y=x.format('DD-MM-YYYY'); 
    
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <div>
     
        <div className="reminder-tasks">
        	<span className="" onClick={this.onClickDone}></span>
        	<li className="list-group-item reminder-items">
        	<div className="list-item delete-button ma2 pa1" style={{float:"right",cursor:"pointer"}} onClick={this.onClickClose}>✕</div>
        	<div className="bg-gold white ma2 pa1" style={{float:"right"}}>{y}</div>
        		<div className={todoClass+" noselect"+" glyphicon fa fa-check icon list-item"} onClick={this.onClickDone}>
        			<h6 id={this.props.index} style={{marginLeft:"10px"}}>{this.props.item.value}</h6>
        		</div>
        		<br/>
        			{!this.state.done && <em>To be done {moment(new Date(this.props.item.date)).fromNow()}</em>}
        			{this.state.done && <em>Done</em>}
			</li>
		</div>
		</div>
         
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
       minDate:this.getToday(new Date()),
       errorMessage:''
    }
  }

  // GetminDate=(date)=>{

  //   let today = date//new Date();
  //   let month = today.getMonth();
  //   let year = today.getFullYear();
  //   // console.log(month)

  //   let prevMonth = month === 0 ? 11 : month - 1;
  //   let prevYear = prevMonth === 11 ? year - 1 : year;

  //   let minDate = new Date();
  //   minDate.setMonth(prevMonth+1);
  //   minDate.setFullYear(prevYear);
  //       return minDate
  // }
  componentDidMount() {
    // this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    var dates= this.refs.itemDue.value; 
    // console.log(newItemValue)
    // console.log(dates)
    if(newItemValue&&dates) {
      this.props.addItem({newItemValue,dates});
      this.refs.form.reset();
      // console.log("SJSJSK")
      return this.setState({errorMessage:""})
    }
    else
    {
    	alert("Fill all columns!!")
      // console.log("Fill all columns!!")
      return this.setState({errorMessage:"Fill all columns"})
    }
  }

  getToday=(date)=>{
    let today = date;
    today.setDate(today.getDate()+1)
    var day = today.getDate()
    var month = today.getMonth()+1
    var year = today.getFullYear();
         if(day<10){
                day='0'+day
            } 
        if(month<10){
            month='0'+month
        }
        today = year+'-'+month+'-'+day;
        return today
  }



  render () {
        
    return (
      <form ref="form" onSubmit={this.onSubmit} className="">
		<div className="form-inline reminder-form">
		          <div className="form-group ma2 pa3">
		            <input
		              ref="itemName" 
                  id="newItem"
		              placeholder="I have to..."
		           	  style={{width:"400px",height:"40px"}}
		            />

		            <input
		              style={{marginLeft:"2px"}}
		              ref="itemDue" 
                  id="newDue"
		              type="date"
		           	  min={this.state.minDate}
		            />
		          </div>
		          <button
		            type="submit"
                id="remindersubmit"
		            className=" btn btn-success"
		            onClick={this.onSubmit}
		          >
		            Add Reminder
		          </button>
		          <div
		            className="btn btn-danger"
		            // onClick={() => this.props.clearReminders()}
		          >
		            Clear reminders
		          </div>
		         
		        </div>

      </form>


    );   
  }
}
  
const TodoHeader =(header)=> {
    return (
          <div className="sandbox sandbox-correct-pronounciation">
              <h5 className="heading heading-correct-pronounciation">
                  <var>Todo List</var>
              </h5>
          </div>
          )
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      todoItems: [],
      // todoItems: [{index: "1",value: "Schedule a new quiz",date: "2020-01-24",createdat:this.getDATE(new Date()),completedat:'',done: false}],
    };
  }

  getDATE=(date)=>{
    let today = date;
    today.setDate(today.getDate())
    var day = today.getDate()
    var month = today.getMonth()
    var year = today.getFullYear();
         if(day<10){
                day='0'+day
            } 
        if(month<10){
            month='0'+month
        }
        today = year+'-'+month+'-'+day;
        return today
  }

  componentDidMount()
  {
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

      this.setState({todoItems:this.props.fetchInitialData})
  }

  addItem(todoItem) {
      
    var {todoItems} = this.state
    todoItems.push({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      date:  todoItem.dates,
      createdat:this.getDATE(new Date()),
      completedat:'-',
      done: false
    });
    this.setState({todoItems: todoItems});
    console.log(this.state)
  }
  removeItem (itemIndex) {
    var {todoItems} = this.state
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
    console.log(this.state)
  }
  markTodoDone(itemIndex) {
    var {todoItems} = this.state
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.completedat=todo.done?this.getDATE(new Date()):''
    todoItems.push(todo)
    this.setState({todoItems: todoItems});  
    console.log(this.state)
  }
// https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/   
  handlePublish= async event => {
          const user = await Auth.currentAuthenticatedUser();
           console.log(user.attributes.sub)
           const userid=user.attributes.sub
    for(var i=0;i<this.state.todoItems.length;i++)
    {
         fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/todoupdate',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            facultyid:userid,
            year:String(this.props.authProps.currentSelectedYear),
            index:String(this.state.todoItems[i].index),
            value:String(this.state.todoItems[i].value),
            date:String(this.state.todoItems[i].date),
            createdat:String(this.state.todoItems[i].createdat),
            completedat:String(this.state.todoItems[i].completedat),
            done:String(this.state.todoItems[i].done),
            semester:String(this.props.authProps.currentSelectedSemester),
            course:String(this.props.authProps.currentSelectedCourse)
          })
          }).then(res=> (res.json()))
          .then(data => console.log(data))

  }
}

  render() {
      // console.log(this.state)
    return (
      <div id="main" className="todomain ba solid black pa3">
        <TodoHeader />
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />

        <button className="btn btn-default" onClick={this.handlePublish}>Publish</button> 
      </div>
    );
  }
}

export {TodoApp,TodoForm,TodoList,TodoListItem,TodoHeader};