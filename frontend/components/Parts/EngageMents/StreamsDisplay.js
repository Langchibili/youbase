// this is only for music posts

'use client'

import { handleCountsDisplay } from "@/Functions"
import React from "react"

export default class StreamsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        plays: this.props.post.plays
      }
   }

   render(){
    return (
        <li>
            <a href="#" className="lkcm152">
                <i className="uil uil-music" />
                <span>{handleCountsDisplay(this.state.plays)}</span>
            </a>
        </li>
    )
   }
  }