"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import PostForm from "@/components/Forms/PostForm/PostForm";
import ReportPostForm from "@/components/Forms/ReportPostForm/ReportPostForm";

const StyledAppBar = styled(AppBar)({
  position: "relative",
  backgroundColor: "#9C27BO",
});

const StyledTitle = styled(Typography)({
  marginLeft: 16,
  flex: 1,
});

const StyledContent = styled(Box)({
  padding: 24,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportPostModal(props) {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
      color="secondary"
    >
      <StyledAppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <StyledTitle variant="h6">Report Post</StyledTitle>
        </Toolbar>
      </StyledAppBar>
      <StyledContent>
         <ReportPostForm {...props}/>
      </StyledContent>
    </Dialog>
  )
}
