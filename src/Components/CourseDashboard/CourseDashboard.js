import React,{Component} from 'react';
import tachyons from 'tachyons';
import i1 from '../../Images/assignments.png';
import i2 from '../../Images/assignments.jpg';
import i3 from '../../Images/repo.jpg';
import i4 from '../../Images/upload.jpg';
import i5 from '../../Images/todo.png';
import i6 from '../../Images/qnbank.jpg';
import Card from '../Card/Card';

class CourseDashboard extends Component {

constructor() {
    super();
      this.state = {
    };
  }

handleClick=()=>{
	this.props.change("home")
}


render(){
  return (   

 <div className="Appx">
                              
      <div className="dashboard-container ma2" >


            <div className="dash-landing-icon-wrap bg-white b--solid b--green">

      			<Card id="1" img={i1} words="Course Reminders" {...this.props} alt='rem'/>
      			<Card id="2" img={i2} words="Progress Tracker" {...this.props} alt='prog'/>
      			<Card id="3" img={i3} words="Digital Repository" {...this.props} alt='digrep'/>
            
            </div>

    </div>

 <div className="dashboard-container ma2" >


            <div className="dash-landing-icon-wrap bg-white b--solid b--green">

      			<Card img={i5} words="TODO List"  {...this.props} alt='todo'/>
      			<Card img={i6} words="Question Bank"  {...this.props} alt='qnbank'/>
      			<Card img={i4} words="Report Uploads"  {...this.props} alt='upload'/>
            
            </div>

    </div>

      </div>

  
         );
  }
}


export default CourseDashboard;
