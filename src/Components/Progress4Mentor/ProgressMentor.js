import React,{Component} from 'react';
import tachyons from 'tachyons';
import Expandable from 'react-expandable';
import styled from 'styled-components';
import { Line,Circle} from 'rc-progress';

const Item = styled.div`
  display: inline-block;
  padding: 12px;
`;
 
const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;
 
const ItemTitle = styled.div`
`;
 
const ItemIcon = styled.div`
`;

const containerStyle = {
  width: '250px',
};
const circleContainerStyle = {
  width: '250px',
  height: '250px',
  display: 'inline-block',
};

class ProgressMentor extends Component {

constructor() {
    super();
      this.state = {
     percent: 30,
      color: '#3FC7FA',
    };
  }

componentDidMount()
{
	
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

}

render(){
  return ( <div className="">
  	<h5>Progress Tracker</h5>
    <Expandable className="bg-white b--solid black"
				    headers={[
				      ({ isOpened }) => (
				        <ItemHeader>
				          <ItemTitle>Week - 1</ItemTitle>
				          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
				        </ItemHeader>
				      ),
				      ({ isOpened }) => (
				        <ItemHeader>
				          <ItemTitle>Week - 2</ItemTitle>
				          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
				        </ItemHeader>
				      ),
				      ({ isOpened }) => (
				        <ItemHeader>
				          <ItemTitle>Week - 3</ItemTitle>
				          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
				        </ItemHeader>
				      ),
				    ]}
				    enableMultiOpen>
				    <Item className="b--solid black" style={{width:"500px"}}>
				     	 <input type="checkbox"/> Topic1<br/>
				      	 <input type="checkbox"/> Topic2<br/>
				      	 <input type="checkbox"/> Topic3<br/>
				      	  	<h3>Progress {this.state.percent}%</h3>
				      	   <Line percent={this.state.percent} strokeWidth="10" strokeColor="#3a8030" style={{width:"200px"}}/>
				    </Item>
				    <Item className="b--solid black">
			        	 <input type="checkbox"/> Topic1<br />
				      	 <input type="checkbox"/> Topic2<br />
				      	 <input type="checkbox"/> Topic3<br />
						 <h3>Progress {this.state.percent}%</h3>
				      	   <Line percent={this.state.percent} strokeWidth="10" strokeColor="#3a8030" style={{width:"200px"}}/>
			
				    </Item>
				    <Item className="b--solid black">
			         	 <input type="checkbox"/> Topic1<br />
				      	 <input type="checkbox"/> Topic2<br />
				      	 <input type="checkbox"/> Topic3<br />
				      	 <h3>Progress {this.state.percent}%</h3>
				      	   <Line percent={this.state.percent} strokeWidth="10" strokeColor="#3a8030" style={{width:"200px"}}/>
			
				    </Item>
			  </Expandable>
             </div>
         );
  }
}

export default ProgressMentor;
