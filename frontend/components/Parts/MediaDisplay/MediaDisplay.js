'use effect'

import { getPostfeaturedImages, getPostMedia } from "@/Functions";
import React from "react";
import MusicDisplay from "./MusicDisplay";
import VideosDisplay from "./VideosDisplay";
import FeaturedImages from "./FeaturedImages";

export default class MediaDisplay extends React.Component{
    constructor(props){
         super(props)
         this.state = {
            featuredImages: null,
            media: null,
            featuredImagesLoaded: false,
            mediaLoaded: false
         }
    }

  getPost = async ()=>{
        const post = this.props.post
        console.log(post)
        const featuredImages = await getPostfeaturedImages(post.dashed_title)
        this.setState({
            featuredImages: featuredImages,
            featuredImagesLoaded: true
        })
        if(post.type === "video" || post.type === "music" || post.type === "image"){ // only bother to get media if post is of this type
            const media = await getPostMedia(post.dashed_title)
            this.setState({
                media: media,
                featuredImagesLoaded: true,
                mediaLoaded: true
            })
        }
    }
    componentDidMount(){
       this.getPost(false)
    }

    
    featuredImagesDisplay = ()=>{
        const post = this.props.post
        if(this.state.featuredImagesLoaded){
            if(this.state.featuredImages === null) { // this means there is just text description, that's all
                return
            }
            return <FeaturedImages images={this.state.featuredImages} handleRemoveImage={this.props.handleRemoveImage} listtype={this.props.listtype || "carousel"}/>
        }

    }

    mediaDisplay = ()=>{
        const post = this.props.post
        if(post.type === "text") { // no media to display in this case
            return 
        }
        if(post.type === "image") { // the media is as good as the featured images in this case
            return <FeaturedImages images={this.state.media} handleRemoveImage={this.props.handleRemoveImage} listtype={this.props.listtype || "carousel"}/>
        }
        if(post.type === "music") { 
            return <MusicDisplay songs={this.state.media}/>
        }
        if(post.type === "video") { 
            return <VideosDisplay videos={this.state.media}/>
        }
        
     }
    
    titleAndDescription = ()=>{
        if(this.props.displayType === "mediaOnly") { // means don't show the title and description
            return <></>
        }
        return (
            <>
            {!this.props.post.is_title_user_writted? <></> : <span className="_abc123">{this.props.post.title}</span>}
            <p>{this.props.post.description}</p>
            </>
        )
    } 
    
    render(){
        return (
            !this.state.featuredImagesLoaded? <>loading...</> : <>
            {this.featuredImagesDisplay()}
            {!this.state.mediaLoaded? <></> : this.mediaDisplay()}
            {this.titleAndDescription()}
            </>
        )
    }
}