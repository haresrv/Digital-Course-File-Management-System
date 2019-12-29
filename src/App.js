import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import './Card.css';
// import { slide as Menu } from 'react-burger-menu';
import {courses} from './courses';
import tachyons from 'tachyons';
import CourseDashboard from './Components/CourseDashboard/CourseDashboard';
// import TickTock from './Components/TickTock/TickTock';
import Tracker from './Components/Tracker/Tracker';
import EnrolledCourses from './Components/EnrolledCourses/EnrolledCourses';
import Notes from './Components/Notes/Notes';
import CheckboxTrees from './Components/CheckboxTrees/CheckboxTrees';
import ProgressAdder from './Components/Progress4Mentor/ProgressAdder';
import Loading from './Components/Loading'


class Home extends Component {
    
    render()
    {
        
        return (
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: this.props.expanded ? 240 : 64}}>
                            <EnrolledCourses {...this.props}/>
                        </main>
                    </div>
            </div>
                )
    }

}

class CourseSelect extends Component
{
    render()
    {
        return(
            
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: this.props.expanded ? 240 : 64}}>
                            <CourseDashboard {...this.props}/>
                        </main>
                    </div>
            </div>
        )
    }
}

class ProgressChange extends Component
{

    render()
    {
        return(
            
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: this.props.expanded ? 180 : 64}}>
                            <ProgressAdder  {...this.props}/>
                        </main> 
                    </div>
            </div>
        )
    }
}

class PersonalSpace extends Component
{
    render()
    {
        return(
            
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: this.props.expanded ? 210 : 64}}>
                            <Notes/>
                        </main> 
                    </div>
            </div>
        )
    }
}
const routes = [
    {
        path: '/',
        component:Home,
        fetchInitialData:true
    },
    {
        path: '/home',
        component:Home,
        fetchInitialData:true
    },
    {
        path: '/coursedashboard',
        component:CourseSelect,
        fetchInitialData:true
    },
    {
        path: '/prog',
        component:ProgressChange,
        fetchInitialData:true
    },
    {
        path: '/notes',
        component:PersonalSpace,
        fetchInitialData:true
    }
]


class Ap extends Component
{
    
    constructor() {
        super();
        this.state = {
        isFlipped: false,      
        role:'faculty',
        route:"enter",
        expanded:false,
        selected:"home",
    
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));

    }

    showSettings (event) {
        event.preventDefault();
    }


    change=(ex,i)=>{
        if(i==1)
        this.setState({expanded:ex})
        else
        this.setState({selected:ex})
        console.log(this.state)
    }
    
    changeRoute=(ex)=>{
        this.setState({route:ex},function(){
            console.log("CHANGEDD"+this.state.route)
        })
        
    }



    render()
    {
        return (
            <Router>
                <div>
                <Tracker {...this.props} change={this.change} changeRoute={this.changeRoute}/>
                
                    <React.Suspense fallback={<Loading />} >
                        <Switch>
                            {
                                  
                                routes.map(({path,component:C, fetchInitialData})=>(
                                    <Route 
                                        key={path}
                                        path={path} 
                                        exact={true}
                                        render={(props)=><C {...props} expanded={this.state.expanded} fetchInitialData={fetchInitialData}/>} 
                                    />
                                ))
                            }

                        </Switch>
                    </React.Suspense>
                </div>
            </Router>
        )
    }
}


export default Ap;