import React, { Component , createContext } from 'react'
//const { Provider, Consumer } = createContext('user');
//import Nav from './navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import  history from './history';
import Master from './Master';


class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            rememberme: '',
            user:''
        }
    }

    onSubmit(e){
        e.preventDefault();
        const {email , password , rememberme} = this.state ;
        axios.post('http://127.0.0.1:8000/login', {
            email, 
            password,
            rememberme
        })
        .then(response=> {
        if(response.data != "") {
            this.setState({err: false , user: response.data});
            this.props.handleLogin(response.data);
            this.props.history.push({pathname: '/Dashboard' , data: response.data }) ;
            
        }else{
            this.setState({err: true});
        }
        
        })
        .catch(error=> {
        this.refs.email.value="";
        this.refs.password.value="";
        this.setState({err: true});
        });
     }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
	render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (
            <div>
                <div className="container" style={{paddingTop:'150px'}} >
                    <div className="row">
                        <div className="login_card">
                            <div className="panel panel-default">
                                <div className="panel-heading">Login</div>
                                <div className="panel-body">   
                                    <div className="">
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>  
                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group" style={{display: 'inline'}} >
                                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" ref="email" className="form-control" name="email" autoComplete="off"  onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" ref="password" className="form-control" autoComplete="off" name="password"  onChange={this.onChange.bind(this)}  required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <div className="category_check">
                                                    <label className="checkbox-container" >
                                                    <input type="checkbox" name="rememberme" onChange={this.onChange.bind(this)}  /> <span className="checkmark" > </span> Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-8 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary" >
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
	    );
    }
}

export default Login;

