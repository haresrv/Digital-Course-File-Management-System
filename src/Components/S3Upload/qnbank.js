import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import config from "../../config";
import { privateUpload,publicUpload,s3getUpload,s3pgetUpload} from "../../libs/awsLib";
import tachyons from 'tachyons';
import Dropdown from 'react-dropdown';
import {Auth} from 'aws-amplify';
import 'react-dropdown/style.css';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

export default class qnbank extends Component {
	constructor(props) {
		super(props);

		this.file = null;

		this.state = {
			isLoading: null,
		    headers:  [{Id:'',File:'',CourseCode:'',Year:'',Download:''}],
		    uploads: [],
		    uploadss:[],
		    toggle:true,
		    filter:[],
		    main:'',
		    vals:'',
		    semester:null,
		    year:null,
		    course:null,
		    okay:false
		};
	}
	
	addtoState=(name,value)=>{
	console.log(name+" "+value)
	this.setState({[name]:value});
	}

	 componentDidMount() {
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")


	  this.fetchRest();
	  

    }

    renderTableHeader() {
		let header = Object.keys(this.state.headers[0])
		return header.map((key, index) => {
		 return <td className="th bg-green white" key={index}>{key.toUpperCase()}</td>
		})
	}

	           

	renderTableData() {
	  return this.state.uploadss.map((upload, index) => {
	     const {year,attachment,prefix,course} = upload //destructuring
	     
	     return (
	        <tr key={index}>
	           <td>{index+1}</td>
	           <td>{attachment.split("-")[1]}</td>
	           <td>{course}</td>
	           <td>{year}</td>
	           <td><button onClick={()=>console.log(s3getUpload(attachment,prefix).then(res=>window.open(res)))} className="btn btn-primary">Download</button>
	           
	           </td>
	        </tr>
	     )
	  })
	}

	Calculate=()=>
	{
		var uniqueYears = [];
		var uniqueSemesters = [];
		var data=this.state.uploads
		for(var i = 0; i< data.length; i++){    
		    if(uniqueYears.indexOf(data[i].year) === -1){
		        uniqueYears.push(data[i].year);        
		    }        
		}
		var data=this.state.uploads
		for(var i = 0; i< data.length; i++){    
		    if(uniqueSemesters.indexOf(data[i].semester) === -1){
		        uniqueSemesters.push(data[i].semester);        
		    }        
		}
		this.setState({uniqueYears:(uniqueYears)})
		
		this.setState({uniqueSemesters:(uniqueSemesters)})
		console.log("-->",uniqueSemesters)
		console.log("-->",uniqueYears)
			
	}

	reducer=()=>{
		this.setState({uploads:this.state.uploads.filter(function(e){return e['prefix'].includes("qnbank") })},function(){ this.rechange()})
	}
	fetchRest=()=>{
	        fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/qnuploads').then(res=> res.json())
	        .then(data=>{this.setState({uploads:data},function(){this.reducer()})})
	        .then(xy=>console.log("Fetching AGAIN"))
	        .then(y=>console.log(this.state))
	        .then(x=>this.Calculate())
	        .catch((err)=>{console.log(err);})
	}

	rechange=()=>
	{
		console.log(this.state)
		var m=this.state.main.toLowerCase()
		var v=this.state.vals
		// console.log()
		if(this.state.okay)
			this.setState({uploadss:this.state.uploads.filter(function(e){return e[m]==v})},function(){console.log(this.state)})
		else
			this.setState({uploadss:this.state.uploads})
	}

	handleFileChange = event => {
		this.file = event.target.files[0];
	}

	handleSubmit = async event => {
		event.preventDefault();
console.log(this.state)
	  	if(this.file==null)
	  	{
	  		alert("You have to pick a file to continue!!")
	  		return
	  	}

	  	if(this.state.year==null)
	  	{
	  		alert("Please Select Year!!")
	  		return
	  	}
	  	if(this.state.semester==null)
	  	{
	  		alert("Please Select Semester!!")
	  		return
	  	}
	  	if(this.state.course==null)
	  	{
	  		alert("Please fill course details!!")
	  		return
	  	}
		if(this.state.timeofexam==null)
	  	{
	  		alert("Please fill all fields!!")
	  		return
	  	}
	  		  	

	  	
		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		  alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
		  return;
		}
	  
		this.setState({ isLoading: true });
		try {
			var prefix=""
		    prefix="qnbank/"+this.state.year+"/"+this.state.semester+"/"+this.state.timeofexam+"/"+this.state.course

			this.setState({prefix:prefix})
		
				 console.log(prefix)
  				 const attachment=await publicUpload(this.file,prefix)
		  		
		  		 // const user = await Auth.currentAuthenticatedUser();
		  		 // console.log(user.attributes.sub)
		  		 // const userid=user.attributes.sub
				 
				 fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/qnbank',{
				  method:'post',
				  headers:{'Content-Type':'application/json'},
				  body:JSON.stringify({
						attachment:attachment,
						year:this.state.year,
						semester:this.state.semester,
						prefix:this.state.prefix,
						timeofexam:this.state.timeofexam,
						course:this.state.course
				  })
				  }).then(res=> console.log(res))
				 	.then(data => console.log(data))

		  		// this.props.history.push("/");

			 }

		 catch (e) {
		  alert(e);
		  return
		}
		this.setState({ isLoading: false });
		alert("Files have been Saved Successfully")
	}

	renderLoggedIn() {
		const options = [
			'2015','2016','2017','2018','2019','2020'
		  ]
		const options2 = [
			'1','2','3','4','5','6','7','8'
		  ]
		const options3 = [
			'P1','P2','P3','EndSem'
		  ]

		return (
		  <div className="qnbank" >
			<div >
			<form className="middleDiv ma2 pa3" onSubmit={this.handleSubmit}>
			
			<div style={{display:"flex",width:"700px"}}>
				<div className="form-group">
				<label htmlFor="State">Select Year</label>
				<Dropdown style={{width:"360px"}} options={options} onChange={(e)=>{this.setState({year:e.value})}} value={this.state.year} placeholder="Select Year" />
				</div>

				<div className="form-group" style={{marginLeft:"40px"}}>
				<label htmlFor="State" >Select Files</label>
				<Form.Group controlId="file" style={{marginLeft:"30px"}}>
					<Form.Control onChange={this.handleFileChange} type="file" />
			 	</Form.Group>
				 </div>
				</div>
				
				<div className="form-group">
				<label htmlFor="Class">Enter Semester</label>
				<Dropdown style={{width:"360px"}} options={options2} onChange={(e)=>{this.setState({semester:e.value})}}  value={this.state.semester} placeholder="Select Semester" />
				</div>

				<div className="form-group">
				<label htmlFor="Class">Enter Type</label>
				<Dropdown style={{width:"360px"}} options={options3} onChange={(e)=>{this.setState({timeofexam:e.value})}}  value={this.state.timeofexam} placeholder="Select Type" />
				</div>

				<div className="form-group">
					<label htmlFor="Class">Enter Course</label>
					<input type='text' className="b--solid b pa2 ma2 btn-warning" onChange={(e)=>{this.setState({course:e.target.value})}} placeholder="CourseCode..." />
				</div>

				
			  	<button type="submit" className="btn btn-primary ma2 pa3" style={{marginLeft:"40%"}}>Upload</button>
			</form>
			</div>
		  </div>
		);
	}


	renderSpinner()
	{
		return(
			<div className="Uploader" >
			<div >
			<form className="middleDiv ma2 pa3">
			<div className="middleDiv loader ma2 pa3"></div>
			</form>
			</div>
		  </div>
		
		)
	}

	renderFilters()
	{
		// console.log(this.state.uploads)
		const options1 =['Year','Semester']
		
		return(
			<div className="" style={{marginLeft:"30px"}}>
			<div >
					<div className="checkbox">
					  <label><input type="checkbox" onChange={(e)=>{(e.target.checked)?this.setState({okay:true}):this.setState({okay:false},function(){this.rechange()})}} value="1"/>Enable Filters</label>
					</div>
					{this.state.okay&&(
						<div>
				<div className="form-group">
					
					<Dropdown style={{width:"360px"}} options={options1} onChange={(e)=>{this.setState({main:e.value});this.setState({vals:null}); e.value=="Year"?(this.setState({filter:this.state.uniqueYears})):(this.setState({filter:this.state.uniqueSemesters}))}} value={this.state.main} placeholder="Filter by" />
					
				</div>		

				<div className="form-group">
					
					<Dropdown style={{width:"360px"}} options={this.state.filter!=null?this.state.filter:['']} onChange={(e)=>{this.setState({vals:e.value},function(){this.rechange()})}} value={this.state.vals} placeholder="Filter Secondary" />
				</div>	</div>	
				)}
			</div>
		  </div>
		
		)
	}
	renderButton() {
		return (
			<div className="button" style={{marginLeft: this.props.expanded ? 240 : 64}}>
						{this.renderFilters()}
				    <table id='students' >
				    	
	                    <tbody>
	                    {this.renderTableHeader()}
	                    {this.renderTableData()}
						</tbody>
                    </table>

				
			</div>
		);
	}
// 
	renderTest() {
		return (
			<div className="test">
				
				<div>{!this.state.isLoading && this.renderLoggedIn()}</div>
				<div>{this.state.isLoading && this.renderSpinner()}</div>
			</div>
		);
	}

	render() {
		// return <div className="qnbank">{this.renderTest()}{this.renderButton()}</div>
			return <div className="qnbank">
			<button onClick={()=>{this.setState({toggle:!this.state.toggle},function(){this.fetchRest()})}} style={{marginLeft:"50%"}} className="btn btn-primary">{this.state.toggle ? "View Uploads" : "Upload"}</button>
			{this.state.toggle ? this.renderTest() : this.renderButton()}
 			
			</div>;
	}
}
