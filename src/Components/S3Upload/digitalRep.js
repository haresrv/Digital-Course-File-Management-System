import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import config from "../../config";
import { s3privateUpload,s3publicUpload ,s3getUpload,s3pgetUpload} from "../../libs/awsLib";
import './Uploader.css';
import Dropdown from 'react-dropdown';
import {Auth} from 'aws-amplify';
import 'react-dropdown/style.css';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

const bgColors = { "Default": "#81b71a",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
    "Black": "#000000",
    "White": "#FFFFFF"
};

export default class digitalRep extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            type:null,
            isprivate:false,
            headers:  [{Id:'',Topic:'',Description:'',Type:'',Download:''}],
            uploads: [],
            toggle:true
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
        return this.state.uploads.map((upload, index) => {
            const {description,type,attachment,isprivate} = upload //destructuring
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{attachment.split("-")[1]}</td>
                    <td>{description}</td>
                    <td>{type}</td>
                    <td><button onClick={()=>console.log(isprivate?s3pgetUpload(attachment).then(res=>window.open(res)):s3getUpload(attachment).then(res=>window.open(res)))} className="btn btn-danger">Download</button>

                    </td>
                </tr>
            )
        })
    }


    fetchRest(){
        fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/uploads').then(res=> res.json())
            .then(data=>{this.setState({uploads:data})})
            .then(xy=>console.log("Fetching AGAIN"))
            .then(y=>console.log(this.state))
            .catch((err)=>{console.log(err);})
    }


    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

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

            const attachment=this.state.isprivate? await s3privateUpload(this.file) :await s3publicUpload(this.file)

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
                    isprivate:this.state.isprivate
                })
            }).then(res=> res.json())
                .then(data => console.log(data))

            // this.props.history.push("/");

        }

        catch (e) {
            alert(e);

        }
        this.setState({ isLoading: false });
    }

    renderLoggedIn() {
        const options = [
            'Videos','PPT','Something else'
        ]

        return (
            <div className="Uploader" >
                <div >
                    <Form className="middleDiv ma2 pa3" onSubmit={this.handleSubmit}>

                        <div style={{display:"flex",width:"800px"}}>
                            <Form.Row style={{marginLeft:"3%"}}>
                            <Form.Group  className="form-group" >
                                <Form.Label htmlFor="State">Select Type</Form.Label>
                                <Dropdown style={{width:"360px"}} options={options} onChange={(e)=>{this.setState({type:e.value})}} value={this.state.type} placeholder="Select Type" />
                            </Form.Group>

                            <Form.Group className="form-group" style={{marginLeft:"40px"}}>
                                <Form.Label htmlFor="State" >Select Files</Form.Label>
                                <Form.Group controlId="file" style={{marginLeft:"5px"}}>
                                    <input onChange={this.handleFileChange} type="file" style={{backgroundColor: bgColors.Blue, color: bgColors.White}}/>
                                </Form.Group>
                            </Form.Group>
                            </Form.Row>
                        </div>
                    <Form.Row>
                        <Form.Group style={{marginLeft:"5%"}}>
                            <Form.Check
                                type='switch'
                                defaultChecked={this.state.isprivate}
                                onChange={()=>{this.setState({isprivate:!this.state.isprivate})}}
                                label='Store privately'
                            />
                        </Form.Group>
                    </Form.Row>

                        <InputGroup onChange={(e)=>{this.setState({description:e.target.value})}} className="ma2 pa3" style={{width:"600px",height:"150px",marginTop:"20px"}}>
                            <InputGroup.Prepend >
                                <InputGroup.Text style={{color: bgColors.Black}} >Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="textarea" aria-label="With textarea"/>
                        </InputGroup>


                        <button type="submit" className="btn btn-info ma2" style={{marginLeft:"5%"}}>Upload</button>
                    </Form>
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


    renderButton() {
        return (
            <div className="button tc">
                <table id='students' style={{marginTop:"200px",marginLeft:"60px"}}>
                    <tbody>

                    {this.renderTableHeader()}
                    {this.renderTableData()}
                    </tbody>
                </table>


            </div>
        );
    }

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
            <button onClick={()=>{this.setState({toggle:!this.state.toggle},function(){this.fetchRest()})}} style={{marginLeft:"50%"}} className="btn btn-danger">{this.state.toggle ? "View Uploads" : "Upload"}</button>
            {this.state.toggle ? this.renderTest() : this.renderButton()}

        </div>;
    }
}
