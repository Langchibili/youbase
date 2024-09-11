import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Menu icon (three dots)
import PostModal from "../Modals/PostModal";

const MoreOptions = ({ anchorEl, open, handleClose,handlePostModalClickOpen }) => {
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
      <MenuItem onClick={() => { handleClose(); handlePostModalClickOpen(); }}>Edit</MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
      <MenuItem onClick={handleClose}>Share</MenuItem>
    </Menu>
  );
};

export default function PostMoreBtn(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = useState(false);

  const handlePostModalClickOpen = () => {
    setOpen(true);
  }

  const handlePostModalClose = () => {
    setOpen(false);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  console.log('in the more button',props)
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <MoreOptions anchorEl={anchorEl} open={open} handleClose={handleClose} handlePostModalClickOpen={handlePostModalClickOpen} handlePostModalClose={handlePostModalClose}/>
      <PostModal open={openModal} onClose={handlePostModalClose} {...props}/>
    </>
  )
}