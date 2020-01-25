import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            username: '',
            password: '',
            phone_number: '',
            email: '',
            confirmationCode: '',
            verified: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }
  
    signUp() {
        const { username, password, email, phone_number } = this.state;  
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number
            }
        })
        .then(() => {
            console.log('Successfully signed up');
        })
        .catch((err) => console.log(err))
    }
  
    confirmSignUp() {
        const { username, confirmationCode } = this.state;
        Auth.confirmSignUp(username, confirmationCode)
        .then(() => {
            console.log('Successfully confirmed signed up')
            this.props.handleSignup();
        })
        .catch((err) => console.log( err))
    }
  
    handleSubmit(e) {
      const { verified } = this.state;
  
        e.preventDefault();
  
        if (verified) {
          this.confirmSignUp();
          this.setState({
             confirmationCode: '',
             username: ''
          });
        } else {
          this.signUp();
          this.setState({
            password: '',
            email: '',
            phone_number: '',
            verified: true
        });
        }
        e.target.reset();
    }
  
    handleChange(e) {
        if (e.target.id === 'username') {
          this.setState({
              username: e.target.value
          });
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        }
    }
  
    render() {
      const { verified } = this.state;
      if (verified) {
          return (
              <div>
                  <form onSubmit={ this.handleSubmit }>
                      <label>Confirmation Code</label>
                      <input id='confirmationCode' type='text' onChange={ this.handleChange }/>
                      <button>Confirm Sign up</button>
                  </form>
              </div>
          );
      } else {
        return (
          <div>
            <form onSubmit={ this.handleSubmit }>
                <label>Username</label>
                <input id='username' type='text' onChange={ this.handleChange }/>
                <label>Password</label>
                <input id='password' type='password' onChange={ this.handleChange }/>
                <label>Phone Number</label>
                <input id='phone_number' type='text' onChange={ this.handleChange }/>
                <label>Email</label>
                <input id='email' type='text' onChange={ this.handleChange }/>
                <button>Sign up</button>
            </form>
          </div>
        );
      }
    }
}

export default SignUpForm;