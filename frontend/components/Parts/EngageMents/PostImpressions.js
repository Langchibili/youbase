// this logs the impression or rather view on a post, regardless of whether a user plays, likes, 
// or does any activity on the post

'use client'

import { logEngagement } from "@/Functions"
import React from "react"

export default class PostImpressions extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   componentDidMount(){
      // on component mounting, log the impression // no time constraints at the moment
      logEngagement('impressions',this.props.post.id,this.props.loggedInUser.user,this) 
   }

   render(){
    return (
        <></>
    )
   }
  }