// import { backEndUrl } from '@/Constants';
// import React, { Component } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// export default class VideojsPlayer extends Component {
//     player = null;
//     logViewTriggered = false;

//     componentDidMount() {
//         this.initializePlayer();
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.video !== this.props.video || prevProps.formats !== this.props.formats) {
//             this.initializePlayer();
//         }
//     }

//     componentWillUnmount() {
//         // Apply custom poster styles if provided
//         if (this.player) {
//             this.player.dispose();
//         }
//     }

//     // Function to apply custom styles to the poster element
//     // applyPosterStyle(style) {
//     //     const posterElement = this.player.el().querySelector('.vjs-poster');
//     //     if (posterElement) {
//     //         Object.assign(posterElement.style, style); // Apply styles to the poster element
//     //     }
//     // }
    
//     initializePlayer() {
//         const { video, formats, posterStyles } = this.props;

//         if (this.player) {
//             this.player.dispose();
//         }
//         // if (posterStyles) {
//         //     this.applyPosterStyle(posterStyles);
//         // }

//         const sources = formats
//             ? Object.keys(formats).map((key) => ({
//                   src: video.provider === "aws-s3" ? formats[key] : backEndUrl + formats[key],
//                   type: 'video/mp4',
//                   label: `${key}p`,
//                   selected: key === '480',
//               }))
//             : [
//                   {
//                       src: video,
//                       type: 'video/mp4',
//                       label: 'Default',
//                       selected: true,
//                   },
//               ];

//         const defaultSource = sources.find((source) => source.selected) || sources[0];

//         this.player = videojs(this.videoNode, {
//             controls: true,
//             autoplay: false,
//             preload: 'auto',
//             poster: this.props.poster,
//         });

//         this.player.src(defaultSource);

//         const { width, height } = this.player.currentDimensions();
//         this.player.dimensions(width, height);

//         this.addResolutionSwitcher(sources);

//         this.player.on('timeupdate', this.handleTimeUpdate);
//     }

//     addResolutionSwitcher(sources) {
//         const Button = videojs.getComponent('Button');

//         class ResolutionSwitcher extends Button {
//             constructor(player, options) {
//                 super(player, options);
//                 this.sources = options.sources;
//                 this.createMenu();
//             }

//             createMenu() {
//                 const menu = document.createElement('div');
//                 menu.className = 'vjs-menu vjs-menu-settings';
//                 menu.style.display = 'none';
//                 menu.style.position = 'absolute';
//                 menu.style.right = '10px';
//                 menu.style.bottom = '50px';
//                 menu.style.background = 'rgba(0, 0, 0, 0.8)';
//                 menu.style.color = '#fff';
//                 menu.style.padding = '10px';
//                 menu.style.borderRadius = '4px';
//                 menu.style.zIndex = '1000';

//                 this.sources.forEach((source) => {
//                     const menuItem = document.createElement('div');
//                     menuItem.className = 'vjs-menu-item';
//                     menuItem.textContent = source.label;
//                     menuItem.style.cursor = 'pointer';
//                     menuItem.style.padding = '5px 10px';

//                     menuItem.onclick = () => {
//                         const currentTime = this.player().currentTime();
//                         this.player().src(source);
//                         this.player().one('loadedmetadata', () => {
//                             this.player().currentTime(currentTime);
//                             this.player().play();
//                         });
//                         menu.style.display = 'none';
//                     };

//                     menu.appendChild(menuItem);
//                 });

//                 this.player().el().appendChild(menu);
//                 this.menu = menu;
//             }

//             handleClick() {
//                 this.menu.style.display = this.menu.style.display === 'none' ? 'block' : 'none';
//             }

//             buildCSSClass() {
//                 return `vjs-resolution-switcher ${super.buildCSSClass()}`;
//             }

//             createEl() {
//                 const el = super.createEl('button', {
//                     className: 'vjs-icon-cog',
//                     innerHTML: '<span class="vjs-control-text">Settings</span>',
//                 });
//                 return el;
//             }
//         }

//         videojs.registerComponent('ResolutionSwitcher', ResolutionSwitcher);

//         this.player
//             .getChild('controlBar')
//             .addChild('ResolutionSwitcher', { sources }, this.player.controlBar.children().length - 1);
//     }

//     handleTimeUpdate = () => {
//         if (!this.player) return;

//         const playedTime = this.player.currentTime();
//         const duration = this.player.duration();

//         if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
//             this.logViewTriggered = true;
//             if (this.props.logView) {
//                 this.props.logView();
//             }
//         }
//     };

//     render() {
//         const { videoStyles } = this.props; // Destructure videoStyles

//         return (
//             <div style={{ width: '100%' }}> {/* Ensure the outer container also takes 100% width */}
//             <div data-vjs-player>
//                 <video
//                     ref={(node) => (this.videoNode = node)}
//                     className="video-js vjs-default-skin vjs-big-play-centered"
//                     style={{
//                         ...videoStyles, // Merge additional styles passed as props
//                     }}
//                 ></video>
//             </div>
//         </div>
//         );
//     }
// }






import { backEndUrl } from '@/Constants';
import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideojsPlayer extends Component {
    player = null;
    logViewTriggered = false;

    componentDidMount() {
        this.initializePlayer();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.video !== this.props.video || prevProps.formats !== this.props.formats) {
            this.initializePlayer();
        }
    }

    componentWillUnmount() {
        // Apply custom poster styles if provided
        if (this.player) {
            this.player.dispose();
        }
    }

    // Function to apply custom styles to the poster element
    // applyPosterStyle(style) {
    //     const posterElement = this.player.el().querySelector('.vjs-poster');
    //     if (posterElement) {
    //         Object.assign(posterElement.style, style); // Apply styles to the poster element
    //     }
    // }
    
    initializePlayer() {
        const { video, formats, posterStyles } = this.props;
    
        if (this.player) {
            this.player.dispose();
        }
    
        const sources = formats
            ? Object.keys(formats).map((key) => ({
                  src: video.provider === "aws-s3" ? formats[key] : backEndUrl + formats[key],
                  type: 'video/mp4',
                  label: `${key}p`,
                  selected: key === '480',
              }))
            : [
                  {
                      src: video,
                      type: 'video/mp4',
                      label: 'Default',
                      selected: true,
                  },
              ];
    
        const defaultSource = sources.find((source) => source.selected) || sources[0];
    
        this.player = videojs(this.videoNode, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            poster: this.props.poster,
        });
    
        this.player.src(defaultSource);
    
        const { width, height } = this.player.currentDimensions();
        this.player.dimensions(width, height);
    
        this.addResolutionSwitcher(sources);
    
        // Wait until the poster image is loaded and apply the styles
        this.player.on('posterchange', () => {
            // Select the poster image inside the video player's poster
            const posterImage = this.player.el().querySelector('.vjs-poster > img');
            if (posterImage) {
                posterImage.style.objectFit = 'cover';
            }
        });
    
        this.player.on('timeupdate', this.handleTimeUpdate);
    }
    
    

    addResolutionSwitcher(sources) {
        const Button = videojs.getComponent('Button');

        class ResolutionSwitcher extends Button {
            constructor(player, options) {
                super(player, options);
                this.sources = options.sources;
                this.createMenu();
            }

            createMenu() {
                const menu = document.createElement('div');
                menu.className = 'vjs-menu vjs-menu-settings';
                menu.style.display = 'none';
                menu.style.position = 'absolute';
                menu.style.right = '10px';
                menu.style.bottom = '50px';
                menu.style.background = 'rgba(0, 0, 0, 0.8)';
                menu.style.color = '#fff';
                menu.style.padding = '10px';
                menu.style.borderRadius = '4px';
                menu.style.zIndex = '1000';

                this.sources.forEach((source) => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'vjs-menu-item';
                    menuItem.textContent = source.label;
                    menuItem.style.cursor = 'pointer';
                    menuItem.style.padding = '5px 10px';

                    menuItem.onclick = () => {
                        const currentTime = this.player().currentTime();
                        this.player().src(source);
                        this.player().one('loadedmetadata', () => {
                            this.player().currentTime(currentTime);
                            this.player().play();
                        });
                        menu.style.display = 'none';
                    };

                    menu.appendChild(menuItem);
                });

                this.player().el().appendChild(menu);
                this.menu = menu;
            }

            handleClick() {
                this.menu.style.display = this.menu.style.display === 'none' ? 'block' : 'none';
            }

            buildCSSClass() {
                return `vjs-resolution-switcher ${super.buildCSSClass()}`;
            }

            createEl() {
                const el = super.createEl('button', {
                    className: 'vjs-icon-cog',
                    innerHTML: '<span class="vjs-control-text">Settings</span>',
                });
                return el;
            }
        }

        videojs.registerComponent('ResolutionSwitcher', ResolutionSwitcher);

        this.player
            .getChild('controlBar')
            .addChild('ResolutionSwitcher', { sources }, this.player.controlBar.children().length - 1);
    }

    handleTimeUpdate = () => {
        if (!this.player) return;

        const playedTime = this.player.currentTime();
        const duration = this.player.duration();

        if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
            this.logViewTriggered = true;
            if (this.props.logView) {
                this.props.logView();
            }
        }
    };

    render() {
        const { videoStyles } = this.props; // Destructure videoStyles

        return (
            <div style={{ width: '100%' }}> {/* Ensure the outer container also takes 100% width */}
            <div data-vjs-player style={{height:'100%'}}>
                <video
                    ref={(node) => (this.videoNode = node)}
                    className="video-js vjs-default-skin vjs-big-play-centered"
                    style={{
                        ...videoStyles, // Merge additional styles passed as props
                    }}
                ></video>
            </div>
        </div>
        );
    }
}



