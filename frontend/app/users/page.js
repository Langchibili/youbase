'use client'

import UsersDisplay from '@/components/Includes/ContentDisplay/UsersDisplay'
import PageLoader from '@/components/Includes/Loader/PageLoader'
import { checkUserLogginStatus } from '@/Constants'
import { dynamicConfig } from '@/Functions'
//import { getUserById } from '@/Functions'
import React, { useState, useEffect } from 'react'

export const dynamic = dynamicConfig();
export default function User({ params }) {
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
             <div className="col-xl-9 col-lg-8">
             <div className="section3125">   
             <UsersDisplay 
                displayType = "normal"
                loggedInUser={loggedInUser} 
                contentUri={`/users?populate=profilePicture,details,socials,following,follows`}
                startPage="1"
                limit="10"
                sort="desc"
              />
             </div>
             </div>
             </div>
         </div>
     </div>
    </>
  )
}


