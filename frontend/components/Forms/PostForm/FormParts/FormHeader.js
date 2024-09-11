'use client'

import React from "react"

export default class FormHeader extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   render(){
    return (
        <div>
            <button onClick={this.props.changePostType}>back</button>
            <h3>{this.props.title}</h3>
        </div>
    )
   }
  }