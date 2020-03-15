import React,{Component} from 'react';
import tachyons from 'tachyons';

class Faculty extends Component {

constructor() {
    super();
      this.state = {
    };
  }


render(){
  return ( 
			<div >
			<nav className="bg-black tc white">Reports Dashboard</nav>
			 <div className="flex" style={{marginTop:"200px"}}>
  			<div className="dib tc" style={{marginLeft:"80px"}}>  			
				<div className="grow" >
					<div id='1' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa2 ma2" >
					      <h6 className="tc ma2 pa3" style={{width:"160px"}}>Ganesh Iyer N</h6>
					      </div>
					   </a>
					<h6 className="tc white" style={{width:"160px"}}>Assignment</h6>
					<h6 className="tc white" style={{width:"160px"}}>Project Reports</h6>
					<h6 className="tc white" style={{width:"160px"}}>GradeSheets</h6>
					</div>

				</div>
				
		    </div>
		    
		    <div className="grow" >
					<div id='2' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa2 ma2" >
					      <h6 className="tc ma2 pa3" style={{width:"160px"}}>Arun Kumar C</h6>
					      </div>
					   </a>
					<h6 className="tc white" style={{width:"160px"}}>Assignment</h6>
					<h6 className="tc white" style={{width:"160px"}}>Project Reports</h6>
					<h6 className="tc white" style={{width:"160px"}}>GradeSheets</h6>
					</div>
				
				</div>


		    <div className="grow" >
					<div id='2' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa2 ma2" >
					      <h6 className="tc ma2 pa3" style={{width:"160px"}}>Senthilkumar T</h6>
					      </div>
					   </a>
				    <h6 className="tc white" style={{width:"160px"}}>Assignment</h6>
					<h6 className="tc white" style={{width:"160px"}}>Project Reports</h6>
					<h6 className="tc white" style={{width:"160px"}}>GradeSheets</h6>
					</div>
				
				</div>
				

		    <div className="grow" >
					<div id='2' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa2 ma2" >
					      <h6 className="tc ma2 pa3" style={{width:"160px"}}>Priyanka Kumar</h6>
					      </div>
					   </a>
				    <h6 className="tc white" style={{width:"160px"}}>Assignment</h6>
					<h6 className="tc white" style={{width:"160px"}}>Project Reports</h6>
					<h6 className="tc white" style={{width:"160px"}}>GradeSheets</h6> 
					</div>
			</div>
				
				<div className="grow" >
					<div id='3' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa2 ma2" >
					      <h6 className="tc ma2 pa3" style={{width:"160px"}}>Sabarish BA</h6>
					      </div>
					   </a>
					<h6 className="tc white" style={{width:"160px"}}>Assignment</h6>
					<h6 className="tc white" style={{width:"160px"}}>Project Reports</h6>
					<h6 className="tc white" style={{width:"160px"}}>GradeSheets</h6>
					</div>
				
				</div>
				</div>
				</div>
         );
  	  }
}




class ReportStats extends Component {

constructor() {
    super();
      this.state = {
    };
  }


render(){
  return ( 
			<div >
			<nav className="bg-black tc white">Reports Dashboard</nav>
			 <div className="flex" style={{marginTop:"200px"}}>
  			<div className="dib tc" style={{marginLeft:"300px"}}>  			
				<div className="grow" >
					<div id='1' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa3 ma2" >
					      <h5 className="tc ma2 pa3">15CSE313</h5>
					      </div>
					   </a>
					</div>
				</div>
				
		    </div>
		    
		    <div className="grow" >
					<div id='2' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa3 ma2" >
					      <h5 className="tc ma2 pa3">15CSE378</h5>
					      </div>
					   </a>
					</div>
				
				</div>
				<div className="grow" >
					<div id='3' className="tc shop-list-item-container bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.history.push(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa3 ma2" >
					      <h5 className="tc ma2 pa3">15CSE337</h5>
					      </div>
					   </a>
					</div>
				
				</div>
				</div>
				</div>
         );
  	  }
}

export {ReportStats,Faculty};
