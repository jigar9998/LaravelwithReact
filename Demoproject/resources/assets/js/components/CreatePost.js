import React, {Component} from 'react';
//import {browserHistory} from 'react-router';
import  history from './history';


class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {posttitle: '', postcontent: '' , error1:'' , error2:'' , postimage:'' , post_category:'' , category:[]};

    this.handleChange1 = this.handleChange1.bind(this);
	this.handleChange2 = this.handleChange2.bind(this);
	this.handleChange3 = this.handleChange3.bind(this);
	this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange1(e){
    this.setState({
      posttitle: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      postcontent: e.target.value
    })
  }
  handleChange3(e){
	e.preventDefault();

	let reader = new FileReader();
	let file = e.target.files[0];
	
	reader.onloadend = (e) => {
	this.setState({
		postimage: file ,
		imagePreviewUrl: reader.result
	});
	}

	reader.readAsDataURL(file)
}
componentDidMount(){
	axios.get('http://127.0.0.1:8000/category').
		then(response => {
		//console.log(response.data);
		this.setState({ category: response.data });
		})
		.catch(function (error) {
			console.log(error);
		})
}
handleChange4(e){
	const cat = e.target.name;
	// const isChecked = e.target.checked;
	// console.log(isChecked);
	this.setState({post_category: cat})
}
handleSubmit(e){
e.preventDefault();
let err1 = '';
let err2 = '';
const formData = new FormData();
formData.append('title', this.state.posttitle);
formData.append('desc', this.state.postcontent);
formData.append('image', this.state.postimage);
formData.append('category', this.state.post_category);

//console.log(formData);
if(!this.state.posttitle){
	err1 = 'title Field is empty';
	//alert("name is empty");
}
if(!this.state.postcontent){
	err2 = 'Desc Field is empty';
	//alert("name is empty");
}
const config = {
	headers: {
		'content-type': 'multipart/form-data'
		
	}
}
this.setState({error1:err1 , error2:err2})
//let uri = 'http://localhost:8000/post';
if(this.state.posttitle != "" && this.state.postcontent != "" ){
	axios.post('http://127.0.0.1:8000/post',formData,config ).then((response) => {
		history.push('/post');
	});
}
}

render() {
	let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
	}

	return (
      <div className="container post_form" >
        <h1>Create An Post</h1>
		<div className="row justify-content-center align-items-center h-100">
        <form onSubmit={this.handleSubmit} className="form-horizontal" encType="multipart/form-data" >
			<div className="form-group ">
				<label className="control-label col-sm-2">Post Title:</label>
				<div className="col-sm-10">
					<input type="text" className="form-control" placeholder="Enter Post Name" onChange={this.handleChange1} required autoFocus />
					<p className="error" > {this.state.error1} </p>
				</div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2"  >Post Desc:</label>
				<div className="col-sm-10">
					<textarea className="form-control" placeholder="Enter Post Desc" name="description" required onChange={this.handleChange2}></textarea>
					<p className="error" > {this.state.error2} </p>
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
								<li key={category.id} > 
									<label className="checkbox-container">
										<input type="checkbox" name={category.id} onChange={this.handleChange4} /> <span className="checkmark" > </span>
										{category.category_name} 
									</label>
								</li>
							))
						}
					</ul>
				</div>
			</div>
			
			<br />
			<div className="form-group">
				<button className="btn btn-primary">Add Post</button>
			</div>
        </form>
		</div>
  	</div>
      );
    }
}
export default CreatePost;
