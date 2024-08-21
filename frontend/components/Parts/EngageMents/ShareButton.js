'use client'

import { handleCountsDisplay } from "@/Functions"
import React from "react"

export default class ShareButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        shares: this.props.post.shares
      }
   }

   render(){
    return (
        <li>
            <a href="#" className="lkcm152">
                <i className="uil uil-share-alt" />
                <span>{handleCountsDisplay(this.state.shares)}</span>
            </a>
        </li>
    )
   }
  }