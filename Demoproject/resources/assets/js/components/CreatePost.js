import React, {Component} from 'react';
import {browserHistory} from 'react-router';


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
		browserHistory.push('/post');
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
        <form onSubmit={this.handleSubmit} className="form-horizontal" encType="multipart/form-data" >
			
				<div className="row">
					<div className="col-md-12">
						<div className="form-group ">
							<div className="col-md-2">
								
							</div>
							<div className="col-md-10">
								<label>Post Title:</label>
								<input type="text" className="form-control" onChange={this.handleChange1}/>
								<p className="error" > {this.state.error1} </p>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<div className="col-md-2">
							</div>
							<div className="col-md-10">
								<label className="desc_label"  >Post Desc:</label>
							{/* <input type="text" className="form-control col-md-6" onChange={this.handleChange2}/> */}
								<textarea className="form-control" name="description" onChange={this.handleChange2}></textarea>
								<p className="error" > {this.state.error2} </p>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group ">
							<div className="col-md-2">
								
							</div>
							<div className="col-md-10">
								<label>Post Image:</label>
								<input type="file" name="image" className="form-control" onChange={this.handleChange3} accept="image/jpeg,image/gif,image/png,application/pdf"/>
								<div className="preview-image" >  {$imagePreview}	</div>
								{/* <p className="error" > {this.state.error1} </p> */}
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group ">
							<div className="col-md-2">
								
							</div>
							<div className="col-md-10">
								<label>Post Category:</label>
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
					</div>
				</div>
				<br />
				<div className="form-group">
					<button className="btn btn-primary">Add Post</button>
				</div>
        </form>
  	</div>
      );
    }
}
export default CreatePost;
