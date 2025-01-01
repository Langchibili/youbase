"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import PostModal from "../Modals/PostModal";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 100,
  right: 16,
  zIndex: 1000,
});

export default function CreatePostButton(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div id="create-post-btn">
      <Zoom in={!open}>
        <StyledFab
          sx={{bottom:70}}
          color="secondary"
          aria-label="edit"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </StyledFab>
      </Zoom>

      {/* Render the PostModal component */}
      <PostModal openPostModal={open} onPostModalClose={handleClose} {...props}/>
    </div>
  );
}
