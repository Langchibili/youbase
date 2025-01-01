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
import SinglePostDisplay from '../SinglePostDisplay/SinglePostDisplay';

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
            <div style={{ maxWidth: '800px', margin: '0 auto'}}>
              {renderPostContent(props.post, postEngagementsDisplay)}
              {/* <SinglePostDisplay post={props.post} loggedInUser={props.loggedInUser}/> */}
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
