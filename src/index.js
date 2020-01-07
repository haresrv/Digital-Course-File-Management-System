import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
// import TickTock from './Components/TickTock/TickTock';
import Tracker from './Components/Tracker/Tracker';
import ProgressMentor from './Components/Progress4Mentor/ProgressMentor';
import * as serviceWorker from './serviceWorker';
import ProgressAdder from './Components/Progress4Mentor/ProgressAdder';
import CourseDashboard from './Components/CourseDashboard/CourseDashboard';
// import TickTock from './Components/TickTock/TickTock';
import Notes from './Components/Notes/Notes';



// ReactDOM.render(<Tracker />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<ProgressMentor />, document.getElementById('root'));
// ReactDOM.render(<TickTock />, document.getElementById('root'));
// ReactDOM.render(<ProgressAdder />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
