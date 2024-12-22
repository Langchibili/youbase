'use client'

import { useState, useEffect } from 'react'
import TextPostMedium from '../PostsDisplay/TextPostMedium'
import ImagePostMedium from '../PostsDisplay/ImagePostMedium'
import VideoPostMedium from '../PostsDisplay/VideoPostMedium'
import MusicPostMedium from '../PostsDisplay/MusicPostMedium'
import EmbedPostMedium from '../PostsDisplay/EmbedPostMedium'
import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay'
import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay'
import LikeButton from '@/components/Parts/EngageMents/LikeButton'
import ShareButton from '@/components/Parts/EngageMents/ShareButton'
import PortraitContentDisplay from './PortraitContentDisplay'
import { getUserById } from '@/Functions'
import MoreContentLoader from '../Loader/MoreContentLoader'



// display of posts by now will be the users with the highest engagement first
// totalEngagement will be the user field we are interested in
// if you have seen a post, we shall not show you the post again, unless you go to the user's post page


export default function FeedContentDisplay(props) {
  const [posts, setPosts] = useState([])
  const [portraitContent, setPortraitContent] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    console.log('effect runs though')
     const runAsyncFeedGet = async ()=>{
            const feed = await getUserById(props.loggedInUser.user.id,"following.posts.user,following.posts.featuredImages,following.posts.media")
            console.log('feed',feed)
            if(feed){
              const posts = feed.following.map((user)=>{
                  return user.posts
              })
              if(posts && posts.length > 0){
                  setPosts(posts)
                  if(props.contentLimit){
                      if(portraitContent.length > parseInt(props.contentLimit)){ 
                        setLoading(true)
                        return
                      }
                  }
                  
                  const newPortraitContent = posts.filter((post) => {
                    if(!post || !post.type || post.status !== 'published'){
                      return false
                    }
                    if(props.contentToView === "portrait-videos" && post.type === 'image'){
                       return false
                    }
                    if(props.contentToView === "portrait-images" && post.type === 'video'){
                      return false
                    }
                    if(post.type !== 'music' && post.type !== 'text' && !post.type !== 'embed'){
                      return !post.mediaDisplayType || post.mediaDisplayType !== 'landscape'
                   }
                  })
                  if(newPortraitContent.length === 0){
                    if(props.contentToView === "portrait-videos"){
                      props.setFeedHasReels(false)
                    }
                    if(props.contentToView === "portrait-images"){
                      props.setFeedHasCaptures(false)
                    }
                  }
                  setPortraitContent(newPortraitContent)
                  setLoading(false)
                  console.log('feed posts',posts)
              }
              else{
                if(props.setFeedHasExplore){
                  props.setFeedHasExplore(false)
                }
                setLoading(false)
                return
              }
            }
            else{
              setLoading(false)
              return
            }
    }    
    runAsyncFeedGet()
  }, [])

  const renderPostContent = (post, postEngagementsDisplay) => {
    if(post.type === "music" || post.type === "video"){
      if(!post.media){
        return null
      }
    }
    if(post.type === "image"){
      if(!post.featuredImages){
        return null
      }
    }
    switch (post.type) {
      case 'text':
        return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />
      case 'image':
        return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />
      case 'video':
        return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />
      case 'music':
        return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />
      case 'embed':
        return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />
      default:
        return null
    }
  }

  const postEngagementsDisplay = post => {
    return (
      <div className='inline-engagements-display'>
        <ul>
          {post.type === 'video' && <ViewsDisplay post={post} user={post.user} {...props} />}
        </ul>
        <ul>
          {post.type === 'music' && <StreamsDisplay post={post} user={post.user} {...props} />}
        </ul>
        <ul>
          <LikeButton post={post} user={post.user} {...props} />
        </ul>
        <ul>
          <ShareButton post={post} user={post.user} {...props} />
        </ul>
      </div>
    )
  }
  if(!loading && posts.length === 0){ // then you have tried to load the feed but nothing exists
    return <></>
  }
  if (props.contentToView === 'portrait-videos' || props.contentToView === 'portrait-images') { // filter out portrait content
    if(props.contentToView){
        let portraitContentToDisplay = portraitContent
        if(portraitContent.length > props.contentLimit){ 
          portraitContentToDisplay = portraitContent.slice(0,props.contentLimit)
        }
        console.log('feed portrait portraitContentToDisplay', portraitContentToDisplay)
        return <PortraitContentDisplay content={portraitContentToDisplay} loggedInUser={props.loggedInUser} />
    }
    else{
        return <PortraitContentDisplay content={portraitContent} loggedInUser={props.loggedInUser} />
    }
  }
  return ( // display landscape content
    <div>
      {posts.map((post) => {
        if(!post) { 
          return null 
        }
        if (!post.user || post.status !== 'published') { 
          return null 
        }
        // only show landscape images and videos here
        if(post.type === 'image' || post.type === 'video'){
          if(!post.mediaDisplayType || post.mediaDisplayType !== 'landscape'){
              return null
          }
        }
        if(post.media){ // structure the data such that it can be read by children components
          if(!post.media.hasOwnProperty('data')){
              post.media.data = post.media
          }
        }
        if(post.featuredImages){ // structure the data such that it can be read by children components
            if(!post.featuredImages.hasOwnProperty('data')){
                post.featuredImages.data = post.featuredImages
            }
        }
        if(post.user){ // structure the data such that it can be read by children components
            if(!post.user.hasOwnProperty('data')){
                post.user.data = post.user
                post.user.data.id = post.user.id
                post.user.data.attributes = post.user.data
                post.user.data.attributes.id = post.user.data.id
            } 
        }
        return (
          <div key={post.id} id={"post-"+post.id}>
            {renderPostContent(post,postEngagementsDisplay)}
          </div>
        )
      })}
      {loading? <MoreContentLoader/> : <></> /* means you have already loaded initial posts */}
    </div>
  )
}
