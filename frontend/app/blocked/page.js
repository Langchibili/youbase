"use client"

import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const RedirectUser = ({ path }) => {
  const router = useRouter();

  React.useEffect(() => {
    router.push(path); // Redirect automatically when the component mounts
  }, [router, path]);

  return null; // Nothing visible on the screen
};

const Blocked = () => {
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = () => {
    setRedirect(true); // Trigger the RedirectUser component
  };

  return (
    <Box sx={{ maxWidth: 600, padding:'10px', margin: '50px auto', textAlign: 'center' }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Account Blocked</AlertTitle>
        Your account has been blocked. Please contact our support team to resolve this issue.
      </Alert>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleRedirect} 
        sx={{ marginTop: 2 }}
      >
        Contact Support
      </Button>
      {redirect && <RedirectUser path="/support" />} {/* Conditionally render RedirectUser */}
    </Box>
  );
};

export default Blocked;
