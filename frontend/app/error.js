'use client' // Error components must be Client Components

import { useUser } from '@/Contexts/UserContext'
import { createBugReport } from '@/Functions'
import { Alert, Button, Card, CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Error({ error, reset }) {
  const loggedInUser = useUser()
  const [errorLogCount, setErrorLogCount] = useState(0)

  useEffect(() => {
    if (errorLogCount > 1) {
      return
    }
    // Create the error report object
    const errorReport = {
      location: window.location.pathname,
      user: loggedInUser?.user?.id,
      error_data: error.toString()
    }
    // Submit the error report as JSON
    
    createBugReport({ data: errorReport})
    setErrorLogCount(errorLogCount + 1)
  }, [error, errorLogCount, loggedInUser])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            Something went wrong!
          </Alert>
          <Typography variant="body1" gutterBottom>
            We have logged this issue, and we shall do our best to sort it.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={reset}
            style={{ marginTop: '1rem' }}
          >
            Go Back to the Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
