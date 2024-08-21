'use client'

import React from "react"
import UserFollowButton from "./UserFollowButton"
import UserUnFollowButton from "./UserUnFollowButton"
import { api_url, getJwt } from "@/Constants"
import { getUserById, removeIdFromArray } from "@/Functions"

export default class UserFollowingButtons extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        requestingText: ''
      }
   }

   handleUserFollow = async ()=>{
        this.setState({
            requesting: true, // to show user something is happening
            requestingText: 'Following...'
        })
        const userId = this.props.userId // the user to be followed
        const loggedInUser = this.props.loggedInUser.user

        let followingUserIds = this.state.loggedInUser.user.followingUserIds
        if(!followingUserIds){  // means you have no people you are following at all
            followingUserIds = [userId] // means this is the first following you are doing
        }
        else{
            followingUserIds.push(userId) // add the userId
        }
        const updateObject = {
            following: { connect: [userId] },
            followingUserIds: followingUserIds
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
            if(!followsUserIds){  // means you have no people you are following at all
                followsUserIds = [loggedInUser.id] // means this is the first following you are doing
            }
            else{
                followsUserIds.push(loggedInUser.id) // add the userId
            }
            const updateObject2 = {
                follows: { connect: [loggedInUser.id] },
                followsUserIds: followsUserIds
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
                state.loggedInUser.user.followingUserIds = response.followingUserIds // update user following
                this.setState({ // reflesh the button to show unfollow
                   ...state,
                   requesting: false
               })
            } 
        }
        
   }

   handleUserUnfollow = async ()=>{ 
    this.setState({
        requesting: true, // to show user something is happening
        requestingText: 'Unfollowing...'
    })
    const userId = this.props.userId // the user to be unfollowed
    const loggedInUser = this.props.loggedInUser.user
    let followingUserIds = this.state.loggedInUser.user.followingUserIds
    if(!followingUserIds){  // means there was an error that caused a null value on the followingids
        followingUserIds = followingUserIds // leave as is, the null value
    }
    else{
        followingUserIds = removeIdFromArray(followingUserIds,userId) // add the userId
    }
    const updateObject = {
        following: { disconnect: [userId] },
        followingUserIds: followingUserIds
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
        if(!followsUserIds){   // means there was an error that caused a null value on the followsids
            followsUserIds = followsUserIds // leave as is, the null value
        }
        else{
            followsUserIds =  removeIdFromArray(followsUserIds,loggedInUser.id) // remove the loggedInuser from the follows
        }
        const updateObject2 = {
            follows: { disconnect: [loggedInUser.id] },
            followsUserIds: followsUserIds
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
            state.loggedInUser.user.followingUserIds = response.followingUserIds // update user following
            this.setState({ // reflesh the button to show unfollow
               ...state,
               requesting: false
           })
        } 
    }
    

   }

   renderFollowingButton = ()=>{
       const followingUserIds = this.state.loggedInUser.user.followingUserIds
       const isUserLoggedIn = this.state.loggedInUser.status
       const userId = this.state.userId

       if(!isUserLoggedIn){ // meaning user is logged out
          return <UserFollowButton {...this.state} handleUserFollow={this.handleUserFollow}/>
       }
       if(!followingUserIds){ // meaning you have followed no-one before
         return <UserFollowButton {...this.state} handleUserFollow={this.handleUserFollow}/>
       }
       if(followingUserIds.length === 0){ // meaning it's empty
        return <UserFollowButton {...this.state} handleUserFollow={this.handleUserFollow}/>
       }
       if(followingUserIds.includes(userId)){ // it means you are already following this user, you can only unfollow the user
        return <UserUnFollowButton {...this.state} handleUserUnfollow={this.handleUserUnfollow}/>
       }
       return <></>
       
   }
   render(){
    return (
        <>
        {this.state.requesting? <button className="subscribe-btn" style={{backgroundColor:'lightgray'}}>{this.state.requestingText}</button> :  this.renderFollowingButton()}
        </>
    )
   }
  }