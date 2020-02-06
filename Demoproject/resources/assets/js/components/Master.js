import React, {Component , createContext} from 'react';
import { Link , withRouter } from 'react-router-dom';

class Master extends Component {
	constructor(props){
		super(props);
		// this.handlelogoutclick = this.handlelogoutclick.bind();
	}
	handlelogoutclick(){
		console.log(this.props.handleLogout());
		axios.post('http://127.0.0.1:8000/logout', {
		})
		.then(response=> {
			this.props.handleLogout();
			history.push('/');
		})
		.catch(error=> {
			console.log(error);
		})
	}
	render(){ 
		
		const isLoggedIn = this.props.loggedInStatus;
		return (
			<header>
				<nav className="navbar navbar-default">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">CrudApp</Link>
					</div>          	
					<ul className="nav navbar-nav">
						{isLoggedIn == 'LOGGED_IN' ? <li><Link to="/post">Posts</Link></li> : <li> </li> }
						{isLoggedIn == 'LOGGED_IN' ? <li><Link to="/add-post">Create Post</Link></li> : <li> </li> }
						{isLoggedIn == 'LOGGED_IN' ? <li><Link to="/news">News</Link></li> : <li> </li> }
						{isLoggedIn == 'LOGGED_IN' ? <li><Link to="/blog">Blog</Link></li> : <li> </li> }
						{isLoggedIn == 'NOT_LOGGED_IN' ? <li><Link to="/login">Login</Link></li>  : <li> </li> }
						{isLoggedIn == 'NOT_LOGGED_IN' ? <li><Link to="/register">Register</Link></li>  : <li> </li> }
						{isLoggedIn == 'LOGGED_IN' ? <li className="login_user" > Current User :- {this.props.user.name} </li>  : <li> </li> }
						{isLoggedIn == 'LOGGED_IN' ? <button type="submit" className="btn btn-primary logout_btn " onClick={this.props.handleLogout} > LogOut </button>  : <li> </li> }
						
					</ul>
				</nav>
			</header>
		);  
	}
}  
export default withRouter(Master);