// // 'use client'

// // import React, { useEffect } from 'react';
// // import PropTypes from 'prop-types';
// // import './EmbedDisplay.css';

// // // Helper functions to load external scripts for Twitter and TikTok embeds
// // const loadTwitterScript = () => {
// //   if (!window.twttr) {
// //     const script = document.createElement('script');
// //     script.src = 'https://platform.twitter.com/widgets.js';
// //     script.async = true;
// //     document.body.appendChild(script);
// //   } else {
// //     window.twttr.widgets.load();
// //   }
// // };

// // const loadTikTokScript = () => {
// //   if (!window.tiktokEmbedLoaded) {
// //     const script = document.createElement('script');
// //     script.src = 'https://www.tiktok.com/embed.js';
// //     script.async = true;
// //     document.body.appendChild(script);
// //     window.tiktokEmbedLoaded = true;
// //   }
// // };

// // // Function to detect the video platform from the URL and return embed data.
// // const getEmbedData = (url) => {
// //   // Regex patterns to detect video platforms.
// //   const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
// //   const facebookRegex = /facebook\.com\/(?:.*\/videos\/|video\.php\?v=)(\d+)/i;
// //   // For TikTok, we extract the username and video id:
// //   // e.g., https://www.tiktok.com/@officialdjdibro/video/7346639237162208517?...
// //   const tiktokRegex = /tiktok\.com\/@([^\/]+)\/video\/(\d+)/i;
// //   const twitterRegex = /twitter\.com\/.+\/status\/(\d+)/i;

// //   let platform = null;
// //   let embedUrl = null;
// //   let videoId = null;
// //   let username = null;

// //   // YouTube Shorts support:
// //   if (url && url.includes("youtube.com/shorts/")) {
// //     platform = 'youtube';
// //     // Extract the part after "youtube.com/shorts/" up to a '?' or '&'
// //     const parts = url.split("youtube.com/shorts/");
// //     if (parts.length > 1) {
// //       videoId = parts[1].split(/[?&]/)[0];
// //       embedUrl = `https://www.youtube.com/embed/${videoId}`;
// //     }
// //   }
// //   // Standard YouTube URL
// //   else if (youtubeRegex.test(url)) {
// //     platform = 'youtube';
// //     videoId = url.match(youtubeRegex)[1];
// //     embedUrl = `https://www.youtube.com/embed/${videoId}`;
// //   }
// //   // Facebook
// //   else if (facebookRegex.test(url)) {
// //     platform = 'facebook';
// //     videoId = url.match(facebookRegex)[1];
// //     embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
// //   }
// //   // TikTok
// //   else if (tiktokRegex.test(url)) {
// //     platform = 'tiktok';
// //     const match = url.match(tiktokRegex);
// //     username = match[1]; // e.g. "officialdjdibro"
// //     videoId = match[2];  // e.g. "7346639237162208517"
// //     // For TikTok, we render a blockquote per the official embed code.
// //   }
// //   // Twitter
// //   else if (twitterRegex.test(url)) {
// //     platform = 'twitter';
// //     videoId = url.match(twitterRegex)[1];
// //     embedUrl = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
// //   }

// //   return { platform, embedUrl, videoId, url, username };
// // };

// // export default function EmbedDisplay({ url }) {
// //   const { platform, embedUrl, videoId, username } = getEmbedData('https://fb.watch/xuBg8LlLqm/');

// //   // Determine which external script(s) to load.
// //   const isTwitter = platform === 'twitter';
// //   const isTikTok = platform === 'tiktok';

// //   useEffect(() => {
// //     if (isTwitter) {
// //       loadTwitterScript();
// //     }
// //     if (isTikTok) {
// //       loadTikTokScript();
// //     }
// //   }, [isTwitter, isTikTok]);

// //   if (!platform) {
// //     return <div>Invalid or unsupported video link</div>;
// //   }

// //   // For TikTok, render the official blockquote embed code.
// //   if (isTikTok) {
// //     return (
// //       <div className="embed-container">
// //         <blockquote
// //           className="tiktok-embed"
// //           cite={url}
// //           data-video-id={videoId}
// //           style={{ maxWidth: '605px', minWidth: '325px' }}
// //         >
// //           <section>
// //             <a
// //               target="_blank"
// //               rel="noreferrer"
// //               title={`@${username}`}
// //               href={`https://www.tiktok.com/@${username}?refer=embed`}
// //             >
// //               @{username}
// //             </a>
// //             <p>Check out this TikTok video.</p>
// //             <a
// //               target="_blank"
// //               rel="noreferrer"
// //               title="Watch on TikTok"
// //               href={url}
// //             >
// //               Watch on TikTok
// //             </a>
// //           </section>
// //         </blockquote>
// //       </div>
// //     );
// //   }

// //   // Render an iframe for YouTube, Facebook, and Twitter.
// //   return (
// //     <div className="embed-container">
// //       <iframe
// //         title="Embedded video"
// //         src={embedUrl}
// //         frameBorder="0"
// //         allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //         allowFullScreen
// //       ></iframe>
// //     </div>
// //   );
// // }

// // EmbedDisplay.propTypes = {
// //   url: PropTypes.string.isRequired,
// // };


// 'use client'

// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import './EmbedDisplay.css';

// // Helper functions to load external scripts for Twitter and TikTok embeds
// const loadTwitterScript = () => {
//   if (!window.twttr) {
//     const script = document.createElement('script');
//     script.src = 'https://platform.twitter.com/widgets.js';
//     script.async = true;
//     document.body.appendChild(script);
//   } else {
//     window.twttr.widgets.load();
//   }
// };

// const loadTikTokScript = () => {
//   if (!window.tiktokEmbedLoaded) {
//     const script = document.createElement('script');
//     script.src = 'https://www.tiktok.com/embed.js';
//     script.async = true;
//     document.body.appendChild(script);
//     window.tiktokEmbedLoaded = true;
//   }
// };

// // Function to detect the video platform from the URL and return embed data.
// const getEmbedData = (url) => {
//   // Regex patterns to detect video platforms.
//   const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
//   // Existing Facebook regex: it works for standard facebook.com video URLs.
//   const facebookRegex = /facebook\.com\/(?:.*\/videos\/|video\.php\?v=)(\d+)/i;
//   // For TikTok, we extract the username and video id:
//   // e.g., https://www.tiktok.com/@officialdjdibro/video/7346639237162208517?...
//   const tiktokRegex = /tiktok\.com\/@([^\/]+)\/video\/(\d+)/i;
//   const twitterRegex = /twitter\.com\/.+\/status\/(\d+)/i;

//   let platform = null;
//   let embedUrl = null;
//   let videoId = null;
//   let username = null;

//   // YouTube Shorts support:
//   if (url && url.includes("youtube.com/shorts/")) {
//     platform = 'youtube';
//     const parts = url.split("youtube.com/shorts/");
//     if (parts.length > 1) {
//       videoId = parts[1].split(/[?&]/)[0];
//       embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     }
//   }
//   // Standard YouTube URL.
//   else if (youtubeRegex.test(url)) {
//     platform = 'youtube';
//     videoId = url.match(youtubeRegex)[1];
//     embedUrl = `https://www.youtube.com/embed/${videoId}`;
//   }
//   // Facebook via fb.watch support.
//   else if (url && url.includes("fb.watch")) {
//     platform = 'facebook';
//     // For fb.watch URLs, we don't need to extract the video id.
//     // We pass the original URL to Facebook's video plugin.
//     embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
//   }
//   // Standard Facebook URL.
//   else if (facebookRegex.test(url)) {
//     platform = 'facebook';
//     videoId = url.match(facebookRegex)[1];
//     embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
//   }
//   // TikTok.
//   else if (tiktokRegex.test(url)) {
//     platform = 'tiktok';
//     const match = url.match(tiktokRegex);
//     username = match[1]; // e.g. "officialdjdibro"
//     videoId = match[2];  // e.g. "7346639237162208517"
//     // For TikTok, we'll render a blockquote per the official embed code.
//   }
//   // Twitter.
//   else if (twitterRegex.test(url)) {
//     platform = 'twitter';
//     videoId = url.match(twitterRegex)[1];
//     embedUrl = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
//   }

//   return { platform, embedUrl, videoId, url, username };
// }

// export default function EmbedDisplay({ url }) {
//   const { platform, embedUrl, videoId, username } = getEmbedData('https://www.facebook.com/share/r/164VBaFJfq/');

//   // Determine which external script(s) to load.
//   const isTwitter = platform === 'twitter';
//   const isTikTok = platform === 'tiktok';

//   useEffect(() => {
//     if (isTwitter) {
//       loadTwitterScript();
//     }
//     if (isTikTok) {
//       loadTikTokScript();
//     }
//   }, [isTwitter, isTikTok]);

//   if (!platform) {
//     return <div>Invalid or unsupported video link</div>;
//   }

//   // For TikTok, render the official blockquote embed code.
//   if (isTikTok) {
//     return (
//       <div className="embed-container">
//         <blockquote
//           className="tiktok-embed"
//           cite={url}
//           data-video-id={videoId}
//           style={{ maxWidth: '605px', minWidth: '325px' }}
//         >
//           <section>
//             <a
//               target="_blank"
//               rel="noreferrer"
//               title={`@${username}`}
//               href={`https://www.tiktok.com/@${username}?refer=embed`}
//             >
//               @{username}
//             </a>
//             <p>Check out this TikTok video.</p>
//             <a
//               target="_blank"
//               rel="noreferrer"
//               title="Watch on TikTok"
//               href={url}
//             >
//               Watch on TikTok
//             </a>
//           </section>
//         </blockquote>
//       </div>
//     );
//   }

//   // Render an iframe for YouTube, Facebook, and Twitter.
//   return (
//     <div className="embed-container">
//       <iframe
//         title="Embedded video"
//         src={embedUrl}
//         frameBorder="0"
//         allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }

// EmbedDisplay.propTypes = {
//   url: PropTypes.string.isRequired,
// };



'use client'

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './EmbedDisplay.css';

// Helper functions to load external scripts for Twitter and TikTok embeds
const loadTwitterScript = () => {
  if (!window.twttr) {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  } else {
    window.twttr.widgets.load();
  }
};

const loadTikTokScript = () => {
  if (!window.tiktokEmbedLoaded) {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    window.tiktokEmbedLoaded = true;
  }
}

// Function to detect the video platform from the URL and return embed data.
const getEmbedData = (url) => {
  // Regex patterns to detect video platforms.
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  // Existing Facebook regex for standard facebook.com video URLs.
  const facebookRegex = /facebook\.com\/(?:.*\/videos\/|video\.php\?v=)(\d+)/i;
  // For TikTok, we extract the username and video id:
  // e.g., https://www.tiktok.com/@officialdjdibro/video/7346639237162208517?...
  const tiktokRegex = /tiktok\.com\/@([^\/]+)\/video\/(\d+)/i;
  const twitterRegex = /twitter\.com\/.+\/status\/(\d+)/i;

  let platform = null;
  let embedUrl = null;
  let videoId = null;
  let username = null;

  // YouTube Shorts support:
  if (url && url.includes("youtube.com/shorts/")) {
    platform = 'youtube';
    const parts = url.split("youtube.com/shorts/");
    if (parts.length > 1) {
      videoId = parts[1].split(/[?&]/)[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }
  // Standard YouTube URL.
  else if (youtubeRegex.test(url)) {
    platform = 'youtube';
    videoId = url.match(youtubeRegex)[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  // Facebook via fb.watch support.
  else if (url && url.includes("fb.watch")) {
    platform = 'facebook';
    // For fb.watch URLs, we encode the original URL.
    embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }
  // Facebook share URL support.
  else if (url && url.includes("facebook.com/share")) {
    platform = 'facebook';
    // For Facebook share URLs, encode the original URL as well.
    embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }
  // Standard Facebook URL.
  else if (facebookRegex.test(url)) {
    platform = 'facebook';
    videoId = url.match(facebookRegex)[1];
    embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }
  // TikTok.
  else if (tiktokRegex.test(url)) {
    platform = 'tiktok';
    const match = url.match(tiktokRegex);
    username = match[1]; // e.g. "officialdjdibro"
    videoId = match[2];  // e.g. "7346639237162208517"
    // For TikTok, we'll render a blockquote per the official embed code.
  }
  // Twitter.
  else if (twitterRegex.test(url)) {
    platform = 'twitter';
    videoId = url.match(twitterRegex)[1];
    embedUrl = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
  }

  return { platform, embedUrl, videoId, url, username };
}

export default function EmbedDisplay({ url }) {
  const { platform, embedUrl, videoId, username } = getEmbedData(url);
  // 'https://www.facebook.com/share/r/164VBaFJfq/'
  // Determine which external script(s) to load.
  const isTwitter = platform === 'twitter';
  const isTikTok = platform === 'tiktok';

  useEffect(() => {
    if (isTwitter) {
      loadTwitterScript();
    }
    if (isTikTok) {
      loadTikTokScript();
    }
  }, [isTwitter, isTikTok]);

  if (!platform) {
    return <div>Invalid or unsupported video link</div>;
  }

  // For TikTok, render the official blockquote embed code.
  if (isTikTok) {
    return (
      <blockquote
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ maxWidth: '605px', minWidth: '325px' }}
    >
      <section>
        <a
          target="_blank"
          rel="noreferrer"
          title={`@${username}`}
          href={`https://www.tiktok.com/@${username}?refer=embed`}
        >
          @{username}
        </a>
        <p>Check out this TikTok video.</p>
        <a
          target="_blank"
          rel="noreferrer"
          title="Watch on TikTok"
          href={url}
        >
          Watch on TikTok
        </a>
      </section>
    </blockquote>
    );
  }

  // Render an iframe for YouTube, Facebook, and Twitter.
  return (
    <div className="embed-container">
      <iframe
        title="Embedded video"
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

EmbedDisplay.propTypes = {
  url: PropTypes.string.isRequired,
};
