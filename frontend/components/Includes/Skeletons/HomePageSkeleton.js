"use client"

import React from "react"
import { Box, Tabs, Tab, Skeleton } from "@mui/material"

const HomePageSkeleton = () => {
  return (
    <Box>
      {/* Skeleton for Content Area */}
      <Box sx={{ padding: "16px" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: "16px",
              padding: "16px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Skeleton for user info */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ marginLeft: "12px", flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={16} />
                <Skeleton variant="text" width="40%" height={14} />
              </Box>
            </Box>

            {/* Skeleton for post content */}
            <Skeleton variant="rectangular" height={180} sx={{ borderRadius: "8px" }} />

            {/* Skeleton for engagement buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
              {Array.from({ length: 3 }).map((_, btnIndex) => (
                <Skeleton key={btnIndex} variant="rectangular" width={60} height={24} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Skeleton for Bottom Tabs */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 90,
        }}
      >
        <Tabs
          value={0} // Keeps the tabs from being uncontrolled
          aria-label="media tabs"
          variant="fullWidth"
          sx={{
            minHeight: "56px",
            "& .MuiTab-root": {
              minWidth: 0,
              padding: "8px 0",
            },
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <Tab
              key={index}
              icon={<Skeleton variant="circular" width={24} height={24} />}
              aria-label={`tab-${index}`}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default HomeSkeleton