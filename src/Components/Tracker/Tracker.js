import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Tracker.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import { withRouter } from 'react-router-dom';
import {Auth} from 'aws-amplify';


class Tracker extends Component {

constructor() {
    super();
      this.state = {
 		selected: 'home',
        expanded: false
    };
  }

 onSelect = (selected) => {
        this.setState({ selected: selected },function(){
            this.props.history.push(this.state.selected)
        });
        this.props.change(selected,2)
        
    };
 
 onToggle = (expanded) => {
        this.setState({ expanded: expanded });
        this.props.change(expanded,1)
    };

 pageTitle = {
        'home': 'Home',
        'devices': ['Devices'],
        'reports': ['Reports']            
    };

  navigate = (pathname) => () => {
        this.onSelect(pathname)
        this.props.changeRoute(pathname)
    };

handleLogOut = async event => {
    event.preventDefault();
    try{
        Auth.signOut()
        this.props.authProps.setAuthStatus(false)
        this.props.authProps.setUser(null)
        this.props.history.push("/login")
    }
    catch(error)
    {

    }
}


render(){
    const { expanded, selected } = this.state;
    console.log(this.props)
  return (   
             <div className="App outer-container"  style={{width:"1200px",marginLeft: expanded ? 240 : 64,padding: '15px 20px 0 20px',display:"flex"}}>
                    
                    <ButtonGroup style={{width:"500px"}}>
                        <Button btnStyle="flat" onClick={this.navigate('home')}>
                            Home
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('devices')}>
                            Devices
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('reports')}>
                            Reports
                        </Button>

                    </ButtonGroup>
                    
                            
                    {!this.props.authProps.isAuthenticated?
                            <div className="ma2 link" style={{position:"absolute",right:"0"}}>
                            
                            <Button btnStyle="flat" id="signin" onClick={this.navigate("login")}>
                              <strong>  Sign In</strong>
                            </Button>
                            </div>
                            :
                            <div className="ma2" style={{position:"absolute",right:"0"}}>
                                
                                <Button btnStyle="flat" id="register" className="ma2 pa3 link" onClick={this.navigate("register")}>
                                    <strong>Register</strong>
                                 </Button>
                                <Button onClick={this.handleLogOut} id="signout" className="ma2 pa3 link" btnStyle="flat">
                                <h4>{this.props.authProps.user==null?"":this.props.authProps.user.username}</h4>
                                <strong> Sign Out</strong>
                                 
                           
                                </Button>
                            </div>
                        }
    <SideNav className="bg-gold" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Home" >
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="timetable">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="timetable" >
                                Time Table
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="notifications">
                            <NavIcon>
                                <i className="fa fa-fw fa-bell-o" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="notifications" >
                                 Notifications
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="notes">
                            <NavIcon>
                                <i className="fa fa-fw fa-newspaper-o" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="notes" >
                                Personal Space
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="reports">
                            <NavIcon>
                                <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Reports">
                                Reports
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                                Settings
                            </NavText>
                            <NavItem eventKey="settings/policies">
                                <NavText title="Policies">
                                    Policies
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="settings/network">
                                <NavText title="Network">
                                    Network
                                </NavText>
                            </NavItem>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
             
        </div>
             
         );
  }
}

export default withRouter(Tracker);
