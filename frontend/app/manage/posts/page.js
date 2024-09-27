'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import LogInFirstModal from '@/components/Includes/Modals/LogInFirstModal'
import MainFooter from '@/components/Parts/Footer/MainFooter'
import MainHeader from '@/components/Parts/Header/MainHeader'
import MainMenu from '@/components/Parts/Menus/MainMenu'
import { checkUserLogginStatus } from '@/Constants'
import { getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

export default function User({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [userPosts, setUserPosts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await checkUserLogginStatus() // the loggedInUser 
        setUserPosts(await getUserById(loggedInUser.user.id,"posts")) // the post without populating anything
        setLoggedInUser(loggedInUser) // the loggedInUser   
    } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])
 
  if (loading) {
    return <PageLoader/>
  }
  if(!loggedInUser.status){
    return <LogInFirstModal open={true} />
  }
  if (!userPosts) {
    return <ContentNotFound />
  }

  return (
    <>
    {/* Header Start */}
    <MainHeader loggedInUser={loggedInUser}/>
    {/* Header End */}
    {/* Left Sidebar Start */}
    <MainMenu loggedInUser={loggedInUser}/>
    {/* Left Sidebar End */}
    {/* Body Start */}
    <div className="wrapper _bg4586">
  <div className="_215b15">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="course_tabs">
            <nav>
              <div
                className="nav nav-tabs tab_crse"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className="nav-item nav-link active"
                  id="nav-courses-tab"
                  data-toggle="tab"
                  href="#nav-courses"
                  role="tab"
                  aria-selected="false"
                >
                  Posts
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-purchased-tab"
                  data-toggle="tab"
                  href="#nav-purchased"
                  role="tab"
                  aria-selected="false"
                >
                  Music
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-reviews-tab"
                  data-toggle="tab"
                  href="#nav-reviews"
                  role="tab"
                  aria-selected="false"
                >
                  Videos
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="_215b17">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="course_tab_content">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-courses" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                        posts
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-purchased" role="tabpanel">
              <div className="_htg451">
                  <div className="_htg452">
                        music
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-reviews" role="tabpanel">
              <div className="_htg451">
                  <div className="_htg452">
                        videos
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="nav-subscriptions"
                role="tabpanel"
              >
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter loggedInUser={loggedInUser}/>
</div>


    {/* Body End */}
  </>
  
  );
}
