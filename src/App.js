import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import './Card.css';
import tachyons from 'tachyons';
import Navbar from './Components/Navbar';
import CourseDashboard from './Components/CourseDashboard/CourseDashboard';
// import TickTock from './Components/TickTock/TickTock';
import Tracker from './Components/Tracker/Tracker';
import EnrolledCourses from './Components/EnrolledCourses/EnrolledCourses';
import Notes from './Components/Notes/Notes';
import CheckboxTrees from './Components/CheckboxTrees/CheckboxTrees';
import ProgressAdder from './Components/Progress4Mentor/ProgressAdder';
import Loading from './Components/Loading';
import {TodoApp} from './Components/TodoApp/TodoApp';
import Amplify from 'aws-amplify';
import {Auth} from 'aws-amplify';
import config from './config';
import ForgotPassword from './Components/auth/ForgotPassword';
import ForgotPasswordVerification from './Components/auth/ForgotPasswordVerification';
import ChangePassword from './Components/auth/ChangePassword';
import ChangePasswordConfirm from './Components/auth/ChangePasswordConfirm';
import Welcome from './Components/auth/Welcome';
import Footer from './Components/Footer';
import LogIn from './Components/auth/LogIn';
import Register from './Components/auth/Register';
import Uploader from './Components/S3Upload/Uploader';

Amplify.configure({
    Auth:{
        mandatorySignId:true,
        region:config.cognito.REGION,
        userPoolId:config.cognito.USER_POOL_ID,
        userPoolWebClientId:config.cognito.APP_CLIENT_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		
	}
})

const Home =(props) =>
{
    if(!props.authProps.isAuthenticated)
        props.history.push("/login")
    
        return (
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 240 : 64}}>
                            <EnrolledCourses {...props}/>
                        </main>
                    </div>
            </div>
                )
}

const CourseSelect =(props) =>{
        return(
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 240 : 64}}>
                            <CourseDashboard {...props}/>
                        </main>
                    </div>
            </div>
        )
    }

const ProgressChange = (props) =>
{
    return(
            
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 180 : 64}}>
                            <ProgressAdder  {...props}/>
                        </main> 
                    </div>
            </div>
        )
}

const PersonalSpace = (props) =>
{
        return(
            
            <div className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 210 : 64}}>
                            <Notes/>
                        </main> 
                    </div>
            </div>
        )
}

var todoItems = [];

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
    },
    {
        path: '/todo',
        component:TodoApp,
        fetchInitialData:todoItems
    },
    {
        path:'/login',
        component:LogIn,
        fetchInitialData:true
    },
    {
        path:'/register',
        component:Register,
        fetchInitialData:true
    },
    {
        path:'/forgotpassword',
        component:ForgotPassword,
        fetchInitialData:true
    },
    {
        path:'/forgotpasswordverification',
        component:ForgotPasswordVerification,
        fetchInitialData:true
    },
    {
        path:'/changepassword',
        component:ChangePassword,
        fetchInitialData:true
    },
    {
        path:'/changepasswordconfirm',
        component:ChangePasswordConfirm,
        fetchInitialData:true
    },
    {
        path:'/welcome',
        component:Welcome,
        fetchInitialData:true
    },
    {
        path:'/upload',
        component:Uploader,
        fetchInitialData:true
    
    }
]


class App extends Component
{
    constructor() {
        super();
        this.state = {
        
        role:"",
        expanded:false,
        selected:"home",
        isAuthenticated:false,
        isAuthenticating:true,
        user:null

        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount()
    {
        // window.LOG_LEVEL='DEBUG'
        try
        {
            const session = await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();
            this.setAuthStatus(true)
            this.setUser(user);
            console.log(session)
            if(session.idToken.payload['cognito:groups'].includes("Admin"))
            {
                this.setRole("Admin")
            }
            else
            {
                this.setRole("Faculty")
            }
            console.log("COMPONENT PERSISTED")
            console.log(this.state)
        }   
        catch(error)
        {   console.log("COMPONENT PERSIST ERROR")
            console.log(error)
            this.setRole("");
        }
        this.setState({isAuthenticating:false})
    }

    comp() {
        if(!this.state.isAuthenticated&&(!window.location.href.includes("login"))&&(!window.location.href.includes("register"))&&(!window.location.href.includes("password")))
        if(this.state.role=="")
        {   window.location.href=window.location.origin+"/login"
            console.log("Manually Redirected to /login")    
        }
    }
    setAuthStatus=(authenticated)=>{
        this.setState({isAuthenticated:authenticated})
    }

    setUser=(user)=>{
        this.setState({user:user})
    }
    
    setRole=(role)=>{
        this.setState({role:role})
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
            console.log("CHANGED Route to "+this.state.route)
        })
        
    }

    render()
    {  
        //  {
        //  if(!this.state.isAuthenticating)
        // this.comp()
        // }
        const authProps = {
            isAuthenticated :this.state.isAuthenticated,
            user: this.state.user,
            role:this.state.role,
            setAuthStatus:this.setAuthStatus,
            setUser:this.setUser,
            setRole:this.setRole
        }

        return ( !this.state.isAuthenticating &&
            <Router>
                <div>
                <Tracker {...this.props} authProps={authProps} change={this.change} changeRoute={this.changeRoute}/>
                    
                    <React.Suspense fallback={<Loading />} >
                        <Switch>
                            {
                                  
                                routes.map(({path,component:C, fetchInitialData})=>(
                                    <Route 
                                        key={path}
                                        path={path} 
                                        exact={true}
                                        render={(props)=><C {...props} expanded={this.state.expanded} authProps={authProps} fetchInitialData={fetchInitialData}/>} 
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

export default App;