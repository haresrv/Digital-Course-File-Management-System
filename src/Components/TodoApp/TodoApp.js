import React,{Component} from 'react';
import './TodoApp.css';
import tachyons from 'tachyons';
// import {CollapsibleComponent, CollapsibleHead,CollapsibleContent } from "react-collapsible-component";
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className=" ">
        <div className={todoClass+" noselect"}>
          <span className="glyphicon fa fa-check icon" onClick={this.onClickDone}>

          </span>
                {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
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
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
      
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline dib">
        <div>
        <label htmlFor="Deadline">Pick Topic</label>
        <input type="text" ref="itemName" className="form-control" placeholder="Add a new todo..."/>
        </div>
        <div>
        <label htmlFor="Deadline">Pick Deadline</label>
        <Calendar 
            dateFormat="dd/mm/yy" 
            value={this.state.sdate}
            minDate={this.state.minDate} 
            onChange={(e) => this.setState({sdate: e.value},function(){console.log(this.state)})} 
            showIcon={true} />
        </div>
        <div>
        <button type="submit" className="btn btn-default">Add</button> 
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
    return <input type="text" style={{marginLeft:"5%"}} className="ma2 b f2 pa3 b-- black gold tc" value={this.state.header} placeholder="--Edit title--" onChange={(e)=>{this.setState({header:e.target.value})}} />;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      todoItems: this.props.fetchInitialData,
    };
  }

  componentDidMount()
  {
      this.setState({todoItems:this.props.fetchInitialData})
  }

  addItem(todoItem) {
      
    var {todoItems} = this.state
    todoItems.push({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
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