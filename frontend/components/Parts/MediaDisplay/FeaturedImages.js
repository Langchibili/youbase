'use client'

import { getImage } from "@/Functions";
import React from "react";

export default class FeaturedImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        const images = this.props.images;
        if (images && images.length > 0) {
            this.setState({ images });
        }
    }

    renderImage(image) {
        const url = getImage(image, "normal"); // Use getImage function
        return <img key={image.id} src={url} alt={image.attributes.name} style={{ width: "100%" }} />;
    }

    render() {
        const { images } = this.state;

        if (images.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div className="live1452">
                {images.length > 1 ? (
                    <div className="carousel">
                        {images.map(image => (
                            <div key={image.id} className="carousel-item">
                                {this.renderImage(image)}
                            </div>
                        ))}
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                ) : (
                    this.renderImage(images[0])
                )}
            </div>
        );
    }
}
