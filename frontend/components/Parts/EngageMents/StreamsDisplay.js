'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { checkIfUserHasEngagedWithPost, deleteEngagement, getImage, getPostFromId, handleCountsDisplay, logEngagement, sendPushNotification } from "@/Functions"
import { clientUrl, log } from "@/Constants"

export default class StreamsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false,
        userHasEngagedWithPost: false,
        playLogged: false
      }
   }
 

 handlePlay= async ()=>{
        log('in the song play',this.props)
        // if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
        //     this.setState({
        //        showLogInFirstModal: true
        //     })
        //     return
        // } for now we shall allowed logged out users to stream music
       
        this.setState({
            requesting: true // to show user something is happening
        })
        const userId = this.props.post.user.data? this.props.post.user.data.id : this.props.post.user.id
        const postId = this.props.post.id

        logEngagement('plays',postId,this.props.loggedInUser.user,this) 
        const playsCount = parseInt(this.props.post.plays)
        
        if(playsCount === 0){ // if for any reason it's 0, return
            return
        }
        if(playsCount < 5 || playsCount % 100 === 0){ // determine whether to send a push notification, because cannot be spamming users anyhow with each like
            const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
            const title = "Your song has been played "+playsCount+ " times"
            const body = "Your song on youbase has been played "+playsCount+ " times"
            const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
            const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
            sendPushNotification(title,body,[userId],postUrl,image,"")
         }
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
       const userHasEngagedWithPost = this.state.userHasEngagedWithPost
       if(userHasEngagedWithPost){
              return (<li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" style={{color: "green"}}/>
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
                    </button>
              </li>)
       }
       else{
             return (<li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled className="lkcm152">
                        <i className="uil uil-music" />
                        <span>{handleCountsDisplay(this.state.post.plays)}</span>
                    </button>
             </li>)
       }
   }
   async componentDidMount(){
        const checkIfUserPlayedPost = await checkIfUserHasEngagedWithPost(this.props.loggedInUser,this.props.post.id,'plays')
        this.setState({
            userHasEngagedWithPost: checkIfUserPlayedPost
        })
   }
   
   componentDidUpdate(){
    if(this.props.logPlay && !this.state.playLogged){
        this.handlePlay()
        this.setState({
            playLogged: true
        })
    }
    else{
        return
    }
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
          {this.props.autoLogPlay? <></> : this.renderPlayButton()}
        </>
    )
   }
  }