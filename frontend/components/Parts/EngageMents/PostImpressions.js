// this logs the impression or rather view on a post, regardless of whether a user plays, likes, 
// or does any activity on the post

'use client'

import React from "react"

export default class PostImpressions extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        views: this.props.post.views
      }
   }

   componentDidMount(){
      // on component mounting, log the impression
   }

   render(){
    return (
        <></>
    )
   }
  }