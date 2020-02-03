import React,{Component} from 'react';
import tachyons from 'tachyons';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {epics} from './epics';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];



class CheckboxTrees extends Component {

constructor() {
    super();
      this.state = {
 			      checked: [],
            expanded: [],
    };
  }
componentDidMount()
{
  
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

}

render(){
  return (   <div className="App outer-container">
             	 <CheckboxTree
                nodes={epics}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            />
             </div>
             
         );
  }
}

export default CheckboxTrees;
