// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { Global } from '@emotion/react';
// import { styled } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { grey } from '@mui/material/colors';
// import Button from '@mui/material/Button';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import LikeButton from "@/components/Parts/EngageMents/LikeButton";
// import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
// import ShareButton from "@/components/Parts/EngageMents/ShareButton";
// import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
// import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
// import TextPostMedium from "../PostsDisplay/TextPostMedium";
// import ImagePostMedium from "../PostsDisplay/ImagePostMedium";
// import VideoPostMedium from "../PostsDisplay/VideoPostMedium";
// import MusicPostMedium from "../PostsDisplay/MusicPostMedium";
// import EmbedPostMedium from "../PostsDisplay/EmbedPostMedium";

// import { Watch } from '@material-ui/icons';
// import { Close, Visibility } from '@mui/icons-material';
// import { IconButton } from '@mui/material';

// const drawerBleeding = 100;
// const drawerHeight = 100; // 70% of the screen height

// const Root = styled('div')(({ theme }) => ({
//   height: '100%',
//   backgroundColor: grey[100],
//   ...theme.applyStyles('dark', {
//     backgroundColor: theme.palette.background.default,
//   }),
// }));

// const StyledBox = styled('div')(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.applyStyles('dark', {
//     backgroundColor: grey[800],
//   }),
// }));

// const Puller = styled('div')(({ theme }) => ({
//   width: 30,
//   height: 6,
//   backgroundColor: grey[300],
//   borderRadius: 3,
//   position: 'absolute',
//   top: 8,
//   left: 'calc(50% - 15px)',
//   ...theme.applyStyles('dark', {
//     backgroundColor: grey[900],
//   }),
// }))

// function PostMoreModal(props) {
//   const { window } = props;
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };
  
//   const container = window !== undefined ? () => window().document.body : undefined;
//   const postEngagementsDisplay = post => {
//     return (
//       <div className='inline-engagements-display'>
//         <ul>
//           {post.type === 'video' && <ViewsDisplay post={post} user={post.user.data.attributes} {...props} />}
//         </ul>
//         <ul>
//           {post.type === 'music' && <StreamsDisplay post={post} user={post.user.data.attributes} {...props} />}
//         </ul>
//         <ul>
//           <LikeButton post={post} user={post.user.data.attributes} {...props} />
//         </ul>
//         <ul>
//           <ShareButton post={post} user={post.user.data.attributes} {...props} />
//         </ul>
//       </div>
//     )
//   }
//   const renderPostContent = (post, postEngagementsDisplay) => {
//       switch (post.type) {
//         case 'text':
//           return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
//         case 'image':
//           return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
//         case 'video':
//           return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
//         case 'music':
//           return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
//         case 'embed':
//           return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
//         default:
//           return null
//       }
//   }
//   console.log(props)
//   return (
//     <Root style={{backgroundColor:'transparent'}}>
//       <CssBaseline />
//       {/* <Global
//         styles={{
//           '.MuiDrawer-root.MuiDrawer-modal.MuiModal-root > .css-z2q3sz-MuiModal-root-MuiDrawer-root': {
//             height: `100vh`,
//             overflow: 'visible',
//           },
//         }}
//       /> */}
//       <Button onClick={toggleDrawer(true)}  sx={{color:'gray'}}>
//         <Visibility/> View
//       </Button>
//       <SwipeableDrawer
//             container={container}
//             anchor="bottom"
//             open={open}
//             sx={{height:"100vh !important"}}
//             onClose={toggleDrawer(false)}
//             onOpen={toggleDrawer(true)}
//             disableSwipeToOpen
//             swipeAreaWidth={0} // Disable swipe area to prevent accidental opening
//             ModalProps={{
//                 keepMounted: true, // Keeps the drawer mounted for better performance
//             }}
//             PaperProps={{
//                 sx: {
//                 height: '100%', // Full screen height
//                 width: '100vw', // Full screen width
//                 borderRadius: 0, // No rounded corners for a full-screen effect
//                 overflow: 'auto',
//                 },
//             }}
//             >
//             <StyledBox
//                 sx={{
//                 height: '100%', // Full height of the drawer
//                 display: 'flex',
//                 flexDirection: 'column', // Stack content vertically
//                 }}
//             >
//                 {/* Puller and Close Button */}
//                 <div style={{ position: 'relative', padding: '1rem'}}>
//                 <Puller />
//                 <IconButton
//                     onClick={toggleDrawer(false)}
//                     sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
//                 >
//                     <Close />
//                 </IconButton>
//                 </div>

//                 {/* Drawer Content */}
//                 <div
//                 style={{
//                     flexGrow: 1, // Fill remaining space
//                     overflowY: 'auto', // Enable scrolling if content exceeds height
//                     padding: '1rem',
//                 }}
//                 >
//                 {open ? (
//                     <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//                     {renderPostContent(props.post, postEngagementsDisplay)}
//                     <PostImpressions {...props} />
//                     </div>
//                 ) : null}
//                 </div>
//             </StyledBox>
//             </SwipeableDrawer>
//       </Root>
//   );
// }

// PostMoreModal.propTypes = {
//   window: PropTypes.func,
// };

// export default PostMoreModal;


import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Zoom from '@mui/material/Zoom';
import { ArrowBack, Visibility } from '@mui/icons-material';
import Box from '@mui/material/Box';
import LikeButton from "@/components/Parts/EngageMents/LikeButton";
import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import TextPostMedium from "../PostsDisplay/TextPostMedium";
import ImagePostMedium from "../PostsDisplay/ImagePostMedium";
import VideoPostMedium from "../PostsDisplay/VideoPostMedium";
import MusicPostMedium from "../PostsDisplay/MusicPostMedium";
import EmbedPostMedium from "../PostsDisplay/EmbedPostMedium";

const StyledContent = styled(Box)({
  padding: 24,
  backgroundColor: 'black',
  height: '100vh',
  overflowY: 'auto',
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={props.open} ref={ref} {...props} />;
});

// this modal opens with a button which is within itself so no need to change open
function PostMoreModal(props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => { // removing the music floating button
    if(typeof document !== "undefined"){
        if(open){
          const musicPlayer = document.getElementById('music-player-controller')
          if(musicPlayer){
            musicPlayer.style.display = "none"
          }
        }
      }
      return () => {
        if(typeof document !== "undefined"){
          const musicPlayer = document.getElementById('music-player-controller')
          if(musicPlayer){
             musicPlayer.style.display = "block"
          }
        }
      }
  }, [open])

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const postEngagementsDisplay = post => {
    return (
      <div className='inline-engagements-display'>
        <ul>
          {post.type === 'video' && <ViewsDisplay post={post} user={post.user.data.attributes} {...props} />}
        </ul>
        <ul>
          {post.type === 'music' && <StreamsDisplay post={post} user={post.user.data.attributes} {...props} />}
        </ul>
        <ul>
          <LikeButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
        <ul>
          <ShareButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
      </div>
    )
  }
  const renderPostContent = (post, postEngagementsDisplay) => {
      switch (post.type) {
        case 'text':
          return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
        case 'image':
          return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
        case 'video':
          return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
        case 'music':
          return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
        case 'embed':
          return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
        default:
          return null
      }
  }


  return (
    <>
      <Button onClick={() => toggleDrawer(true)} sx={{ color: 'gray' }}>
        <Visibility /> View
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => toggleDrawer(false)}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'black',
          },
        }}
      >
        <Toolbar sx={{ backgroundColor: 'black' }}>
          <IconButton
            edge="start"
            sx={{ color: 'gray' }}
            onClick={() => toggleDrawer(false)}
            aria-label="close"
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
        <StyledContent>
          {open && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {renderPostContent(props.post, postEngagementsDisplay)}
              <PostImpressions {...props} />
            </div>
          )}
        </StyledContent>
      </Dialog>
    </>
  );
}

PostMoreModal.propTypes = {
  window: PropTypes.func,
  post: PropTypes.object.isRequired,
};

export default PostMoreModal;
