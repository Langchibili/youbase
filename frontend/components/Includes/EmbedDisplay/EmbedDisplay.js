import React from 'react';
import PropTypes from 'prop-types';
import './EmbedDisplay.css';

const getEmbedUrl = (url) => {
  // Regex patterns to detect video platform
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const facebookRegex = /facebook\.com\/(?:.*\/videos\/|video\.php\?v=)(\d+)/i;
  const tiktokRegex = /tiktok\.com\/@.+\/video\/(\d+)/i;
  const twitterRegex = /twitter\.com\/.+\/status\/(\d+)/i;

  let videoId;
  let embedUrl;

  // Check for YouTube
  if (youtubeRegex.test(url)) {
    videoId = url.match(youtubeRegex)[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  // Check for Facebook
  else if (facebookRegex.test(url)) {
    videoId = url.match(facebookRegex)[1];
    embedUrl = `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${videoId}`;
  }
  // Check for TikTok
  else if (tiktokRegex.test(url)) {
    videoId = url.match(tiktokRegex)[1];
    embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;
  }
  // Check for Twitter
  else if (twitterRegex.test(url)) {
    videoId = url.match(twitterRegex)[1];
    embedUrl = `https://twitframe.com/show?url=https://twitter.com/i/status/${videoId}`;
  }

  return embedUrl;
};

export default function EmbedDisplay({ url }){
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return <div>Invalid or unsupported video link</div>;
  }

  return (
    <div className="embed-container">
      <iframe
        title="Embedded video"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

EmbedDisplay.propTypes = {
  url: PropTypes.string.isRequired,
};
