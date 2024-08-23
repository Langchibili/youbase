"use client"

import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, Popper } from "@mui/material";

export default function SocialsDisplay(props) {
  const [openPopper, togglePopper] = useState(false);
  const [popperTimeout, setPopperTimeout] = useState(null);
  const anchorRef = useRef(null);  // Reference for the Popper anchor
  const { url, type } = props;

  const getIcon = () => {
    switch (type) {
      case "facebook":
        return <i className="fab fa-facebook-f" />;
      case "youtube":
        return <i className="fab fa-youtube" />;
      case "x":
        return <i className="fab fa-twitter" />;
      case "instagram":
        return <i className="fab fa-instagram" />;
      case "tiktok":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
            <path fill="currentColor" d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
          </svg>
        );
      case "telegram":
        return <i className="fab fa-telegram-plane" />;
      default:
        return null;
    }
  };

  const iconColorClass = () => {
    switch (type) {
      case "facebook":
        return "fb";
      case "youtube":
        return "yu";
      case "x":
        return "tw";
      case "instagram":
        return "ln";
      case "tiktok":
        return "default";
      case "telegram":
        return "fb";
      default:
        return null;
    }
  };

  let customColors = { backgroundColor: "" };
  let letterA = "a";

  if (type === "instagram") {
    customColors = { backgroundColor: "deeppink" };
    letterA = "an";
  }
  if (type === "tiktok") {
    customColors = { backgroundColor: "black" };
  }
  if (type === "x") {
    letterA = "an";
  }

  const handlePopperOpen = () => {
    togglePopper(true);
    // Clear any existing timeout
    if (popperTimeout) {
      clearTimeout(popperTimeout);
    }
    // Set timeout to close Popper after 3 seconds
    setPopperTimeout(setTimeout(() => {
      togglePopper(false);
    }, 1000));
  };

  const handlePopperClose = () => {
    // Clear timeout when manually closing Popper
    if (popperTimeout) {
      clearTimeout(popperTimeout);
    }
    togglePopper(false);
  };

  useEffect(() => {
    // Clear timeout when component unmounts
    return () => {
      if (popperTimeout) {
        clearTimeout(popperTimeout);
      }
    };
  }, [popperTimeout]);

  return (
    <li>
      <Tooltip title={url ? "" : `User has not added ${letterA} ${type} link`} arrow>
        <a
          href={url || "#"}
          style={customColors}
          className={iconColorClass()}
          target={url ? "_blank" : ""}
          ref={anchorRef}  // Set ref for Popper anchor
          onClick={(e) => {
            if (!url) {
              e.preventDefault();  // Prevent default action if URL is missing
              handlePopperOpen();
            }
          }}
        >
          {getIcon()}
        </a>
      </Tooltip>
      <Popper
        open={openPopper}
        anchorEl={anchorRef.current}
        onClose={handlePopperClose}
        disableInteractive
        placement="bottom"
      >
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          {url ? "" : `User has not added ${letterA} ${type} link`}
        </Box>
      </Popper>
    </li>
  );
}
