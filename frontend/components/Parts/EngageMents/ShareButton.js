'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, getUserById, handleCountsDisplay, logEngagement, logNotification } from "@/Functions"

export default class ShareButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false
      }
   }

createShareNotification = async ()=>{
    const loggedInUserId = this.props.loggedInUser.user.id
    const userId = this.props.user.id
    const postId = this.props.post.id 
    const loggedInuserDetails = await getUserById(loggedInUserId, "details")
    const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
    const notificationTitle = fullnames + " shared your post"
    logNotification(notificationTitle,loggedInUserId,[userId], "post", postId) // send notification to the user being followed
}   

 handleShare = async ()=>{
        // if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
        //     this.setState({
        //        showLogInFirstModal: true
        //     })
        // } // you can share regardless of whether you are logged in or not

        this.setState({
            requesting: true // to show user something is happening
        })
        logEngagement('shares',this.props.post.id,this.props.loggedInUser.user,this,this.createShareNotification) 
   }

   handleUnShare = async ()=>{
        return // because for now, you cannot unshare a post you have shared
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
              showLogInFirstModal: true
            })
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        deleteEngagement('shares',this.props.post.id,this.props.loggedInUser.user,this)    
   }

   renderShareButton = ()=>{
       const sharedPostsIds = this.state.loggedInUser.user.sharedPostsIds
       const postId = this.state.post.id
    
       if(!sharedPostsIds){ // meaning you have followed no-one before
         return  <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
       }
       if(sharedPostsIds.length === 0){ // meaning it's empty
         return  <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
       }
       if(sharedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li>
                     <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleUnShare} >
                        <i className="uil uil-share-alt" style={{color: "blue"}}/>
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
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
          {/* {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>} */}
         {this.renderShareButton()}
        </>
    )
   }
  }