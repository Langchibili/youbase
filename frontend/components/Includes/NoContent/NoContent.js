import React from 'react'
import { Box, Typography } from '@mui/material'
import { InsertDriveFile } from '@mui/icons-material'

const NoContent = ({ message = 'No content selected', icon: Icon = InsertDriveFile,actionIfContentIsEmpty }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'ghostwhite',
        color: 'gray',
        border: '1px dashed lightgray',
        borderRadius: 2,
        height: '100%',
        p: 3,
      }}
    >
      <Icon sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="body1">{message}</Typography>
      {actionIfContentIsEmpty? actionIfContentIsEmpty() : <></>}
    </Box>
  )
}

export default NoContent
