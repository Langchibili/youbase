"use client"

import { getImage, handleCountsDisplay } from "@/Functions";
import SocialsDisplay from "../SocialsDisplay/SocialsDisplay";
import Link from "next/link";
import UserFollowingButtons from "@/components/Parts/UserActionButtons/UserFollowingButtons";
import { log } from "@/Constants";
import UserContentDisplay from "../ContentDisplay/UserContentDisplay";
import { useState } from "react";
import { FeedOutlined, ImageOutlined, VideocamOutlined } from "@mui/icons-material";

export default function UserProfileDisplay(props) {
  const [feedHasReels, setFeedHasReels] = useState(true)
  const [feedHasCaptures, setFeedHasCaptures] = useState(true)
  const [feedHasExplore, setFeedHasExplore] = useState(true)
  
  const user = props.user
  const thisIsMyAccount = props.thisIsMyAccount? props.thisIsMyAccount : false
  log('in the profile page',user)
  const fullnames = user.details?.firstname && user.details?.lastname ? `${user.details.firstname} ${user.details.lastname}` : "UnNamed User";
  const aboutUser = user.details?.about ?? "Nothing added yet";
  const userType = user.loggedInUserType === "default" ? "User" : user.loggedInUserType;
  const profilePicture = getImage(props.user?.profilePicture, "thumbnail", "profilePicture");
  const followersCount = user.followersCount ?? "0";
  const followingCount = user.followingCount ?? "0";
  const postsCount = user.postsCount ?? "0";

  const displaySocials = () => {
    const renderSocial = (url, type) => {
      return <SocialsDisplay url={url && url.trim() !== "" ? url : null} type={type} key={type} />;
    }

    if (user.socials) {
      return (
        <>
          {renderSocial(user.socials.facebook, "facebook")}
          {renderSocial(user.socials.tiktok, "tiktok")}
          {renderSocial(user.socials.instagram, "instagram")}
          {renderSocial(user.socials.youtube, "youtube")}
          {renderSocial(user.socials.youtube, "x")}
        </>
      )
    } else {
      return (
        <>
          {renderSocial(null, "facebook")}
          {renderSocial(null, "tiktok")}
          {renderSocial(null, "instagram")}
          {renderSocial(null, "youtube")}
          {renderSocial(null, "x")}
        </>
      );
    }
  }  

  return (
    <>
  <div className="_216b01" style={{marginTop:'-30px'}}>
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-10">
          <div className="section3125 rpt145">
            <div className="row">
              <div className="col-lg-7">
                {thisIsMyAccount? <Link href="#" className="_216b22">
                  <span>
                    <i className="uil uil-cog" />
                  </span>
                  Setting
                </Link> : <></>}
                <div className="dp_dt150">
                  <div className="img148">
                    <img src={profilePicture} alt="profile pic" />
                  </div>
                  <div className="prfledt1">
                    <h2>{fullnames}</h2>
                    <span>{userType}</span>
                  </div>
                </div>
                <ul className="_ttl120">
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Followers</div>
                      <div className="_ttl123">{handleCountsDisplay(followersCount)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Posts</div>
                      <div className="_ttl123">{handleCountsDisplay}</div>
                    </div>
                  </li>
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Following</div>
                      <div className="_ttl123">{followingCount}</div>
                    </div>
                  </li>
                  
                </ul>
              </div>
              <div className="col-lg-5">
                {thisIsMyAccount? <Link href="/manage/account" className="_216b12">
                  <span>
                    <i className="uil uil-cog" />
                  </span>
                  Setting
                </Link> : <></>}
                <div className="rgt-145">
                  <ul className="tutor_social_links">
                    {displaySocials()}
                  </ul>
                </div>
                <ul className="_bty149">
                  {thisIsMyAccount? <li>
                    <Link
                      className="msg125 btn500"
                      href="/manage/profile"
                      style={{ display:'inline-block',alignContent: 'center'}}
                    >
                      Update Profile
                    </Link>
                  </li> : <UserFollowingButtons userId={props.user.id} loggedInUser={props.loggedInUser}/>}
                  
                    {thisIsMyAccount? <li>
                    <Link
                      className="msg125 btn500"
                      href="/user/manage/content"
                      style={{ display:'inline-block',alignContent: 'center'}}
                    >
                      Edit
                    </Link>  </li>: <></>}
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
                  id="nav-about-tab"
                  data-toggle="tab"
                  href="#nav-about"
                  role="tab"
                  aria-selected="false"
                >
                  About
                </a>
                <a
                  className="nav-item nav-link"
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
                {/* <a
                  className="nav-item nav-link active"
                  id="nav-subscriptions-tab"
                  data-toggle="tab"
                  href="#nav-subscriptions"
                  role="tab"
                  aria-selected="true"
                >
                  Followers
                </a> */}
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
              <div className="tab-pane fade show active" id="nav-about" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                    {aboutUser.length > 0? <h3>About Me</h3> : <></>}
                    {aboutUser.length > 0? <p>{aboutUser}</p> : <></>}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-courses" role="tabpanel">
                <div className="crse_content">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                    {!feedHasCaptures? <></> : <div className="section3125">
                      <h3>Captures <ImageOutlined sx={{color:'indigo'}}/></h3>
                      <div className="la5lo1">
                        <UserContentDisplay
                            setFeedHasCaptures={setFeedHasCaptures}
                            contentToView = "portrait-images"
                            loggedInUser={props.loggedInUser} 
                            user={thisIsMyAccount? props.loggedInUser.user : user}
                            limit="10"
                            sort="desc"
                            portraitsContentType = "video"
                            />
                        </div>
                      </div>}
                      {!feedHasExplore? <></> :
                      <>
                      <h3>Explore <FeedOutlined sx={{color:'forestgreen'}}/></h3>
                        <div className="section3125 mt-10">
                            <UserContentDisplay 
                                setFeedHasExplore={setFeedHasExplore}
                                contentToView = "all"
                                postTypeToDisplay="text"
                                loggedInUser={props.loggedInUser} 
                                user={thisIsMyAccount? props.loggedInUser.user : user}
                                limit="10"
                                sort="desc"
                            />    
                      </div> </>}
                      {!feedHasExplore? <></> :
                      <>
                      <h3>Images <ImageOutlined sx={{color:'green'}}/></h3>
                        <div className="section3125 mt-10">
                            <UserContentDisplay 
                                setFeedHasExplore={setFeedHasExplore}
                                contentToView = "all"
                                postTypeToDisplay="image"
                                loggedInUser={props.loggedInUser}
                                user={thisIsMyAccount? props.loggedInUser.user : user} 
                                limit="10"
                                sort="desc"
                              />     
                      </div></>}
                      </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-purchased" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                  <div className="section3125">
                      <UserContentDisplay 
                            setFeedHasExplore={setFeedHasExplore}
                            contentToView = "all"
                            postTypeToDisplay="music"
                            loggedInUser={props.loggedInUser}
                            user={thisIsMyAccount? props.loggedInUser.user : user} 
                            limit="10"
                            sort="desc"
                        />   
                  </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-reviews" role="tabpanel">
                <div className="student_reviews">
                  <div className="row">
                    <div className="col-lg-12">
                    {!feedHasReels? <></> :  
                    <div className="section3125">
                     <h3>Reels <VideocamOutlined sx={{color:'crimson'}}/></h3> 
                      <UserContentDisplay
                          setFeedHasReels={setFeedHasReels}
                          contentLimit={100}
                          contentToView = "portrait-videos"
                          loggedInUser={props.loggedInUser} 
                          user={thisIsMyAccount? props.loggedInUser.user : user}
                          limit="10"
                          sort="desc"
                      />
                    </div>}
                    {!feedHasExplore? <></> :
                        <div className="section3125 mt-30">
                        <h3>Videos <VideocamOutlined sx={{color:'red'}}/></h3>
                          <UserContentDisplay 
                            setFeedHasExplore={setFeedHasExplore}
                            contentToView = "all"
                            postTypeToDisplay="video"
                            loggedInUser={props.loggedInUser} 
                            user={thisIsMyAccount? props.loggedInUser.user : user}
                            limit="10"
                            sort="desc"
                          />     
                      </div>}
                      {!feedHasExplore? <></> :
                        <div className="section3125 mt-30">
                        <h3>Embeds <VideocamOutlined sx={{color:'brown'}}/></h3>
                          <UserContentDisplay 
                            setFeedHasExplore={setFeedHasExplore}
                            contentToView = "all"
                            postTypeToDisplay="embed"
                            loggedInUser={props.loggedInUser} 
                            user={thisIsMyAccount? props.loggedInUser.user : user}
                            limit="10"
                            sort="desc"
                          />     
                      </div>}
                    </div>
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
  </>
  
  );
}
