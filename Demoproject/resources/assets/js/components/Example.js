import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from './Home'
import Master from './Master';
import CreatePost from './CreatePost';
import DisplayPost from './DisplayPost';
import EditPost from './EditPost';
import NewsPost from './NewsPost';
import BlogPost from './BlogPost';
import { render } from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <Router history={browserHistory}>
            
                <Route component={Master} >
                    <Route path="/" component={Home} />
                    <Route path="/post" component={DisplayPost} />
                    <Route path="/add-post" component={CreatePost} />
                    <Route path="/edit/:id" component={EditPost} />
                    <Route path="/news" component={NewsPost} />
                    <Route path="/blog" component={BlogPost} />
                </Route>
            </Router>
        );
    }
}

render(<Example/> , document.getElementById('root') )