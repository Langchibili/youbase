'use client'


import PageLoader from '@/components/Includes/Loader/PageLoader'
import { checkUserLogginStatus } from '@/Constants'
import { dynamicConfig } from '@/Functions';
//import { getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Music({ params }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
 // const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await checkUserLogginStatus() // the loggedInUser 
       // setUser(await getUserById(loggedInUser.user.id,"profilePicture,details,socials")) // the post without populating anything
        setLoggedInUser(loggedInUser) // the loggedInUser   
    } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])
 
  if (loading) {
    return <PageLoader/>
  }
  
  return ( 
    <>
     <div className="sa4d25">
         <div className="container-fluid">
         <div className="row">
             categories
         </div>
         </div>
     </div>
    </>
  )
}


