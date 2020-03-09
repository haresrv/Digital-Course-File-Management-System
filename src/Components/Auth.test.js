import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './auth/LogIn';
import Register from './auth/Register';
import Uploader from './S3Upload/Uploader';
import {shallow,mount} from 'enzyme';
import Auth from '@aws-amplify/auth';
import AWS from 'aws-sdk';


describe('Renders App Without crashing', () => {
let mockProps ,mockProps2 , history
  beforeEach(() => {
  		mockProps = {
            isAuthenticated :true,
            user: "Admin1",
            role:"Admin",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }

		mockProps2 = {
            isAuthenticated :false,
            user: "Faculty2",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        history={
        	push:jest.fn()
        }
  });

	it('<Register/> No previous Auth', async () => {

		const jsdomAlert = window.alert;  
	    window.alert = () => {};

	     Auth.currentSession = jest.fn().mockImplementation(() => {});

		 const wrapper = mount(<Register authProps={mockProps2} history={history}/>);
		window.alert = jsdomAlert;
	});



	it('No previous Auth <Login/>', async () => {
	     Auth.currentSession = jest.fn().mockImplementation(() => {});
		 const wrapper = mount(<LogIn authProps={mockProps2} history={history}/>);
	});
describe('Blank fields <Login/>', () => {

	it('username blank', async () => {

		 const dummy = document.createElement('password');
	 	 document.getElementById =  jest.fn().mockImplementation(
			     () => {
			     	return dummy
			    });

	 const wrapper = mount(<LogIn authProps={mockProps2} history={history}/>);
	 wrapper.setState({username:"",password:"Admin@2000"})
	 wrapper.find('#submitbutton').simulate("click")
	 // console.log(wrapper.html())
	 var r= {cognito: null,blankfield: true}
	 expect(wrapper.state('errors')).toEqual(r)

	 
	});


	it('password blank', async () => {

		 const dummy = document.createElement('username');
	 	 document.getElementById =  jest.fn().mockImplementation(
			     () => {
			     	return dummy
			    });

	 const wrapper = mount(<LogIn authProps={mockProps2} history={history}/>);
	 wrapper.setState({username:"ak",password:""})
	 wrapper.find('#submitbutton').simulate("click")
	 // console.log(wrapper.html())
	 var r= {cognito: null,blankfield: true}
	 expect(wrapper.state('errors')).toEqual(r)
	 
	});
});


describe('Blank fields <Register/>', () => {

	it('username blank', async () => {

     Auth.currentSession = jest.fn().mockImplementation(
	     	() => 
	     	{return {"idToken":{"payload":{"cognito:groups":"Admin"}}
	     	}});
	
		 const dummy = document.createElement('username');
	 	 document.getElementById =  jest.fn().mockImplementation(
			     () => {
			     	return dummy
			    });

	 const wrapper = mount(<Register authProps={mockProps2} history={history}/>);
	 wrapper.setState({username:"",email:"Admin@gmail.com"})
	 wrapper.find('#registerbutton').simulate("click")
	 // console.log(wrapper.html())
	 var rblank= {cognito: null,blankfield: true}
	 expect(wrapper.state('errors')).toEqual(rblank)
expect(wrapper.state('errors')).toEqual(rblank)
expect(wrapper.state('errors')).toEqual(rblank)
	 
	});


	it('email blank', async () => {
     Auth.currentSession = jest.fn().mockImplementation(
	     	() => 
	     	{return {"idToken":"None"}
	     	});
	
		 const dummy = document.createElement('email');
	 	 document.getElementById =  jest.fn().mockImplementation(
			     () => {
			     	return dummy
			    });

	 const wrapper = mount(<Register authProps={mockProps} history={history}/>);
	 wrapper.setState({username:"ak",password:""})
	 wrapper.find('#registerbutton').simulate("click")
	 // console.log(wrapper.html())
	 var r= {cognito: null,blankfield: true}
	 expect(wrapper.state('errors')).toEqual(r)
	 
	});
});

	it('Successful Registration', async () => {
     Auth.currentSession = jest.fn().mockImplementation(
	     	() => 
	     	{return {"idToken":{"payload":{"cognito:groups":"Admin"}}
	     	}});
	
        const jsdomAlert = window.alert;  
	    window.alert = () => {};

 		AWS.CognitoIdentityServiceProvider = jest.fn().mockImplementation(
	     	() => 
	     	{return {adminCreateUser:jest.fn(),"idToken":{"payload":{"cognito:groups":"Admin"}}
	     	}});
		

	 const wrapper = mount(<Register authProps={mockProps} history={history}/>);
	 wrapper.setState({username:"Admin1",email:"Admin@gmail.com"})
	 wrapper.find('#registerbutton').simulate("click")
	 // console.log(wrapper.html())
	 var r= {cognito: null,blankfield: false}
	 
	 expect(wrapper.state('errors')).toEqual(r)
 window.alert = jsdomAlert;
	 
	});

	it('Register InputChanges', async () => {

        const jsdomAlert = window.alert;  
	    window.alert = () => {};

	     Auth.currentSession = jest.fn().mockImplementation(
	     	() => 
	     	{return {"idToken":{"payload":{"cognito:groups":"Admin"}}
	     	}});
	     Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {return "user"});    	
 		 const dummy = document.createElement('username');
	 	 document.getElementById =  jest.fn().mockImplementation(
			     () => {
			     	return dummy
			    });

		 const wrapper = mount(<Register authProps={mockProps} history={history}/>);
		 const event={"target":{"id":"username","value":"KLRahul"}}
		 wrapper.instance().onInputChange(event)

		 expect(wrapper.state("username")).toEqual("KLRahul")
		 window.alert = jsdomAlert;
	});

});




