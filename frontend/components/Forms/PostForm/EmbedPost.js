'use client'

import React from "react"

export default class EmbedPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   render(){
    return (
        <>
        only public videos can be embeded, especially youtube
        <button onClick={this.props.changePostType}>back</button>
        EmbedPost
        </>
    )
   }
  }