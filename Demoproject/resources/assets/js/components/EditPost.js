import React, {Component} from 'react';
import axios from 'axios';
import { Link , browserHistory  } from 'react-router';

 class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', image: ''};
        this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  componentDidMount(){
    axios.get(`http://127.0.0.1:8000/post/${this.props.params.id}/edit`)
    .then(response => {
      	this.setState({ title: response.data.title, description: response.data.description , image: response.data.image });
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

  handleSubmit(event) {
    event.preventDefault();
    // const products = {
	// 	title: ,
	// 	description: ,
	// 	image: 
	//   }
	const formData = new FormData();
	formData.append("_method", 'PATCH');
	formData.append('title', this.state.title);
	formData.append('desc', this.state.description);
	formData.append('image', this.state.image);

	const config = {
        headers: {
			'content-type': 'multipart/form-data'
			
        }
    }
    let uri = 'http://127.0.0.1:8000/post/'+this.props.params.id;
    axios.post(uri, formData , config).then((response) => {
        browserHistory.push('/post');
    });
  }
  render(){
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
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Post title</label>
                <input type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handleChange1} />
            </div>

            <div className="form-group">
                <label title="product_description">Post description</label>
                <input type="text" className="form-control"
                  value={this.state.description}
                  onChange={this.handleChange2} />
            </div>

            <div className="form-group">
                <label title="product_image">Post Image</label>
				<input type="file" className="form-control"
                  	onChange={this.handleChange3} />
            </div>
			<div className="preview-image" > {$imagePreview} </div>
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    );
  }
}
export default EditPost;