// "use client"

// import { useUser } from "@/Contexts/UserContext";
// import { dynamicConfig, getCategoryByName } from "@/Functions";
// import { Book, FeedOutlined, ImageOutlined, VideocamOutlined } from "@mui/icons-material";
// import React, { useEffect, useRef, useState } from "react";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { Box } from '@mui/material';
// import TheatersIcon from '@mui/icons-material/Theaters'
// import PostIcon from '@mui/icons-material/Article'; // Icon for posts
// import VideoIcon from '@mui/icons-material/PlayCircleFilled'; // Icon for videos
// import MusicIcon from '@mui/icons-material/MusicNote'; // Icon for music
// import ImageIcon from '@mui/icons-material/Image'; // Icon for images
// import CaptureIcon from '@mui/icons-material/CameraAlt'; // Icon for captures (portrait images)
// import ContentDisplaySection from "@/components/Includes/ContentDisplay/ContentDisplaySection";
// import PortraitContentDisplay from "@/components/Includes/ContentDisplay/PortraitContentDisplay";
// import LandscapeContent from "@/components/Includes/ContentDisplay/LandscapeContent";
// import { api_url } from "@/Constants";
// import PageLoader from "next/dist/client/page-loader";
// import ContentLoader from "@/components/Includes/Loader/ContentLoader";


// // Force the page to be dynamically rendered on every request
// export const dynamic = dynamicConfig();

// const Category = ({ params }) =>{
//    const loggedInUser = useUser()
//    const [value, setValue] = React.useState(0);
//    const [tabStyle, setTabStyle] = useState({});
//    const [loading, setLoading] = useState(true)
//    const [category, setCategory] = useState(null)
//    const containerRef = useRef(null);

//    const handleChange = (event, newValue) => {
//        setValue(newValue);
//    };
   

//    // Dynamically adjust tab position and width
//   useEffect(() => {
//     const updateTabStyle = () => {
//       const container = containerRef.current;
//       if (container) {
//         const rect = container.getBoundingClientRect();
//         setTabStyle({
//           width: `${rect.width}px`,
//           left: `${rect.left}px`,
//         });
//       }
//     };

//     // Update tab style on mount and window resize
//     updateTabStyle();
//     window.addEventListener('resize', updateTabStyle);

//     return () => {
//       window.removeEventListener('resize', updateTabStyle);
//     };
//   }, [containerRef]);

//   useEffect(() => {
//     const fetchCategory= async () => {
//       try {
//         const categoryName = params.categoryName
//         const category = getCategoryByName(categoryName)
//         setCategory(category)
//       } catch (error) {
//         console.error('Error fetching post:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCategory()
//   }, [params.categoryName])

//     // Tab-specific filters
//     const tabFilters = [
//         // Posts: Combined filter for multiple content types
//         'filters[$and][0][$or][0][type][$eq]=image&filters[$and][0][$or][0][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=text&filters[$and][0][$or][2][$and][0][type][$eq]=video&filters[$and][0][$or][2][$and][1][mediaDisplayType][$eq]=landscape&filters[$and][0][$or][3][type][$eq]=embed&filters[$and][0][$or][4][type][$eq]=music', 
        
//         // Videos: Excludes portrait videos, includes embeds
//         'filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed', 
        
//         // Music: Only music content
//         'filters[$and][0][type][$eq]=music', 
        
//         // Images: Excludes portrait images
//         'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait', 
        
//         // Reels: Portrait videos only
//         'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait', 
        
//         // Captures: Portrait images only
//         'filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait', 
        
//         // Text: Only text content
//         'filters[$and][0][type][$eq]=text', 
//       ];
      

//    if(typeof document !== "undefined"){
//     return (
//             <>

//             <div className="sa4d25">
//                 <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-xl-9 col-lg-8"
//                         styles={{
//                             position: 'relative',
//                             height: '400px', // Parent container height
//                             border: '1px solid #ddd',
//                             overflow: 'hidden',
//                         }}
//                         ref={containerRef}
//                     >
//                     {loading? <ContentLoader/> : <Box>
//                     {/* Content inside parent div */}
//                     <ContentDisplaySection
//                         key={value}
//                         loggedInUser={loggedInUser}
//                         emptyContentMessage="No content available for this tab."
//                         showEmptyContentMessage={true}
//                         contentDisplay={(props) =>
//                             // Render PortraitContentDisplay for certain types; LandscapeContent for others
//                             value === 4 || value === 5 ? (
//                             <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />
//                             ) : (
//                             <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
//                             )
//                         }
//                         contentUri={`${api_url}/posts`}
//                         totalPages={10}
//                         limit={20}
//                         contentQueryFilters={`${tabFilters[value]}&filters[$and][1][status][$eq]=published&populate=user,featuredImages,media`}
//                         />

//                     {/* Fixed Tabs */}
//                     <Box
//                         sx={{
//                         position: 'fixed',
//                         bottom: 0,
//                         backgroundColor: 'white',
//                         boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.1)',
//                         ...tabStyle, // Dynamically updated styles
//                         zIndex: 90,
//                         }}
//                     >
//                         <Tabs
//                         value={value}
//                         onChange={handleChange}
//                         aria-label="media tabs"
//                         variant="fullWidth"
//                         sx={{
//                             minHeight: '56px',
//                             '& .MuiTab-root': {
//                             minWidth: 0,
//                             padding: '8px 0',
//                             },
//                         }}
//                         >
//                         <Tab icon={<PostIcon />} aria-label="posts" />
//                         <Tab icon={<VideoIcon />} aria-label="videos" />
//                         <Tab icon={<MusicIcon />} aria-label="music" />
//                         <Tab icon={<ImageIcon />} aria-label="images" />
//                         <Tab icon={<TheatersIcon />} aria-label="reels" />
//                         <Tab icon={<CaptureIcon />} aria-label="captures" />
//                         <Tab icon={<Book />} aria-label="text" />
//                         </Tabs>
//                     </Box>
//                 </Box>}
//               </div>
//             </div>
//             </div>
//         </div>
//         {/* Body End */}
//     </>
    
//     )
//   }
// }

// export default Category

"use client";

import { useUser } from "@/Contexts/UserContext";
import { dynamicConfig, getCategoryByName } from "@/Functions";
import { Book, FeedOutlined, ImageOutlined, VideocamOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import PostIcon from '@mui/icons-material/Article'; // Icon for posts
import VideoIcon from '@mui/icons-material/PlayCircleFilled'; // Icon for videos
import MusicIcon from '@mui/icons-material/MusicNote'; // Icon for music
import ImageIcon from '@mui/icons-material/Image'; // Icon for images
import CaptureIcon from '@mui/icons-material/CameraAlt'; // Icon for captures (portrait images)
import ContentDisplaySection from "@/components/Includes/ContentDisplay/ContentDisplaySection";
import PortraitContentDisplay from "@/components/Includes/ContentDisplay/PortraitContentDisplay";
import LandscapeContent from "@/components/Includes/ContentDisplay/LandscapeContent";
import { api_url } from "@/Constants";
import ContentLoader from "@/components/Includes/Loader/ContentLoader";

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();


// const categoryNamesDefaultTabs = {
//     "videos": 1,
//     "music": 2,
//     "images": 3,
//     "text": 4
// }

const Category = ({ params }) => {
  const loggedInUser = useUser();
  const [value, setValue] = React.useState(0);
  const [tabStyle, setTabStyle] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const containerRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Dynamically adjust tab position and width
  useEffect(() => {
    const updateTabStyle = () => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        setTabStyle({
          width: `${rect.width}px`,
          left: `${rect.left}px`,
        });
      }
    };

    // Update tab style on mount and window resize
    updateTabStyle();
    window.addEventListener('resize', updateTabStyle);

    return () => {
      window.removeEventListener('resize', updateTabStyle);
    };
  }, [containerRef]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryName = params.categoryName;
        const categoryData = await getCategoryByName(categoryName);
        console.log("the category stuff",categoryData);
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory()
  }, [params.categoryName]);

  // Tab-specific filters
  const tabFilters = [
    'filters[$and][0][$or][0][type][$eq]=image&filters[$and][0][$or][0][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=text&filters[$and][0][$or][2][$and][0][type][$eq]=video&filters[$and][0][$or][2][$and][1][mediaDisplayType][$eq]=landscape&filters[$and][0][$or][3][type][$eq]=embed&filters[$and][0][$or][4][type][$eq]=music', 
    'filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed',
    'filters[$and][0][type][$eq]=music', 
    'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait', 
    'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait',
    'filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait',
    'filters[$and][0][type][$eq]=text',
  ];

  if (typeof document !== "undefined") {
    return (
      <>
        <div className="sa4d25">
          <div className="container-fluid">
            <div className="row">
              <div 
                className="col-xl-9 col-lg-8"
                style={{
                  position: "relative",
                  height: "400px",
                  border: "1px solid #ddd",
                  overflow: "hidden",
                }}
                ref={containerRef}
              >
                {loading ? (
                  <ContentLoader />
                ) : (
                  <Box>
                    <ContentDisplaySection
                      key={value}
                      loggedInUser={loggedInUser}
                      emptyContentMessage="No content available for this tab, search in the other tabs."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) =>
                        value === 4 || value === 5 ? (
                          <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />
                        ) : (
                          <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
                        )
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={
                        category 
                          ? `${tabFilters[value]}&filters[$and][2][category][id][$eq]=${category.id}&filters[$and][1][status][$eq]=published&populate=user,featuredImages,media`
                          : ""
                      }
                    />

                    {/* Fixed Tabs */}
                    <Box
                      sx={{
                        position: "fixed",
                        bottom: 0,
                        backgroundColor: "white",
                        boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
                        ...tabStyle,
                        zIndex: 90,
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="media tabs"
                        variant="fullWidth"
                        sx={{
                          minHeight: "56px",
                          "& .MuiTab-root": {
                            minWidth: 0,
                            padding: "8px 0",
                          },
                        }}
                      >
                        <Tab icon={<PostIcon />} aria-label="posts" />
                        <Tab icon={<VideoIcon />} aria-label="videos" />
                        <Tab icon={<MusicIcon />} aria-label="music" />
                        <Tab icon={<ImageIcon />} aria-label="images" />
                        <Tab icon={<TheatersIcon />} aria-label="reels" />
                        <Tab icon={<CaptureIcon />} aria-label="captures" />
                        <Tab icon={<Book />} aria-label="text" />
                      </Tabs>
                    </Box>
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Category;
