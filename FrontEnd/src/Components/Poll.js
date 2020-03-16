import React, { Component } from 'react'
import Poll from 'react-polls'
import './poll.css'
import 'react-dropdown/style.css';
import "react-toggle/style.css";
const pollQuestion1 = 'Does the syllabus have to be changed?'
const pollAnswers1 = [
  { option: 'Yes', votes: 5 },
  { option: 'No', votes: 3 },
  { option: 'Not Sure', votes: 0 }
]
const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true ,
  questionColor: '#d11010',
  align: 'center',
  theme: 'red'
}


const pollQuestion2 = 'Are the number of classes enough?'
const pollAnswers2 = [
  { option: 'Yes', votes: 5 },
  { option: 'No', votes: 2 },
  { option: 'Not sure', votes: 1 }
]
const pollStyles2 = {
  questionSeparator: false,
  questionSeparatorWidth: 'question',
  questionBold: false ,
  questionColor: '#4F70D6',
  align: 'center',
  theme: 'blue'
}


const pollQuestion3 = 'Was the overall feedback from the students positive or negative?'
const pollAnswers3= [
  { option: 'Positive', votes: 5 },
  { option: 'Negative', votes: 2 },
  { option: 'Neutral', votes: 1 }
]
const pollStyles3 = {
  questionSeparator: false,
  questionSeparatorWidth: 'question',
  questionBold: false ,
  questionColor: '#4A4E69',
  align: 'center',
  theme: 'grey'
}
 
export default class App extends Component {
	state = {
		pollAnswers1: [...pollAnswers1],
		pollAnswers2: [...pollAnswers2],
		pollAnswers3: [...pollAnswers3],
	  }
	
	  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
		const newPollAnswers = pollAnswers.map(answer => {
		  if (answer.option === voteAnswer) answer.votes++
		  return answer
		})
	
		if (pollNumber === 1) {
		  this.setState({
			pollAnswers1: newPollAnswers
		  })
		} else if(pollNumber==2){
		  this.setState({
			pollAnswers2: newPollAnswers
		  })
		}
		else{
		  this.setState({
			pollAnswers3: newPollAnswers
		  })
		}
	  }
	
	  componentDidMount() {
		const { pollAnswers1, pollAnswers2 } = this.state
	  }
	
	

	


// 

	render() {
		const { pollAnswers1, pollAnswers2,pollAnswers3 } = this.state
		// return <div className="qnbank">{this.renderTest()}{this.renderButton()}</div>
			return <div className="qnbank"  style={{"position":"relative","top":"50px",marginLeft:"64px"}}>
				
				<div className="wrapper">
					<br></br>
					<br></br>
					<br></br>
          <div className="wrapper">
            <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
          </div >
          <div className="wrapper">
            <Poll question={pollQuestion2} answers={pollAnswers2} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers2, 2)} customStyles={pollStyles2} noStorage />
          </div>
          <div className="wrapper">
            <Poll question={pollQuestion3} answers={pollAnswers3} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers3, 3)} customStyles={pollStyles3} noStorage />
          </div>
		  </div>
      </div>
	}
}

