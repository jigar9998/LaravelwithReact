import React, {Component } from 'react';
import axios from 'axios';
import { Link , withRouter } from 'react-router-dom';
import history from './history';


class AddCategory extends Component{
    constructor(props){
        super(props)
        this.state = {
            category: "",

        }
    }
    onSubmit(e){
        e.preventDefault();
        const {category} = this.state ;
        axios.post('/category', {
            category,
        })
        .then(response=> {
            this.setState({err: false});
            history.push("/post");
        })
        .catch(error=> {
        this.refs.category.value="";
        this.setState({err: true});
        });
    }

    onChange(e){
        const {name, value} = e.target ;
        this.setState({[name]: value});
    }

    render(){
        let error = this.state.err ;
        let msg = (!error) ? 'Category Added Successfully' : 'Oops! , Something went wrong.' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return(
            <div>   
                <div className="container" style={{paddingTop:'150px'}} >
                    <div className="row">
                        <div className=" ">
                            <div className="panel panel-default">
                                <div className="panel-heading">Category</div>
                                <div className="panel-body">
                                    <div className="">
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>   
                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group" style={{display: 'inline'}} >
                                            <label htmlFor="name" className="col-md-4 control-label">Add Category</label>

                                            <div className="col-md-6">
                                                <input id="name" type="text" className="form-control" ref="category" name="category" onChange={this.onChange.bind(this)} required autoFocus />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Addcategory
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

}


export default AddCategory