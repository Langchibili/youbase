'use client'

import { useState, useEffect } from 'react'
import TextPostMedium from '../PostsDisplay/TextPostMedium'
import ImagePostMedium from '../PostsDisplay/ImagePostMedium'
import VideoPostMedium from '../PostsDisplay/VideoPostMedium'
import MusicPostMedium from '../PostsDisplay/MusicPostMedium'
import EmbedPostMedium from '../PostsDisplay/EmbedPostMedium'
import { api_url } from '@/Constants'
import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay'
import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay'
import LikeButton from '@/components/Parts/EngageMents/LikeButton'
import ShareButton from '@/components/Parts/EngageMents/ShareButton'
import PortraitContentDisplay from './PortraitContentDisplay'
import { getPosts } from '@/Functions'
import MoreContentLoader from '../Loader/MoreContentLoader'

export default function ContentDisplay(props) {
  const [postsMeta, setPostsMeta] = useState(null)
  const [posts, setPosts] = useState([])
  const [portraitContent, setPortraitContent] = useState([])
  const [page, setPage] = useState(parseInt(props.startPage))
  const [loading, setLoading] = useState(true)

  const loadMorePosts = async () => {
    try {
      if(loading) {
        return
      }
      setLoading(true) 
      const requestUri = `${api_url}${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`
      const newPosts = await getPosts(requestUri)
      if(newPosts){
        console.log('new posts',newPosts)
        if (newPosts.length > 0) {
          setPosts(prevPosts => [...prevPosts, ...newPosts]) // Avoid mutating the original array
          setPage(prevPage => parseInt(prevPage) + 1)
          setLoading(false)
        }
        else{
          setLoading(true)
        }
      }
      else{
        setLoading(true)
      }
    } catch (error) {
      console.error('Error loading posts:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
     const runAsyncPostGetFunctions = async ()=>{
        if(!loading && posts.length > 0 && !isNaN(page)){
          if(page > postsMeta.pagination.pageCount){
            setLoading(true)
            return 
          }
          if(props.contentLimit){
            if(portraitContent.length > parseInt(props.contentLimit)){ 
                setLoading(true)
                return
              }
          }
          
          const newPortraitContent = posts.filter((post) => {
            if(!post.attributes || !post.attributes.type || post.attributes.status !== 'published'){
              return false
            }
            if(props.contentToView === "portrait-videos" && post.attributes.type === 'image'){
               return false
            }
            if(props.contentToView === "portrait-images" && post.attributes.type === 'video'){
              return false
            }
            if(post.attributes.type !== 'music' && post.attributes.type !== 'text' && !post.attributes.type !== 'embed'){
              return !post.attributes.mediaDisplayType || post.attributes.mediaDisplayType !== 'landscape'
           }
          })
          setPortraitContent(newPortraitContent)
          loadMorePosts() // means they are still more posts, so load more
       }
       else{
         if(posts.length === 0){
            const requestUri = `${api_url}${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`
            const initialPosts = await getPosts(requestUri,true)
            if(initialPosts){
              if(initialPosts.data && initialPosts.data.length > 0){
                setPostsMeta(initialPosts.meta)
                setPosts(initialPosts.data)
                setPage(prevPage => parseInt(prevPage) + 1)
                setLoading(false)
                console.log('initial posts',initialPosts)
              }
            }
            else{
              return
            }
         }
       }
      }
      runAsyncPostGetFunctions()
    
  }, [page,loading])

  const renderPostContent = (post, postEngagementsDisplay) => {
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
          {post.type === 'video' && <ViewsDisplay post={post} user={post.user.data.attributes} {...props} />}
        </ul>
        <ul>
          {post.type === 'music' && <StreamsDisplay post={post} user={post.user.data.attributes} {...props} />}
        </ul>
        <ul>
          <LikeButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
        <ul>
          <ShareButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
      </div>
    )
  }
  if(!loading && posts.length === 0){ // then you have tried to load the content but nothing exists
    return <>no content found</>
  }
  if (props.contentToView === 'portrait-videos' || props.contentToView === 'portrait-images') { // filter out portrait content
    console.log('portrait content 1', portraitContent)
    if(props.contentLimit){
        let portraitContentToDisplay = portraitContent
        if(portraitContent.length > props.contentLimit){ 
        portraitContentToDisplay = portraitContent.slice(0,props.contentLimit)
        }
        console.log('portrait portraitContentToDisplay', portraitContentToDisplay)
        return <PortraitContentDisplay content={portraitContentToDisplay} loggedInUser={props.loggedInUser} />
    }
    else{
        return <PortraitContentDisplay content={portraitContent} loggedInUser={props.loggedInUser} />
    }
  }
  return ( // display landscape content
    <div>
      {posts.map((post) => {
        const postAttributes = post.attributes
        if(!postAttributes) { 
          return null 
        }
        if (!postAttributes.user || postAttributes.status !== 'published') { 
          return null 
        }
        // only show landscape images and videos here
        if(postAttributes.type === 'image' || postAttributes.type === 'video'){
          if(!postAttributes.mediaDisplayType || postAttributes.mediaDisplayType !== 'landscape'){
              return null
          }
        }
        
        postAttributes.id = post.id
          
        return (
          <div key={post.id} id={"post-"+post.id}>
            {renderPostContent(postAttributes, postEngagementsDisplay)}
          </div>
        )
      })}
      {loading && props.contentToView === "all" && page < postsMeta?.pagination.pageCount && <MoreContentLoader/> /* means you have already loaded initial posts */}
    </div>
  )
}
