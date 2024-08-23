'use client'

import React from "react"

export default class VideoPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   // on post publish
   // run localStorage.removeItem('draftPostId')
   // because you would have successfully created a post

   render(){
    return (
        <>
        <button onClick={this.props.changePostType}>back</button>
        VideoPost
        </>
    )
   }
  }