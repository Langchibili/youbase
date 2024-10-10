// // "use client";

// // import MainHeader from '../components/Parts/Header/MainHeader';
// // import MainMenu from '../components/Parts/Menus/MainMenu';
// // import MainFooter from '../components/Parts/Footer/MainFooter';
// // import AudioPlayer from '../components/Includes/AudioPlayer/AudioPlayer';
// // import { checkUserLogginStatus } from '@/Constants';
// // import React, { useEffect, useState } from 'react';
// // import { UserProvider } from "@/Contexts/UserContext";
// // import PageLoader2 from '@/components/Includes/Loader/PageLoader2';
// // import { AudioProvider } from '@/Contexts/AudioContext';
// // import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader';

// // // export const metadata = {
// // //   title: 'Youbase | Home',
// // //   description: 'Gambolthemes',
// // // };

// // export default function RootLayout({ children }) {
// //   const [loggedInUser, setLoggedInUser] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [showSplushScreen, setShowSplushScreen] = useState(true)

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const user = await checkUserLogginStatus()
// //         setLoggedInUser(user)
// //       } catch (error) {
// //         console.error('Error fetching logged in user:', error);
// //       } finally {
// //         setLoading(false);
// //         setTimeout(()=>{
// //            setShowSplushScreen(false)
// //         },1000)
// //       }
// //     };
// //     fetchUser();
// //   }, [])

// //   return (
// //     <html lang="en">
// //       <head>
// //         <meta charSet="utf-8" />
// //         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
// //         <meta name="viewport" content="width=device-width, shrink-to-fit=9" />
// //         <meta name="description" content="youbase" />
// //         <meta name="author" content="youbase" />
// //         <link rel="icon" type="image/png" href="favicon.ico" />
// //         {/* Stylesheets */}
// //         <link
// //           href="http://fonts.googleapis.com/css?family=Roboto:400,700,500"
// //           rel="stylesheet"
// //         />
// //         <link href="/theme/vendor/unicons-2.0.1/css/unicons.css" rel="stylesheet"/>
// //         <link href="/theme/css/vertical-responsive-menu.min.css" rel="stylesheet" />
// //         <link href="/theme/css/style.css" rel="stylesheet" />
// //         <link href="/theme/css/responsive.css" rel="stylesheet" />
// //         <link href="/theme/css/night-mode.css" rel="stylesheet"/>
// //         <link href="/theme/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
// //         <link href="/theme/vendor/OwlCarousel/assets/owl.carousel.css" rel="stylesheet" />
// //         <link href="/theme/vendor/OwlCarousel/assets/owl.theme.default.min.css" rel="stylesheet"/>
// //         <link href="/theme/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
// //          {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" /> */}
// //         <link rel="stylesheet" type="text/css" href="/theme/vendor/semantic/semantic.min.css"/>
// //       </head>
// //       <body>
        
// //         {loading? <ImagePageLoader/> : 
// //         <>
// //          {showSplushScreen? <ImagePageLoader/> : <></> /* the splash screen should show while content loads */}
// //           {/* Main header */} 
// //           {<MainHeader loggedInUser={loggedInUser} />}
// //           {/* Sidebar */}
// //           <MainMenu loggedInUser={loggedInUser} />
// //           <AudioProvider>
// //             {/* Main content */}
// //               <div className="wrapper">
// //                 <PageLoader2/>
// //                   <UserProvider> 
// //                   { children } 
// //                   </UserProvider> 
// //                 {/* Footer */}
// //                 <MainFooter loggedInUser={loggedInUser} />
// //               </div>
// //             {/* Audio player */}
// //             <AudioPlayer />
// //           </AudioProvider>
// //         </>}
// //       </body>
// //     </html>
// //   )
// // }




// "use client";

// import MainHeader from '../components/Parts/Header/MainHeader';
// import MainMenu from '../components/Parts/Menus/MainMenu';
// import MainFooter from '../components/Parts/Footer/MainFooter';
// import AudioPlayer from '../components/Includes/AudioPlayer/AudioPlayer';
// import { checkUserLogginStatus } from '@/Constants';
// import React, { useEffect, useState } from 'react';
// import { UserProvider } from "@/Contexts/UserContext";
// import PageLoader2 from '@/components/Includes/Loader/PageLoader2';
// import { AudioProvider } from '@/Contexts/AudioContext';
// import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader';

// // export const metadata = {
// //   title: 'Youbase | Home',
// //   description: 'Gambolthemes',
// // };

// export default function RootLayout({ children }) {
//   const [loggedInUser, setLoggedInUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [showSplushScreen, setShowSplushScreen] = useState(true);
//   const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted

//   useEffect(() => {
//     setIsMounted(true);

//     const fetchUser = async () => {
//       try {
//         const user = await checkUserLogginStatus();
//         setLoggedInUser(user);
//       } catch (error) {
//         console.error('Error fetching logged in user:', error);
//       } finally {
//         setLoading(false);
//         setTimeout(() => {
//           setShowSplushScreen(false);
//         }, 1000);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (!isMounted) {
//     return null; // Prevent mismatches during hydration by not rendering on the server
//   }

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         <meta name="viewport" content="width=device-width, shrink-to-fit=9" />
//         <meta name="description" content="youbase" />
//         <meta name="author" content="youbase" />
//         <link rel="icon" type="image/png" href="favicon.ico" />
//         {/* Stylesheets */}
//         <link href="http://fonts.googleapis.com/css?family=Roboto:400,700,500" rel="stylesheet" />
//         <link href="/theme/vendor/unicons-2.0.1/css/unicons.css" rel="stylesheet" />
//         <link href="/theme/css/vertical-responsive-menu.min.css" rel="stylesheet" />
//         <link href="/theme/css/style.css" rel="stylesheet" />
//         <link href="/theme/css/responsive.css" rel="stylesheet" />
//         <link href="/theme/css/night-mode.css" rel="stylesheet" />
//         <link href="/theme/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
//         <link href="/theme/vendor/OwlCarousel/assets/owl.carousel.css" rel="stylesheet" />
//         <link href="/theme/vendor/OwlCarousel/assets/owl.theme.default.min.css" rel="stylesheet" />
//         <link href="/theme/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
//         <link rel="stylesheet" type="text/css" href="/theme/vendor/semantic/semantic.min.css" />
//       </head>
//       <body>
//         {loading ? <ImagePageLoader /> : 
//         <>
//           {showSplushScreen ? <ImagePageLoader /> : null}
//           <MainHeader loggedInUser={loggedInUser} />
//           <MainMenu loggedInUser={loggedInUser} />
//           <AudioProvider>
//             <div className="wrapper">
//               <PageLoader2 />
//               <UserProvider>{children}</UserProvider>
//               <MainFooter loggedInUser={loggedInUser} />
//             </div>
//             <AudioPlayer />
//           </AudioProvider>
//         </>
//         }
//       </body>
//     </html>
//   );
// }



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

export default function RootLayout({ children }) {
  //const [loading, setLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
  const [assetsLoaded, setAssetsLoaded] = useState(false); // Tracks if external assets are loaded

  useEffect(() => {
    // Ensure page is mounted before fetching user and loading assets
    setIsMounted(true);

    // Dynamically load external assets (stylesheets, meta tags, etc.) after the page mounts
    const loadExternalAssets = () => {
      const linkTags = [
        { href: "http://fonts.googleapis.com/css?family=Roboto:400,700,500", rel: "stylesheet" },
        { href: "/theme/vendor/unicons-2.0.1/css/unicons.css", rel: "stylesheet" },
        { href: "/theme/css/vertical-responsive-menu.min.css", rel: "stylesheet" },
        { href: "/theme/css/style.css", rel: "stylesheet" },
        { href: "/theme/css/responsive.css", rel: "stylesheet" },
        { href: "/theme/css/night-mode.css", rel: "stylesheet" },
        { href: "/theme/vendor/fontawesome-free/css/all.min.css", rel: "stylesheet" },
        { href: "/theme/vendor/OwlCarousel/assets/owl.carousel.css", rel: "stylesheet" },
        { href: "/theme/vendor/OwlCarousel/assets/owl.theme.default.min.css", rel: "stylesheet" },
        { href: "/theme/vendor/bootstrap/css/bootstrap.min.css", rel: "stylesheet" },
        { href: "/theme/vendor/semantic/semantic.min.css", rel: "stylesheet" }
      ];

      const metaTags = [
        { name: "viewport", content: "width=device-width, shrink-to-fit=9" },
        { charSet: "utf-8" },
        { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
        { name: "description", content: "youbase" },
        { name: "author", content: "youbase" }
      ];

      // Dynamically append meta tags to the document head
      metaTags.forEach(tag => {
        const meta = document.createElement("meta");
        Object.keys(tag).forEach(key => {
          meta.setAttribute(key, tag[key]);
        });
        document.head.appendChild(meta);
      });

      // Dynamically append stylesheets to the document head
      linkTags.forEach(tag => {
        const link = document.createElement("link");
        link.rel = tag.rel;
        link.href = tag.href;
        document.head.appendChild(link);
      });

      // Set assets loaded to true after they're added to the DOM
      
    };

    // load assets after component mounts
   // loadExternalAssets();
   setAssetsLoaded(true);
      setTimeout(() => {
        setShowSplashScreen(false);
      }, 1000)
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
        <meta name="description" content="youbase" />
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
  return (<>
              {/* Main Header */}
              <MainHeader loggedInUser={loggedInUser}/>
              {/* Sidebar */}
              <MainMenu loggedInUser={loggedInUser}/>
  </>)
}

const FooterPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Footer */}
              <MainFooter loggedInUser={loggedInUser}/>
  </>)
}
