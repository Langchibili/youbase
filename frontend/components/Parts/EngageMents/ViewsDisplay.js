'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { checkIfUserHasEngagedWithPost, deleteEngagement, getImage, getPostFromId, handleCountsDisplay, logEngagement, logTimelyEngagement, sendPushNotification } from "@/Functions"
import { clientUrl, log } from "@/Constants"

export default class ViewsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false,
        userHasEngagedWithPost: false,
        viewLogged: false
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
        log('the views page',this.props.post)
        if(this.props.loggedInUser.status){
            if(this.props.post.user.data.id === this.props.loggedInUser.user.id){
                return // you cannot log view of your own post
            }
        }
        const userId = this.props.post.user.data? this.props.post.user.data.id : this.props.post.user.id
        const postId = this.props.post.id

        logEngagement('views',postId,this.props.loggedInUser.user,this) 
        logTimelyEngagement('views',postId)
        const viewsCount = parseInt(this.props.post.views)
        if(viewsCount === 0){ // if for any reason it's 0, return
            return
        }
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
       const userHasEngagedWithPost = this.state.userHasEngagedWithPost
       if(userHasEngagedWithPost){
        return  (<li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" style={{color: "#1e7193"}}/>
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>)
       }
       else{
        return  (<li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-eye" />
                        <span>{handleCountsDisplay(this.state.post.views)}</span>
                    </button>
                </li>)
       }
   }

   handleModalClose = ()=>{
        this.setState({
            showLogInFirstModal: false
        })
    }

    async componentDidMount(){
        const userHasViewdPost = await checkIfUserHasEngagedWithPost(this.props.loggedInUser,this.props.post.id,'views')
        this.setState({
            userHasEngagedWithPost: userHasViewdPost
        })
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
   render(){
    return (
        <>
          {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>}
          {this.props.autoLogView? <></> : this.renderViewButton()}
        </>
    )
   }
  }