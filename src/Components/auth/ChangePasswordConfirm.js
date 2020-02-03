import React, { Component } from "react";
import {Auth} from 'aws-amplify';

class ChangePasswordConfirmation extends Component {

  async componentDidMount(){

  //       const session = await Auth.currentSession();
  //       console.log(session)

  //     setTimeout(function() { //Start the timer
      
  //       if(session.idToken.payload['cognito:groups'])
  //       {if(session.idToken.payload['cognito:groups'].includes("Admin"))
  //           this.props.authProps.setRole("Admin")
  //           this.props.history.push("/admin")
  //       }
  //       else
  //       {
  //           this.props.authProps.setRole("Faculty")
  //           this.props.history.push("/")
  //       }

  // }.bind(this), 10000)

  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
        </div>
      </section>
    );
  }
}

export default ChangePasswordConfirmation;