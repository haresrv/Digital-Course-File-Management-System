import React,{Component} from 'react';
import tachyons from 'tachyons';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

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
        // // 'devices': ['Devices'],
        // 'reports': ['Reports']            
    };

  navigate = (pathname) => () => {
        this.onSelect(pathname)
        // this.props.changeRoute(pathname)
    };

handleLogOut = async event => {
    event.preventDefault();
    try{
        console.log(this.props)
        console.log("HERE")
        await Auth.signOut().then(data => console.log(data))
                    .then(xu=>{this.herewego()})
        
    }
    catch(error)
    {

    }
}

herewego = () =>{
    this.props.authProps.setAuthStatus(false)
    this.props.authProps.setUser(null)
    this.props.history.push("/login")
}

render(){
    const { expanded, selected } = this.state;
  return (   
             <div className="App outer-container"  style={{width:"1200px",marginLeft: expanded ? 240 : 64,padding: '15px 20px 0 20px',display:"flex"}}>
                    
                    {!this.props.authProps.isAuthenticated?
                            <div className="ma2 link" style={{position:"absolute",right:"0"}}>
                            
                            <button id="signin" onClick={this.navigate("login")}>
                              <strong>  Sign In</strong>
                            </button>
                            </div>
                            :
                            <div className="ma2" style={{position:"absolute",right:"0"}}>
                                
                                <button onClick={this.handleLogOut} id="signout" className="ma2 pa3 link">
                                <h4>{this.props.authProps.user==null?"":this.props.authProps.user.username}</h4>
                                <strong> Sign Out</strong>
                                 
                           
                                </button>
                            </div>
                        }
    <SideNav className="bg-gold" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                   {(this.props.authProps.role!="Admin"&&!this.props.isAuthenticated) &&
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
                                <i className="fa fa-fw fa-star" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
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
                }
                </SideNav>
             
        </div>
             
         );
  }
}

export default withRouter(Tracker);
