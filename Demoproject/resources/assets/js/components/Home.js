import React from 'react';
import { Link } from 'react-router';
class Home extends React.Component{
    render(){
        return(
            <div>
                <section className="hero-banner-block">	
                    <div className="hero-banner-image-block">
                    <div className="container inner-title ">	
		                <div className="hero-banner-content-block">
                            <div className="inner-content-block">
                                <h1>Laravel With React.</h1>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Example Component</div>

                                <div className="panel-body">
                                    I'm an example React!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;