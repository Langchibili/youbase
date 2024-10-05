'use client'

import { getImage } from "@/Functions";
import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';


export default class FeaturedImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imagesLoading: true
        }
    }

    componentDidMount() {
        const images = this.props.images;
        if (images && images.length > 0) {
            this.setState({ images, imagesLoading: false });
        }
    }

    renderImage(image) {
      let url = null
        if(this.props.imageType === "medium"){
          url = getImage(image, "medium"); // Use getImage function
        }
        else{
          url = getImage(image, "normal"); // Use getImage function
        }
        return <img key={image.id} src={url} alt={image.attributes.name} style={{ width: "100%", borderRadius:'5px' }} />;
    }

    render() {
        const { images } = this.state;
        if(this.state.imagesLoading) {
            return <div>Loading...</div>;
        }

        return (
            this.props.listtype === "grid" ? (
                <div className="image-grid">
                  {images.map(image => (
                    <div key={image.id} className="grid-item" id={"#"+image.id}>
                      {this.renderImage(image)}
                      <button className="remove-btn" onClick={() => this.props.handleRemoveImage(image.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="live1452">
                {images.length > 1 ? (
                  <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {images.map((image, index) => (
                        !image? null: <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          {this.renderImage(image)}
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                ) : (
                  !images[0]? null: this.renderImage(images[0])
                )}
              </div>
              
              )
        )
    }
}
