'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, getUserById, handleCountsDisplay, logEngagement, logNotification } from "@/Functions"

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
        const loggedInUserId = this.props.loggedInUser.user.id
        const userId = this.props.user.id
        const postId = this.props.post.id 
        const loggedInuserDetails = await getUserById(loggedInUserId, "details")
        const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
        const notificationTitle = fullnames + " likes your post"
        logNotification(notificationTitle,loggedInUserId,[userId], "post", postId) // send notification to the user being followed
 } 

 handleLike = async ()=>{
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
               showLogInFirstModal: true
            })
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
    
       if(!likedPostsIds){ // meaning you have followed no-one before
         return  <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleLike}>
                        <i className="uil uil-thumbs-up" />
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
       }
       if(likedPostsIds.length === 0){ // meaning it's empty
         return  <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleLike}>
                        <i className="uil uil-thumbs-up" />
                        <span>{handleCountsDisplay(this.state.post.likes)}</span>
                    </button>
                </li>
       }
       if(likedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleUnLike} >
                        <i className="uil uil-thumbs-up" style={{color: "red"}}/>
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