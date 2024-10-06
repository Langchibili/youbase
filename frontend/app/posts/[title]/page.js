'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import SinglePostDisplay from '@/components/Includes/SinglePostDisplay/SinglePostDisplay'
import { checkUserLogginStatus } from '@/Constants'
import { useUser } from '@/Contexts/UserContext'
import { dynamicConfig, getPost, getPostUser } from '@/Functions'
import React, { useState, useEffect } from 'react'
// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Post({ params }) {
  const [post, setPost] = useState(null)
  const [postUser, setPostUser] = useState(null) // the post owner
  const loggedInUser = useUser() // get loggedInUser from the useUser context
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setPost(await getPost(params.title)) // the post without populating anything
        setPostUser( await getPostUser(params.title)) // the owner of the post
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
  

  return <SinglePostDisplay post={post} loggedInUser={loggedInUser} user={postUser}/>
}
