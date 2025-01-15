'use client'

import React from "react"
import UserFollowButton from "./UserFollowButton"
import UserUnFollowButton from "./UserUnFollowButton"
import { api_url, clientUrl, getJwt } from "@/Constants"
import { checkUserFollowing, getImage, getUserById, logNotification, removeIdFromArray, sendPushNotification } from "@/Functions"

export default class UserFollowingButtons extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        requestingText: '',
        userFollowsThisUser: false
      }
   }
   
   createFollowNotification = async (loggedInUserId,userId)=>{
       const loggedInuserDetails = await getUserById(loggedInUserId, "details")
       const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
       const notificationTitle = fullnames + " has followed you"
       logNotification(notificationTitle,loggedInUserId,[userId]) // send notification to the user being followed
   }

   handleUserFollow = async ()=>{
        this.setState({
            requesting: true, // to show user something is happening
            requestingText: 'Following...'
        },async()=>{
                const userId = this.props.userId // the user to be followed
                const loggedInUser = this.props.loggedInUser.user
                const followingCount = parseInt(this.props.loggedInUser.user.followingCount || 0)
            
                const updateObject = {
                    following: { connect: [userId] },
                    followingCount: followingCount+1
                }

                const response = await fetch(api_url+'/users/'+loggedInUser.id, {
                    method: 'PUT',
                    headers: {
                    'Authorization': `Bearer ${getJwt()}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateObject)
                })
                .then(response => response.json())
                .then(data => data)
                
                if(response){ // add to the other user's followedIds
                    const otherUser = await getUserById(userId) // so that we get the follows from the other user
                    let followsUserIds = otherUser.followsUserIds
                    const followersCount = parseInt(otherUser.followersCount || 0)

                    if(!followsUserIds){  // means you have no people you are following at all
                        followsUserIds = [loggedInUser.id] // means this is the first following you are doing
                    }
                    else{
                        followsUserIds.push(loggedInUser.id) // add the userId
                    }
                    const updateObject2 = {
                        follows: { connect: [loggedInUser.id] },
                        followsUserIds: followsUserIds,
                        followersCount: followersCount + 1
                    }
                    const response2 = await fetch(api_url+'/users/'+userId, {
                        method: 'PUT',
                        headers: {
                        'Authorization': `Bearer ${getJwt()}`,
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateObject2)
                    })
                    .then(response => response.json())
                    .then(data => data)

                    if(response2){
                        this.createFollowNotification(loggedInUser.id,userId)
                        const state = this.state
                        this.setState({ // reflesh the button to show follow
                        ...state,
                        userFollowsThisUser: true,
                        requesting: false
                        })
                
                        if(loggedInUser.followersCount > 1000){ // this means you are a worthy user to send another user a notification that you have followed
                            const userWithThumbnail = await getUserById(loggedInUser.id,"profilePicture")
                            const title = notificationTitle+" on youbase"
                            const body = "You have a new follower on youbase"
                            const image = getImage(userWithThumbnail.profilePicture,'thumbnail','profilePicture')
                            const postUrl = clientUrl+"/user/"+loggedInUser.username
                            sendPushNotification(title,body,[userId],postUrl,image,"")
                        }
                        
                        if(otherUser.followersCount === 0){
                            return
                        }
                        // geting the other user's profile because we want him to link back to his profile to see how many followers he has amased
                        if(otherUser.followersCount < 100 || otherUser.followersCount % 100 === 0){ // determine whether to send a push notification, because cannot be spamming users anyhow with each like
                            const userWithThumbnail = await getUserById(this.props.userId,"profilePicture")
                            const title = "You have "+otherUser.followersCount+" followers on youbase"
                            const body = "Your youbase account has "+otherUser.followersCount+" followers"
                            const image = getImage(userWithThumbnail.profilePicture,'thumbnail','profilePicture')
                            const postUrl = clientUrl+"/user/profile"
                            sendPushNotification(title,body,[userId],postUrl,image,"")
                         }
                    } 
                }
            })
                
    }

   handleUserUnfollow = async ()=>{ 
            this.setState({
                requesting: true, // to show user something is happening
                requestingText: 'Unfollowing...'
            },async ()=>{
                const userId = this.props.userId // the user to be unfollowed
                const loggedInUser = this.props.loggedInUser.user
                const followingCount = parseInt(this.state.loggedInUser.user.followingCount || 0)
                
                const updateObject = {
                    following: { disconnect: [userId] },
                    followingCount: followingCount-1
                }
    
                const response = await fetch(api_url+'/users/'+loggedInUser.id, {
                    method: 'PUT',
                    headers: {
                    'Authorization': `Bearer ${getJwt()}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateObject)
                })
                .then(response => response.json())
                .then(data => data)
                
                if(response){ // add to the other user's followedIds
                    const otherUser = await getUserById(userId) // so that we get the follows from the other user
                    let followsUserIds = otherUser.followsUserIds
                    const followersCount = parseInt(otherUser.followersCount)
    
                    if(!followsUserIds){   // means there was an error that caused a null value on the followsids
                        followsUserIds = followsUserIds // leave as is, the null value
                    }
                    else{
                        followsUserIds =  removeIdFromArray(followsUserIds,loggedInUser.id) // remove the loggedInuser from the follows
                    }
                    const updateObject2 = {
                        follows: { disconnect: [loggedInUser.id] },
                        followsUserIds: followsUserIds,
                        followersCount: followersCount-1
                    }
                    const response2 = await fetch(api_url+'/users/'+userId, {
                        method: 'PUT',
                        headers: {
                        'Authorization': `Bearer ${getJwt()}`,
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateObject2)
                    })
                    .then(response => response.json())
                    .then(data => data)
    
                    if(response2){
                        const state = this.state
                        this.setState({ // reflesh the button to show unfollow
                        ...state,
                        userFollowsThisUser: false,
                        requesting: false
                    })
                   } 
               }
            })    
   }

   renderFollowingButton = ()=>{
       const userFollowsThisUser = this.state.userFollowsThisUser
       if(userFollowsThisUser){ // it means you are already following this user, you can only unfollow the user
          return <UserUnFollowButton {...this.state} handleUserUnfollow={this.handleUserUnfollow}/>
       }
       else{ // it means you are already following this user, you can only unfollow the user
          return <UserFollowButton {...this.state} handleUserFollow={this.handleUserFollow}/>
       }
   }
   async componentDidMount(){
           const userFollowingCheck = await checkUserFollowing(this.props.loggedInUser, this.props.userId)
           this.setState({
              userFollowsThisUser: userFollowingCheck
           })
   }
   
   render(){
    return (
        <>
        {this.state.requesting? <button className="subscribe-btn" style={{backgroundColor:'lightgray'}}>{this.state.requestingText}</button> :  this.renderFollowingButton()}
        </>
    )
   }
  }