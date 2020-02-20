import React,{Component} from 'react';
import tachyons from 'tachyons';
import './AdminLog.css';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';

class AdminLog extends Component {

constructor() {
    super();
      this.state = {
    };
  }


render(){
  return (   <div className="sm" style={{marginTop:"50px"}}>

          <div className="sandbox sandbox-correct-pronounciation" style={{marginTop:"-80px"}}>
              <h6 className="heading heading-correct-pronounciation">
                  <var>Admin Page</var>
              </h6>
          </div>

<div id="log_middle">
<div className="log_container">

<div id="log_col1"><strong> Amritavidya:</strong>
<ul className="arrowlist">
  <li>Integrated system that enables easy access to data </li>
  <li>Digital Data Store across Courses </li>
  <li>Upload Reports and statistical analysis of student progression.</li>
  <li>N' tier architecture.</li>
  <li>Security , Roles and Privileges.</li>
  <li>Incomplete modeling of the academic workflow</li>
 </ul>


</div>

<div id="log_col2"><strong>Usage Tips:</strong>
<ul className="arrowlist">
        <li>For confidentiality, always Log Off and close your browser when you have finished your online session.</li>
        <li>You can add new faculty details</li>
		<li>Best viewed with Google Chrome or Mozilla FireFox </li>
		<li>For Queries contact @Team-Vigilante</li>
	
</ul>
</div>
<div>
<table>
	<tr>
		<div className="col-md-push-1 col-md-4 hidden-sm hidden-xs">
		<img className="pull-right" src="https://cms.cb.amrita.edu/images/amrita_round_2019.png" style={{width:"44%", marginTop:"40px",pointerEvents: "none"}} alt="Amrita Vishwa Vidyapeetham Logo"/>
		</div>
	</tr>
</table>

<table>

	<tr>
	      <Button btnStyle="flat" id="register" className="ma2 pa3 link" onClick={()=>{this.props.history.push('/register')}}>
            <strong>Register a new faculty</strong>
         </Button>

	      <Button disabled={true} btnStyle="flat" id="cm" className="ma2 pa3 link" onClick={()=>{}}>
            <strong>Assign New Course Mentors</strong>
         </Button>

	      <Button disabled={true} btnStyle="flat" id="tt" className="ma2 pa3 link" onClick={()=>{}}>
            <strong>Time Table Management</strong>
         </Button>
                  
          
	</tr>

</table>
</div>
</div>
</div>

<div id="login_footer">
		Copyright © 2020 Amrita University. All rights not reserved.
		Powered by <a href="http://www.amritatech.com/ums.html" target="_blank">AmritaVidya</a>
		

		</div>

             </div>
             
         );
  }
}

export default AdminLog;
