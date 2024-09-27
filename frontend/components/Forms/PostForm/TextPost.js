'use client'

import React from "react"
import FormFooter from "./FormParts/FormFooter"
import FormHeader from "./FormParts/FormHeader"
import PostDescription from "./FormParts/PostDescription"

export default class TextPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   render(){
    return (
        <>
        <FormHeader changePostType={this.props.changePostType} title="Add Post" />
        <PostDescription description={this.props.post.description} setPostDescriptionOrTitle={this.props.setPostDescription} descriptionPlaceholder="Write something..." bordered="no"/>
        <FormFooter {...this.props}/>
        </>
    )
   }
  }