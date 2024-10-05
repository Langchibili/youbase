'use client'

import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updatePost } from '@/Functions';

export default function DeletePostModal({ open, handleClose, postId }) {
 const deletePost = async ()=>{
      const updateObject = {
        data:{
            status: 'draft'
        }
      }
      const deletePost = await updatePost(updateObject,postId)
      if(deletePost && deletePost.status === "draft"){
        if(typeof document !== 'undefined'){
            document.getElementById("post-"+deletePost.id).style.display = "none"
            handleClose()
       }
      }
 }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
          borderRadius: 1,
          outline: 'none',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography id="login-modal-title" variant="h6" component="h2">
          This action cannot be reversed
        </Typography>
        <Box mt={3} display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deletePost}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
