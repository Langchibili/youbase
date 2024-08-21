'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"
import { api_url, getJwt } from "@/Constants"
import { handleCountsDisplay, removeIdFromArray } from "@/Functions"

export default class LikeButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        ...props,
        requesting: false,
        showLogInFirstModal: false
      }
   }
componentDidMount(){
    console.log('inside like button',this.props)
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
      
        const postId = this.props.post.id // the user to be followed
        const loggedInUser = this.props.loggedInUser.user

        let likedPostsIds = this.state.loggedInUser.user.likedPostsIds
        if(!likedPostsIds){  // means you have no people you are following at all
            likedPostsIds = [postId] // means this is the first following you are doing
        }
        else{
            likedPostsIds.push(postId) // add the userId
        }
        const updateObject = {
            likedPosts: { connect: [postId] },
            likedPostsIds: likedPostsIds
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
            const postLikes = !this.state.post.likes? 0 : this.state.post.likes
            console.log('post likes',postLikes)
            const updateObject2 = {
                data:{
                    postLikedBy: { connect: [loggedInUser.id] },
                    likes: parseInt(postLikes+1)
                }
            }
            console.log(updateObject2)
            const response2 = await fetch(api_url+'/posts/'+postId, {
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
                state.loggedInUser.user.likedPostsIds = response.likedPostsIds // update user following
                state.post.likes += 1  // add one to the likes
                this.setState({ // reflesh the button to show unfollow
                   ...state,
                   requesting: false
               })
            } 
        }
        
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
        const postId = this.props.post.id // the user to be followed
        const loggedInUser = this.props.loggedInUser.user

        let likedPostsIds = this.state.loggedInUser.user.likedPostsIds
        if(!likedPostsIds){  // means you have no people you are following at all
            likedPostsIds = likedPostsIds // means this is the first following you are doing
        }
        else{
            likedPostsIds = removeIdFromArray(likedPostsIds,postId) // add the userId
        }
        const updateObject = {
            likedPosts: { disconnect: [postId] },
            likedPostsIds: likedPostsIds
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
            const postLikes = !this.state.post.likes? 1 : this.state.post.likes // so that when you subtract it reaches 0
            const updateObject2 = {
                data: {
                    postLikedBy: { disconnect: [loggedInUser.id] },
                    likes: parseInt(postLikes-1) // remoce the like
                }
            }
            const response2 = await fetch(api_url+'/posts/'+postId, {
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
                state.loggedInUser.user.likedPostsIds = response.likedPostsIds // update user following
                state.post.likes -= 1  // add one to the likes
                this.setState({ // reflesh the button to show unfollow
                ...state,
                requesting: false
              })
            } 
        }
        
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