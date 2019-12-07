import React,{Component} from 'react';
import tachyons from 'tachyons';
import i1 from '../../img/assignments.png';
import i2 from '../../img/assignments.jpg';
import i3 from '../../img/repo.jpg';
import i4 from '../../img/upload.jpg';
import i5 from '../../img/todo.png';
import i6 from '../../img/qnbank.jpg';
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

      			<Card id="1" img={i1} words="Course Reminders" change={this.props.change} alt='rem'/>
      			<Card id="2" img={i2} words="Progress Tracker" change={this.props.change} alt='prog'/>
      			<Card id="3" img={i3} words="Digital Repository" change={this.props.change} alt='digrep'/>
            
            </div>

    </div>

 <div className="dashboard-container ma2" >


            <div className="dash-landing-icon-wrap bg-white b--solid b--green">

      			<Card img={i5} words="TODO List"/>
      			<Card img={i6} words="Question Bank"/>
      			<Card img={i4} words="Report Uploads"/>
            
            </div>

    </div>

      </div>

  
         );
  }
}


export default CourseDashboard;
