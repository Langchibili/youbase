// // import React, { Component } from 'react'

// // export default class VideojsPlayer extends Component {
// //     videoRef = React.createRef()
// //     logViewTriggered = false
// //     resolutionMenuRef = React.createRef()
// //     state = { isPlaying: false }

// //     componentDidMount() {
// //         this.setupVideoPlayer()
// //     }

// //     componentDidUpdate(prevProps) {
// //         if (
// //             prevProps.video !== this.props.video ||
// //             prevProps.formats !== this.props.formats
// //         ) {
// //             this.setupVideoPlayer()
// //         }
// //     }

// //     setupVideoPlayer() {
// //         const videoElement = this.videoRef.current
// //         const { formats, video, poster } = this.props

// //         if (!videoElement) return

// //         // Set up the video sources
// //         const sources = formats
// //             ? Object.keys(formats).map((key) => ({
// //                   src: formats[key],
// //                   label: `${key}p`,
// //                   selected: key === '480',
// //               }))
// //             : [
// //                   {
// //                       src: video,
// //                       label: 'Default',
// //                       selected: true,
// //                   },
// //               ]

// //         this.updateVideoSource(videoElement, sources)

// //         // Add poster
// //         if (poster) {
// //             videoElement.setAttribute('poster', poster)
// //         }

// //         // Add event listeners
// //         videoElement.addEventListener('timeupdate', this.handleTimeUpdate)
// //         videoElement.addEventListener('loadedmetadata', this.applyVideoStyles)
// //         videoElement.addEventListener('play', this.handlePlay)
// //         videoElement.addEventListener('pause', this.handlePause)
// //     }

// //     updateVideoSource(videoElement, sources) {
// //         const defaultSource = sources.find((source) => source.selected) || sources[0]
// //         videoElement.src = defaultSource.src
// //         videoElement.load()
// //         this.sources = sources
// //     }

// //     applyVideoStyles = () => {
// //         const videoElement = this.videoRef.current
// //         const { videoStyles } = this.props

// //         if (videoElement) {
// //             Object.assign(videoElement.style, {
// //                 objectFit: 'cover',
// //                 ...videoStyles,
// //             })
// //         }
// //     }

// //     handleTimeUpdate = () => {
// //         const videoElement = this.videoRef.current
// //         if (!videoElement) return

// //         const playedTime = videoElement.currentTime
// //         const duration = videoElement.duration

// //         if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
// //             this.logViewTriggered = true
// //             if (this.props.logView) {
// //                 this.props.logView()
// //             }
// //         }
// //     }

// //     handlePlay = () => {
// //         this.setState({ isPlaying: true })
// //     }

// //     handlePause = () => {
// //         this.setState({ isPlaying: false })
// //     }

// //     toggleResolutionMenu = () => {
// //         const menu = this.resolutionMenuRef.current
// //         if (menu) {
// //             menu.style.display =
// //                 menu.style.display === 'block' ? 'none' : 'block'
// //         }
// //     }

// //     switchResolution = (src) => {
// //         const videoElement = this.videoRef.current
// //         if (!videoElement) return

// //         const currentTime = videoElement.currentTime
// //         videoElement.src = src
// //         videoElement.load()
// //         videoElement.currentTime = currentTime
// //         videoElement.play()

// //         const menu = this.resolutionMenuRef.current
// //         if (menu) menu.style.display = 'none'
// //     }

// //     render() {
// //         const { poster, posterStyles } = this.props
// //         const { isPlaying } = this.state

// //         return (
// //             <div style={{ width: '100%', position: 'relative' }}>
// //                 {/* Video Element */}
// //                 <video
// //                     ref={this.videoRef}
// //                     controls
// //                     style={{ width: '100%' }}
// //                 ></video>

// //                 {/* Poster with Play Button */}
// //                 {!isPlaying && (
// //                     <div
// //                         className="poster-overlay"
// //                         style={{
// //                             position: 'absolute',
// //                             top: 0,
// //                             left: 0,
// //                             width: '100%',
// //                             height: '100%',
// //                             backgroundImage: `url(${poster})`,
// //                             backgroundSize: 'cover',
// //                             backgroundPosition: 'center',
// //                             display: 'flex',
// //                             justifyContent: 'center',
// //                             alignItems: 'center',
// //                             zIndex: 2,
// //                             cursor: 'pointer',
// //                             ...posterStyles,
// //                         }}
// //                         onClick={() => this.videoRef.current.play()}
// //                     >
// //                         <button
// //                             style={{
// //                                 width: '70px',
// //                                 height: '70px',
// //                                 borderRadius: '50%',
// //                                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
// //                                 border: 'none',
// //                                 display: 'flex',
// //                                 justifyContent: 'center',
// //                                 alignItems: 'center',
// //                                 cursor: 'pointer',
// //                             }}
// //                         >
// //                             <span
// //                                 style={{
// //                                     width: 0,
// //                                     height: 0,
// //                                     borderLeft: '20px solid white',
// //                                     borderTop: '10px solid transparent',
// //                                     borderBottom: '10px solid transparent',
// //                                 }}
// //                             ></span>
// //                         </button>
// //                     </div>
// //                 )}

// //                 {/* Resolution Switcher */}
// //                 <div
// //                     className="resolution-switcher"
// //                     style={{
// //                         position: 'absolute',
// //                         bottom: '10px',
// //                         right: '10px',
// //                         zIndex: 3,
// //                     }}
// //                 >
// //                     <button
// //                         onClick={this.toggleResolutionMenu}
// //                         style={{
// //                             background: 'rgba(0, 0, 0, 0.8)',
// //                             color: '#fff',
// //                             padding: '5px',
// //                             border: 'none',
// //                             cursor: 'pointer',
// //                             borderRadius: '50%',
// //                             width: '30px',
// //                             height: '30px',
// //                             display: 'flex',
// //                             justifyContent: 'center',
// //                             alignItems: 'center',
// //                         }}
// //                     >
// //                         ⚙
// //                     </button>

// //                     {/* Resolution Menu */}
// //                     <div
// //                         ref={this.resolutionMenuRef}
// //                         style={{
// //                             display: 'none',
// //                             position: 'absolute',
// //                             bottom: '40px',
// //                             right: '0',
// //                             background: 'rgba(0, 0, 0, 0.9)',
// //                             color: '#fff',
// //                             padding: '10px',
// //                             borderRadius: '4px',
// //                         }}
// //                     >
// //                         {this.sources &&
// //                             this.sources.map((source) => (
// //                                 <div
// //                                     key={source.label}
// //                                     onClick={() => this.switchResolution(source.src)}
// //                                     style={{
// //                                         cursor: 'pointer',
// //                                         padding: '5px 0',
// //                                     }}
// //                                 >
// //                                     {source.label}
// //                                 </div>
// //                             ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         )
// //     }
// // }


// import React, { Component } from 'react'

// export default class VideojsPlayer extends Component {
//     videoRef = React.createRef()
//     logViewTriggered = false
//     resolutionMenuRef = React.createRef()
//     state = { isPlaying: false, showControls: false }

//     componentDidMount() {
//         this.setupVideoPlayer()
//     }

//     componentDidUpdate(prevProps) {
//         if (
//             prevProps.video !== this.props.video ||
//             prevProps.formats !== this.props.formats
//         ) {
//             this.setupVideoPlayer()
//         }
//     }

//     setupVideoPlayer() {
//         const videoElement = this.videoRef.current
//         const { formats, video, poster } = this.props

//         if (!videoElement) return

//         // Set up the video sources
//         const sources = formats
//             ? Object.keys(formats).map((key) => ({
//                   src: formats[key],
//                   label: `${key}p`,
//                   selected: key === '480',
//               }))
//             : [
//                   {
//                       src: video,
//                       label: 'Default',
//                       selected: true,
//                   },
//               ]

//         this.updateVideoSource(videoElement, sources)

//         // Add poster
//         if (poster) {
//             videoElement.setAttribute('poster', poster)
//         }

//         // Add event listeners
//         videoElement.addEventListener('timeupdate', this.handleTimeUpdate)
//         videoElement.addEventListener('loadedmetadata', this.applyVideoStyles)
//         videoElement.addEventListener('play', this.handlePlay)
//         videoElement.addEventListener('pause', this.handlePause)
//     }

//     updateVideoSource(videoElement, sources) {
//         const defaultSource = sources.find((source) => source.selected) || sources[0]
//         videoElement.src = defaultSource.src
//         videoElement.load()
//         this.sources = sources
//     }

//     applyVideoStyles = () => {
//         const videoElement = this.videoRef.current
//         const { videoStyles } = this.props

//         if (videoElement) {
//             Object.assign(videoElement.style, {
//                 objectFit: 'cover',
//                 ...videoStyles,
//             })
//         }
//     }

//     handleTimeUpdate = () => {
//         const videoElement = this.videoRef.current
//         if (!videoElement) return

//         const playedTime = videoElement.currentTime
//         const duration = videoElement.duration

//         if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
//             this.logViewTriggered = true
//             if (this.props.logView) {
//                 this.props.logView()
//             }
//         }
//     }

//     handlePlay = () => {
//         this.setState({ isPlaying: true })
//     }

//     handlePause = () => {
//         this.setState({ isPlaying: false })
//     }

//     toggleResolutionMenu = () => {
//         const menu = this.resolutionMenuRef.current
//         if (menu) {
//             menu.style.display =
//                 menu.style.display === 'block' ? 'none' : 'block'
//         }
//     }

//     switchResolution = (src) => {
//         const videoElement = this.videoRef.current
//         if (!videoElement) return

//         const currentTime = videoElement.currentTime
//         videoElement.src = src
//         videoElement.load()
//         videoElement.currentTime = currentTime
//         videoElement.play()

//         const menu = this.resolutionMenuRef.current
//         if (menu) menu.style.display = 'none'
//     }

//     handleMouseEnter = () => {
//         this.setState({ showControls: true })
//     }

//     handleMouseLeave = () => {
//         this.setState({ showControls: false })
//     }

//     render() {
//         const { poster, posterStyles } = this.props
//         const { isPlaying, showControls } = this.state

//         return (
//             <div
//                 style={{ width: '100%', position: 'relative' }}
//                 onMouseEnter={this.handleMouseEnter}
//                 onMouseLeave={this.handleMouseLeave}
//             >
//                 {/* Video Element */}
//                 <video
//                     ref={this.videoRef}
//                     controls={false}
//                     style={{ width: '100%' }}
//                 ></video>

//                 {/* Poster with Play Button */}
//                 {!isPlaying && (
//                     <div
//                         className="poster-overlay"
//                         style={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             backgroundImage: `url(${poster})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             zIndex: 2,
//                             cursor: 'pointer',
//                             ...posterStyles,
//                         }}
//                         onClick={() => this.videoRef.current.play()}
//                     >
//                         <button
//                             style={{
//                                 width: '70px',
//                                 height: '70px',
//                                 borderRadius: '50%',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                                 border: 'none',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     width: 0,
//                                     height: 0,
//                                     borderLeft: '20px solid white',
//                                     borderTop: '10px solid transparent',
//                                     borderBottom: '10px solid transparent',
//                                 }}
//                             ></span>
//                         </button>
//                     </div>
//                 )}

//                 {/* Pause Button on Hover */}
//                 {showControls && isPlaying && (
//                     <div
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             zIndex: 3,
//                             cursor: 'pointer',
//                         }}
//                         onClick={() => this.videoRef.current.pause()}
//                     >
//                         <button
//                             style={{
//                                 width: '70px',
//                                 height: '70px',
//                                 borderRadius: '50%',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                                 border: 'none',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     width: '30px',
//                                     height: '30px',
//                                     backgroundColor: 'white',
//                                     mask: 'url(/pause-icon.svg)',
//                                     WebkitMask: 'url(/pause-icon.svg)',
//                                 }}
//                             ></span>
//                         </button>
//                     </div>
//                 )}

//                 {/* Resolution Switcher */}
//                 {showControls && (
//                     <div
//                         className="resolution-switcher"
//                         style={{
//                             position: 'absolute',
//                             top: '10px',
//                             right: '10px',
//                             zIndex: 3,
//                         }}
//                     >
//                         <button
//                             onClick={this.toggleResolutionMenu}
//                             style={{
//                                 background: 'rgba(0, 0, 0, 0.8)',
//                                 color: '#fff',
//                                 padding: '5px',
//                                 border: 'none',
//                                 cursor: 'pointer',
//                                 borderRadius: '50%',
//                                 width: '30px',
//                                 height: '30px',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             ⚙
//                         </button>

//                         {/* Resolution Menu */}
//                         <div
//                             ref={this.resolutionMenuRef}
//                             style={{
//                                 display: 'none',
//                                 position: 'absolute',
//                                 top: '40px',
//                                 right: '0',
//                                 background: 'rgba(0, 0, 0, 0.9)',
//                                 color: '#fff',
//                                 padding: '10px',
//                                 borderRadius: '4px',
//                             }}
//                         >
//                             {this.sources &&
//                                 this.sources.map((source) => (
//                                     <div
//                                         key={source.label}
//                                         onClick={() =>
//                                             this.switchResolution(source.src)
//                                         }
//                                         style={{
//                                             cursor: 'pointer',
//                                             padding: '5px 0',
//                                         }}
//                                     >
//                                         {source.label}
//                                     </div>
//                                 ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }
// }


// import React, { Component } from 'react'

// export default class VideojsPlayer extends Component {
//     videoRef = React.createRef()
//     logViewTriggered = false
//     resolutionMenuRef = React.createRef()
//     hideIconsTimeout = null
//     state = { isPlaying: false, showControls: false, showOverlayIcon: false }

//     componentDidMount() {
//         this.setupVideoPlayer()
//     }

//     componentDidUpdate(prevProps) {
//         if (
//             prevProps.video !== this.props.video ||
//             prevProps.formats !== this.props.formats
//         ) {
//             this.setupVideoPlayer()
//         }
//     }

//     setupVideoPlayer() {
//         const videoElement = this.videoRef.current
//         const { formats, video, poster } = this.props

//         if (!videoElement) return

//         // Set up the video sources
//         const sources = formats
//             ? Object.keys(formats).map((key) => ({
//                   src: formats[key],
//                   label: `${key}p`,
//                   selected: key === '480',
//               }))
//             : [
//                   {
//                       src: video,
//                       label: 'Default',
//                       selected: true,
//                   },
//               ]

//         this.updateVideoSource(videoElement, sources)

//         // Add poster
//         if (poster) {
//             videoElement.setAttribute('poster', poster)
//         }

//         // Add event listeners
//         videoElement.addEventListener('timeupdate', this.handleTimeUpdate)
//         videoElement.addEventListener('loadedmetadata', this.applyVideoStyles)
//         videoElement.addEventListener('play', this.handlePlay)
//         videoElement.addEventListener('pause', this.handlePause)
//         videoElement.addEventListener('mousemove', this.showControls)
//         videoElement.addEventListener('click', this.showControls)
//     }

//     updateVideoSource(videoElement, sources) {
//         const defaultSource = sources.find((source) => source.selected) || sources[0]
//         videoElement.src = defaultSource.src
//         videoElement.load()
//         this.sources = sources
//     }

//     applyVideoStyles = () => {
//         const videoElement = this.videoRef.current
//         const { videoStyles } = this.props

//         if (videoElement) {
//             Object.assign(videoElement.style, {
//                 objectFit: 'cover',
//                 ...videoStyles,
//             })
//         }
//     }

//     handleTimeUpdate = () => {
//         const videoElement = this.videoRef.current
//         if (!videoElement) return

//         const playedTime = videoElement.currentTime
//         const duration = videoElement.duration

//         if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
//             this.logViewTriggered = true
//             if (this.props.logView) {
//                 this.props.logView()
//             }
//         }
//     }

//     handlePlay = () => {
//         this.setState({ isPlaying: true, showOverlayIcon: true })
//         this.hideIconsWithDelay()
//     }

//     handlePause = () => {
//         this.setState({ isPlaying: false, showOverlayIcon: true })
//         this.hideIconsWithDelay()
//     }

//     showControls = () => {
//         clearTimeout(this.hideIconsTimeout)
//         this.setState({ showControls: true, showOverlayIcon: false })
//         this.hideIconsWithDelay()
//     }

//     hideIconsWithDelay = () => {
//         clearTimeout(this.hideIconsTimeout)
//         this.hideIconsTimeout = setTimeout(() => {
//             this.setState({ showControls: false, showOverlayIcon: false })
//         }, 2000) // Adjust delay as needed
//     }

//     toggleResolutionMenu = () => {
//         const menu = this.resolutionMenuRef.current
//         if (menu) {
//             menu.style.display =
//                 menu.style.display === 'block' ? 'none' : 'block'
//         }
//     }

//     switchResolution = (src) => {
//         const videoElement = this.videoRef.current
//         if (!videoElement) return

//         const currentTime = videoElement.currentTime
//         videoElement.src = src
//         videoElement.load()
//         videoElement.currentTime = currentTime
//         videoElement.play()

//         const menu = this.resolutionMenuRef.current
//         if (menu) menu.style.display = 'none'
//     }

//     render() {
//         const { poster, posterStyles } = this.props
//         const { isPlaying, showControls, showOverlayIcon } = this.state

//         return (
//             <div style={{ width: '100%', position: 'relative' }}>
//                 {/* Video Element */}
//                 <video
//                     ref={this.videoRef}
//                     controls={showControls}
//                     style={{ width: '100%' }}
//                 ></video>

//                 {/* Poster with Play Button */}
//                 {!isPlaying && !showControls && (
//                     <div
//                         className="poster-overlay"
//                         style={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             backgroundImage: `url(${poster})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             zIndex: 2,
//                             cursor: 'pointer',
//                             ...posterStyles,
//                         }}
//                         onClick={() => this.videoRef.current.play()}
//                     >
//                         <button
//                             style={{
//                                 width: '70px',
//                                 height: '70px',
//                                 borderRadius: '50%',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                                 border: 'none',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     width: 0,
//                                     height: 0,
//                                     borderLeft: '20px solid white',
//                                     borderTop: '10px solid transparent',
//                                     borderBottom: '10px solid transparent',
//                                 }}
//                             ></span>
//                         </button>
//                     </div>
//                 )}

//                 {/* Overlay Icon */}
//                 {showOverlayIcon && (
//                     <div
//                         className="overlay-icon"
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             zIndex: 3,
//                         }}
//                     >
//                         {isPlaying ? (
//                             <span
//                                 style={{
//                                     fontSize: '50px',
//                                     color: 'white',
//                                     background: 'rgba(0, 0, 0, 0.6)',
//                                     borderRadius: '50%',
//                                     padding: '10px',
//                                 }}
//                             >
//                                 ❚❚
//                             </span>
//                         ) : (
//                             <span
//                                 style={{
//                                     fontSize: '50px',
//                                     color: 'white',
//                                     background: 'rgba(0, 0, 0, 0.6)',
//                                     borderRadius: '50%',
//                                     padding: '10px',
//                                 }}
//                             >
//                                 ▶
//                             </span>
//                         )}
//                     </div>
//                 )}

//                 {/* Resolution Switcher */}
//                 <div
//                     className="resolution-switcher"
//                     style={{
//                         position: 'absolute',
//                         bottom: '10px',
//                         right: '10px',
//                         zIndex: 3,
//                     }}
//                 >
//                     <button
//                         onClick={this.toggleResolutionMenu}
//                         style={{
//                             background: 'rgba(0, 0, 0, 0.8)',
//                             color: '#fff',
//                             padding: '5px',
//                             border: 'none',
//                             cursor: 'pointer',
//                             borderRadius: '50%',
//                             width: '30px',
//                             height: '30px',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}
//                     >
//                         ⚙
//                     </button>

//                     {/* Resolution Menu */}
//                     <div
//                         ref={this.resolutionMenuRef}
//                         style={{
//                             display: 'none',
//                             position: 'absolute',
//                             bottom: '40px',
//                             right: '0',
//                             background: 'rgba(0, 0, 0, 0.9)',
//                             color: '#fff',
//                             padding: '10px',
//                             borderRadius: '4px',
//                         }}
//                     >
//                         {this.sources &&
//                             this.sources.map((source) => (
//                                 <div
//                                     key={source.label}
//                                     onClick={() => this.switchResolution(source.src)}
//                                     style={{
//                                         cursor: 'pointer',
//                                         padding: '5px 0',
//                                     }}
//                                 >
//                                     {source.label}
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

import React, { Component } from 'react'

export default class VideojsPlayer extends Component {
    videoRef = React.createRef()
    logViewTriggered = false
    resolutionMenuRef = React.createRef()
    hideIconsTimeout = null
    state = { isPlaying: false, showControls: false, showOverlayIcon: false }

    componentDidMount() {
        this.setupVideoPlayer()
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.video !== this.props.video ||
            prevProps.formats !== this.props.formats
        ) {
            this.setupVideoPlayer()
        }
    }

    setupVideoPlayer() {
        const videoElement = this.videoRef.current
        const { formats, video, poster } = this.props

        if (!videoElement) return

        // Set up the video sources
        const sources = formats
            ? Object.keys(formats).map((key) => ({
                  src: formats[key],
                  label: `${key}p`,
                  selected: key === '480',
              }))
            : [
                  {
                      src: video,
                      label: 'Default',
                      selected: true,
                  },
              ]

        this.updateVideoSource(videoElement, sources)

        // Add poster
        if (poster) {
            videoElement.setAttribute('poster', poster)
        }

        // Add event listeners
        videoElement.addEventListener('timeupdate', this.handleTimeUpdate)
        videoElement.addEventListener('loadedmetadata', this.applyVideoStyles)
        videoElement.addEventListener('play', this.handlePlay)
        videoElement.addEventListener('pause', this.handlePause)
        videoElement.addEventListener('mousemove', this.showControls)
        videoElement.addEventListener('click', this.handleClickOverlay)
    }

    updateVideoSource(videoElement, sources) {
        const defaultSource = sources.find((source) => source.selected) || sources[0]
        videoElement.src = defaultSource.src
        videoElement.load()
        this.sources = sources
    }

    applyVideoStyles = () => {
        const videoElement = this.videoRef.current
        const { videoStyles } = this.props

        if (videoElement) {
            Object.assign(videoElement.style, {
                objectFit: 'cover',
                ...videoStyles,
            })
        }
    }

    handleTimeUpdate = () => {
        const videoElement = this.videoRef.current
        if (!videoElement) return

        const playedTime = videoElement.currentTime
        const duration = videoElement.duration

        if (playedTime / duration >= 0.3 && !this.logViewTriggered) {
            this.logViewTriggered = true
            if (this.props.logView) {
                this.props.logView()
            }
        }
    }

    handlePlay = () => {
        this.setState({ isPlaying: true, showOverlayIcon: false })
    }

    handlePause = () => {
        this.setState({ isPlaying: false, showOverlayIcon: false })
    }

    handleClickOverlay = () => {
        this.setState({ showOverlayIcon: true })
        this.hideIconsWithDelay()
    }

    showControls = () => {
        clearTimeout(this.hideIconsTimeout)
        this.setState({ showControls: true })
        this.hideIconsWithDelay()
    }

    hideIconsWithDelay = () => {
        clearTimeout(this.hideIconsTimeout)
        this.hideIconsTimeout = setTimeout(() => {
            this.setState({ showControls: false, showOverlayIcon: false })
        }, 2000) // Adjust delay as needed
    }

    toggleResolutionMenu = () => {
        const menu = this.resolutionMenuRef.current
        if (menu) {
            menu.style.display =
                menu.style.display === 'block' ? 'none' : 'block'
        }
    }

    switchResolution = (src) => {
        const videoElement = this.videoRef.current
        if (!videoElement) return

        const currentTime = videoElement.currentTime
        videoElement.src = src
        videoElement.load()
        videoElement.currentTime = currentTime
        videoElement.play()

        const menu = this.resolutionMenuRef.current
        if (menu) menu.style.display = 'none'
    }

    render() {
        const { poster, posterStyles } = this.props
        const { isPlaying, showControls, showOverlayIcon } = this.state

        return (
            <div style={{ width: '100%', position: 'relative' }}>
                {/* Video Element */}
                <video
                    ref={this.videoRef}
                    controls={showControls}
                    style={{ width: '100%' }}
                ></video>

                {/* Poster with Play Button */}
                {!isPlaying && !showControls && (
                    <div
                        className="poster-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${poster})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2,
                            cursor: 'pointer',
                            ...posterStyles,
                        }}
                        onClick={() => this.videoRef.current.play()}
                    >
                        <button
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                border: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <span
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: '20px solid white',
                                    borderTop: '10px solid transparent',
                                    borderBottom: '10px solid transparent',
                                }}
                            ></span>
                        </button>
                    </div>
                )}

                {/* Overlay Icon */}
                {showOverlayIcon && (
                    <div
                        className="overlay-icon"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 3,
                        }}
                    >
                        {isPlaying ? (
                            <span
                                style={{
                                    fontSize: '50px',
                                    color: 'white',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    borderRadius: '50%',
                                    padding: '10px',
                                }}
                            >
                                ❚❚
                            </span>
                        ) : (
                            <span
                                style={{
                                    fontSize: '50px',
                                    color: 'white',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    borderRadius: '50%',
                                    padding: '10px',
                                }}
                            >
                                ▶
                            </span>
                        )}
                    </div>
                )}

                {/* Resolution Switcher */}
                <div
                    className="resolution-switcher"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 3,
                    }}
                >
                    <button
                        onClick={this.toggleResolutionMenu}
                        style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: '#fff',
                            padding: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        ⚙
                    </button>

                    {/* Resolution Menu */}
                    <div
                        ref={this.resolutionMenuRef}
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: '40px',
                            right: '0',
                            background: 'rgba(0, 0, 0, 0.9)',
                            color: '#fff',
                            padding: '10px',
                            borderRadius: '4px',
                        }}
                    >
                        {this.sources &&
                            this.sources.map((source) => (
                                <div
                                    key={source.label}
                                    onClick={() => this.switchResolution(source.src)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '5px 0',
                                    }}
                                >
                                    {source.label}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}
