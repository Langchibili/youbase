'use client'

import ContentNotFound from '@/components/Includes/ContentNotFound/ContentNotFound'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import NoContent from '@/components/Includes/NoContent/NoContent'
import PostPageSkeleton from '@/components/Includes/Skeletons/PostPageSkeleton'
import UserProfileDisplay from '@/components/Includes/UserProfileDisplay/UserProfileDisplay'
import { checkUserLogginStatus } from '@/Constants'
import { dynamicConfig, getUserFromUsername } from '@/Functions'
import React, { useState, useEffect } from 'react'

export const dynamic = dynamicConfig();
export default function User({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(await getUserFromUsername(params.username,"profilePicture,details,socials")) // the post without populating anything
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
    return <><PageLoader/><PostPageSkeleton/></>
  }

  if (!user) {
    return <div style={{padding:'10px'}}><NoContent message="User Not Found"/></div>
  }

  return <UserProfileDisplay  user={user} loggedInUser={loggedInUser} thisIsMyAccount={loggedInUser.user.id === user.id}/>
}
