'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import UserProfileDisplay from '@/components/Includes/UserProfileDisplay/UserProfileDisplay'
import { checkUserLogginStatus } from '@/Constants'
import { getUserFromUsername } from '@/Functions'
import React, { useState, useEffect } from 'react'

export default function User({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(await getUserFromUsername(params.videoid,"profilePicture,details,socials")) // the post without populating anything
        setLoggedInUser(await checkUserLogginStatus() ) // the loggedInUser
    } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])

  if (loading) {
    return <PageLoader/>
  }

  if (!user) {
    return <ContentNotFound />
  }

  return <UserProfileDisplay  user={user} loggedInUser={loggedInUser} thisIsMyAccount={loggedInUser.user.id === user.id}/>
}
