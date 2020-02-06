import React, { Component } from 'react';
//import {  Router, Route , Link , Switch } from 'react-router-dom';
import  history from './history';


class Dashboard extends React.Component{
    
    constructor(props){
        super(props);
        // this.state = {
        //     Name : this.props.location.data.name

        // }
    }

    

    render(){
        const mystyle = {  
            float: 'left',
            paddingLeft: '109px',
            color: '#274f69',
            fontSize: '50px',
            fontWeight: '600',
            fontFamily: 'Roboto,sans-serif',
            paddingTop: '13px'
          };  
        return(
            <div className="row">
                <div className="col-md-12 wrapper ">
                    <div className="user_details">
                        <span style={mystyle} > Dashboard </span>
                        {/* <span>Current User :- </span>  {this.state.Name} <br />
                        <button type="submit" className="btn btn-primary" onClick={this.handleclick} > LogOut </button>  */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;