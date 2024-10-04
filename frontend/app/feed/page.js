'use client'

import ContentDisplay from '@/components/Includes/ContentDisplay/ContentDisplay'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import { checkUserLogginStatus } from '@/Constants'
import { dynamicConfig } from '@/Functions'
//import { getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Feed({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
 // const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await checkUserLogginStatus() // the loggedInUser 
       // setUser(await getUserById(loggedInUser.user.id,"profilePicture,details,socials")) // the post without populating anything
        setLoggedInUser(loggedInUser) // the loggedInUser   
    } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])
 
  if (loading) {
    return <PageLoader/>
  }
  
  return ( 
    <>s
     <div className="sa4d25">
         <div className="container-fluid">
         <div className="row">
             <div className="col-xl-9 col-lg-8">
             <div className="section3125">
              <h4 className="item_title">Reels</h4>  
              {loading? <></> : <ContentDisplay
                            contentToView = "portrait-videos"
                            loggedInUser={loggedInUser} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            sort="desc"
                            displayPortraits={true}
                            />}
              </div>
              <div className="section3125 mt-30">
                <div className="la5lo1">
                  <h4 className="item_title">Captures</h4>
                  {loading? <></> : <ContentDisplay 
                            contentToView = "portrait-images"
                            loggedInUser={loggedInUser} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            sort="desc"
                            displayPortraits={true}
                            portraitsContentType = "video"
                            />}
                  </div>
              </div>
              <h4 className="item_title">Explore</h4>
              <div className="section3125 mt-30">
                  {loading? <></> : <ContentDisplay 
                            contentToView = "all"
                            loggedInUser={loggedInUser} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            sort="desc"
                            displayPortraits={false}
                            portraitsContentType = "video"
                            />}           
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


