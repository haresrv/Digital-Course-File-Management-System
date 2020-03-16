import React,{Component,Suspense, lazy} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Amplify from '@aws-amplify/core';
import Auth, { AuthClass } from '@aws-amplify/auth';
import Storage, { StorageClass } from '@aws-amplify/storage';
import Cache from '@aws-amplify/cache';
import Tracker from './Components/Tracker/Tracker';
import {TodoApp} from './Components/TodoApp/TodoApp';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "./legoloading.json";
import * as doneData from "./doneLoading.json";
import tachyons from 'tachyons';
import './App.css';
import config from './config';
import {ReportStats,Faculty} from './Components/ReportStats/ReportStats';
import LogIn from './Components/auth/LogIn';
import CourseFAQ from './Components/CourseFAQ';
import Poll from './Components/Poll';
const CourseDashboard = lazy(() => import('./Components/CourseDashboard/CourseDashboard'))
const MentorDashboard = lazy(() => import('./Components/CourseDashboard/MentorDashboard'))
const EnrolledCourses = lazy(() => import('./Components/EnrolledCourses/EnrolledCourses'))
const  Notes= lazy(() => import('./Components/Notes/Notes'))
const  ProgressAdder= lazy(() => import('./Components/Progress4Mentor/ProgressAdder'))
const  ForgotPassword= lazy(() => import('./Components/auth/ForgotPassword'))
const  ForgotPasswordVerification= lazy(() => import('./Components/auth/ForgotPasswordVerification'))
const  ChangePassword= lazy(() => import('./Components/auth/ChangePassword'))
const  SetPass= lazy(() => import('./Components/auth/setpass'))
const  ChangePasswordConfirm= lazy(() => import('./Components/auth/ChangePasswordConfirm'))
const  Welcome= lazy(() => import('./Components/auth/Welcome'))
const  Register= lazy(() => import('./Components/auth/Register'))
const  Uploader= lazy(() => import('./Components/S3Upload/Uploader'))
const  changer= lazy(() => import('./Components/S3Upload/change'))
const  AdminLog= lazy(() => import('./Components/Admin/AdminLog'))
const  digitalRep= lazy(() => import('./Components/S3Upload/digitalRep'))
const  qnbank= lazy(() => import('./Components/S3Upload/qnbank'))

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

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Admin =(props) =>
{
    if(!props.authProps.isAuthenticated)
        props.history.push("/login")
    
        return (
            <div id="home" className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 240 : 64}}>
                            <AdminLog {...props}/>
                        </main>
                    </div>
            </div>)
}

const Home =(props) =>
{
   console.log(props)
    if(props.authProps.role=="Admin")
        props.history.push("/admin")

    if(!props.authProps.isAuthenticated)
        props.history.push("/login")
    
        return (
            <div id="home" className="App outer-container">
                    <div>         
                        <main id={"page-wrapper"} style={{marginLeft: props.expanded ? 240 : 64}}>
                            <EnrolledCourses {...props}/>
                        </main>
                    </div>
            </div>)
}

const CourseSelect =(props) =>{

    if(props.authProps.role=="Admin")
        props.history.push("/admin")

        return(
            <div id="course-select" className="App outer-container">
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

    if(props.authProps.role=="Admin")
        props.history.push("/admin")

    return(
            
            <div id='progress-change' className="App outer-container">
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

    if(props.authProps.role=="Admin")
        props.history.push("/admin")

        return(
            
            <div id="personal-space" className="App outer-container">
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
        path: '/poll',
        component:Poll,
        fetchInitialData:true
    },
    {
        path: '/ReportStats',
        component:Faculty,
        fetchInitialData:true
    },
    {
        path: '/home',
        component:Home,
        fetchInitialData:true
    },
    {
        path: '/coursefaq',
        component:CourseFAQ,
        fetchInitialData:true
    },
    {
        path: '/qnbank',
        component:qnbank,
        fetchInitialData:true
    },
    {
        path:'/pathupload',
        component:changer,
        fetchInitialData:true
    
    },
    {
        path: '/admin',
        component:Admin,
        fetchInitialData:true
    },
    {
        path: '/mentordashboard',
        component:MentorDashboard,
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
    
    },
    {
        path:'/digrep',
        component:digitalRep,
        fetchInitialData:true
    },
    {
        path:'/setpass',
        component:SetPass,
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
        isAuthenticating:false,
        user:null,
        Tempuser:null,
        Tempusername:'',
        currentSelectedCourse:'',
        currentSelectedSemester:'',
        currentSelectedYear:'',
        };
    }

    async componentDidMount()
    {
        window.LOG_LEVEL='DEBUG'
        try
        {
            const session = await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();
            this.setAuthStatus(true)
            this.setUser(user);
            console.log(session.idToken.payload['cognito:groups'])
            console.log(user)
            if(session.idToken.payload['cognito:groups']!=null)
            {
                if(session.idToken.payload['cognito:groups'].includes("Admin"))
                    this.setRole("Admin")
                else
                    this.setRole("Faculty")
                this.setState({user_id:user.attributes.sub})
            }
            else
            {
                this.setRole("Faculty")
                this.setState({user_id:user.attributes.sub})
            }
            console.log("COMPONENT PERSISTED")
            console.log(this.state)
        }   
        catch(error)
        {   
            console.log("COMPONENT PERSIST ERROR")
            console.log(error)
            this.setAuthStatus(false)
            this.setUser("");
            this.setRole("");
        }
        this.setState({isAuthenticating:false})
    }

    comp() {
    }


    
    setAuthStatus=(authenticated)=>{
        this.setState({isAuthenticated:authenticated})
    }


    setAuthStatus2=(authenticated)=>{
        this.setState({isAuthenticating:authenticated})
    }

    setUser=(user)=>{
        this.setState({user:user})
    }
    
    setUserID=(userid)=>{
        this.setState({user_id:userid})
    }
    
    setSemester=(role)=>{
        this.setState({currentSelectedSemester:role})
    }

    setYear=(role)=>{
        this.setState({currentSelectedYear:role})
    }

    setCoursename=(role)=>{
        this.setState({currentSelectedCourse:role})
    }

    setRole=(role)=>{
        this.setState({role:role})
    }


    setTUser=(role)=>{
        this.setState({Tempuser:role})
    }


    setTUsername=(role)=>{
        this.setState({Tempusername:role})
    }

    change=(ex,i)=>{
        if(i==1)
        this.setState({expanded:ex})
        else
        this.setState({selected:ex})
        // console.log(this.state)
    }
    
    render()
    {  
         {
         if(!this.state.isAuthenticating)
        this.comp()
        }
        const authProps = {
            isAuthenticated :this.state.isAuthenticated,
            user: this.state.user,
            role:this.state.role,
            currentSelectedCourse:this.state.currentSelectedCourse,
            currentSelectedYear:this.state.currentSelectedYear,
            currentSelectedSemester:this.state.currentSelectedSemester,
            Tempuser:this.state.Tempuser,
            Tempusername:this.state.Tempusername,
            setAuthStatus:this.setAuthStatus,
            setAuthStatus2:this.setAuthStatus2,
            setUser:this.setUser,
            setRole:this.setRole,
            setSemester:this.setSemester,
            setYear:this.setYear,
            setCoursename:this.setCoursename,
            setTUsername:this.setTUsername,
            setTUser:this.setTUser,
            setUserID:this.setUserID,
            expanded:this.state.expanded
        }

            //            
            
        return (
              <div>  
        <Router>
                <div>
                    {<Tracker {...this.props} authProps={authProps} change={this.change}  changeRoute={this.changeRoute}/>}
                    {           this.state.isAuthenticating &&( <FadeIn className="bg-black white">
                            <div >
                              
                              {!this.state.loading ? (

                                <Lottie options={defaultOptions} height={120} width={120} />
                              ) : (
                                <Lottie options={defaultOptions2} height={120} width={120} />
                              )}
                            </div>
                            <h6 className="tc">Authenticating....</h6>
                          </FadeIn>)
                      }

                    <React.Suspense fallback={<div>Loading...</div>}>
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

        </div>
        )
    }
}

export {App,Home,CourseSelect,ProgressChange,PersonalSpace};