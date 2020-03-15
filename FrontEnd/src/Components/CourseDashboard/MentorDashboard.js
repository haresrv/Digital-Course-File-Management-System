import React,{Component} from 'react';
import tachyons from 'tachyons';
import i1 from '../../Images/assignments1.png';
import i2 from '../../Images/assignments.jpg';
import i3 from '../../Images/repo.png';
import i4 from '../../Images/upload.jpg';
import i5 from '../../Images/todo.jpg';
import i6 from '../../Images/qnbank.jpg';
import Card from '../Card/Card';

class CourseDashboard extends Component {

constructor() {
    super();
      this.state = {
    };
  }

componentDidMount()
{
  
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

}
handleClick=()=>{
	this.props.change("home")
}


render(){
  return (   

 <div className="Appx container">
                              
     
 <div className="dashboard-container ma2" >


            <div className="dash-landing-icon-wrap bg-white b--solid b--green">

      			<Card id="4" img={i5} words="Todo List"  {...this.props} alt='todo'/>
	          <Card id="3" img={i3} words="Upload" {...this.props} alt='digrep'/>
            </div>

    </div>

      </div>

  
         );
  }
}

// <Card img={i6} words="Question Bank"  {...this.props} alt='qnbank'/>
//             <Card img={i4} words="Report Uploads"  {...this.props} alt='upload'/>
            
export default CourseDashboard;
 // <div className="dashboard-container ma2" >


 //            <div className="dash-landing-icon-wrap bg-white b--solid b--green">

 //            <Card id="1" img={i1} words="Course Reminders" {...this.props} alt='rem'/>
 //            <Card id="2" img={i2} words="Progress Tracker" {...this.props} alt='prog'/>
 //            <Card id="3" img={i3} words="Digital Repository" {...this.props} alt='digrep'/>
            
 //            </div>

 //    </div>
