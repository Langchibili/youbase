import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

export default function DeletePostModal({ open, handleClose }) {
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
            component={Link}
            href="/signup"
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            component={Link}
            href="/signin"
            variant="outlined"
            color="primary"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
