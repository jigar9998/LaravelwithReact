import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  history from './history';
// var Paginator = require('react-laravel-paginator');

class TableRow extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let uri = `http://127.0.0.1:8000/post/${this.props.obj.id}`;
    axios.delete(uri);
      	history.push('/post');
  }
  render() {
    return (
        <tr>
			<td>
				{this.props.obj.id}
			</td>
			<td>
				{this.props.obj.title}
			</td>
			<td>
				{this.props.obj.description}
			</td>
			<td>
				<img style={{width: 150}} src={'http://localhost/Demoproject/storage/app/'+this.props.obj.image} />
			</td>
			<td>
				<Link to={{ pathname:"edit/"+this.props.obj.id}} className="btn btn-primary">Edit</Link>
			</td>
			<td>
			<form onSubmit={this.handleSubmit}>
			<input type="submit" value="Delete" className="btn btn-danger"/>
			</form>
			</td>
			</tr>
    );
  }
}

export default TableRow;