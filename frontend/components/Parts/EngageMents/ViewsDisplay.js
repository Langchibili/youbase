'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { deleteEngagement, getImage, getPostFromId, handleCountsDisplay, logEngagement, sendPushNotification } from "@/Functions"
import { clientUrl } from "@/Constants"

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
        console.log('the views page',this.props.post)
        const userId = this.props.post.user.data? this.props.post.user.data.id : this.props.post.user.id
        const postId = this.props.post.id

        logEngagement('views',postId,this.props.loggedInUser.user,this) 
        const viewsCount = parseInt(this.props.post.views)
        if(viewsCount < 5 || viewsCount % 100 === 0){ // determine whether to send a push notification, because cannot be spamming users anyhow with each like
            const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
            const title = "Your video has been viewed "+viewsCount+ " times"
            const body = "Your video on youbase has been viewed "+viewsCount+ " times"
            const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
            const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
            sendPushNotification(title,body,[userId],postUrl,image,"")
         }
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
       const viewedPostsIds = this.state.loggedInUser.status? this.state.loggedInUser.user.viewedPostsIds : [] // if logged out, then just display the views only
       const postId = this.state.post.id
    
       if(!viewedPostsIds){ // meaning you have followed no-one before
         return  <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(viewedPostsIds.length === 0){ // meaning it's empty
         return  <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(viewedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
         return  <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" style={{color: "#1e7193"}}/>
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>
       }
       if(!viewedPostsIds.includes(postId)){ // it means you are already following this user, you can only unfollow the user
        return  <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
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