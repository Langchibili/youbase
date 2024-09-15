'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import VideoDisplay from '@/components/Includes/VideoDisplay/VideoDisplay'
import { checkUserLogginStatus } from '@/Constants'
import { getPostFromId } from '@/Functions'
import React, { useState, useEffect } from 'react'

export default function VideoDs({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostFromId(params.postid,"media,featuredImages,user")
      console.log(post)
      try {
        setPost(await getPostFromId(params.postid,"media,featuredImages,user")) // the post without populating anything
        setLoggedInUser(await checkUserLogginStatus() ) // the loggedInUser
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.postid])

  if (loading) {
    return <PageLoader/>
  }

  if (!post) {
    return <ContentNotFound />
  }

  return <VideoDisplay  post={post} loggedInUser={loggedInUser}/>
}
