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
        'reports': ['Reports'],
        'settings/policies': ['Settings', 'Policies'],
        'settings/network': ['Settings', 'Network']
    };

  navigate = (pathname) => () => {
        this.onSelect(pathname)
        this.props.changeRoute(pathname)
    };


render(){
	const { expanded, selected } = this.state;
    {console.log(this.props)}
  return (   
             <div className="App outer-container"  style={{marginLeft: expanded ? 240 : 64,padding: '15px 20px 0 20px'}}>
					<ButtonGroup>
                        <Button btnStyle="flat" onClick={this.navigate('home')}>
                            Home
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('devices')}>
                            Devices
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('reports')}>
                            Reports
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle>
                                Settings
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem onClick={this.navigate('settings/policies')}>
                                    Policies
                                </MenuItem>
                                <MenuItem onClick={this.navigate('settings/network')}>
                                    Network
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonGroup>

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
