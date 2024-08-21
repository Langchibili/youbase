// on this component mounting
// start the views counter, if a certain amount of time passes, count the view
// for example: 5seconds, then a view is counted
//  this is only for video posts

'use client'

import { handleCountsDisplay } from "@/Functions"
import React from "react"

export default class ViewsDisplay extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        views: this.props.post.views
      }
   }

   render(){
    return (
        <li>
            <a href="#" className="lkcm152">
                <i className="uil uil-eye" />
                <span>{handleCountsDisplay(this.state.views)}</span>
            </a>
        </li>
    )
   }
  }