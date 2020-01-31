import React from 'react';
import {TodoApp,TodoForm,TodoList} from './TodoApp/TodoApp';
import {shallow,mount} from 'enzyme';

describe('---TodoApp---',()=>{
	
	test('Todo app renders properly', () => {
		const todo = shallow(<TodoApp/>)
		expect(todo.find('newItem'))
	})

	test('Todo app updates as per updated todoitems', () => {
		const component = shallow(<TodoApp/>);
	    var todoItems =[{index: "1",value: "Schedule a new quiz",date: "2020-01-24",done: false}]
	    expect(component.state('todoItems')).toEqual(todoItems)
	})


	test("TodoApp contains Header,form,list fields", () => {
	    
	    const wrapper = shallow(<TodoApp/>);
		// expect(console.log(wrapper.find('todomain').length))
  	});	

  	test("Now no todo's provided", () => {
        const wrapper = shallow(<TodoApp/>);
        wrapper.setState({ todoItems: [] });
        // expect(wrapper).toMatchSnapshot();
    })

    it("adds new notes to state", () => {
        const wrapper = shallow(<TodoApp/>);
        var item=[{newItemValue: "Upload quiz qn",dates: "2020-01-25"}]
        wrapper.instance().addItem(item);
        expect(wrapper.state("todoItems")).toHaveLength(2);
    });

    it("deletes notes from state", () => {
        const wrapper = shallow(<TodoApp/>);
        wrapper.instance().removeItem(0);
        expect(wrapper.state("todoItems")).toHaveLength(0);
    });
  
})


describe("Notes creation", () => {

	describe("TodoApp New Note Empty Error Checking", () => {
	it("displays error message on no date", () => {
	     const jsdomAlert = window.alert;  
	    const wrapper = mount(<TodoForm addItem={jest.fn()} />);
	    window.alert = () => {}; 
	    // console.log(wrapper.html())
	    wrapper.find("#newItem").instance().value = "Example Body";
	    wrapper.find("#remindersubmit").simulate("click");
	    // console.log(wrapper.find("#remindersubmit"))
	    expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
	    window.alert = jsdomAlert;
	});

	it("displays error message on no description", () => {
     const jsdomAlert = window.alert;  
    const wrapper = mount(<TodoForm addItem={jest.fn()} />);
    window.alert = () => {}; 
    wrapper.find("#newDue").value = new Date();
    wrapper.find("#remindersubmit").simulate("click");
    expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
	window.alert = jsdomAlert;
	});
});
});

describe("Checklist function", () => {

	describe("TodoApp Checklist updates correctly", () => {
		it("removes on clicking close", () => {

			var item=[{index: "1",value: "Schedule a new quiz",date:new Date(),done: false}]
		    const wrapper = mount(<TodoApp items={item} markTodoDone={jest.fn()}/>);
		    expect(wrapper.find('h7').exists()).toBeTruthy()
		    wrapper.find(".delete-button").simulate("click");
			expect(wrapper.find('h7').exists()).toBeFalsy()
		    // expect(wrapper.state("errorMessage")).toEqual("Fill all columns");
		});
	});

});