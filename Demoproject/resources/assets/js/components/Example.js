import React, { Component , createContext } from 'react';
import {  Router, Route , Link , Switch , withRouter } from 'react-router-dom';
import  history from './history';

import Home from './Home'
// import authenticationStore from './Master';
// const { Provider } = createContext();
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
        this.state = {user: ''}
    }
    componentDidMount(){
        this.setState({
            user: this.state.location
        })
        console.log(this.state.user)
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
                            
                            {/* {this.history.location.data.name} ? <li> {this.history.location.data.name} </li> : <li> </li> */}
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

