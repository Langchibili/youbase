'use client'

import React from "react"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import ImageIcon from "@mui/icons-material/Image"
import VideocamIcon from "@mui/icons-material/Videocam"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { blue, red, green, purple } from "@mui/material/colors"
import { styled } from "@mui/system";
import ImagePost from "./ImagePost"
import MusicPost from "./MusicPost"
import VideoPost from "./VideoPost"
import TextPost from "./TextPost"
import { createNewPost, generateDashedString, getPostFromId, getPostMedia, truncateText, validateUrl } from "@/Functions"
import { api_url, getFeature, getJwt, log } from "@/Constants"
import { FacebookTwoTone, Twitter, X, YouTube } from "@mui/icons-material"
import EmbedPost from "./EmbedPost"
import { useRouter } from "next/navigation"

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
         categoriesSet: false,
         loadingPost: true, 
         redirectUser: false,
         errorMessage: '',
         successMessage: '',
         openSnackBar: false,
         postHasImage: false,
         postHasSong: false,
         postHasVideo: false,
         mediaData: null,  // just for refrence within post form
         postUrlPath: "/"
      }
   }


   handleSnackBarClose = ()=>{
    this.setState({
      openSnackBar: false
    })
   }
   
   handleCategorySet = (set)=>{
    if(set){
       this.setState({
              categoriesSet: true
          })
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
          if(postToSaveObject.data && postToSaveObject.data.description && postToSaveObject.data.description.trim()){
            if(postToSaveObject.data.description.length > 0){ // only add an automated title if you at least added a description
              postToSaveObject.data.title = truncateText(postToSaveObject.data.description,100)
            }
          }
        } // otherwise the title has already been addeded by user
        if(action === "create"){ // only can be done once, never when editing
          postToSaveObject.data.type = this.state.postType
          if (this.state.postType === "text") {
            const description = postToSaveObject.data?.description
            if (!description || (typeof description === "string" && !description.trim())) {
              this.setState({
                errorMessage: 'cannot submit a blank post',
                successMessage: '',
                openSnackBar: true,
                postSaving: false
              })
              return
            }
          }
          if(this.state.postType === "embed"){
            const embedLink = postToSaveObject.data?.embedLink
            if(!embedLink || (typeof embedLink === "string" && !embedLink.trim())){
              this.setState({
                errorMessage: 'cannot submit a blank post',
                successMessage: '',
                openSnackBar: true,
                postSaving: false
              })
              return
            }
            if(validateUrl(embedLink)){
              this.setState({
                errorMessage: validateUrl(embedLink),
                successMessage: '',
                openSnackBar: true,
                postSaving: false
              })
              return
            }
            
            postToSaveObject.data.mediaSource = this.state.embedType // source not local
          }
          
          if(postToSaveObject.data.title !== "untitled" || postToSaveObject.data.title.trim().length > 0){ // this is significant in case of editing
            postToSaveObject.data.is_title_user_writted = true
          }
          // media type error checks
          if(this.state.postType === "music" && !postToSaveObject.data.is_title_user_writted){
            this.setState({
              errorMessage: 'song must have a title',
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return // cannot post song without title
          }
          if(this.state.postType === "music" && !this.state.mediaData){
            this.setState({
              errorMessage: '"music must have a song, upload a song',
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return // cannot post song without song file
          }
          if(this.state.postType === "music" && !this.state.categoriesSet){
            this.setState({
              errorMessage: 'add at least one genre',
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return // cannot post song without at least a genre
          }

          if(this.state.postType === "music"){
            const allowMultipleContentThumbnailUpload = await getFeature(8) // multiple feautred images upload feature
            const allowMultipleMusicUploadFeature = await getFeature(6) // multiple music upload feature
            const post = await getPostFromId(draftPostId,"media,featuredImages")
            const title = postToSaveObject.data?.title
            if (!title || (typeof title === "string" && !title.trim())) {
              if(!post.title || post.title === "untitled"){ // the draft saved post might have a title
                this.setState({
                  errorMessage: 'a song must have a title',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
             console.log('the post with a title',postToSaveObject.data)
            if(!allowMultipleMusicUploadFeature){
              if(post.media.data && post.media.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of music is not supported yet. Remove one and post.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
              if(post.featuredImages.data && post.featuredImages.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of thumbnails is not supported yet. Remove one and post.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
              if(!post.featuredImages || !post.featuredImages.data || post.featuredImages.data.length === 0){
                this.setState({
                  errorMessage: 'please upload a music thumbnail or music art.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
            if(!allowMultipleContentThumbnailUpload){
              if(post.featuredImages && post.featuredImages.data && post.featuredImages.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of music art is not supported yet. Remove one and post.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
          }

          if(this.state.postType === "video" && !this.state.mediaData){
            this.setState({
              errorMessage: 'you must upload a video',
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return // cannot post video without a video file
          }
          if(this.state.postType === "video" && !this.state.categoriesSet){
            this.setState({
              errorMessage: 'add at least one category',
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return // cannot post video without at least a category
          }
          if(this.state.postType === "video"){
            const allowMultipleContentThumbnailUpload = await getFeature(8) // multiple feautred images upload feature
            const allowMultipleVideosUploadFeature = await getFeature(7) // multiple vidoes upload feature
            if(!allowMultipleVideosUploadFeature){ 
              const post = await getPostFromId(draftPostId,"media,featuredImages")
              if(post.media && post.media.data && post.media.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of videos is not supported yet. Remove one and post.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
            if(!allowMultipleContentThumbnailUpload){
              const post = await getPostFromId(draftPostId,"featuredImages")
              if(post.featuredImages && post.featuredImages.data && post.featuredImages.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of music art is not supported yet. Remove one and post.',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
          }

          if(this.state.postType === "image"){
            const post = await getPostFromId(draftPostId,"featuredImages")
            if(!post.featuredImages || !post.featuredImages.data || post.featuredImages.data.length === 0){
              this.setState({
                errorMessage: 'Upload an image to post.',
                successMessage: '',
                openSnackBar: true,
                postSaving: false
              })
              return
            }
            const allowMultipleContentThumbnailUpload = await getFeature(8) // multiple feautred images upload feature
            if(!allowMultipleContentThumbnailUpload){
              if(post.featuredImages && post.featuredImages.data && post.featuredImages.data.length > 1){
                this.setState({
                  errorMessage: 'multiple upload of music art is not supported yet. Remove one and post',
                  successMessage: '',
                  openSnackBar: true,
                  postSaving: false
                })
                return
              }
            }
          }
          if(!this.shouldPostBeCreated(draftPostId)){
            let errorMessage = ''
            if(this.state.postHasImage){
              errorMessage = 'This post already has an image, go back and publish it as an image or clear it and post another one'
            }
            if(this.state.postHasSong){
              errorMessage = 'This post already has a song, go back and publish it as a song or clear it and post another one'
            }
            if(this.state.postHasVideo){
              errorMessage = 'This post already has a video, go back and publish it as a video or clear it and post another one'
            }
            this.setState({
              errorMessage: errorMessage,
              successMessage: '',
              openSnackBar: true,
              postSaving: false
            })
            return
          }
          // now the upload logic
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
            if(postToSaveObject.data && postToSaveObject.data.description && !postToSaveObject.data.description.trim()){
              if(postToSaveObject.data.description.length < 0){
                postToSaveObject.data.description = ""
              }
            }
            else{
              if (this.state.postType === "text") {
                const description = postToSaveObject.data?.description
                if (!description || (typeof description === "string" && !description.trim())) {
                  this.setState({
                    errorMessage: 'cannot submit a blank post',
                    successMessage: '',
                    openSnackBar: true,
                    postSaving: false
                  })
                  return
                }
              }
              // console.log(postToSaveObject.data.description.trim())
              if(postToSaveObject.data && postToSaveObject.data.description && postToSaveObject.data.description.trim()){
                 postToSaveObject.data.dashed_title = generateDashedString(postToSaveObject.data.description) + "-" + draftPostId
              }
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
      if(postToSaveObject.data.status === "published"){
         const postsCount = (this.props.loggedInUser.user.postsCount || 1)
         postToSaveObject.data.postCount = postsCount + 1
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
              errorMessage: '',
              successMessage: 'Post Published!',
              openSnackBar: true,
              postSavedAsDraft: false,
              postSavingAsDraft: false,
              postSaving: false,
              action: "edit",
              postUrlPath: "/posts/"+response.data.attributes.dashed_title
            },()=>{
              this.setState({
                 redirectUser: true,
              },()=>{
                this.props.handlePostModalClose()
              })
            })
         }
         else{
          this.setState({
            postSaved: true,
            errorMessage: '',
            successMessage: 'Draft Saved!',
            openSnackBar: true,
            postSavedAsDraft: true,
            postSavingAsDraft: false,
            postSaving: false
          })
         }
     }
   }
  
   shouldPostBeCreated = async (draftPostId)=>{
          const post = await getPostFromId(draftPostId,"media,featuredImages")
          let postHasImage = false
          let postHasVideo = false
          let postHasSong = false
          
          if(!post){
            return false
          }
          if(post.featuredImages.data){ // means this post has an image already added to it
              postHasImage = true
          }
          if(post.media.data){ // means this post has a video or song already added to it
            if(post.media.data[0].attributes.mime.startsWith('video/')){
              postHasVideo = true
            }
            else{
              postHasSong = true
            }
          }
          if(this.props.action === "create" && this.state.postType !== "image" && postHasImage){
            this.setState({
              postHasImage: true
            })
            return false
          }
          if(this.props.action === "create" && this.state.postType !== "music" && postHasSong){
            this.setState({
              postHasSong:true
            })
            return false
          }
          if(this.props.action === "create" && this.state.postType !== "video" && postHasVideo){
            this.setState({
              postHasVideo:true
            })
            return false
          }
          return true
   }

   isCreateDisabled = (postType)=>{
    console.log(this.state.postType, this.props.action, this.state.postHasImage, this.state.postHasSong, this.state.postHasVideo)
    if(this.props.action === "edit" && this.state.postType !== postType){
      return true
    }
    if(this.props.action === "edit" && this.state.postType === "embed" && this.props.post.mediaSource !== "youtube"){
      return true
    }
    if(this.props.action === "edit" && this.state.postType === "embed" && this.props.post.mediaSource !== "facebook"){
      return true
    }
    if(this.props.action === "edit" && this.state.postType === "embed" && this.props.post.mediaSource !== "tiktok"){
      return true
    }
    return false
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
      console.log(this.props.action,this.props )
    return (
    <CenteredGrid container spacing={1}>
      <Grid item xs={6}>
        <StyledIconButton
          disabled={this.isCreateDisabled("text")}
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
          disabled={this.isCreateDisabled("image")}
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
          disabled={this.isCreateDisabled("video")}
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
          disabled={this.isCreateDisabled("music")}
          onClick={() => {
            this.handlePostTypeSelect("music");
          }}
        >
          <MusicNoteIcon style={{ fontSize: 40, color: green[500] }} />
          <span>Song</span>
        </StyledIconButton>
      </Grid>
      {/* for embeds check the mediaSource attribute to see if it's the one being edited */}
      <Grid item xs={6}>
        <StyledIconButton
          disabled={this.isCreateDisabled("youtube")}
          onClick={() => {
            this.handlePostTypeSelect("youtube");
          }}
        >
          <YouTube style={{ fontSize: 40, color: red[500] }} />
          <span>Link Youtube Video</span>
        </StyledIconButton>
      </Grid>
      {/* for now facebook,tiktok and twitter embeds are disabled until implemented */}
      <Grid item xs={6}>
        <StyledIconButton
          disabled={true}
          // disabled={this.isCreateDisabled("facebook")}
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
        disabled={true}
          // disabled={this.isCreateDisabled("tiktok")}
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
          disabled={true}
          // disabled={this.props.action === "edit" && this.props.post.mediaSource !== "twitter"}
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
                              handlePostModalClose={this.props.handlePostModalClose}
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
                              handleCategorySet={this.handleCategorySet}
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              handlePostModalClose={this.props.handlePostModalClose}
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
                              handleCategorySet={this.handleCategorySet}
                              action={this.state.action}
                              postSaved={this.state.postSaved}
                              postSavedAsDraft={this.state.postSavedAsDraft}
                              postSaving={this.state.postSaving}
                              postSavingAsDraft={this.state.postSavingAsDraft}
                              handlePostModalClose={this.props.handlePostModalClose}
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
                              handlePostModalClose={this.props.handlePostModalClose}
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
                            handlePostModalClose={this.props.handlePostModalClose}
                            />
   }

  async componentDidMount(){
     if(typeof document !== "undefined"){
        const musicPlayer = document.getElementById('music-player-controller')
        if(musicPlayer){
          musicPlayer.style.display = "none"
        }
      }
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
                const post = await getPostFromId(parseInt(draftPostId),"media,featuredImages")
                if(!post){
                  localStorage.removeItem('draftPostId') // remove the draft post id bacause draft post doesn't exist anymore
                  this.props.handlePostModalClose() // close the modal
                }
                log('in the post form create phase',post)
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
     if(typeof document !== "undefined"){
      const musicPlayer = document.getElementById('music-player-controller')
      if(musicPlayer){
         musicPlayer.style.display = "block"
      }
    }
   }


   renderPostForm = ()=>{
    // if(this.state.postSaving && !this.state.postSavingAsDraft){
    //   return <ContentLoader text="loading..."/>
    //  }
     return this.state.userSelectedPostType? this.renderForm() : this.postTypeSelector()
   }

   render(){
     if(this.state.redirectUser){
      return <RedirectUser url={this.state.postUrlPath}/>
     }
     return <>{this.state.loadingPost? <></> : <>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={this.state.postSaved && this.state.openSnackBar}
                  autoHideDuration={6000}
                  message="Cannot submit blank post"
                  onClose={this.handleSnackBarClose}
                >
                  <Alert
                    onClose={this.handleSnackBarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                  {this.state.successMessage}
                </Alert>
               </Snackbar>

               <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={this.state.errorMessage && this.state.openSnackBar}
                  autoHideDuration={6000}
                  message="Cannot submit blank post"
                  onClose={this.handleSnackBarClose}
                >
                  <Alert
                    onClose={this.handleSnackBarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                  {this.state.errorMessage}
                </Alert>
               </Snackbar>
               
             {this.renderPostForm()}
             </>}
          </>
   }
  }

 
 const RedirectUser = ({ url }) => {
    const router = useRouter();
  
    React.useEffect(() => {
      router.push(url); // Redirect automatically when the component mounts
    }, [router, url]);
  
    return null; // Nothing visible on the screen
  };