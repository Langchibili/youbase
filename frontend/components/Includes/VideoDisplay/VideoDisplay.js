import { backEndUrl } from '@/Constants';
import React, { Component } from 'react';
import ContentLoader from '../Loader/ContentLoader';

export default class VideoDisplay extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      thumbnail: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { featuredImages } = this.props.post;

    if (featuredImages && featuredImages.data && featuredImages.data.length > 0) {
      // Use the last featured image as the thumbnail
      const lastImage = featuredImages.data[featuredImages.data.length - 1].attributes.url;
      this.setState({ thumbnail: lastImage, loading: false });
    } else {
      // Load video and generate a thumbnail at 10 seconds
      this.generateThumbnail();
    }
  }

  generateThumbnail = () => {
    const videoElement = this.videoRef.current;
    
    videoElement.addEventListener('loadeddata', () => {
      videoElement.currentTime = 10; // Seek to 10 seconds
    })

    videoElement.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL('image/png');
      this.setState({ thumbnail, loading: false });
    });
  };

  render() {
    const { thumbnail, loading } = this.state;
    const { url } = this.props.post.media.data[0].attributes;

    return (
      <div>
        {loading ? (
          <div><ContentLoader/></div>
        ) : (
          <img src={thumbnail} alt="Video Thumbnail" style={{ width: '100%' }} />
        )}
        <video
            ref={this.videoRef}
            src={`${backEndUrl}${url}`}
            crossOrigin="anonymous" // Enable cross-origin for the video
            controls
            style={{ display: loading ? 'none' : 'block', width: '100%' }}
        />
      </div>
    );
  }
}
