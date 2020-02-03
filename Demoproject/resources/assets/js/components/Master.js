import React, {Component} from 'react';
import { Link } from 'react-router';

class Master extends Component {
  render(){
    return (
     	 <div className="container-fluid">
			
			<div>
				{this.props.children}
			</div>
			
      	</div>
    )
  }
}
export default Master;