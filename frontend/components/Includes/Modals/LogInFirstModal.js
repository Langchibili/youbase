import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

export default function LogInFirstModal({ open, handleClose }) {
 // const [isOpen, setIsOpen] = useState(open);

  // Sync state with the prop if it changes
//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

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
          You must log in to complete this action
        </Typography>
        <Box mt={3} display="flex" justifyContent="space-around">
          <Button
            component={Link}
            href="/signup"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            href="/signin"
            variant="outlined"
            color="primary"
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
