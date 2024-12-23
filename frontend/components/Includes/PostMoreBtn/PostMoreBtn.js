'use client'

import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Menu icon (three dots)
import PostModal from "../Modals/PostModal";
import { log } from "@/Constants";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import DeletePostModal from "../Modals/DeletePostModal";
import ReportPostModal from "../Modals/ReportPostModal";

const MoreOptions = ({ anchorEl, open, loggedInUser, handleDeleteModalOpen, handleReportModalOpen, handleShareModalOpen,handleClose,handlePostModalClickOpen,thisIsMyPost,thisIsMyComment,isComment}) => {
  if(isComment){
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
       <MenuItem onClick={()=>{handleShareModalOpen(true)}}>Share Post</MenuItem>
       {!thisIsMyComment? null :  <MenuItem onClick={()=>{handleDeleteModalOpen(true)}}>Delete Comment</MenuItem>}
      </Menu>
    );
  }
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {!thisIsMyPost?  null: <MenuItem onClick={() => { handleClose(); handlePostModalClickOpen(); }}>Edit</MenuItem>}
      <MenuItem onClick={()=>{handleShareModalOpen(true)}}>Share</MenuItem>
      {!thisIsMyPost? null :  <MenuItem onClick={()=>{handleDeleteModalOpen(true)}}>Delete</MenuItem>}
      {!loggedInUser.status? null : <MenuItem onClick={()=>{handleReportModalOpen(true)}}>Report</MenuItem>}
    </Menu>
  );
};

export default function PostMoreBtn(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = useState(false)
  const [openShareModal, handleShareModalOpen] = useState(false)
  const [openDeleteModal, handleDeleteModalOpen] = useState(false)
  const [openReportModal, handleReportModalOpen] = useState(false)

  const handlePostModalClickOpen = () => {
    setOpen(true);
  }

  const handlePostModalClose = () => {
    setOpen(false);
  }

  const handleShareModalClose = ()=>{
    handleShareModalOpen(false)
  }

  const handleDeleteModalClose = ()=>{
    handleDeleteModalOpen(false)
  }

  const handleReportModalClose = ()=>{
    handleReportModalOpen(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  console.log('inside the share page',props.post)
  return (
    <>
    {/* postId is for comments deletion */}
    <DeletePostModal open={openDeleteModal} postId={props.isComment? props.postId : props.post.id} isComment={props.isComment} commentId={props.commentId} handleClose={handleDeleteModalClose}/>
    <ReportPostModal open={openReportModal} {...props} handleClose={handleReportModalClose}/>
      {props.post && props.post.user && props.post.user.data && props.post.user.data.attributes && (<ShareButton hideButton={true} openShareModal={openShareModal} handleShareModalClose={handleShareModalClose} post={props.post} user={props.post.user.data.attributes} {...props} />)}
      <IconButton onClick={handleClick} sx={{paddingTop: '0px', paddingRight:'0px',...props.moreStyles}}>
        <MoreVertIcon />
      </IconButton>
      <MoreOptions loggedInUser={props.loggedInUser} handleDeleteModalOpen={handleDeleteModalOpen} handleReportModalOpen={handleReportModalOpen} handleShareModalOpen={handleShareModalOpen} thisIsMyPost={props.thisIsMyPost} thisIsMyComment={props.thisIsMyComment} isComment={props.isComment} anchorEl={anchorEl} open={open} handleClose={handleClose} handlePostModalClickOpen={handlePostModalClickOpen} handlePostModalClose={handlePostModalClose}/>
      <PostModal open={openModal} onClose={handlePostModalClose} {...props}/>
    </>
  )
}