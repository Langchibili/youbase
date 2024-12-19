"use client"

import { getImage, handleCountsDisplay, truncateText } from "@/Functions";
import SocialsDisplay from "../SocialsDisplay/SocialsDisplay";
import Link from "next/link";
import UserFollowingButtons from "@/components/Parts/UserActionButtons/UserFollowingButtons";
import { log } from "@/Constants";

export default function UserMiniProfileDisplay(props) {
  const user = props.user
  const thisIsMyAccount = props.thisIsMyAccount
  log('in the mini profile display page',user)
  const fullnames = user.details?.firstname && user.details?.lastname ? `${user.details.firstname} ${user.details.lastname}` : "UnNamed User";
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
    <div className="fcrse_2 mb-30">
    <div className="tutor_img">
      <Link href={"/user/"+user.username}>
          <img src={profilePicture} alt="profile pic" />
      </Link>
    </div>
    <div className="tutor_content_dt">
      <div className="tutor150">
        <Link href={"/user/"+user.username} className="tutor_name">
          {truncateText(fullnames,30)}
        </Link>
        <div className="mef78" title="Verify">
          <i className="uil uil-check-circle" />
        </div>
      </div>
      <div className="tutor_cate">{userType}</div>
      <ul className="tutor_social_links">
      {displaySocials()}
      </ul>
      <ul className="_bty149" style={{textAlign:'center', marginTop:'10px'}}>
                  {thisIsMyAccount? <li>
                    <Link
                      className="msg125 btn500 btn-success"
                      href="/manage/profile"
                      style={{ display:'inline-block',alignContent: 'center'}}
                    >
                      Update Profile
                    </Link>
                  </li> : <UserFollowingButtons userId={props.user.id} loggedInUser={props.loggedInUser}/>}
                  
                    {thisIsMyAccount? <li>
                    <Link
                      className="msg125 btn500 btn-info"
                      href="/manage/posts"
                      style={{ display:'inline-block',alignContent: 'center'}}
                    >
                      Edit
                    </Link>  </li>: <></>}
                 
                </ul>
      {/* <ul className="_ttl120">
                    <li>
                      <div className="_ttl121">
                        <div className="_ttl122">Followers</div>
                        <div className="_ttl123">{handleCountsDisplay(followersCount)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="_ttl121">
                        <div className="_ttl122">Posts</div>
                        <div className="_ttl123">{handleCountsDisplay(postsCount)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="_ttl121">
                        <div className="_ttl122">Following</div>
                        <div className="_ttl123">{handleCountsDisplay(followingCount)}</div>
                      </div>
                    </li>
                    
                  </ul> */}
                  <div className="tut1250">
                    <span className="vdt15">{handleCountsDisplay(followersCount)} Followers</span>
                    <span className="vdt15">{handleCountsDisplay(postsCount)} Posts</span>
                    </div>

                  <Link href={"/user/"+user.username} className="prfle12link">
                   Go To Profile
                  </Link>
    </div>
  </div>  
  );
}


