import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import {Auth} from 'aws-amplify';
import '@fortawesome/fontawesome-free/css/all.css';
import config from '../../config';
import AWS from 'aws-sdk';

class Register extends Component {
  state = {
    username: "",
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  async componentDidMount()
  {

    try
    {
    const session = await Auth.currentSession();
    
    console.log(session)
    
    if(!session.idToken.payload['cognito:groups'].includes("Admin"))
      {
        alert("You don't have permission to create user")
        this.props.history.push("/login")
      console.log("ERORO1")
      }
    }
    catch(error)
    {
      alert("You don't have permission to create user")
      this.props.history.push("/login")
    console.log("ERORO2") 
    }

  }

  

  handleSubmit = async event => {
    event.preventDefault();
    this.props.history.push('/welcome')

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
      console.log(this.state)
      return
    }
    // AWS Cognito integration here

    const {username,email,password} = this.state
    // try
    // {
    //     const signUpResponse = await Auth.signUp({
    //       username,
    //       password,
    //       attributes:{
    //         email:email,
    //         preferred_username:"nick",
    //         phone_number:"+91020929292"
    //       }
    //     })
    //     console.log(signUpResponse)
    //     this.props.history.push("/welcome")
    // }
    // catch(error)
    // {
    //     let err= null;
    //     !error.message? err={"message":error} : err = error
    //     this.setState({
    //       errors:{
    //         ...this.state.errors,
    //         cognito:err
    //       }

    //     })
    // }
try{
  console.log(username)
     // fetch('https://4y1lmnfnnh.execute-api.us-east-1.amazonaws.com/prod/adminCreate',{
     //      method:'post',
     //      headers:{'Content-Type':'application/json'},
     //      body:JSON.stringify({
     //        UserPoolId:config.cognito.USER_POOL_ID,
     //        username:username,
     //        email:email
     //      })
     //      }).then(res=> res.json())
     //      .then(data => console.log(data))

    var params = {
      UserPoolId: config.cognito.USER_POOL_ID, /* required */
      Username: username, /* required */

      DesiredDeliveryMediums: ["EMAIL"],
      ForceAliasCreation: false,
      TemporaryPassword: 'Faculty@amrita2000',
      UserAttributes: [
          { Name: "email", Value: email },
      ] 
    };
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
                                                                               {region: config.cognito.REGION,
                                                                                accessKeyId: config.ACCESS_KEY,
                                                                                secretAccessKey:config.SECRET_KEY,
                                                                                sessionToken:config.SESSION_TOKEN
                                                                              });
  console.log(cognitoidentityserviceprovider)


    cognitoidentityserviceprovider.adminCreateUser(params, (err, data)=> {
      if (err) console.log(err, err.stack); // an error occurred
      else     {
      console.log(data);       
          this.props.history.push('/welcome')
      }          // successful response

});
  }
  catch(error)
  {

      let err= null;
      !error.message? err={"message":error} : err = error
      this.setState({
        errors:{
          ...this.state.errors,
          cognito:err
        }
      })
  }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>

          <div className="row">
          <div className="col-md-push-1 col-md-4 hidden-sm hidden-xs">
            <img className="pull-right" src="https://cms.cb.amrita.edu/images/amrita_round_2019.png" style={{width:"44%", marginTop:"40px",pointerEvents: "none"}} alt="Amrita Vishwa Vidyapeetham Logo"/>
          </div>
          <div className="col-md-4 col-md-push-1">
           <h3><span className="weight-700">Digital Course File</span> | <span className="weight-300"> Register</span></h3>
           <FormErrors className="red blink" formerrors={this.state.errors} />
             <form  onSubmit={this.handleSubmit} style={{marginTop:"20px",padding:"40px"}} className="pa3 ma2" autoComplete="new-password">
                
                <div className="form-group">
                  <input 
                    className="form-control" 
                    type="text"
                    id="username"
                    aria-describedby="userNameHelp"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.onInputChange}
                  />
                </div>

                <div className="form-group">
                  <input 
                    className="form-control" 
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                </div>

                <div>
                    <button type="submit" onClick={this.handleSubmit} id="registerbutton" className="btn btn-primary">Register</button>
                    <button type="reset" id="resetbutton" className="btn btn-default" onClick={()=>{this.setState({username:"",password:""});this.clearErrorState()}}>Reset</button>
                </div>
            </form>
            </div>
            </div>

        </div>
      </section>
    );
  }
}

export default Register;

