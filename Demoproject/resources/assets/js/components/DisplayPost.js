import React, {Component} from 'react';
import axios from 'axios';
import { Link , Router } from 'react-router-dom';
import TableRow from './TableRow';
import Pagination from "react-js-pagination";

class DisplayPost extends Component {
    constructor(props) {
       super(props);
	   this.state = {title: '', posts: '' , activePage: 1 , pageRangeDisplayed: '' , totalpost: '' };
	   
	   this.handlePageChange = this.handlePageChange.bind(this);
     }
    componentDidMount(){
        axios.get('/post')
        .then(response => {
			//console.log(response.data);
			this.setState({ posts: response.data.data });
			this.handlePageChange(response.data.current_page);
        })
        .catch(function (error) {
            console.log(error);
		})
		
    }
	handlePageChange(pageNumber) {
		axios.get('http://127.0.0.1:8000/post?page='+ pageNumber )
        .then(response => {
			this.setState({
				posts: response.data.data,
				activePage: response.data.current_page,
				pageRangeDisplayed: response.data.per_page,
				totalpost: response.data.total
				
			})
		})
	}
	tabRow(){
        if(this.state.posts instanceof Array){
            return this.state.posts.map(function(object, i){
                return <TableRow obj={object} key={i} />;
            })
        }
    }
  render(){
    return (
      <div>
        <h1>Post</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-post">Create Post</Link>
          </div>
        </div><br />

        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Post Title</td>
                <td>Post Description</td>
                <td>Post Image</td>
                <td>Post Edit</td>
                <td>Post Delete</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
        <Pagination
			activePage={this.state.activePage}
			itemsCountPerPage={this.state.pageRangeDisplayed}
			totalItemsCount={this.state.totalpost}
			onChange={this.handlePageChange}
			itemClass={'page-item'}
			linkClass={'page-link'}
        />
    </div>
    );
  }
}
export default DisplayPost;