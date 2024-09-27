'use client'

import Uploader from "@/components/Includes/Uploader/Uploader"
import React from "react"
import FormHeader from "./FormParts/FormHeader"
import FormFooter from "./FormParts/FormFooter"
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay"
import PostDescription from "./FormParts/PostDescription"
import PostTitle from "./FormParts/PostTitle"
import { api_url, getJwt, log } from "@/Constants"
import { getPostMedia, getVideoMetaFromPostAndId } from "@/Functions"
import VideoFileDisplay from "@/components/Includes/VideoDisplay/VideoFileDisplay"

export default class VideoPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props,
         media: null
      }
   }

   async componentDidMount(){
      const media = await getPostMedia(this.props.post.dashed_title)
      this.props.setPostMedia(media)
      log('media in post', media)
      this.setState({
         media:media
      })
    }

    renderMedia = ()=>{
      log(this.state)
      if(!this.state.media){
         return <></>
      }
      return this.state.media.map((media)=> <VideoFileDisplay videoMeta={getVideoMetaFromPostAndId(this.props.post,media.id)} file={media} handleRemoveMedia={this.handleRemoveMedia}/>)
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

   render(){
    return (
        <>
       <FormHeader changePostType={this.props.changePostType} title="Add Video" />
       {/* description is title here, because we are using the same input as description */}
       <PostTitle description={this.props.post.title === "untitled"? "" : this.props.post.title} setPostDescriptionOrTitle={this.props.setPostTitle} descriptionPlaceholder="Title" bordered="yes"/>
       <h3>Upload Video *</h3>
       <Uploader
                  refId={this.props.post.id}
                  refName="api::post.post"
                  fieldName="media"
                  allowedTypes={['video/*']}
                  allowMultiple={false}
                  addMediaOnUpload={this.props.addMediaOnUpload}
         />
         {this.renderMedia()}
         <h4>optional</h4>
         <hr/>
         <PostDescription description={this.props.post.description} setPostDescriptionOrTitle={this.props.setPostDescription} descriptionPlaceholder="Add Video Description" bordered="yes"/>
         <h5>Custom Thumbnail</h5>
         <Uploader 
                  displayType="circular"
                  refId={this.props.post.id}
                  refName="api::post.post"
                  fieldName="featuredImages"
                  allowedTypes={['image/*']}
                  allowMultiple={false}
            />
         <MediaDisplay post={this.props.post} displayType="mediaOnly" refleshImages={this.state.refleshImages} handleRemoveImage={this.handleRemoveImage} listtype="grid"/>
         <FormFooter {...this.props}/>
        </>
    )
   }
  }