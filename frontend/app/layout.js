"use client";

import MainHeader from '../components/Parts/Header/MainHeader';
import MainMenu from '../components/Parts/Menus/MainMenu';
import MainFooter from '../components/Parts/Footer/MainFooter';
import AudioPlayer from '../components/Includes/AudioPlayer/AudioPlayer';
import { checkUserLogginStatus } from '@/Constants';
import React, { useEffect, useState } from 'react';
import { UserProvider } from "@/Contexts/UserContext";
import PageLoader2 from '@/components/Includes/Loader/PageLoader2';
import { AudioProvider } from '@/Contexts/AudioContext';
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader';

// export const metadata = {
//   title: 'Youbase | Home',
//   description: 'Gambolthemes',
// };

export default function RootLayout({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkUserLogginStatus();
        setLoggedInUser(user);
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [])
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, shrink-to-fit=9" />
        <meta name="description" content="youbase" />
        <meta name="author" content="youbase" />s
        <link rel="icon" type="image/png" href="images/fav.png" />
        {/* Stylesheets */}
        <link
          href="http://fonts.googleapis.com/css?family=Roboto:400,700,500"
          rel="stylesheet"
        />
        <link href="/theme/vendor/unicons-2.0.1/css/unicons.css" rel="stylesheet" />
        <link href="/theme/css/vertical-responsive-menu.min.css" rel="stylesheet" />
        <link href="/theme/css/style.css" rel="stylesheet" />
        <link href="/theme/css/responsive.css" rel="stylesheet" />
        <link href="/theme/css/night-mode.css" rel="stylesheet" />
        <link href="/theme/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="/theme/vendor/OwlCarousel/assets/owl.carousel.css" rel="stylesheet" />
        <link href="/theme/vendor/OwlCarousel/assets/owl.theme.default.min.css" rel="stylesheet" />
        <link href="/theme/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/theme/vendor/semantic/semantic.min.css" />
      </head>
      <body>
        
        {loading? <ImagePageLoader/> : 
        <>
          {/* Main header */} 
          <MainHeader loggedInUser={loggedInUser} />
          {/* Sidebar */}
          <MainMenu loggedInUser={loggedInUser} />
          <AudioProvider>
            {/* Main content */}
              <div className="wrapper">
                <PageLoader2/>
                  <UserProvider> 
                  { children } 
                  </UserProvider> 
                {/* Footer */}
                <MainFooter loggedInUser={loggedInUser} />
              </div>
            {/* Audio player */}
            <AudioPlayer />
          </AudioProvider>
        </>}
      </body>
    </html>
  )
}


