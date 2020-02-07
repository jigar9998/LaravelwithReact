import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  history from './history';

 class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', image: '' , category: [] , post_category:'' };
        this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
		this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

componentDidMount(){
	  //console.log(this.props.match.params.id);
    axios.get(`http://127.0.0.1:8000/post/${this.props.match.params.id}/edit`)
		.then(response => {
			this.setState({ title: response.data.title, description: response.data.description , image: response.data.image , post_category: response.data.cat_id });
		})
		.catch(function (error) {
			console.log(error);
		})

	axios.get('http://127.0.0.1:8000/category').
		then(response => {
		//console.log(response.data);
		this.setState({ category: response.data , category_id: response.data.id });
		})
		.catch(function (error) {
			console.log(error);
		})
		
}
handleChange1(e){
	this.setState({
		title: e.target.value
	})
}
handleChange2(e){
	this.setState({
		description: e.target.value
	})
	}
handleChange3(e){
	e.preventDefault();

	let reader = new FileReader();
	let file = e.target.files[0];

	reader.onloadend = (e) => {
	this.setState({
		image: file ,
		imagePreviewUrl: reader.result
	});
	}

	reader.readAsDataURL(file)
}
handleChange4(e){
	const cat = e.target.name;
	// const isChecked = e.target.checked;
	// console.log(isChecked);
	this.setState({post_category: cat})
}	
handleSubmit(event) {
	event.preventDefault();
	const formData = new FormData();
	formData.append("_method", 'PATCH');
	formData.append('title', this.state.title);
	formData.append('desc', this.state.description);
	formData.append('image', this.state.image);
	formData.append('category', this.state.post_category);

	const config = {
		headers: {
			'content-type': 'multipart/form-data'
			
		}
	}
	let uri = 'http://127.0.0.1:8000/post/'+this.props.match.params.id;
	axios.post(uri, formData , config).then((response) => {
		history.push('/post');
	});
}
render(){
	let cat_id = this.state.post_category;
	let check;		
	let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img src={'http://localhost/Demoproject/storage/app/'+this.state.image} />);
    }
    return (
    <div className="container" > 
        <h1>Update Post</h1>
        <div className="row">
			<div className="col-md-10"></div>
			<div className="col-md-2">
				<Link to="/post" className="btn btn-success">Return to Post</Link>
			</div>
        </div>
        <form onSubmit={this.handleSubmit} className="form-horizontal" encType="multipart/form-data" >
		<div className="form-group ">
				<label className="control-label col-sm-2">Post Title:</label>
				<div className="col-sm-10">
					<input type="text" value={this.state.title} className="form-control" placeholder="Enter Post Name" onChange={this.handleChange1}/>
				</div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2"  >Post Desc:</label>
				<div className="col-sm-10">
					<textarea className="form-control" placeholder="Enter Post Desc" value={this.state.description} name="description" onChange={this.handleChange2}></textarea>
				</div>
			</div>
		
			<div className="form-group ">
				<label className="control-label col-sm-2">Post Image:</label>
				<div className="col-sm-10">
					<input type="file" name="image" className="form-control" onChange={this.handleChange3} accept="image/jpeg,image/gif,image/png,application/pdf"/>
					<div className="preview-image" >  {$imagePreview}	</div>
					{/* <p className="error" > {this.state.error1} </p> */}
				</div>
			</div>
			<div className="form-group ">
				<label className="control-label col-sm-2"><span style={{ fontSize: '24px'}} >Post Category: </span> </label>
				<div className="col-sm-10">
					<ul className="category_check" > 
						{
							this.state.category.map((category, index) => (
								cat_id == category.id ? check=true : check=false,
								<li key={category.id} > 
									<label className="checkbox-container">
										<input type="checkbox"  name={category.id} onChange={this.handleChange4} defaultChecked={check} /> <span className="checkmark" > </span>
										{category.category_name} 
									</label>
								</li>
							))
						}
					</ul>
				</div>
			</div>
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    );
  }
}
export default EditPost;