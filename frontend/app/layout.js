"use client";

import React, { useEffect, useState } from 'react';
import MainHeader from '../components/Parts/Header/MainHeader';
import MainMenu from '../components/Parts/Menus/MainMenu';
import MainFooter from '../components/Parts/Footer/MainFooter';
import AudioPlayer from '../components/Includes/AudioPlayer/AudioPlayer'
import { UserProvider, useUser } from "@/Contexts/UserContext";
import PageLoader2 from '@/components/Includes/Loader/PageLoader2';
import { AudioProvider } from '@/Contexts/AudioContext';
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader';
import MobileMenu from '@/components/Parts/Menus/MobileMenu';
import { SocialSharingProvider, useSocialSharing } from '@/Contexts/SocialSharingContext';

export default function RootLayout({ children }) { // wrap the layout content to enable insertion of meta tags via the SocialSharingContext and provider
  return (<SocialSharingProvider><RootLayoutContent children={children}/></SocialSharingProvider>)
}

function RootLayoutContent({ children }) {
  //const [loading, setLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
  const [assetsLoaded, setAssetsLoaded] = useState(false); // Tracks if external assets are loaded
  const { metaTags } = useSocialSharing()

  useEffect(() => {
    // Ensure page is mounted before fetching user and loading assets
    setIsMounted(true);
    // load assets after component mounts
   // loadExternalAssets();
   setAssetsLoaded(true);
      setTimeout(() => {
        setShowSplashScreen(false);
      }, 500)
  }, []);

  // if (!isMounted || !assetsLoaded) {
  //   return <ImagePageLoader />; // Show image loader while waiting for mount and asset load
  // }
      
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, shrink-to-fit=9" />
        {metaTags.map((tag, index) => (
          <meta
            key={index}
            name={tag.name || tag.property}
            content={tag.content}
          />
        ))}
        <meta name="description" content="the biggest african content sharing platform" />
        <meta name="author" content="youbase" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        {/* Stylesheets */}
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,700,500" rel="stylesheet" />
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
       {showSplashScreen ? (
            <ImagePageLoader />
          ) : (
            <>
            <UserProvider>
              <AudioProvider>
                 <HeaderPart/>
                {/* Main content */}
                <div className="wrapper">
                  <PageLoader2 />
                  {children}
                  {/* Footer */}
                  <FooterPart/>
                </div>
                {/* Audio player */}
                <AudioPlayer />
              </AudioProvider>
            </UserProvider>
            </>
          )}
    </body>
    </html>
  )
}

const HeaderPart = ()=>{
  const loggedInUser = useUser()
  if(typeof window !== undefined){
    if( window.innerWidth >= 991){ // for larger screens
      return (<>
              {/* Main Header */}
              <MainHeader loggedInUser={loggedInUser}/>
              {/* Menu */}
              <MainMenu loggedInUser={loggedInUser}/>
              </>)
    }
    else{
      const toggleMenu = document.getElementById("toggleMenu")
      const collapse_menu = document.getElementById("collapse_menu")
      if(toggleMenu){
        toggleMenu.style.display = "none"
      }
      if(collapse_menu){
        collapse_menu.style.display = "none"
      }
      // use the mobile menu
      return (<>
        {/* Main Header */}
        <MainHeader loggedInUser={loggedInUser} menu={()=><MobileMenu loggedInUser={loggedInUser}/>}/>
         {/* Menu */}
     </>)
    }
  }
  else{
    return (<>
            {/* Main Header */}
            <MainHeader loggedInUser={loggedInUser}/>
            {/* Menu */}
            <MainMenu loggedInUser={loggedInUser}/>
          </>)
   }
}


const FooterPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Footer */}
              <MainFooter loggedInUser={loggedInUser}/>
  </>)
}
