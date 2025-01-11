"use client"

import { Skeleton, Box, Typography, Grid, Avatar, Tabs, Tab, Divider, Button } from "@mui/material"
import { MoreVert, FeedOutlined, VideocamOutlined, ImageOutlined } from "@mui/icons-material"

export default function UserProfileSkeleton() {
  return (
    <Box sx={{ mt: -4 }}>
      {/* Profile Section */}
      <Box sx={{ bgcolor: "background.paper", p: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={10}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {/* Profile Picture */}
              <Skeleton variant="circular" width={100} height={100} />
              <Box sx={{ ml: 2 }}>
                {/* Full Name and User Type */}
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="text" width={100} />
              </Box>
            </Box>

            {/* Stats */}
            <Grid container spacing={2}>
              {["Followers", "Posts", "Following"].map((label) => (
                <Grid item xs={4} key={label}>
                  <Box textAlign="center">
                    <Skeleton variant="text" width={60} />
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Tabs */}
      <Box sx={{ px: 2 }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {["About", "Posts", "Videos", "Music", "Reels", "Captures", "Texts"].map((tab, index) => (
            <Tab key={index} label={<Skeleton variant="text" width={80} />} />
          ))}
        </Tabs>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Content Section */}
      <Box sx={{ px: 2 }}>
        <Typography variant="h6">
          <Skeleton variant="text" width="40%" />
        </Typography>
        <Grid container spacing={2}>
          {/* Placeholder for multiple content cards */}
          {[...Array(4)].map((_, idx) => (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <Box sx={{ borderRadius: 2, overflow: "hidden", bgcolor: "background.paper" }}>
                <Skeleton variant="rectangular" height={150} />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Buttons */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="outlined" startIcon={<FeedOutlined />} disabled>
          <Skeleton variant="text" width={100} />
        </Button>
        <Button variant="outlined" startIcon={<VideocamOutlined />} sx={{ ml: 2 }} disabled>
          <Skeleton variant="text" width={100} />
        </Button>
      </Box>
    </Box>
  )
}
