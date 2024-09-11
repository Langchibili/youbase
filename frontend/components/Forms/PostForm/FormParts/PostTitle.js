'use client'

import React from "react"
import AutoResizeTextarea from "./AutoResizeTextarea"

export default class PostTitle extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   render(){
    return (
        <div>
            {/* this.props.description.length > 0? this.props.description : "Write something..." */}
            <AutoResizeTextarea {...this.props}/>
        </div>
    )
   }
  }