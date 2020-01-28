import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
  
class Example extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      error1: ''
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
  }
   
    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
  
    onSubmitButton(e) {
        e.preventDefault();
        //console.log("hello");
        let err1 = '';
        axios.post('http://127.0.0.1:8000/post', {
            name: this.state.name,
            description: this.state.description
        })
        .then(function (response) {
            //this.setState({data: response.data})
            console.log(response.data);
        })
        
        .catch(function (error) {
            console.log(error);
        });
        
        this.setState({
            name: '',
            description: ''
            
        })
        this.setState({error1:err1})
    }
   
  componentDidMount () {
    
  }
   
  render () {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
   
                        <div className="card-body">
                            <form onSubmit={this.onSubmitButton}>
                                <strong>Name:</strong>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChangeValue} />
                                <p> {this.state.error} </p>
                                <strong>Description:</strong>
                                <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChangeValue}></textarea>
                                <button className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
  }
}
export default Example;
if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}