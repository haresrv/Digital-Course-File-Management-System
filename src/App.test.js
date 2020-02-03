import React from 'react';
import ReactDOM from 'react-dom';
import {App,Home,CourseSelect,ProgressChange,PersonalSpace} from './App';
import {shallow,mount} from 'enzyme';
import EnrolledCourses from './Components/EnrolledCourses/EnrolledCourses';
import {Auth} from 'aws-amplify';

describe('Renders App Without crashing', () => {

	 const dummy = {"href":"/login","origin":""};
	 
	 global.window = Object.create(window);
	 const url = "http://dummy.com";
	 Object.defineProperty(window, 'location', {
	    value: {
	    href: url,
	    origin:url
	   } 
	});
	
	it('Auth Admin', async () => {
	     Auth.currentSession = jest.fn().mockImplementation(
			     () => {
			     	return {"idToken":{"payload":{"cognito:groups":"Admin"}}}
			    });
	     Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
			     () => {
					     // return whatever you want to test
				     return "user"
			    });    		
		 const wrapper = shallow(<App  />);
		
	});


	it('Auth faculty', async () => {
	     Auth.currentSession = jest.fn().mockImplementation(
			     () => {
			     	return {"idToken":{"payload":{"cognito:groups":"Faculty"}}}
			    });
	     Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
			     () => {
					     // return whatever you want to test
				     return "user"
			    });    		
		 const wrapper = shallow(<App  />);
	});
	it('No Auth', async () => {
	     Auth.currentSession = jest.fn().mockImplementation(
			     () => {
			     	// throw new Error()
			    });  		
		 const wrapper = shallow(<App  />);
	});

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);

	  const app = shallow(<App/>)
	  app.instance().change(true,1)
	  app.instance().change("home",2)
	  app.instance().setUser("dummy")
	  app.instance().comp()
	  app.instance().setRole("dummy")
	  app.instance().comp()
	  app.instance().setAuthStatus(true)


	  expect(app.state('expanded')).toEqual(true)
	  expect(app.state('selected')).toEqual("home")
	  expect(app.state('user')).toEqual("dummy")
	  expect(app.state('role')).toEqual("dummy")
	  expect(app.state('isAuthenticated')).toEqual(true)
	});


	it('<CourseSelect/>', () => {
	  	const cs = shallow(<CourseSelect expanded={true}/>)
	  	expect(cs.find("#course-select").exists()).toBeTruthy()

	  	const cs1 = shallow(<CourseSelect expanded={true}/>)
	  	expect(cs1.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 240);
	  	const cs2 = shallow(<CourseSelect expanded={false}/>)
	  	expect(cs2.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 64);
	});



	it('<ProgressChange/>', () => {
	  	const cs = shallow(<ProgressChange expanded={true}/>)
	  	expect(cs.find("#progress-change").exists()).toBeTruthy()

	  	const cs1 = shallow(<ProgressChange expanded={true}/>)
	  	expect(cs1.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 180);
	  	const cs2 = shallow(<ProgressChange expanded={false}/>)
	  	expect(cs2.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 64);
	});

	it('<PersonalSpace/>', () => {
	  	const cs = shallow(<PersonalSpace expanded={true}/>)
	  	expect(cs.find("#personal-space").exists()).toBeTruthy()

	  	const cs1 = shallow(<PersonalSpace expanded={true}/>)
	  	expect(cs1.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 210);
	  	const cs2 = shallow(<PersonalSpace expanded={false}/>)
	  	expect(cs2.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 64);
	});



	it('<Home/>', () => {
		const mockProps = {
            isAuthenticated :true,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }

		const mockProps2 = {
            isAuthenticated :false,
            user: "Faculty1",
            role:"faculty",
            setAuthStatus:jest.fn(),
            setUser:jest.fn(),
            setRole:jest.fn()
        }
        const history={
        	push:jest.fn()
        }
	  	const home = shallow(<Home authProps={mockProps} expanded={true}/>)
	  	expect(home.find("#home").exists()).toBeTruthy()
		const homex = shallow(<Home history={history} authProps={mockProps2} expanded={true}/>)
	  	const home1 = shallow(<Home authProps={mockProps} expanded={true}/>)
	  	expect(home1.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 240);
	  	const home2 = shallow(<Home authProps={mockProps} expanded={false}/>)
	  	expect(home2.find("#page-wrapper").prop('style')).toHaveProperty('marginLeft', 64);
	});



});	
