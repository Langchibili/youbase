'use client'

import React from "react"
import FormFooter from "./FormParts/FormFooter"
import FormHeader from "./FormParts/FormHeader"
import PostTitle from "./FormParts/PostTitle"
import PostDescription from "./FormParts/PostDescription"
import CategorySelector from "@/components/Includes/CategorySelector/CategorySelector"

export default class EmbedPost extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }

   renderEmbedLinkInput = ()=>{
      if(this.props.embedType === "facebook"){
         
      }
   }

   render(){
    return (
        <>
        <FormHeader changePostType={this.props.changePostType} title="Add Embed" />
        <p><small>*Only public {this.props.embedType === "youtube"? "or unlisted " : ""} videos can be embeded, private videos cannot be embeded</small></p>
        
        <div className="ui left icon labeled input swdh11 swdh31">
        <div className="ui label lb12">{this.props.embedType}</div>
        <input
            onChange={(e)=>{ this.props.setPostEmbed(e.target.value) }}
            className="prompt srch_explore"
            type="text"
            name="site"
            id="id_site"
            required=""
            maxLength={64}
            placeholder={this.props.post.embedLink?.length > 0? this.props.post.embedLink : "add video link" }
         />
        </div>
        <CategorySelector post={this.props.post} handleCategorySet={this.props.handleCategorySet} parentCategory="videos"/>
        <h4>optional</h4>
        <hr/>
        <PostTitle description={this.props.post.title === "untitled"? "" : this.props.post.title} setPostDescriptionOrTitle={this.props.setPostTitle} descriptionPlaceholder="Title" bordered="yes"/>
        <PostDescription description={this.props.post.description} setPostDescriptionOrTitle={this.props.setPostDescription} descriptionPlaceholder="Add Video Description" bordered="yes"/>
        <FormFooter {...this.props}/>
        </>
    )
   }
  }