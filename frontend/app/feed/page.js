'use client'

import ContentDisplay from '@/components/Includes/ContentDisplay/ContentDisplay'
import FeedContentDisplay from '@/components/Includes/ContentDisplay/FeedContentDisplay'
import { useUser } from '@/Contexts/UserContext'
import { dynamicConfig } from '@/Functions'
import { FeedOutlined, ImageOutlined, VideocamOutlined } from '@mui/icons-material'
//import { getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Feed({ params }) {
  const loggedInUser = useUser()
  const [feedHasReels, setFeedHasReels] = useState(true)
  const [feedHasCaptures, setFeedHasCaptures] = useState(true)
  const [feedHasExplore, setFeedHasExplore] = useState(true)

  
  return ( 
    <>
     <div className="sa4d25">
         <div className="container-fluid">
         <div className="row">
             <div className="col-xl-9 col-lg-8">
             {!feedHasReels? <></> :  <div className="section3125">
              <h3>Reels <VideocamOutlined sx={{color:'crimson'}}/></h3>   
                <FeedContentDisplay
                    setFeedHasReels={setFeedHasReels}
                    contentLimit={100}
                    contentToView = "portrait-videos"
                    loggedInUser={loggedInUser} 
                    limit="10"
                    sort="desc"
                    />
              </div>}
              {!feedHasCaptures? <></> : <div className="section3125 mt-30">
                <div className="la5lo1">
                <h3>Captures <ImageOutlined sx={{color:'indigo'}}/></h3>
                   <FeedContentDisplay 
                      setFeedHasCaptures={setFeedHasCaptures}
                      contentLimit={100}
                      contentToView = "portrait-images"
                      loggedInUser={loggedInUser} 
                      limit="10"
                      sort="desc"/>
                  </div>
             </div>}
             {!feedHasExplore? <></> :
              <div className="section3125 mt-30">
               <h3>Explore <FeedOutlined sx={{color:'forestgreen'}}/></h3>
                  <FeedContentDisplay 
                      setFeedHasExplore={setFeedHasExplore}
                      contentToView = "all"
                      loggedInUser={loggedInUser} 
                      limit="10"
                      sort="desc"
                      />        
                <a href="live_streams.html" className="see150">
                  See all
                </a>
             </div>}
             </div>
             </div>
         </div>
         <div className="container-fluid">
         <div className="row">
             <div className="col-xl-9 col-lg-8">
             <div className="section3125">
             <h3>Reels <VideocamOutlined sx={{color:'crimson'}}/></h3>  
              <ContentDisplay
                  contentToView = "portrait-videos"
                  loggedInUser={loggedInUser} 
                  contentUri={`/posts?populate=user,featuredImages,media`}
                  startPage="1"
                  limit="10"
                  sort="desc"
               />
              </div>
              <div className="section3125 mt-30">
                <div className="la5lo1">
                <h3>Captures <ImageOutlined sx={{color:'indigo'}}/></h3>
                   <ContentDisplay 
                      contentToView = "portrait-images"
                      loggedInUser={loggedInUser} 
                      contentUri={`/posts?populate=user,featuredImages,media`}
                      startPage="1"
                      limit="10"
                      sort="desc"
                      />
                  </div>
              </div>
              <div className="section3125 mt-30">
              <h3>Explore <FeedOutlined sx={{color:'forestgreen'}}/></h3>
                  <ContentDisplay 
                    contentToView = "all"
                    loggedInUser={loggedInUser} 
                    contentUri={`/posts?populate=user,featuredImages,media`}
                    startPage="1"
                    limit="10"
                    sort="desc"
                    />        
                <a href="live_streams.html" className="see150">
                  See all
                </a>
             </div>
             </div>
             </div>
         </div>
     </div>
    </>
  )
}


