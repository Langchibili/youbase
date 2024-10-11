'use client' // Error components must be Client Components
 
import { Alert } from '@mui/material'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <Alert severity='warning'> Something went wrong!</Alert>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Retry
      </button>
    </div>
  )
}