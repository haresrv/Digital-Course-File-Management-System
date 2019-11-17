import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './Card.css';
import { slide as Menu } from 'react-burger-menu';
import ReactCardFlip from 'react-card-flip';
import {courses} from './courses';
import tachyons from 'tachyons';
import TickTock from './Components/TickTock/TickTock';

class App extends Component {

constructor() {
    super();
      this.state = {
      isFlipped: false,
      courses:courses,
      role:'faculty',
      route:"home"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

   showSettings (event) {
    event.preventDefault();
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
                    <input className="bg-black white pointer" type='button' onClick={()=>{this.setState({route:"chnage"})}} value='View Course' style={{marginLeft:'10px'}}  />
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
  return (   <div className="App outer-container">
              {this.state.route=="home"?
              
  (          <div>   <Menu noOverlay isOpen={ true } customBurgerIcon={ <img src={logo}/>} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
                  <p className="red ma2 pa3" href="#" style={{fontSize:"2em"}}><i className="bg-gold red fa-lg fa fa-fw fa-user"></i><span>Faculty</span></p>
                  <a href="#" ><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>
                  <a href="#" ><i className="fa fa-fw fa-bell-o"></i><span>Notification</span></a>
                  <a href="#" ><i className="fa fa-fw fa-envelope-o"></i><span>Contact</span></a>
                  <a href="#" ><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>
                  <a href="#" ><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>
                  <a href="#" ><i className="fa fa-fw fa-newspaper-o"></i><span>Personal Space</span></a>
                
                </Menu>
                
                <main id="page-wrap" style={{marginLeft:"300px"}}>

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
                </main>
               </div> 
)
                :
                <TickTock />
            }
             </div>
             
  );
}
}

export default App;
