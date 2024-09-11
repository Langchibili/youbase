'use client'

import React from "react"
import FormFooter from "./FormParts/FormFooter"

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
        <FormHeader changePostType={this.props.changePostType} title="Add Embed" />
        only public videos can be embeded, especially youtube
        <button onClick={this.props.changePostType}>back</button>
        EmbedPost
        <FormFooter {...this.props}/>
        </>
    )
   }
  }