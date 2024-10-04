'use client'

import Uploader from "@/components/Includes/Uploader/Uploader"
import React from "react"
import FormHeader from "./FormParts/FormHeader"
import FormFooter from "./FormParts/FormFooter"
import PostDescription from "./FormParts/PostDescription"
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay"
import Link from "next/link"
import { api_url, getJwt } from "@/Constants"

export default class ImagePost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props,
         refleshImages: false
      }
   }

   componentDidMount(){

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
          if(typeof document !== 'undefined'){
            document.getElementById("#"+uploadid).style.display = "none"
          }
        }
   }

   render(){
    return (
        <>
         <FormHeader changePostType={this.props.changePostType} title="Add Image" />
        
         <Uploader 
               displayType="circular"
               refId={this.props.post.id}
               extra_payload={this.props.post.extra_payload}
               refName="api::post.post"
               fieldName="featuredImages"
               allowedTypes={['image/*']}
               allowMultiple={false}
         />
        <MediaDisplay post={this.props.post} displayType="mediaOnly" refleshImages={this.state.refleshImages} handleRemoveImage={this.handleRemoveImage} listtype="grid"/>
        <h4>optional</h4>
        <hr/>
        <PostDescription description={this.props.post.description} setPostDescriptionOrTitle={this.props.setPostDescription} descriptionPlaceholder="Write something..."bordered="no"/>
        <FormFooter {...this.props}/>
        </>
    )
   }
  }