import CourseDashboard from './CourseDashboard';
import Card from '../Card/Card';
import { shallow,mount,render } from 'enzyme';
import React from 'react';


it('expect to render CourseDashboard ',()=>{
	expect(shallow(<CourseDashboard/>.length).toEqual(1))
})

