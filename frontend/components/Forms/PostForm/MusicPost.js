'use client'

import Uploader from "@/components/Includes/Uploader/Uploader"
import React from "react"
import FormFooter from "./FormParts/FormFooter"
import FormHeader from "./FormParts/FormHeader"
import PostDescription from "./FormParts/PostDescription"
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay"
import PostTitle from "./FormParts/PostTitle"
import { api_url, getJwt, log } from "@/Constants"
import { getPostFromId, getPostMedia } from "@/Functions"
import SongFileDisplay from "@/components/Includes/SongFileDisplay/SongFileDisplay"

export default class MusicPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props,
         media: null
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

   async componentDidMount(){
         const post = await getPostFromId(this.props.post.id,"media")
         log(post)
         this.props.setPostMedia(post.media.data)
         this.setState({
            media:post.media.data
         },()=>{
            log(this.state.media)
         })
   }

   
   handleRemoveMedia = async (uploadid)=>{
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
          this.props.removePostMedia(uploadid)
          document.getElementById("#media-"+uploadid).style.display = "none"
        }
   }
   
   renderMedia = ()=>{
      if(!this.state.media){
         return <></>
      }
      return this.state.media.map((media)=> <SongFileDisplay file={media} handleRemoveMedia={this.handleRemoveMedia}/>)
   }
   
   render(){
    return (
        <>
       <FormHeader changePostType={this.props.changePostType} title="Add Music" />
       {/* description is title here, because we are using the same input as description */}
       <PostTitle description={this.props.post.title === "untitled"? "" : this.props.post.title} setPostDescriptionOrTitle={this.props.setPostTitle} descriptionPlaceholder="Title" bordered="yes"/>
       <h3>Upload Song *</h3>
       <Uploader
            refId={this.props.post.id}
            refName="api::post.post"
            fieldName="media"
            allowedTypes={['audio/*']}
            allowMultiple={false}
            addMediaOnUpload={this.props.addMediaOnUpload}
        />
        {this.renderMedia()}
        <h4>optional</h4>
        <hr/>
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