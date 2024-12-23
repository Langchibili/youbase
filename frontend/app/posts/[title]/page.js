'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import SinglePostDisplay from '@/components/Includes/SinglePostDisplay/SinglePostDisplay'
import { useUser } from '@/Contexts/UserContext'
import { dynamicConfig, getPost, getPostFromId } from '@/Functions'
import React, { useState, useEffect } from 'react'
// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

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
    return <PageLoader/>
  }

  if (!post) {
    return <ContentNotFound />
  }

  if (!post.status) {
    return <ContentNotFound />
  }
  
  if (post.status === "draft") {
    return <ContentNotFound />
  }
  

  return <SinglePostDisplay post={post} loggedInUser={loggedInUser}/>
}
