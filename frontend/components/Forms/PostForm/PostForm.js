'use client'

import React from "react"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import ImageIcon from "@mui/icons-material/Image"
import VideocamIcon from "@mui/icons-material/Videocam"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import { blue, red, green, purple } from "@mui/material/colors"
import { styled } from "@mui/system";
import ImagePost from "./ImagePost"
import MusicPost from "./MusicPost"
import VideoPost from "./VideoPost"
import TextPost from "./TextPost"
import { createNewPost, generateDashedString, getPostFromId, getPostMedia, truncateText } from "@/Functions"
import { api_url, getJwt, log } from "@/Constants"
import { FacebookTwoTone, Twitter, X, YouTube } from "@mui/icons-material"
import EmbedPost from "./EmbedPost"
import ContentLoader from "@/components/Includes/Loader/ContentLoader"

export default class PostForm extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         post: null,
         action: this.props.action,
         postToSaveObject: {data:{status:'draft'}},
         dummyPostCreated: this.props.action === "create"? false : true,
         userSelectedPostType: this.props.action === "create"? false : true,
         postType: this.props.action === "create"? "text" : this.props.post.type, // if you are editing, then a post prop will be supplied
         embedType: '',
         postSaved: false,
         postSaving: false,
         postSavingAsDraft: false,
         postSavedAsDraft: false,
         loadingPost: true, 
         mediaData: null  // just for refrence within post form
      }
   }
   
   handlePostTypeSelect = (postType)=>{
        if(postType === "text" || postType === "image" || postType === "music" || postType === "video"){
          this.setState({
              postType: postType,
              userSelectedPostType: true
          })
        }
        else{
          this.setState({
            postType: "embed",
            embedType: postType,
            userSelectedPostType: true
          })
        }
   }
   
   setPostDescription = (description)=>{
        let post = this.state.post
        if(!post){
          post = {}
        }
        const postToSaveObject = this.state.postToSaveObject
        post.description = description
        postToSaveObject.data.description = description
        this.setState({
            post:post,
            postToSaveObject:postToSaveObject,
            postSaved: false
        })
   }

   setPostTitle = (title)=>{
        let post = this.state.post
        if(!post){
          post = {}
        }
        const postToSaveObject = this.state.postToSaveObject
        post.title = title
        postToSaveObject.data.title = title
        postToSaveObject.data.is_title_user_writted = true
        
        this.setState({
            post:post,
            postToSaveObject:postToSaveObject,
            postSaved: false
        })
   }
   setPostEmbed = (embedLink)=>{
    let post = this.state.post
    if(!post){
      post = {}
    }
    const postToSaveObject = this.state.postToSaveObject
    post.embedLink = embedLink
    postToSaveObject.data.embedLink = embedLink
    this.setState({
        post:post,
        postToSaveObject:postToSaveObject,
            postSaved: false
        })
    }

   setPostMedia = (mediaArray)=>{
        log('the media array',mediaArray)
        let media = this.state.mediaData
        if(!mediaArray) return
        if(!media){ 
          media = {}
        }
        mediaArray.forEach((medium)=>{
          media[medium.id] = medium
        })
        this.setState({
          mediaData:media
        })
   } 

   removePostMedia = (mediaId)=>{
        let media = this.state.mediaData
        delete media[mediaId] // remove the media with provided id
        if(Object.keys(media).length === 0){
          media = null
        }
        this.setState({
          mediaData:media
        })
  } 
  
  addMediaOnUpload = async ()=>{
        let mediaArray
        if(this.state.action === "edit"){
          const post = await getPostFromId(this.props.postId,"media")
          mediaArray = post.media.data
        }
        else{
          const draftPostId = localStorage.getItem('draftPostId')
          const post = await getPostFromId(draftPostId,"media")
          mediaArray = post.media.data
        }
        let media = this.state.mediaData
        if(!mediaArray) return
        if(!media){ 
          media = {}
        }
        mediaArray.forEach((medium)=>{
          media[medium.id] = medium
        })
        log('media in parent post', media)
        this.setState({
          mediaData:media
        })
  }

   savePost = async (publish)=>{
      const draftPostId = localStorage.getItem('draftPostId')
      const postToSaveObject = this.state.postToSaveObject
      const action = this.state.action
      this.setState({
        postSaving: true
      })
      if(publish){
        postToSaveObject.data.status = "published"
        if(!postToSaveObject.data.is_title_user_writted){  // means add an automated title from the description, this is usually with texts and images
          if(postToSaveObject.data.description){
            if(postToSaveObject.data.description.length > 0){ // only add an automated title if you at least added a description
              postToSaveObject.data.title = truncateText(postToSaveObject.data.description,100)
            }
          }
        } // otherwise the title has already been addeded by user
        if(action === "create"){ // only can be done once, never when editing
          postToSaveObject.data.type = this.state.postType
          if(this.state.postType === "embed"){
            postToSaveObject.data.mediaSource = this.state.embedType // source not local
          }
          
          if(postToSaveObject.data.title !== "untitled" || postToSaveObject.data.title.length > 0){ // this is significant in case of editing
            postToSaveObject.data.is_title_user_writted = true
          }
          // media type error checks
          if(this.state.postType === "music" && !postToSaveObject.data.is_title_user_writted){
            alert("song must have a title") 
            this.setState({
              postSaving: false
            })
            return // cannot post song without title
          }
          if(this.state.postType === "music" && !this.state.mediaData){
            alert("music must have a song, upload a song") 
            this.setState({
              postSaving: false
            })
            return // cannot post song without song file
          }

          if(this.state.postType === "video" && !this.state.mediaData){
            alert("you must upload a video") 
            this.setState({
              postSaving: false
            })
            return // cannot post song without song file
          }
          
          if(this.state.postType === "video" || this.state.postType === "music" || this.state.postType === "embed"){
            if(postToSaveObject.data.is_title_user_writted){
              if(!postToSaveObject.data.title){ // in which case the dashed title is already added during drafting
                postToSaveObject.data.title = "untitled"
              }
              else{
                postToSaveObject.data.dashed_title = generateDashedString(postToSaveObject.data.title) + "-" + draftPostId
              }
            }
          }
          else{
            if(!postToSaveObject.data.description){
              if(postToSaveObject.data.description.length < 0){
                postToSaveObject.data.description = ""
              }
            }
            else{
              postToSaveObject.data.dashed_title = generateDashedString(postToSaveObject.data.description) + "-" + draftPostId
            }
          }
        }
      }
      else{
        this.setState({
          postSavingAsDraft: true
        })
        postToSaveObject.data.status = "draft"
      }
      const response =  await fetch(api_url+'/posts/'+draftPostId, {
        method: 'PUT',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToSaveObject)
      })
     .then(response => response.json())
     .then(data => data)
     if(response){
         if(publish){
          localStorage.removeItem('draftPostId') // remove the draft post id to ensure a new draft post can be created
          this.setState({
            postSaved: true,
            postSavedAsDraft: false,
            postSavingAsDraft: false,
            postSaving: false,
            action: "edit"
          })
         }
         else{
          this.setState({
            postSaved: true,
            postSavedAsDraft: true,
            postSavingAsDraft: false,
            postSaving: false
          })
         }
     }
   }
 

   postTypeSelector = ()=>{
    if(!this.state.dummyPostCreated){
       return <>Loading Forms...</>
    }
    const CenteredGrid = styled(Grid)({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });

    const StyledIconButton = styled(IconButton)({
        width: "100%",
        height: "120px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "8px",
        border: "2px solid #ddd",
        backgroundColor: "#f9f9f9",
        transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          backgroundColor: "#e0e0e0",
          transform: "scale(1.05)", // Slightly enlarge the button on hover
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add a shadow effect
        },
        "& span": {
          marginTop: "8px",
          fontSize: "14px",
          fontWeight: "bold",
        },
      })
    return (
    <CenteredGrid container spacing={1}>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("text");
          }}
        >
          <TextFieldsIcon style={{ fontSize: 40, color: blue[500] }} />
          <span>Text</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("image");
          }}
        >
          <ImageIcon style={{ fontSize: 40, color: purple[500] }} />
          <span>Image</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("video");
          }}
        >
          <VideocamIcon style={{ fontSize: 40, color: red[500] }} />
          <span>Video</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("music");
          }}
        >
          <MusicNoteIcon style={{ fontSize: 40, color: green[500] }} />
          <span>Song</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("facebook");
          }}
        >
          <FacebookTwoTone style={{ fontSize: 40, color: blue[500] }} />
          <span>Link FB Video</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("tiktok");
          }}
        >
          <MusicNoteIcon style={{ fontSize: 40, color: "black" }} />
          <span>Link Tiktok Video</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("youtube");
          }}
        >
          <YouTube style={{ fontSize: 40, color: red[500] }} />
          <span>Link Youtube Video</span>
        </StyledIconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledIconButton
          onClick={() => {
            this.handlePostTypeSelect("twitter");
          }}
        >
          <X style={{ fontSize: 40, color: "black" }} />
          <span>Link X(twitter) Video</span>
        </StyledIconButton>
      </Grid>
    </CenteredGrid>
  );
   }

   renderForm = ()=>{
        const postType = this.state.postType
        if(postType === "image"){
            return <ImagePost post={this.state.post} 
                              setPostDescription={this.setPostDescription}
                              setPostTitle={this.setPostTitle}
                              changePostType={this.changePostType} 
                              savePost={this.savePost}
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              />
        }
        else if(postType === "music"){
            return <MusicPost post={this.state.post} 
                              setPostMedia={this.setPostMedia}
                              addMediaOnUpload={this.addMediaOnUpload}
                              removePostMedia={this.removePostMedia}
                              setPostDescription={this.setPostDescription}
                              setPostTitle={this.setPostTitle}
                              changePostType={this.changePostType}
                              savePost={this.savePost} 
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              />
        }
        if(postType === "video"){
            return <VideoPost post={this.state.post} 
                              setPostMedia={this.setPostMedia}
                              addMediaOnUpload={this.addMediaOnUpload}
                              removePostMedia={this.removePostMedia}
                              setPostDescription={this.setPostDescription}
                              setPostTitle={this.setPostTitle}
                              changePostType={this.changePostType}
                              savePost={this.savePost}
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              />
        }
        if(postType === "text"){
            return <TextPost  post={this.state.post} 
                              setPostDescription={this.setPostDescription}
                              setPostTitle={this.setPostTitle}
                              changePostType={this.changePostType} 
                              savePost={this.savePost}
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              />
        }
        return <EmbedPost   post={this.state.post}
                            setPostDescription={this.setPostDescription}
                            setPostTitle={this.setPostTitle} 
                            setPostEmbed={this.setPostEmbed}
                            changePostType={this.changePostType}
                            savePost={this.savePost}
                            action={this.state.action}
                            postSaved={this.state.postSaved}
                            postSavedAsDraft={this.state.postSavedAsDraft}
                            postSaving={this.state.postSaving}
                            postSavingAsDraft={this.state.postSavingAsDraft}
                            embedType={this.state.embedType}
                            />
   }

  async componentDidMount(){
       log(this.props.loggedInUser)
       const action = this.state.action
       log('what is the action here',action)
       const loggedInUserId = this.props.loggedInUser.user.id
       if(action === "create"){
          this.setState({
            loadingPost: false
          })
          // create a dummy post and set it to state
          const draftPostId = localStorage.getItem('draftPostId')
          if(!draftPostId){
            const data = {
                data: {
                    user: { connect : [loggedInUserId]}
                }
            }
            const post = await createNewPost(data)
            log('hit 2',post)
            if(post){
              localStorage.setItem('draftPostId',post.id) // save new draft post id to localstorage
            }
            // update the dashed title, such that even when published without a title, the post should be found
            const updatedDraftPostObject = {data:{ dashed_title: 'post-'+post.id}}
            const updatedDraftPost = await fetch(api_url+'/posts/'+post.id, {
                method: 'PUT',
                headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDraftPostObject)
            })
            .then(response => response.json())
            .then(data => data)
            if(updatedDraftPost){
                post.dashed_title = 'post-'+post.id // coz we have updated and added the dashed titile property
                this.setState({
                  post: post,
                  dummyPostCreated: true
                })
            }
          }
          else{
              const post = await getPostFromId(parseInt(draftPostId))
              log('in the post form',post)
              this.setState({
                 dummyPostCreated: true,
                 post:post
              })
          }
          
       }
       else{ // you are editing them, so get the post and edit it
           log('how is this not being hit')
           this.setState({
            loadingPost: true
           })
            const post = await getPostFromId(this.props.postId,"user,media,featuredImages")
            this.setState({
                post:post,
                dummyPostCreated: true,
                userSelectedPostType: true,
                loadingPost: false
            })
       }
   }

   changePostType = ()=>{
       this.setState({
          userSelectedPostType: false
       })
   }

   componentWillUnmount(){
     this.savePost(false) // save draft during the unmounting phase
   }


   renderPostForm = ()=>{
    // if(this.state.postSaving && !this.state.postSavingAsDraft){
    //   return <ContentLoader text="loading..."/>
    //  }
     return this.state.userSelectedPostType? this.renderForm() : this.postTypeSelector()
   }

   render(){
     return <>{this.state.loadingPost? <></> : this.renderPostForm()}</>
   }
  }