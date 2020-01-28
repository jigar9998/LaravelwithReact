import React, {Component} from 'react';
import { Link } from 'react-router';

class Master extends Component {
  render(){
    return (
     	 <div className="container-fluid">
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
				</ul>
			</nav>
			</header>
			<div>
				{this.props.children}
			</div>
			
      	</div>
    )
  }
}
export default Master;