import React, { Component ,Suspense, lazy} from 'react';
import Auth, { AuthClass } from '@aws-amplify/auth';
import Storage, { StorageClass } from '@aws-amplify/storage';
import Cache from '@aws-amplify/cache';
import FormErrors from '../FormErrors';
import Validate from '../utility/FormValidation';
import i from '../../Images/amrita_round_2019.jpg';

const tachyons = lazy(() => import('tachyons'))

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  async componentDidMount()
  {
    try
    {
    const session = await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();

    console.log("HERE1")

    this.props.authProps.setUser(user)
    this.props.authProps.setAuthStatus(true)

    if(this.props.authProps.isAuthenticated)
    {
      console.log("HERE2")
       if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")
       else
        this.props.history.push("/")
    }
     }
     catch
     { 
    console.log("HERE3")
      }
   }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // Form validation
    console.log(this.state)
    this.clearErrorState();
    const error = Validate(event, this.state);
    
    if (error) {
      
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    
      return
    }

    const {username,email,password} = this.state
    try {
      this.props.authProps.setAuthStatus2(true)
      const user = await Auth.signIn(username, password);
      this.props.authProps.setAuthStatus2(false)
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          
          const {requiredAttributes} = user.challengeParam;
          this.props.authProps.setTUser(user)
          this.props.authProps.setTUsername(username)
          
          this.props.history.push('/setpass')

          return
      } else {
          console.log(user);
      }
      
        const session = await Auth.currentSession();
        console.log(session)

        this.props.authProps.setAuthStatus(true)
        this.props.authProps.setUser(user)
        
        if (user!=null)
         { if (user.attributes!=null) 
            {this.props.authProps.setUserID(user.attributes.sub)}
           } 
           if(session.idToken.payload['cognito:groups']!=null)
            {
                if(session.idToken.payload['cognito:groups'].includes("Admin"))
                    { 
                      this.props.authProps.setRole("Admin")
                      this.props.history.push("/admin")  
                    }
                else
                    {
                      this.props.authProps.setRole("Faculty")
                      this.props.history.push("/")
                    }
            }
        
        else
        {
            this.props.authProps.setRole("Faculty")
            this.props.history.push("/")
        }

  }

    catch(error)
    {
      console.log("ERROR131")
      this.props.authProps.setAuthStatus2(false)
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
    console.log(event.target.id)
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div id="login" className="container">
          <h1>Log in</h1>

          <div className="row">
          <div className="col-md-push-1 col-md-4 hidden-sm hidden-xs">
            <img className="pull-right" src={i} style={{width:"44%", marginTop:"40px",pointerEvents: "none"}} alt="Amrita Vishwa Vidyapeetham Logo"/>
          </div>
          <div className="col-md-4 col-md-push-1">
           <h3><span id="mainappname" className="weight-700">DCF</span> | <span className="weight-300"> Login</span></h3>
          <Suspense>
           <FormErrors id="loginerror" className="red blink" formerrors={this.state.errors} />
          </Suspense>
             <form  onSubmit={this.handleSubmit} style={{marginTop:"20px",padding:"40px"}} className="pa3 ma2" autoComplete="new-password">
                
                <div className="form-group">
                    <input type="text"  id="username"  value={this.state.username} onChange={this.onInputChange} className="form-control" name="username" placeholder="Enter your username" autoComplete="new-password"/>
                </div>
                <div className="form-group">
                    <input type="password" id="password"  value={this.state.password} onChange={this.onInputChange} className="form-control" name="password" placeholder="Enter your password" autoComplete="new-password" />
                </div>
                <div className="form-group">
                    <a href="/forgotpassword" id="forgotpasswordlink" className="text-muted" >Having trouble logging in ?</a>
                </div>
                <div>
                    <button type="submit" onClick={this.handleSubmit} id="submitbutton" className="btn btn-primary">Login</button>
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

export default LogIn;
