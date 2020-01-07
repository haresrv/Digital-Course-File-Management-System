import React,{Component} from 'react';
import './App.css';
import tachyons from 'tachyons';
import Loading from './Components/Loading';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import SignInForm from './Components/SignInForm/SignInForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';

Amplify.configure(aws_exports);

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedUp : false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleSignup() {
        this.setState({
            signedUp: true
        });
    }

    handleToggle() {
        const {signedUp} = this.state
        this.setState({
            signedUp: !signedUp
        });
    }

    render() {
        const { signedUp } = this.state;
        return(
            <div>
            <button onClick={this.handleToggle}>Toggle</button>
         {!signedUp ? <SignUpForm handleSignup={ this.handleSignup }/> : <SignInForm />}
         </div>
        )
    }
}
