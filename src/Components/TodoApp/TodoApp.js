import React,{Component} from 'react';
import './TodoApp.css';
import tachyons from 'tachyons';
// import {CollapsibleComponent, CollapsibleHead,CollapsibleContent } from "react-collapsible-component";
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
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
        			<h7 style={{marginLeft:"10px"}}>{this.props.item.value}</h7>
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

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;

    let minDate = new Date();
    minDate.setMonth(prevMonth+1);
    minDate.setFullYear(prevYear);
        
    this.state={
       minDate:minDate,
       sdate:minDate
    }
  }
  componentDidMount() {
    // this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    var dates= this.refs.itemDue.value; 

    if(newItemValue&&dates) {
      this.props.addItem({newItemValue,dates});
      this.refs.form.reset();
    }
    else
    {
    	alert("Fill all columns!!")
    }
  }
  render () {
  	let today = new Date();
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
    return (
      <form ref="form" onSubmit={this.onSubmit} className="">
		<div className="form-inline reminder-form">
		          <div className="form-group ma2 pa3">
		            <input
		              ref="itemName" 
		              placeholder="I have to..."
		           	  style={{width:"400px",height:"40px"}}
		            />

		            <input
		              style={{marginLeft:"2px"}}
		              ref="itemDue" 
		              type="date"
		           	  min={today}
		            />
		          </div>
		          <button
		            type="submit"
		            className="btn btn-success"
		            // onClick={() => this.addReminder()}
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
  
class TodoHeader extends React.Component {
  constructor(props){
      super(props)
      this.state={
          header:""
      }
  }

    render () {
    return <div class="sandbox sandbox-correct-pronounciation"><h6 class="heading heading-correct-pronounciation"><var>Todo List</var></h6></div>
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      // todoItems: this.props.fetchInitialData,
      todoItems: [{index: "1",value: "Schedule a new quiz",date: "2020-01-24",done: false}],
    };
  }

  componentDidMount()
  {
      // this.setState({todoItems:this.props.fetchInitialData})
  }

  addItem(todoItem) {
      
    var {todoItems} = this.state
    todoItems.push({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      date:  todoItem.dates,
      done: false
    });
    this.setState({todoItems: todoItems});
    console.log(this.state)
  }
  removeItem (itemIndex) {
    var {todoItems} = this.state
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var {todoItems} = this.state
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.push(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
      console.log(this.state)
    return (
      <div id="main" className="ba solid black pa3 ma2">
        <TodoHeader />
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />

        <button className="btn btn-default">Publish</button> 
      </div>
    );
  }
}

export default TodoApp;