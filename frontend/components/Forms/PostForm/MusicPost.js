'use client'

import Uploader from "@/components/Includes/Uploader/Uploader"
import React from "react"
import FormFooter from "./FormParts/FormFooter"
import FormHeader from "./FormParts/FormHeader"
import PostDescription from "./FormParts/PostDescription"
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay"
import PostTitle from "./FormParts/PostTitle"

export default class MusicPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   handleRemoveImage = async (uploadid)=>{
      const removed = await fetch(api_url+'/upload/files/'+uploadid,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
       if(removed){
         document.getElementById("#"+uploadid).style.display = "none"
       }
  }

   render(){
      console.log('in the image post edit', this.props)
    return (
        <>
       <FormHeader changePostType={this.props.changePostType} title="Add Music" />
       {/* description is title here, because we are using the same input as description */}
       <PostTitle description={this.props.post.title === "untitled"? "" : this.props.post.title} setPostDescriptionOrTitle={this.props.setPostTitle} descriptionPlaceholder="Title" bordered="yes"/>
       <h3>Add Song</h3>
       <Uploader
            refId={this.props.post.id}
            refName="api::post.post"
            fieldName="media"
            allowedTypes={['audio/*']}
            allowMultiple={false}
        />
        <h3>Music Art</h3>
        <Uploader 
               displayType="circular"
               refId={this.props.post.id}
               refName="api::post.post"
               fieldName="featuredImages"
               allowedTypes={['image/*']}
               allowMultiple={false}
         />
        <MediaDisplay post={this.props.post} displayType="mediaOnly" refleshImages={this.state.refleshImages} handleRemoveImage={this.handleRemoveImage} listtype="grid"/>
        <PostDescription description={this.props.post.description} setPostDescriptionOrTitle={this.props.setPostDescription} descriptionPlaceholder="Add Song Description" bordered="yes"/>
        <FormFooter {...this.props}/>
      
        </>
    )
   }
  }