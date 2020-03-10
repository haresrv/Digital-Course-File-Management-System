import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import Auth from '@aws-amplify/auth';

class ForgotPassword extends Component {
  state = {
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

  forgotPasswordHandler = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try{
        await Auth.forgotPassword(this.state.email);
        this.props.history.push("/forgotpasswordverification")
    }
    catch(error)
    {
        console.log(error)
    }
  }

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
          <h1>Forgot your password?</h1>
          <p>
            Please enter the email address associated with your account and we'll
            email you a password reset link.
          </p>
          <FormErrors id="forgotpasswordpageerror" formerrors={this.state.errors} />

          <form onSubmit={this.forgotPasswordHandler}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button id="confirmemail" className="button is-success">
                  Confirm email
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPassword;
