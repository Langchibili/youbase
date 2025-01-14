'use client'

import ContentDisplaySection from '@/components/Includes/ContentDisplay/ContentDisplaySection'
import UsersMiniDisplay from '@/components/Includes/ContentDisplay/UsersMiniDisplay'
import { api_url } from '@/Constants'
import { useUser } from '@/Contexts/UserContext'
import React from 'react'

export default function Users() {
  const loggedInUser = useUser()
 
  return ( 
    <>
     <div className="sa4d25">
         <div className="container-fluid">
         <div className="row">
             <div className="col-xl-9 col-lg-8">
             <div className="section3125">   
              <ContentDisplaySection
                loggedInUser={loggedInUser}
                customPagination={true}
                contentDisplay={(props) =><UsersMiniDisplay users={props.content} loggedInUser={loggedInUser} />}
                contentUri={`${api_url}/filtered-users`}
                limit={10}
                contentQueryFilters="populate=details&sort=id:desc"     
              />
             </div>
             </div>
             </div>
         </div>
     </div>
    </>
  )
}
