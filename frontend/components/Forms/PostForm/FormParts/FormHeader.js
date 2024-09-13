'use client'

import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
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
            <IconButton onClick={this.props.changePostType}><ArrowBack/></IconButton>
            <h3>{this.props.title}</h3>
            <hr/>
        </div>
    )
   }
  }