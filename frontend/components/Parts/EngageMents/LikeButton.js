'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, getImage, getUserById, getPostFromId, handleCountsDisplay, logEngagement, logNotification, sendPushNotification } from "@/Functions"
import { clientUrl, log } from "@/Constants"
import { ThumbUpSharp } from "@mui/icons-material"
import { Zoom } from "@material-ui/core"

export default class LikeButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false
      }
   }

 createLikeNotification = async ()=>{
        log('the nlike button props',this.props)
        const loggedInUserId = this.props.loggedInUser.user.id
        const userId = this.props.post.user.data? this.props.post.user.data.id : this.props.post.user.id
        const postId = this.props.post.id
        const loggedInuserDetails = await getUserById(loggedInUserId, "details")
        const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
        const notificationTitle = fullnames + " likes your post"
        console.log('the post user ', this.props.post)
        logNotification(notificationTitle,loggedInUserId,[userId], "post", postId) // send notification to the user being followed
        // send a push notification
        const followersCount = parseInt(this.props.loggedInUser.user.followersCount)
        const likesCount = parseInt(this.props.post.likes)
        if(followersCount > 1000){ // this means the user has a big enough following, the post's user might need to know 
           const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
           const title = notificationTitle
           const body = notificationTitle + " on youbase"
           const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
           const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
           sendPushNotification(title,body,[userId],postUrl,image,"")
        }
        if(likesCount === 0){ // if for any reason it's 0, return
            return
        }
        if(likesCount < 5 || likesCount % 100 === 0){ // determine whether to send a push notification, because cannot be spamming users anyhow with each like
           const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
           const title = "Your post has been liked "+likesCount+ " times"
           const body = "Your post on youbase has been liked "+likesCount+ " times"
           const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
           const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
           sendPushNotification(title,body,[userId],postUrl,image,"")
        }
 } 

 handleLike = async ()=>{
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
               showLogInFirstModal: true
            })
            return
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        logEngagement('likes',this.props.post.id,this.props.loggedInUser.user,this,this.createLikeNotification) 
   }

   handleUnLike = async ()=>{
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
              showLogInFirstModal: true
            })
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        deleteEngagement('likes',this.props.post.id,this.props.loggedInUser.user,this)    
   }

   renderLikeButton = ()=>{
       const likedPostsIds = this.state.loggedInUser.user.likedPostsIds
       const postId = this.state.post.id
       console.log('post likes', this.state.post)
       if(!likedPostsIds){ // meaning you have followed no-one before
         return  <li className="fullscreen-engagement-btn" style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleLike}>
                        <i className="uil uil-thumbs-up" />
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
       }
       if(likedPostsIds.length === 0){ // meaning it's empty
         return  <li className="fullscreen-engagement-btn" style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleLike}>
                        <i className="uil uil-thumbs-up" />
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
       }
       if(likedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li className="fullscreen-engagement-btn" style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleUnLike} >
                    <small><Zoom in={true}><ThumbUpSharp sx={{color: "crimson",marginLeft:'4px'}}/></Zoom></small>
                        {/* <i className="uil uil-thumbs-up" style={{color: "red"}}/> */}
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
       }
       if(!likedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
        return  <li className="fullscreen-engagement-btn" style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleLike}>
                        <i className="uil uil-thumbs-up" />
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
      }
       return <></>
   }

   handleModalClose = ()=>{
        this.setState({
            showLogInFirstModal: false
        })
    }
   render(){
    return (
        <>
          {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>}
         {this.renderLikeButton()}
        </>
    )
   }
  }