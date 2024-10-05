'use client'

import { clientUrl } from "@/Constants";
import React from "react";

export default class VideosDisplay extends React.Component {
  render() {
    const iframeStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0
    };

    const iframeContainerStyle = {
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
      overflow: 'hidden',
      maxWidth: '100%',
      background: '#000', // Optional: To ensure it has a background before video loads
    };

    return (
      <div className="video-container">
        <div style={iframeContainerStyle}>
          <iframe
            src={`${clientUrl}/videods/${this.props.postid}`}
            style={iframeStyle}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Embedded Video"
          />
        </div>
      </div>
    );
  }
}
