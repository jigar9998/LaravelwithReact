import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

class Home extends React.Component{
    render(){
        const images = [
            { url: "../images/hero-banner.jpg" },
            {url: "../images/insight-banner-image.jpg"},
            {url: "../images/our-team-banner-image copy.jpg"}
        ];
        return(
            <div>
                <section className="hero-banner-block">	
                <SimpleImageSlider
                    width={1400}
                    height={504}
                    images={images}
                    className="Silder"
                />
                    
                </section>
                
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Example Component</div>

                                <div className="panel-body">
                                    I'm an example React!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image_wrapper"> 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;