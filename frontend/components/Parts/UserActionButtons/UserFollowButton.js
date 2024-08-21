'use client'

import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal"
import React from "react"

export default class UserFollowButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        showLogInFirstModal: false
      }
   }
    
   handleFollow = ()=>{
      if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
         this.setState({
            showLogInFirstModal: true
         })
      }
      this.props.handleUserFollow()  // follow the user
   }
   
   handleModalClose = ()=>{
        this.setState({
            showLogInFirstModal: false
        })
   }
   
   render(){
    return (<>
            {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>}
            <button className="subscribe-btn" onClick={this.handleFollow}>Follow</button>
            </>
    )
   }
  }