'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, handleCountsDisplay, logEngagement } from "@/Functions"

export default class ViewsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false,
        viewLogged: false
      }
   }
  


 componentDidUpdate(){
    if(this.props.logView && !this.state.viewLogged){
        this.handleView()
        this.setState({
            viewLogged: true
        })
    }
    else{
        return
    }
   }

 handleView = async ()=>{
        // if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
        //     this.setState({
        //        showLogInFirstModal: true
        //     })
        //     return
        // } for now we shall allow unlogged out users to view posts

        this.setState({
            requesting: true // to show user something is happening
        })
        logEngagement('views',this.props.post.id,this.props.loggedInUser.user,this) 
   }

   handleUnView = async ()=>{
        return // because for now, you cannot unview a post you have viewed
        if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
            this.setState({
              showLogInFirstModal: true
            })
        }

        this.setState({
            requesting: true // to show user something is happening
        })
        deleteEngagement('views',this.props.post.id,this.props.loggedInUser.user,this)    
   }

   renderViewButton = ()=>{
       const viewedPostsIds = this.state.loggedInUser.user.viewedPostsIds
       const postId = this.state.post.id
    
       if(!viewedPostsIds){ // meaning you have followed no-one before
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(viewedPostsIds.length === 0){ // meaning it's empty
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(viewedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" style={{color: "#1e7193"}}/>
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(!viewedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
        return  <li>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
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
          {this.props.autoLogView? <></> : this.renderViewButton()}
        </>
    )
   }
  }