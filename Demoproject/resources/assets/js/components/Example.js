import React, { Component, useReducer } from 'react';
import {  Router, Route , Link , Switch } from 'react-router-dom';
import  history from './history';

import Home from './Home'
//import Master from './Master';
import CreatePost from './CreatePost';
import DisplayPost from './DisplayPost';
import EditPost from './EditPost';
import NewsPost from './NewsPost';
import BlogPost from './BlogPost';
import Register from './Register';
import Dashboard from './Dashboard';
import Login from './Login';
import { render } from 'react-dom';

export default class Example extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router history={history} >
                <header>
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">CrudApp</Link>
                        </div>          	
                        <ul className="nav navbar-nav">
                            <li><Link to="/post">Posts</Link></li>
                            <li><Link to="/add-post">Create Post</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        
                        </ul>
                    </nav>
                </header>
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
                        <Route path="/login" component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

render(<Example/> , document.getElementById('root') )