import React from 'react'
import { Box, Skeleton } from '@mui/material'

export default function PostPageSkeleton({ onSinglePostDisplayPage }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: 2,
      }}
    >
      {onSinglePostDisplayPage ? (
        <Box>
          {/* MediaDisplay Skeleton */}
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={200}
            sx={{ borderRadius: '5px', marginBottom: '10px' }}
          />

          {/* Divider */}
          <Skeleton variant="text" animation="wave" width="95%" sx={{ margin: '0 auto' }} />

          {/* Post Info */}
          <Box sx={{ paddingLeft: '5px', marginTop: 2 }}>
            <Skeleton
              variant="text"
              animation="wave"
              width="80%"
              height={30}
              sx={{ marginBottom: 1 }}
            />
            <Skeleton variant="text" animation="wave" width="90%" height={20} />
            <Skeleton variant="text" animation="wave" width="85%" height={20} />
          </Box>

          {/* Music Post Container */}
          <Box
            sx={{
              backgroundColor: 'lightyellow',
              marginTop: 2,
              padding: 1,
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="50%"
              height={40}
              sx={{ margin: '0 auto' }}
            />
            <Skeleton variant="text" animation="wave" width="70%" sx={{ marginTop: 1 }} />
          </Box>

          {/* Avatar and Post Date */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 2,
              gap: 2,
            }}
          >
            <Skeleton variant="circular" animation="wave" width={40} height={40} />
            <Skeleton variant="text" animation="wave" width="50%" height={20} />
          </Box>

          {/* Songs Info */}
          <Skeleton
            variant="text"
            animation="wave"
            width="60%"
            height={25}
            sx={{ margin: '10px auto' }}
          />

          {/* Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '60%',
              margin: '0 auto',
              marginTop: 2,
            }}
          >
            <Skeleton variant="rectangular" animation="wave" width="45%" height={40} />
            <Skeleton variant="rectangular" animation="wave" width="45%" height={40} />
          </Box>
        </Box>
      ) : (
        // Medium Content Loading Skeleton
        <Box>
          <Skeleton variant="rectangular" animation="wave" width="100%" height={150} />
          <Box sx={{ marginTop: 2 }}>
            <Skeleton variant="text" animation="wave" width="70%" height={30} />
            <Skeleton variant="text" animation="wave" width="90%" height={20} />
            <Skeleton variant="text" animation="wave" width="80%" height={20} />
          </Box>
        </Box>
      )}
    </Box>
  )
}
