"use client";

import AudioPlayer from '@/components/Includes/AudioPlayer/AudioPlayer';
import ClientOnly from '@/components/Parts/ClientSideRendering/ClientOnly';
import React, { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (typeof document !== 'undefined') {
       setLoading(false)
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, shrink-to-fit=9" />
        <meta name="description" content="Gambolthemes" />
        <meta name="author" content="Gambolthemes" />
        <title>Youbase | Home </title>
        {/* Favicon Icon */}
        <link rel="icon" type="image/png" href="images/fav.png" />
        {/* Stylesheets */}
        <link
          href="http://fonts.googleapis.com/css?family=Roboto:400,700,500"
          rel="stylesheet"
          async=""
        />
        <link href="/theme/vendor/unicons-2.0.1/css/unicons.css" rel="stylesheet" async="" />
        <link href="/theme/css/vertical-responsive-menu.min.css" rel="stylesheet" async="" />
        <link href="/theme/css/style.css" rel="stylesheet" async="" />
        <link href="/theme/css/responsive.css" rel="stylesheet" async="" />
        <link href="/theme/css/night-mode.css" rel="stylesheet" async="" />
        {/* Vendor Stylesheets */}
        <link href="/theme/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" async="" />
        <link href="/theme/vendor/OwlCarousel/assets/owl.carousel.css" rel="stylesheet" async="" />
        <link
          href="/theme/vendor/OwlCarousel/assets/owl.theme.default.min.css"
          rel="stylesheet"
          async=""
        />
        <link href="/theme/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" async="" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme/vendor/semantic/semantic.min.css"
          async=""
        />
      </head>
      
      <body><>{children}<AudioPlayer/></></body>
    </html>
  );
}
