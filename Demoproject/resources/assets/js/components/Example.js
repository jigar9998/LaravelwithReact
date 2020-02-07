import React, { Component } from 'react';
import {  Router, Route , Link , Switch , withRouter } from 'react-router-dom';
import  history from './history';
import Home from './Home'
import CreatePost from './CreatePost';
import DisplayPost from './DisplayPost';
import EditPost from './EditPost';
import NewsPost from './NewsPost';
import BlogPost from './BlogPost';
import Register from './Register';
import Dashboard from './Dashboard';
import Login from './Login';
import AddCategory from './AddCategory'
import { render } from 'react-dom';
import Master from './Master';


export default class Example extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogin(data) {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: data
        });
    }
    handleLogout() {
        axios.post('http://127.0.0.1:8000/logout', {
		})
		.then(response=> {
			this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            });
			history.push('/');
		})
		.catch(error=> {
			console.log(error);
		})
    }
    render() {
        return (
            <Router history={history} >
                    <Route
                        exact
                        path={['/' , "/register" , '/login' , '/Dashboard' , '/post' , "/add-post" , "/edit/:id" , "/news" , "/blog" , "/Dashboard" , '/AddCategory' ]}
                        render={props => (
                            <Master
                            {...props} 
                            loggedInStatus = {this.state.loggedInStatus} 
                            user={this.state.user} 
                            handleLogout={this.handleLogout}  
                            />
                        )}
                    />
                {/* <Master 
                    {...props} 
                    loggedInStatus = {this.state.loggedInStatus} 
                    user={this.state.user} 
                    handleLogout={this.handleLogout}  
                /> */}
                <div className="container-fluid">
                    
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/post" component={DisplayPost} />
                        <Route path="/add-post" component={CreatePost} />
                        <Route path="/edit/:id" component={EditPost} />
                        <Route path="/news" component={NewsPost} />
                        <Route path="/blog" component={BlogPost} />
                        <Route path="/Dashboard" component={Dashboard} />
                        <Route path="/register" component={Register} />
                        <Route path="/addcategory" component={AddCategory} />
                        <Route
                            exact
                            path={"/login"}
                            render={props => (
                                <Login
                                {...props}
                                handleLogin={this.handleLogin}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </Router>
            
        );
    }
}

