// this logs the impression or rather view on a post, regardless of whether a user plays, likes, 
// or does any activity on the post
'use client'

import { logEngagement } from "@/Functions"

import React from "react"
import { getJwt, getUserAccount } from "../../../Constants"

export default class PostImpressions extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   async componentDidMount(){
      let loggedInUser = null
      if(this.props.loggedInUser.status){
         loggedInUser = this.props.loggedInUser.user
      }
      else{
         loggedInUser = await getUserAccount(getJwt());
      }
      // on component mounting, log the impression // no time constraints at the moment
      logEngagement('impressions',this.props.post.id,loggedInUser,this) 
   }

   render(){
    return (
        <></>
    )
   }
  }