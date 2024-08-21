'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"

export default class UserUnFollowButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        showLogInFirstModal: false
      }
   }
    
   handleUserUnfollow = ()=>{
      if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
         this.setState({
            showLogInFirstModal: true
         })
      }
      this.props.handleUserUnfollow() // unfollow the user then
   }
   
   handleModalClose = ()=>{
        this.setState({
            showLogInFirstModal: false
        })
   }
   
   render(){
    return (<>
            {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>}
            <button className="subscribe-btn" style={{backgroundColor:'gray'}} onClick={this.handleUserUnfollow}>Unfollow</button>
            </>
    )
   }
  }