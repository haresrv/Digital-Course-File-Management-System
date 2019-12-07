import React,{Component} from 'react';
import './Card.css';
import tachyons from 'tachyons';


class Card extends Component
{

constructor(props)
{
	super(props);
	this.state={
	}
}

render(){


return (
	<div className="main-wrap dib" >
	
		<div className="shop-list-item-container-wrap" >
		 
					<div id={this.props.id} className="tc shop-list-item-container grow bg-black ma2 pa3" >
					   <a onClick={()=>{this.props.change(this.props.alt)}}>
					      <div className="shop-list-item-details bg-white dib gold br3 pa3 ma2" style={{width:"280px",height:"150px"}}>
					         	 <div style={{display:"flex",justifyContent:"center"}}>
					         	 <img src={this.props.img} className="artiststhumbnail" style={{width:"150px",height:"120px"}}/>
					         	 </div>
					      <h2 className="tc">{this.props.words}</h2>
					      </div>
					      
					   </a>
					</div>


		</div>
	</div>

);

}




}


export default Card;