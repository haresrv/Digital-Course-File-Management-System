import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import Auth from '@aws-amplify/auth';


class SetPass extends Component {
  state = {
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  async componentDidMount(){
      // this.setState({username:this.props.location.state.params.username},function(){console.log(this.state)})
       this.setState({user:this.props.authProps.Tempuser})
       this.setState({username:this.props.authProps.Tempusername})
 // console.log(this.props.authProps.Tempuser)
 
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.props)
    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
      return
    }

    // AWS Cognito integration here
    try{
      const loggedUser = await Auth.completeNewPassword(
              this.state.user,              // the Cognito User Object
              this.state.password,       // the new password
          );

        this.props.history.push("/changepasswordconfirm")
      
  }
  catch(error)
  {
      console.log(error)
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
          <p>Looks like you've logged in for first time. Please change your password.</p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="col-md-4 col-md-push-1">
            
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="New password"
                  value={this.state.newpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="form-control"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button type="submit" onClick={this.handleSubmit} id="setpassbutton" className="btn btn-primary">Set Password</button>
              </p>
            </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default SetPass;