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
import ContentFullScreen from "../ContentFullScreen/ContentFullScreen";

const StyledAppBar = styled(AppBar)({
  position: "relative",
  backgroundColor:'black'
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

export default function FullScreenContentModal(props) {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
      sx={{backgroundColor:'black !important', paddingTop:'24px', borderTop:'none'}}

    >
        <Toolbar sx={{backgroundColor:'black'}}>
          <IconButton
            edge="start"
            sx={{color:'gray',backgroundColor:'black'}}
            onClick={props.onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      <StyledContent sx={{backgroundColor:'black', height:'100%', padding:'0px'}}>
          <ContentFullScreen {...props} />
      </StyledContent>
    </Dialog>
  );
}
