import React, {Component , createContext} from 'react';
import { Link } from 'react-router';
import Example from './Example';
const { Provider, Consumer } = createContext();

function Master(props) {  
	return (  
	  <div>  
		{/* <Consumer>
			{this.context}
		</Consumer> */}
	  </div>  
	);  
  }  
export default Master;