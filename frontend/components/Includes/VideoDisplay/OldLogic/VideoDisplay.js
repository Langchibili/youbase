// import { backEndUrl } from '@/Constants';
// import React, { Component } from 'react';
// import ContentLoader from '../Loader/ContentLoader';

// export default class VideoDisplay extends Component {
//   constructor(props) {
//     super(props);
//     this.videoRef = React.createRef();
//     this.state = {
//       thumbnail: null,
//       loading: true,
//       playing: false, // To track video play state
//     };
//   }

//   componentDidMount() {
//     const { featuredImages } = this.props.post;

//     if (featuredImages && featuredImages.data && featuredImages.data.length > 0) {
//       // Use the last featured image as the thumbnail
//       const lastImage = featuredImages.data[featuredImages.data.length - 1].attributes.url;
//       this.setState({ thumbnail: lastImage, loading: false });
//     }
//   }

//   handleVideoLoaded = () => {
//     const videoElement = this.videoRef.current;

//     if (videoElement) {
//       videoElement.currentTime = 10; // Seek to 10 seconds

//       videoElement.addEventListener('seeked', () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = videoElement.videoWidth;
//         canvas.height = videoElement.videoHeight;
//         canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         const thumbnail = canvas.toDataURL('image/png');
//         this.setState({ thumbnail, loading: false });
//       });
//     }
//   };

//   handlePlay = () => {
//     this.setState({ playing: true });
//     const videoElement = this.videoRef.current;
//     if (videoElement) {
//       videoElement.play();
//     }
//   };

//   render() {
//     const { thumbnail, loading, playing } = this.state;
//     const { url } = this.props.post.media.data[0].attributes;

//     const videoContainerStyle = {
//       backgroundImage: `url(${backEndUrl}${thumbnail})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       width: '100%',
//       height: '100%', // Adjust height as per your requirements
//       position: 'relative',
//     };

//     const playButtonStyle = {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       fontSize: '50px',
//       color: 'white',
//       cursor: 'pointer',
//       display: playing ? 'none' : 'block', // Hide play button when the video is playing
//     };

//     return (
//       <div>
//         {loading ? (
//           <div><ContentLoader/></div>
//         ) : (
//           <div style={videoContainerStyle}>
//             <video
//               ref={this.videoRef}
//               src={`${backEndUrl}${url}`}
//               crossOrigin="anonymous"
//               onLoadedMetadata={this.handleVideoLoaded} // This ensures the video is ready before thumbnail generation
//               controls
//               style={{
//                 display: playing ? 'block' : 'none',
//                 width: '100%',
//               }}
//             />
//             <div
//               style={playButtonStyle}
//               onClick={this.handlePlay}
//             >
//               &#9658; {/* Play icon */}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
'use client'

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
      playing: false, // To track video play state
    };
  }

  componentDidMount() {
    console.log(this.props.post)
    const { featuredImages } = this.props.post;

    if (featuredImages && featuredImages.data && featuredImages.data.length > 0) {
      // Use the last featured image as the thumbnail
      const lastImage = featuredImages.data[featuredImages.data.length - 1].attributes.url;
      this.setState({ thumbnail: backEndUrl + lastImage, loading: false });
    } else {
      // No custom thumbnail, generate thumbnail from video
      this.handleVideoLoaded();
    }
  }

  handleVideoLoaded = () => {
    const videoElement = this.videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        videoElement.currentTime = 10; // Seek to 10 seconds

        videoElement.addEventListener('seeked', () => {
          const canvas = typeof document !== 'undefined'? document.createElement('canvas') : <></>;
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL('image/png');
          this.setState({ thumbnail, loading: false });
        })
      })
    }
  };

  handlePlay = () => {
    this.setState({ playing: true });
    const videoElement = this.videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  };

  render() {
    const { thumbnail, loading, playing } = this.state;
    const indexOfVideo = this.props.post.media.data.length - 1
    const { url } = this.props.post.media.data[indexOfVideo].attributes;

    const videoContainerStyle = {
      backgroundImage: `url(${thumbnail})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%', // Adjust height as per your requirements
      position: 'relative',
    };

    const playButtonStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '50px',
      color: 'white',
      cursor: 'pointer',
      display: playing ? 'none' : 'block', // Hide play button when the video is playing
    };

    return (
      <div>
        {loading ? (
          <div><ContentLoader /></div>
        ) : (
          <div style={videoContainerStyle}>
            <video
              ref={this.videoRef}
              src={`${backEndUrl}${url}`}
              crossOrigin="anonymous"
              onLoadedMetadata={this.handleVideoLoaded} // This ensures the video is ready before thumbnail generation
              controls
              style={{
                display: playing ? 'block' : 'none',
                width: '100%',
              }}
            />
            <div
              style={playButtonStyle}
              onClick={this.handlePlay}
            >
              &#9658; {/* Play icon */}
            </div>
          </div>
        )}
      </div>
    );
  }
}
