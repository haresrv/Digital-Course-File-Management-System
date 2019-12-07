import React,{Component} from 'react';
import tachyons from 'tachyons';
import {courses} from '../../courses';
import ReactCardFlip from 'react-card-flip';


class EnrolledCourses extends Component {

constructor() {
    super();
      this.state = {
      	courses:courses
    };
  }


  renderCourses = () => {

            return  this.state.courses.map((course, index) => {
              return  (course.current=="True")? 
                  (<div className="bg-white b--dashed green dib br3 pa3 ma2 fa fa-fw fa-book" style={{width:'280px',height:'180px'}}>
                    <div>
                      <h4>Year: {course.year}</h4>
                      <h4>Semester: {course.semester}</h4>
                      <h3 className="">{course.name}</h3>
                    </div>          
                    <input className="bg-black white pointer" type='button' onClick={()=>{this.props.change("coursedashboard")}} value='View Course' style={{marginLeft:'10px'}}  />
                  </div>

                  )
                  :
                  
                  (<div className="bg-white b--dashed red dib br3 pa3 ma2 fa fa-fw fa-book" style={{width:'280px',height:'180px'}}>
                    <div>
                      <h4>Year: {course.year}</h4>
                      <h4>Semester: {course.semester}</h4>
                      <h3>{course.name}</h3>
                    </div>          
                    <input className="bg-black white pointer" type='button' value='View Course' style={{marginLeft:'10px'}}  />
                  </div>  )
                      
                  
  })
  } 


render(){
  return (   <div className="outer-container">
					<h1>Enrolled Courses </h1>
					<div className="bg-black ma2 pa3 gold topcorner">
					<span className="bg-red fa fa-fw fa-star-o"></span>- Previous Semesters<br/>
					<span className="bg-green fa fa-fw fa-star-o"></span>- Current* Semester

					</div>
					<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
					<div >
					{this.renderCourses()}
					</div>

					<div>
					This is the back of the card.
					<button className="bg-black white pointer" onClick={this.handleClick}>Click to flip</button>
					</div>
					</ReactCardFlip>

             </div>
             
         );
  }
}

export default EnrolledCourses;
