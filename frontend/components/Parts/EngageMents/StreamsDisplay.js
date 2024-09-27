'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, handleCountsDisplay, logEngagement } from "@/Functions"

export default class StreamsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false
      }
   }

 handlePlay= async ()=>{
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
               showLogInFirstModal: true
            })
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        logEngagement('plays',this.props.post.id,this.props.loggedInUser.user,this) 
   }

   handleUnPlay = async ()=>{
        return // because for now, you cannot unplay a post you have played before
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
              showLogInFirstModal: true
            })
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        deleteEngagement('plays',this.props.post.id,this.props.loggedInUser.user,this)    
   }

   renderPlayButton = ()=>{
       const playedPostsIds = this.state.loggedInUser.user.playedPostsIds
       const postId = this.state.post.id
    
       if(!playedPostsIds){ // meaning you have followed no-one before
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" />
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
                    </button>
                </li>
       }
       if(playedPostsIds.length === 0){ // meaning it's empty
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" />
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
                    </button>
                </li>
       }
       if(playedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" style={{color: "green"}}/>
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
                    </button>
                </li>
       }
       if(!playedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
        return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" />
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
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
         {this.renderPlayButton()}
        </>
    )
   }
  }