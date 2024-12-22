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

export default function LandscapeContent(props) {
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
  if(props.content.length === 0){ // then you have tried to load the content but nothing exists
    return <>no content found</>
  }
 
  return ( // display landscape content
    <div>
      {props.content.map((post) => {
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
    </div>
  )
}
