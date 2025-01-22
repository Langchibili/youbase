'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import NoContent from '@/components/Includes/NoContent/NoContent'
import SinglePostDisplay from '@/components/Includes/SinglePostDisplay/SinglePostDisplay'
import PostPageSkeleton from '@/components/Includes/Skeletons/PostPageSkeleton'
import { useUser } from '@/Contexts/UserContext'
import { dynamicConfig, getPost, getPostFromId } from '@/Functions'
import React, { useState, useEffect } from 'react'

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig()
export default function Post({ params }) {
  const [post, setPost] = useState(null)
  const loggedInUser = useUser() // get loggedInUser from the useUser context
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(params.title)
        const postWithMedia = await getPostFromId(post.id,"user,featuredImages,media") // get all the media because even if the post is a text, it's populated parts will be null
        setPost(postWithMedia) // the post without populating anything
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.title])

  if (loading) {
    return <><PageLoader/><PostPageSkeleton onSinglePostDisplayPage={true}/></>
  }

  if (!post) {
    return <div style={{padding:'10px'}}><NoContent message="Post Not Found"/></div>
  }

  if (!post.status) {
    return <div style={{padding:'10px'}}><NoContent message="Post Not Found"/></div>
  }
  
  if (post.status === "draft") {
    return <div style={{padding:'10px'}}><NoContent message="Post Not Found"/></div>
  }
  

  return <SinglePostDisplay post={post} loggedInUser={loggedInUser}/>
}
