import React,{Component} from 'react';
import tachyons from 'tachyons';
import {courses} from '../../courses';

class EnrolledCourses extends Component {

constructor() {
    super();
      this.state = {
      	courses:courses
    };
  }

componentDidMount()
{
  if(!this.props.authProps.isAuthenticated)
        this.props.history.push("/login")
    
  var name=this.props.authProps.user.username

  fetch('https://tachyonnation.herokuapp.com/detbyname/'+String(name))
  .then(res=> res.json())
  .then(data=>{this.setState({courses:data},function(){console.log(this.state)})})

}

changex = (name) => {
  console.log(String(name).length>24)
  if(String(name).length>24)
    return (name.split(" ").map(w=>(w.substring(0,1)==w.substring(0,1).toUpperCase())?w.substring(0,1).toUpperCase():"").join(""))
  else
    return (name)
}
// this.setState({courses:JSON.parse(data)},function(){console.log(this.state)})
  renderCourses = () => {

            return  this.state.courses.map((course, index) => {
              return  (course.yeartaken==((new Date()).getFullYear()))? 
                  (<div key={index} className="bg-white b--dashed green dib br3 pa3 ma2 fa fa-fw fa-book" style={{width:'280px',height:'180px'}}>
                    <div>
                      <h5>Year: {course.yeartaken}</h5>
                      <h6>Semester: {course.semtaken}</h6>
                      <h5 className="">{this.changex(course.Name)}</h5>
                    </div>          
                    <input className="bg-black white pointer" type='button' onClick={()=>{this.props.authProps.setYear(course.yeartaken);this.props.authProps.setSemester(course.semtaken);this.props.authProps.setCoursename(course.Name); this.props.history.push("coursedashboard")}} value='View Course' style={{marginLeft:'10px'}}  />
               {  course.role=="Mentor" &&(<input className="bg-black white pointer" type='button' onClick={()=>{this.props.authProps.setYear(course.yeartaken);this.props.authProps.setSemester(course.semtaken);this.props.authProps.setCoursename(course.Name); this.props.history.push("mentordashboard")}} value='Mentor View' style={{marginLeft:'10px'}}  />)}
                  </div>


                  )
                  :
                  (<div key={index} className="bg-white b--dashed red dib br3 pa3 ma2 fa fa-fw fa-book" style={{width:'280px',height:'180px'}}>
                    <div>
                      <h5>Year: {course.yeartaken}</h5>
                      <h6>Semester: {course.semtaken}</h6>
                      <h5 className="">{this.changex(course.Name)}</h5>
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
					
					<div >
					{this.renderCourses()}
					</div>

             </div>
             
         );
  }
}

export default EnrolledCourses;
