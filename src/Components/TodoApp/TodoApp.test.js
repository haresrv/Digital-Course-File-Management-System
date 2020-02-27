import React from 'react';
import {TodoApp,TodoForm,TodoList,TodoListItem} from './TodoApp';
import {shallow,mount} from 'enzyme';

describe('---TodoApp---',()=>{
	

	test('Mark as Done is working', () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
	     const history={
        	push:jest.fn()
        }

		var item=[{index: "1",value: "Schedule a new quiz",date:new Date(),done: false}]
		var item2=[{index: "1",value: "Schedule a new quiz",date:new Date(),done: true}]
	    const wrapper = mount(<TodoApp fetchInitialData={item} authProps={mockProps}/>);
	    wrapper.instance().markTodoDone(0)
	    console.log(wrapper.state('todoItems'))
        expect(wrapper.state('todoItems')[0].done).toEqual(true)

	
	})


	test('On Click remove mark as done', () => {
		var item=[{index: "0",value: "Schedule a new quiz",date:new Date(),done: false}]
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
	    const wrapper = mount(<TodoListItem item={item}  authProps={mockProps} markTodoDone={jest.fn()} onClickClose={jest.fn()}/>);
	    wrapper.instance().onClickDone()
        expect(wrapper.state('done')).toEqual(true)
        wrapper.instance().onClickDone()
        expect(wrapper.state('done')).toEqual(false)
	
	})




	test('Todo list group renders properly', () => {
		var item=[{index: "1",value: "Schedule a new quiz",date:new Date(),done: false}]
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
		const todo = shallow(<TodoList items={[item]} removeItem={jest.fn()}  authProps={mockProps} markTodoDone={jest.fn()}/>)
		expect(todo.find('.list-group').exists()).toBeTruthy()
	})

	test('Todo app updates as per updated todoitems', () => {
const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
		const component = shallow(<TodoApp  authProps={mockProps} fetchInitialData={[]}/>);
	    // var todoItems =[{index: "1",value: "Schedule a new quiz",date: "2020-01-24",done: false}]
	    var todoItems =[]
	    expect(component.state('todoItems')).toEqual(todoItems)
	})


  	test("Now no todo's provided", () => {
  		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
        const wrapper = mount(<TodoApp  authProps={mockProps} fetchInitialData={[]}/>);
        wrapper.setState({ todoItems: [] });
        expect(wrapper).toMatchSnapshot();
    })

    it("adds new notes to state", () => {
    	const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
        const wrapper = shallow(<TodoApp  authProps={mockProps} fetchInitialData={[]}/>);
        var item=[{newItemValue: "Upload quiz qn",dates: "2020-01-25"}]
        wrapper.instance().addItem(item);
        expect(wrapper.state("todoItems")).toHaveLength(1);
    });

    it("deletes notes from state", () => {
    	const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
        const wrapper = shallow(<TodoApp  authProps={mockProps} fetchInitialData={[]}/>);
        var todoItems =[{index: "0",value: "Schedule a new quiz",date: "2020-01-24",done: false}]
        wrapper.setState({ todoItems: todoItems });
        wrapper.instance().removeItem(0);
        expect(wrapper.state("todoItems")).toHaveLength(0);
    });
  
})


describe("Notes creation", () => {

	describe("TodoApp New Note Empty Error Checking", () => {

	it("Correct submission", () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
	     const jsdomAlert = window.alert;  
	    const wrapper = mount(<TodoForm  authProps={mockProps} addItem={jest.fn()} />);
	    window.alert = () => {}; 
	    // console.log(wrapper.html())
	    wrapper.find("#newItem").instance().value = "Example Body";
	    wrapper.find("#newDue").instance().value = (new Date()).toISOString().split('T')[0];
	    
	    wrapper.find("#remindersubmit").simulate("click");
	    // console.log(wrapper.find("#remindersubmit"))
	    expect(wrapper.state("errorMessage")).toEqual("");
	    window.alert = jsdomAlert;
	});

	it("Minimum Date is set correctly", () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
	     const jsdomAlert = window.alert;  
	    const wrapper = mount(<TodoForm  authProps={mockProps} addItem={jest.fn()} />);
	    window.alert = () => {}; 

	    expect(wrapper.instance().getToday(new Date('2000-1-20'))).toEqual('2000-01-21');
		expect(wrapper.instance().getToday(new Date('2000-2-08'))).toEqual('2000-02-09');
		expect(wrapper.instance().getToday(new Date('2000-10-09'))).toEqual('2000-10-10');
	    
	    window.alert = jsdomAlert;
	});

	it("displays error message on no description", () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
	     const jsdomAlert = window.alert;  
	    const wrapper = mount(<TodoForm addItem={jest.fn()}  authProps={mockProps}/>);
	    window.alert = () => {}; 
	    // console.log(wrapper.html())
	    wrapper.find("#newDue").instance().value = (new Date()).toISOString().split('T')[0];
	    wrapper.find("#remindersubmit").simulate("click");
	    // console.log(wrapper.find("#remindersubmit"))
	    expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
	    window.alert = jsdomAlert;
	});

	it("displays error message on no date", () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
     const jsdomAlert = window.alert;  
    const wrapper = mount(<TodoForm addItem={jest.fn()}  authProps={mockProps}/>);
    window.alert = () => {}; 
    wrapper.find("#newDue").value = (new Date()).toISOString().split('T')[0];
    wrapper.find("#remindersubmit").simulate("click");
    expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
	window.alert = jsdomAlert;
	});
});
});

describe("Checklist function", () => {

	describe("TodoApp Checklist updates correctly", () => {
		it("removes on clicking close", () => {
const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
			var item=[{index: "1",value: "Schedule a new quiz",date:new Date(),done: false}]
		    const wrapper = mount(<TodoApp  authProps={mockProps} fetchInitialData={item} markTodoDone={jest.fn()}/>);
		    
		    expect(wrapper.find('h6').exists()).toBeTruthy()
		    wrapper.find(".delete-button").simulate("click");
			expect(wrapper.find('h6').exists()).toBeFalsy()
		    // expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
		});
	});

});