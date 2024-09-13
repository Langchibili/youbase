"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import PostModal from "../Modals/PostModal";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 16,
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
    <>
      <Zoom in={!open}>
        <StyledFab
          color="secondary"
          aria-label="edit"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </StyledFab>
      </Zoom>

      {/* Render the PostModal component */}
      <PostModal open={open} onClose={handleClose} {...props}/>
    </>
  );
}
