'use client'

import TextPostMedium from '../PostsDisplay/TextPostMedium'
import ImagePostMedium from '../PostsDisplay/ImagePostMedium'
import VideoPostMedium from '../PostsDisplay/VideoPostMedium'
import MusicPostMedium from '../PostsDisplay/MusicPostMedium'
import EmbedPostMedium from '../PostsDisplay/EmbedPostMedium'
import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay'
import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay'
import LikeButton from '@/components/Parts/EngageMents/LikeButton'
import ShareButton from '@/components/Parts/EngageMents/ShareButton'
import MoreContentLoader from '../Loader/MoreContentLoader'

export default function FeedLandScapeContentDisplay(props) {
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
  if(props.content.length === 0){ // then you have tried to load the content but nothing exists
    return <>no content found</>
  }
 
  return ( // display landscape content
    <div>
      {props.content.map((post) => {
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
     </div>
  )
}