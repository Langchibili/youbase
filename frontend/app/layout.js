"use client";

import React, { useEffect } from 'react';

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   console.log('hey')
  //   // This will run once the component has mounted (DOM is fully rendered)
  //   const scripts = [
  //     '/theme/js/jquery-3.3.1.min.js',
  //     '/theme/js/vertical-responsive-menu.js',
  //     '/theme/vendor/bootstrap/js/bootstrap.bundle.min.js',
  //     '/theme/vendor/OwlCarousel/owl.carousel.js',
  //     '/theme/vendor/semantic/semantic.min.js',
  //     '/theme/js/custom.js',
  //     '/theme/js/night-mode.js',
  //   ];

  //   scripts.forEach((src) => {
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.async = false; // Ensures scripts load in the correct order
  //     document.body.appendChild(script);
  //   });
  //   return () => {
  //     // Clean up scripts on unmount if necessary
  //     scripts.forEach((src) => {
  //       const script = document.querySelector(`script[src="${src}"]`);
  //       if (script) {
  //         document.body.removeChild(script);
  //       }
  //     });
  //   };
  // }, []);

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
      <body>{children}</body>
    </html>
  );
}
