"use client"

import { getImage, getUserPostsCount, handleCountsDisplay } from "@/Functions";
import SocialsDisplay from "../SocialsDisplay/SocialsDisplay";
import Link from "next/link";
import UserFollowingButtons from "@/components/Parts/UserActionButtons/UserFollowingButtons";
import { api_url, log } from "@/Constants";
import UserContentDisplay from "../ContentDisplay/UserContentDisplay";
import { useEffect, useState } from "react";
import { FeedOutlined, ImageOutlined, MoreVert, VideocamOutlined } from "@mui/icons-material";
import NoContent from "../NoContent/NoContent";
import ContentDisplaySection from "../ContentDisplay/ContentDisplaySection";
import LandscapeContent from "../ContentDisplay/LandscapeContent";
import PortraitContentDisplay from "../ContentDisplay/PortraitContentDisplay";
import { useUser } from "@/Contexts/UserContext";

export default function UserProfileDisplay(props) {
  const [postsCount, setPostsCount] = useState(null)
  const loggedInUser = useUser();
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
  
  useEffect(()=>{
      const runGetPostsCount = async ()=>{
        const postsCount = await getUserPostsCount(user.id) ?? "0";
        setPostsCount(postsCount)
      }
      runGetPostsCount()
  },[])

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
          {props.purpose === "manage-posts"? <div style={{color:'aliceblue', fontWeight:'800'}}>Edit or Delete posts by clicking the {<MoreVert/>} icon</div> : <div className="section3125 rpt145">
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
                      <div className="_ttl123">{!postsCount? <></> : handleCountsDisplay(postsCount)}</div>
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
          </div>}
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
                {props.purpose === "manage-posts"? <></> : <a
                  className="nav-item nav-link active"
                  id="nav-about-tab"
                  data-toggle="tab"
                  href="#nav-about"
                  role="tab"
                  aria-selected="false"
                >
                  About
                </a>}
                <a
                  className={props.purpose === "manage-posts"? "nav-item nav-link active" : "nav-item nav-link"}
                  id="nav-posts-tab"
                  data-toggle="tab"
                  href="#nav-posts"
                  role="tab"
                  aria-selected="false"
                >
                  Posts
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-videos-tab"
                  data-toggle="tab"
                  href="#nav-videos"
                  role="tab"
                  aria-selected="false"
                >
                  Videos
                </a>

                <a
                  className="nav-item nav-link"
                  id="nav-music-tab"
                  data-toggle="tab"
                  href="#nav-music"
                  role="tab"
                  aria-selected="false"
                >
                  Music
                </a>
               
                <a
                  className="nav-item nav-link"
                  id="nav-reels-tab"
                  data-toggle="tab"
                  href="#nav-reels"
                  role="tab"
                  aria-selected="false"
                >
                  Reels
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-captures-tab"
                  data-toggle="tab"
                  href="#nav-captures"
                  role="tab"
                  aria-selected="false"
                >
                  Captures
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-texts-tab"
                  data-toggle="tab"
                  href="#nav-texts"
                  role="tab"
                  aria-selected="false"
                >
                  Texts
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
              {props.purpose === "manage-posts"? <></> : <div className="tab-pane fade show active" id="nav-about" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                    {aboutUser.length > 0? <h3>About Me</h3> : <></>}
                    {aboutUser.length > 0? <p>{aboutUser}</p> : <></>}
                  </div>
                </div>
              </div>}
              
              <div className={props.purpose === "manage-posts"? "tab-pane fade show active" : "tab-pane fade"} id="nav-posts" role="tabpanel">
              
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                    <ContentDisplaySection
                      key="nav-posts-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no posts yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][$or][0][type][$eq]=image&filters[$and][0][$or][0][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=text&filters[$and][0][$or][2][$and][0][type][$eq]=video&filters[$and][0][$or][2][$and][1][mediaDisplayType][$eq]=landscape&filters[$and][0][$or][3][type][$eq]=embed&filters[$and][0][$or][4][type][$eq]=music&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${user.id}&populate=user,featuredImages,media` }
                    />
                    </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-videos" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                  <div className="section3125">
                      <ContentDisplaySection
                      key="nav-videos-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no videos yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${user.id}&populate=user,featuredImages,media`}
                    />
                  </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-music" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-12">
                    <ContentDisplaySection
                      key="nav-music-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no music yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][type][$eq]=music&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${user.id}&populate=user,featuredImages,media`}
                    />
                    </div>
                  </div>
              </div>
              <div className="tab-pane fade" id="nav-reels" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-12">
                    <ContentDisplaySection
                      key="nav-reels-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no reels yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$eq]=${user.id}&populate=user,featuredImages,media`}
                    />
                    
                    </div>
                </div>
              </div>

              <div className="tab-pane fade" id="nav-captures" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-12">
                    <ContentDisplaySection
                      key="nav-captures-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no captures yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$eq]=${user.id}&populate=user,featuredImages,media`}
                    />
                    
                    </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-texts" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-12">
                    <ContentDisplaySection
                      key="nav-texts-tab"
                      loggedInUser={loggedInUser}
                      emptyContentMessage="User has no text posts yet."
                      showEmptyContentMessage={true}
                      contentDisplay={(props) => <LandscapeContent content={props.content} loggedInUser={loggedInUser} />
                      }
                      contentUri={`${api_url}/posts`}
                      limit={10}
                      contentQueryFilters={`filters[$and][0][type][$eq]=text&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${user.id}&populate=user,featuredImages,media`}
                    />
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
