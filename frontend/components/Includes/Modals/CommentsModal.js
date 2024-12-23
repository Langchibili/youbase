import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Comment } from '@mui/icons-material';
import ParentCommentsSection from '../ParentCommentsSection/ParentCommentsSection';
import { useEffect } from 'react';
import { getCommentsCount, handleCountsDisplay } from '@/Functions';

const drawerHeight = 0.7; // 70% of the screen height

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

const renderCommentsCount = (commentsCount)=>{
  return commentsCount? handleCountsDisplay(commentsCount).toString() : ""
}

function CommentsModal(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [commentCountLoaded, setCommentCountLoaded] = React.useState(false)
  const [commentsCount, setcommentsCount] = React.useState()
  
  useEffect(()=>{
    const runGetCommentCount = async()=>{
      const commentsCount = await getCommentsCount(props.post.id)
      setcommentsCount(commentsCount)
      setCommentCountLoaded(true)
    }
    runGetCommentCount()
  },[])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root style={{backgroundColor:'transparent'}}>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            transform: open ? 'translateY(0)' : 'translateY(100%)', // Drawer position based on open state
            height: `${drawerHeight * 100}vh`, // Set height to 70% of the viewport
            transition: 'transform 0.3s ease-in-out', // Smooth transition
            overflow: 'visible',
          },
        }}
      />
      <Button onClick={toggleDrawer(true)} sx={{color:'gray'}}>
        <Comment />Comments{commentCountLoaded? " "+renderCommentsCount(commentsCount): <></>}
        </Button>
      <SwipeableDrawer
        sx={{zIndex:1800}}
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen
        swipeAreaWidth={0} // Disable swipe area to prevent accidental opening
        ModalProps={{
          keepMounted: true, // Keeps the drawer mounted for better performance
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: 0, // Align with the top of the open drawer
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>Comments</Typography> */}
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          {!open? <> </> : <ParentCommentsSection {...props} commentsModalIsOpen={open} commentsCount={renderCommentsCount(commentsCount)}/>}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

CommentsModal.propTypes = {
  window: PropTypes.func,
};

export default CommentsModal;
