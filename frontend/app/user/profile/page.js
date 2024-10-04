'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import LogInFirstModal from '@/components/Includes/Modals/LogInFirstModal'
import UserProfileDisplay from '@/components/Includes/UserProfileDisplay/UserProfileDisplay'
import { checkUserLogginStatus } from '@/Constants'
import { dynamicConfig, getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

export const dynamic = dynamicConfig();
export default function User({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await checkUserLogginStatus() // the loggedInUser 
        setUser(await getUserById(loggedInUser.user.id,"profilePicture,details,socials")) // the post without populating anything
        setLoggedInUser(loggedInUser) // the loggedInUser   
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
  if(!loggedInUser.status){
    return <LogInFirstModal open={true} />
  }
  if (!user) {
    return <ContentNotFound />
  }

  return <UserProfileDisplay  user={user} loggedInUser={loggedInUser}/>
}
