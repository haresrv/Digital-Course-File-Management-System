import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import App from '../../App';


class SignInForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            user: '',
            password: '',
            signedIn: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
        this.confirmSignIn = this.confirmSignIn.bind(this);
    }
  
    signIn() {
        const { username, password } = this.state;  
        Auth.signIn({
            username: username,
            password: password
        })
        .then(() => console.log('successfully signed in'))
        .catch((err) => console.log(`Error signing in: ${ err }`))
    }
  
    signOut() {
        
        Auth.signOut()
        .then(() => console.log('successfully signed out'))
        .catch((err) => console.log(err))
    }
  
    confirmSignIn() {
        const { username } = this.state;
        Auth.confirmSignIn(username)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(err))
    }
  
    handleSubmit(e) {
        e.preventDefault();

        this.signIn();
        this.confirmSignIn()
        this.setState({
            username: '',
            password: '',
            signedIn: true
        });
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
        }
    }
  
    render() {
      const { signedIn } = this.state;
      if (signedIn) {
          return (
              <div>
                  <button onClick={this.signOut}>Sign Out</button>
                  <App/>
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
                <button>Sign In</button>
            </form>
          </div>
        );
      }
    }
}

export default SignInForm;