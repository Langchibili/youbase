'use client'

import React from "react"

export default class MusicPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   render(){
    return (
        <>
        
        <button onClick={this.props.changePostType}>back</button>
        MusicPost
        </>
    )
   }
  }