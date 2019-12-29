import React,{Component} from 'react';
import tachyons from 'tachyons';
import './ProgressAdder.css';
import tick from '../../Images/tick.png';
import cross from '../../Images/cross.png';
import { Line,Circle} from 'rc-progress';

class ProgressAdder extends Component {

constructor() {
    super();
      this.state = { 	
    route:"rest",
    mode:"insert",
    deleteids:[],
    headers:  [{id:0,lectures:[],topic:'',completed:false,remarks:''}],
    plans: []
    };
  }
//sort fetched entries based on id
sortByProperty(property){  
   return function(a,b){  
      if(a[property] > b[property])  
         return 1;  
      else if(a[property] < b[property])  
         return -1;  
      return 0;  
   }  
}

fetchRest(){
  var xyz=[]
        fetch('https://j5ch5cir24.execute-api.us-east-1.amazonaws.com/prod/track').then(res=> res.json())
        .then(datas=>{xyz=datas})
        .then(sh=>{xyz.sort(this.sortByProperty("id"))})
        .then(data=>{this.setState({plans:xyz})})
        .then(xy=>console.log("Fetching AGAIN"))
        .then(y=>console.log(this.state.plans))

        .catch((err)=>{console.log(err);})
}

fetchRest2(){
        fetch('https://j5ch5cir24.execute-api.us-east-1.amazonaws.com/prod/track').then(res=> res.json())
        .then(data=>{this.setState({plans:data})})
        .then(xy=>console.log("Fetching AGAIN"))
        .then(y=>console.log(this.state))
        .then(tx=>this.handleS3())
        .then(tsx=>this.handleS3())
        .then(tswx=>this.handleS3())
        .catch((err)=>{console.log(err);})
}

 componentDidMount() {
  this.fetchRest();
    }


renderTableHeader() {
  let header = Object.keys(this.state.headers[0])
  return header.map((key, index) => {
     return <th className="tc" key={index}>{key.toUpperCase()}</th>
  })
}

renderDeleteTableHeader() {
  let header = Object.keys(this.state.headers[0])
  header.unshift("Check");
  return header.map((key, index) => {
     return <th className="tc" key={index}>{key.toUpperCase()}</th>
  })
}

renderInsertTableHeader() {
  let header = Object.keys(this.state.headers[0])
  header.push("Insert/Cancel");
  return header.map((key, index) => {
     return <th className="tc" key={index}>{key.toUpperCase()}</th>
  })
}



renderInsertTableData() {
  
  var p= this.state.plans.map((restaurant, index) => {
     const {id,completed,lectures,remarks,topic} = restaurant //destructuring
     return (
    
        <tr key={id}>
           <td>{id}</td>
           <td>{lectures.join()}</td>
           <td>{topic}</td>
           <td><Line percent={80} strokeWidth="10" strokeColor="#3a8030" style={{width:"200px"}}/></td>
           <td>{remarks}</td>
           <td></td>
        </tr>
    
     )
   
  })
  p.push(
        <tr key={this.state.plans.length+1}>
           <td>{this.state.plans.length+1}</td>
           <td><input type="text" name="name" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newName:e.target.value})}} /></td>
           <td><input type="text" name="address" style={{width:"350px",height:"100px"}} onChange={(e)=>{this.setState({newAddress:e.target.value})}} /></td>
           <td><input type="text" name="open" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newOpen:e.target.value})}} /></td>
           <td><input type="text" name="dist" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newDist:e.target.value})}} /></td>
           <td>
            <input type="image" src={tick} style={{width:"30px",marginRight:"2px",height:"40px"}} onClick={this.onTick}/>
            <input type="image" src={cross} style={{width:"30px",height:"auto"}} onClick={()=>{this.setState({mode:"home"})}}/>
           </td>
        </tr>
    
    )
  return p;
}


onTick=(e)=>
{
  this.setState({newId:(this.state.plans.length+1).toString()},function(){
    console.log(this.state)
    this.handleInsert(e);
  })
  
  
}

renderTableData() {
  return this.state.plans.map((restaurant, index) => {
      const {id,completed,lectures,remarks,topic} = restaurant //destructuring
     return (
    
        <tr key={id}>
           <td>{id}</td>
           <td>{lectures.join()}</td>
           <td>{topic}</td>
           <td>{remarks}</td>
           <td>{completed}</td>
           <td></td>
        </tr>
     )
  })
}

funct=(e)=>
{
  this.state.deleteids.includes(e.target.name)?
      this.state.deleteids= this.state.deleteids.filter(item => item !== e.target.name) :
      this.state.deleteids.push(e.target.name)
      console.log(this.state)
}

renderDeleteTableData() {
  return this.state.plans.map((restaurant, index) => {
      const {id,completed,lectures,remarks,topic} = restaurant //destructuring
     return (
    
        <tr key={id}>
           <td><input type="checkbox" name={id} onChange={(e)=>{this.funct(e)}}/></td>
           <td>{id}</td>
           <td>{lectures.join()}</td>
           <td>{topic}</td>
           <td>{remarks}</td>
           <td>{completed}</td>
           <td></td>
        </tr>
     )
  })
}

handleS3=()=> {

     const url="https://ixkhuy7tkl.execute-api.us-east-1.amazonaws.com/prod/post";
    console.log("S333333")
     console.log(this.state.plans)
     fetch(url,{
       method:'post',
       body:JSON.stringify({
          plans:this.state.plans
        })
      }).then(res=> res.json())
        .then(data=>{console.log(data)})  
  
}



handleDelete = (event) =>{
  // event.preventDefault();
console.log(this.state.deleteids)
  console.log("DELETING")
  this.state.deleteids.map((id, index) => {
    const url="https://s2hecc3r12.execute-api.us-east-1.amazonaws.com/prod/rest/"+id;
    console.log(url);

     fetch(url,{
      method:'delete'
      }).then(res=> res.json())
      .then(data=>alert((data.success?"Success":"Failed to Delete")))
      .then(xy=>this.fetchRest())
      .then(xyz=>this.handleS3())
      .then(yz=>this.setState({mode:"home"}) )
        
      .catch((err)=>{console.log(err);})
        console.log(this.state);
  
});
console.log("DELETING ENDS")
}



handleInsert = (event) =>{
  

    const url="http://localhost:3001/";
    console.log(url);
    var length=this.state.plans.length;
    
    fetch(url,{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
            id:this.state.headers[0].id,
            completed:this.state.headers[0].completed,
            lectures:this.state.headers[0].lectures,
            remarks:this.state.headers[0].remarks,
            topic:this.state.headers[0].topic
        })
      }).then(res=> res.json())
        .then(data=>console.log((data)))
        .then(xy=>this.fetchRest())
        .then(yz=>this.setState({mode:"home"}))
        .then(jd=>alert(JSON.stringify(this.state.plans)))
        .then(jdxx=>this.fetchRest2())
        .then(jdx=>alert("Done"))
        .catch((err)=>{console.log(err);})
        
    console.log(this.state);
    
}
 
handlePost2 = (event) =>{
  // event.preventDefault();

console.log("INS")
    const url="https://s2hecc3r12.execute-api.us-east-1.amazonaws.com/prod/rest/";
    console.log(this.state);
    var length=this.state.plans.length;
    
    fetch(url,{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
            id:this.state.updatedId,
            name:this.state.updatedName,
            address:this.state.updatedAddress,
            open:this.state.updatedOpen,
            dist:this.state.updatedDist

        })
      }).then(res=> res.json())
        .then(data=>console.log((data)))
        .then(xy=>this.fetchRest())
        .then(yz=>this.setState({mode:"home"}) )
        .catch((err)=>{console.log(err);})
        
    console.log(this.state);
    
 
console.log("INS DONE")
}

handlePut = (event) =>{
  
this.state.deleteids.push(this.state.updatedId)  
  this.handleDelete();
  this.handlePost2();
    

    }


handleStart= (event) =>
{
  event.preventDefault();
  this.setState({route:"rest"});
}

onRouteChange = (route) =>
{
  this.setState({route})
}


render(){
  return (
<div>
{  (this.state.route==="rest")?
                            (
                              <div>
                                        <nav>
                                        <div style={{display:"flex"}}>
                                        
                                        <p style={{width:"13%"}} onClick={() => this.setState({mode:"update"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Update progress </p>
                                        <p style={{width:"13%"}} onClick={() => this.setState({mode:"insert"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Insert topic </p>
                                        <p style={{width:"13%"}} onClick={() => this.setState({mode:"delete"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Delete topic </p>
                                        </div>
                                        </nav>
                                        <p style={{width:"25%"}} className="f3 b green bg-animate bg-black pa3">&lt;&lt; PROGRESS TRACKER &gt;&gt;</p>
                                            {
                                              
                                              ((this.state.mode==="home")?
                                          
                                              <table id='students'>
                                             
                                                {this.renderTableHeader()}
                                                {this.renderTableData()}

                                                </table>

                                             
                                            :(this.state.mode==="delete")?
                                            <div>
                                              <table id='students'>
                                                <tbody>
                                        
                                                {this.renderDeleteTableHeader()}
                                                {this.renderDeleteTableData()}
                                            
                                                </tbody>
                                              </table>
                                              <input className="ma2 pa2 tc pointer" onClick={this.handleDelete} style={{marginBottom:"20px"}} type="button" value="Delete Selected"/>
                                             </div> 
                                            :(this.state.mode==="insert")?
                                              <div>
                                                <table id='students'>
                                                  <tbody>
                                          
                                                  {this.renderInsertTableHeader()}
                                                  {this.renderInsertTableData()}
                                              
                                                  </tbody>
                                                </table>
                                                
                                              </div>
                                              : (this.state.mode==="update")?
                                              <div>
                                              <table id='students'>
                                                  <tbody>

                                                {this.renderTableHeader()}
                                                {this.renderTableData()}

                                                  </tbody>
                                                </table>
                                                <br/>
                                               </div>                  
                                            :
                                              <p>ERROR 404</p>
                                              )}
                                            
                                    
                               </div> 
                            )
                               :                                   (
                                      <div className='card-container'>        
                                       
                                      </div>
                                    )
              

                          }
               </div>

);

  }
}

export default ProgressAdder;






                                                // <div className="tc ma2 pa3 bg-black">
                                                // <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedId:e.target.value})}} type="text" name="updateid" placeholder="Enter ID"/><br/>
                                                // <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedName:e.target.value})}} type="text" name="updatename" placeholder="Enter Name"/><br/>
                                                // <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedAddress:e.target.value})}} type="text" name="updateaddr" placeholder="Enter Address"/><br/>
                                                // <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedOpen:e.target.value})}} type="text" name="updateopen" placeholder="Open Now?"/><br/>
                                                // <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedDist:e.target.value})}} type="text" name="updatedist" placeholder="Dist"/><br/>
                                                // <input type="button" name="btn" value="Confirm Update" onClick={this.handlePut}/><br/>
                                                // </div>