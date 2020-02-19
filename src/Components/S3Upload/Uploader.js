import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import config from "../../config";
import { privateUpload,publicUpload,s3getUpload,s3pgetUpload} from "../../libs/awsLib";
import './Uploader.css';
import tachyons from 'tachyons';
import Dropdown from 'react-dropdown';
import {Auth} from 'aws-amplify';
import 'react-dropdown/style.css';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

export default class Uploader extends Component {
	constructor(props) {
		super(props);

		this.file = null;

		this.state = {
			isLoading: null,
			type:null,
			isprivate:false,
		    headers:  [{Id:'',Topic:'',Description:'',Type:'',Download:''}],
		    uploads: [],
		    uploadss:[],
		    toggle:false,
		    filter:[],
		    main:'',
		    vals:'',
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
	     const {description,type,attachment,isprivate,prefix} = upload //destructuring
	     return (
	        <tr key={index}>
	           <td>{index+1}</td>
	           <td>{attachment.split("-")[1]}</td>
	           <td>{description}</td>
	           <td>{type}</td>
	           <td><button onClick={()=>console.log(isprivate?s3pgetUpload(attachment,prefix).then(res=>window.open(res)):s3getUpload(attachment,prefix).then(res=>window.open(res)))} className="btn btn-primary">Download</button>
	           
	           </td>
	        </tr>
	     )
	  })
	}

	Calculate=()=>
	{
		var uniqueTypes = [];
		var uniqueSections = [];
		var data=this.state.uploads
		for(var i = 0; i< data.length; i++){    
		    if(uniqueTypes.indexOf(data[i].type) === -1){
		        uniqueTypes.push(data[i].type);        
		    }        
		}
		var data=this.state.uploads
		for(var i = 0; i< data.length; i++){    
		    if(uniqueSections.indexOf(data[i].section) === -1){
		        uniqueSections.push(data[i].section);        
		    }        
		}
		this.setState({uniqueTypes:(uniqueTypes)})
		
		this.setState({uniqueSections:(uniqueSections)})
	}

	fetchRest=()=>{
	        fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/uploads').then(res=> res.json())
	        .then(data=>{this.setState({uploads:data},function(){this.rechange()})})
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
		if(this.state.okay)
			this.setState({uploadss:this.state.uploads.filter(function(e){return e[m]==v})})
		else
			this.setState({uploadss:this.state.uploads})
	}

	handleFileChange = event => {
		this.file = event.target.files[0];
	}

	handleSubmit = async event => {
		event.preventDefault();
console.log(this.props)
	  	if(this.file==null)
	  	{
	  		alert("You have to pick a file to continue!!")
	  		return
	  	}

	  	if(this.state.type==null)
	  	{
	  		alert("Please select type of file to continue!!")
	  		return
	  	}
	  	if(this.state.section==null)
	  	{
	  		alert("Please fill all columns to continue!!")
	  		return
	  	}
	  	var k=this.state.isprivate?"private":"public"

	  	if(!window.confirm(`Are u sure ,you want to keep this file in ${k} mode`))
	  	{
	  		return
	  	}

		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		  alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
		  return;
		}
	  
		this.setState({ isLoading: true });
		try {
			var prefix=""
		    prefix="reports/"+this.props.authProps.currentSelectedYear+"/"+this.props.authProps.currentSelectedSemester+"/"+this.props.authProps.currentSelectedCourse+"/"
			this.setState({prefix:prefix})
		
				 console.log(prefix)
  				 const attachment=this.state.isprivate? await privateUpload(this.file,prefix) :await publicUpload(this.file,prefix)
		  		
		  		 const user = await Auth.currentAuthenticatedUser();
		  		 console.log(user.attributes.sub)
		  		 const userid=user.attributes.sub
				 
				 fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/uploads',{
				  method:'post',
				  headers:{'Content-Type':'application/json'},
				  body:JSON.stringify({
						userid:userid,
						attachment:attachment,
						description:this.state.description,
						type:this.state.type,
						isprivate:this.state.isprivate,
						section:this.state.section,
						prefix:this.state.prefix
				  })
				  }).then(res=> res.json())
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
			'Assignment','Project','Grade Sheets','Something else'
		  ]
		const options2 = [
			'CSE-A','CSE-B','CSE-C','CSE-D','CSE-E','CSE-F','Does not apply'
		  ]

		return (
		  <div className="Uploader" >
			<div >
			<form className="middleDiv ma2 pa3" onSubmit={this.handleSubmit}>
			
			<div style={{display:"flex",width:"700px"}}>
				<div className="form-group">
				<label htmlFor="State">Select Type</label>
				<Dropdown style={{width:"360px"}} options={options} onChange={(e)=>{this.setState({type:e.value})}} value={this.state.type} placeholder="Select Type" />
				</div>

				<div className="form-group" style={{marginLeft:"40px"}}>
				<label htmlFor="State" >Select Files</label>
				<Form.Group controlId="file" style={{marginLeft:"30px"}}>
					<Form.Control onChange={this.handleFileChange} type="file" />
			 	</Form.Group>
				 </div>
			</div>
				
				<div className="form-group">
				<label htmlFor="Class">Enter Class & Section</label>
				<Dropdown style={{width:"360px"}} options={options2} onChange={(e)=>{this.setState({section:e.value})}}  value={this.state.section} placeholder="Select Section" />
				</div>


				<InputGroup onChange={(e)=>{this.setState({description:e.target.value})}} className="ma2 pa3" style={{width:"600px",height:"150px",marginTop:"20px"}}>
					<InputGroup.Prepend>
						<InputGroup.Text>Description</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control as="textarea" aria-label="With textarea"/>
				</InputGroup>
				
				<label className="b--dashed ma2 pa3">
				  <Toggle
				    defaultChecked={this.state.isprivate}
				    onChange={()=>{this.setState({isprivate:!this.state.isprivate})}} />
				  <span className="pa3">Store privately</span>
				</label>
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

			<form className="middleDiv ma4 pa3 bgg">
			
			<div className="middleDiv2 loader ma2 pa3"></div>
			<h7 className="btn-primary b--dashed" style={{width:"120px"}}>Your files are safe with me!!!</h7><br/>
			<h7 className="btn-primary b--dashed" style={{width:"120px"}}>Check your Uploads after few seconds!!</h7>
			</form>
			
			</div>
		  </div>
		
		)
	}


	renderFilters()
	{
		// console.log(this.state.uploads)
		const options1 =['Type','Section']
		
		return(
			<div className="" style={{marginLeft:"30px"}}>
			<div >
					<div className="checkbox">
					  <label><input type="checkbox" onChange={(e)=>{(e.target.checked)?this.setState({okay:true}):this.setState({okay:false},function(){this.rechange()})}} value="1"/>Enable Filters</label>
					</div>
					{this.state.okay&&(
						<div>
				<div className="form-group">
					
					<Dropdown style={{width:"360px"}} options={options1} onChange={(e)=>{this.setState({main:e.value});this.setState({vals:null}); e.value=="Type"?(this.setState({filter:this.state.uniqueTypes})):(this.setState({filter:this.state.uniqueSections}))}} value={this.state.main} placeholder="Filter by" />
					
				</div>		

				<div className="form-group">
					
					<Dropdown style={{width:"360px"}} options={this.state.filter} onChange={(e)=>{this.setState({vals:e.value},function(){this.rechange()})}} value={this.state.vals} placeholder="Filter Secondary" />
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
		// return <div className="Uploader">{this.renderTest()}{this.renderButton()}</div>
			return <div className="Uploader">
			<button onClick={()=>{this.setState({toggle:!this.state.toggle},function(){this.fetchRest()})}} style={{marginLeft:"50%"}} className="btn btn-primary">{this.state.toggle ? "View Uploads" : "Upload"}</button>
			{this.state.toggle ? this.renderTest() : this.renderButton()}
 			
			</div>;
	}
}
