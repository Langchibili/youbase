'use client'

import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Menu icon (three dots)
import PostModal from "../Modals/PostModal";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import DeletePostModal from "../Modals/DeletePostModal";
import ReportPostModal from "../Modals/ReportPostModal";

const MoreOptions = ({ anchorEl, open, loggedInUser, handleDeleteModalOpen, handleReportModalOpen, handleShareModalOpen,handleClose,handlePostModalClickOpen,thisIsMyPost,thisIsMyComment,isComment}) => {
  console.log('we are here though', open, isComment)
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
        sx={{zIndex:1900}}
      >
       <MenuItem onClick={()=>{handleShareModalOpen(true)}}>Share Post</MenuItem>
       {!thisIsMyComment? null :  <MenuItem onClick={()=>{handleDeleteModalOpen(true)}}>Delete Comment</MenuItem>}
      </Menu>
    )
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
      {!thisIsMyPost?  null: <MenuItem onClick={(e) => { e.stopPropagation(); handleClose(); handlePostModalClickOpen(); }}>Edit</MenuItem>}
      <MenuItem onClick={(e)=>{e.stopPropagation(); handleShareModalOpen(true)}}>Share</MenuItem>
      {!thisIsMyPost? null :  <MenuItem onClick={(e)=>{ e.stopPropagation(); handleDeleteModalOpen(true)}}>Delete</MenuItem>}
      {!loggedInUser.status? null : <MenuItem onClick={(e)=>{e.stopPropagation(); handleReportModalOpen(true)}}>Report</MenuItem>}
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

  const handlePostModalClickOpen = (e) => {
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    setOpen(true);
  }

  const handlePostModalClose = (e) => {
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    setOpen(false);
  }

  const handleShareModalClose = (e)=>{
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    handleShareModalOpen(false)
  }

  const handleDeleteModalClose = (e)=>{
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    handleDeleteModalOpen(false)
  }

  const handleReportModalClose = (e)=>{
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    handleReportModalOpen(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation(); // Prevent parent click handler
  }

  const handleClose = (e) => {
    if(e){
      e.stopPropagation(); // Prevent parent click handler
    }
    setAnchorEl(null);
  }
  const iconColor = props.iconColor? props.iconColor: ''
  return (
    <>
    {/* postId is for comments deletion */}
    <DeletePostModal openDeletePostModal={openDeleteModal} postId={props.isComment? props.postId : props.post.id} isComment={props.isComment} commentId={props.commentId} handleClose={handleDeleteModalClose}/>
    <ReportPostModal openReportModal={openReportModal} {...props} handleClose={handleReportModalClose}/>
      {props.post && props.post.user && props.post.user.data && props.post.user.data.attributes && (<ShareButton hideButton={true} openShareModal={openShareModal} handleShareModalClose={handleShareModalClose} post={props.post} user={props.post.user.data.attributes} {...props} />)}
      <IconButton onClick={handleClick} sx={{paddingTop: '0px', paddingRight:'0px',...props.moreStyles}}>
        <MoreVertIcon sx={{color:iconColor}}/>
      </IconButton>
      <MoreOptions loggedInUser={props.loggedInUser} handleDeleteModalOpen={handleDeleteModalOpen} handleReportModalOpen={handleReportModalOpen} handleShareModalOpen={handleShareModalOpen} thisIsMyPost={props.thisIsMyPost} thisIsMyComment={props.thisIsMyComment} isComment={props.isComment} anchorEl={anchorEl} open={open} handleClose={handleClose} handlePostModalClickOpen={handlePostModalClickOpen} handlePostModalClose={handlePostModalClose}/>
      <><PostModal openPostModal={openModal} onPostModalClose={handlePostModalClose} {...props}/></>
    </>
  )
}