'use client'

import { useState, useEffect } from 'react'
import { api_url, log } from '@/Constants'
import { getUsers } from '@/Functions'
import UserMiniProfileDisplay from '../UserProfileDisplay/UserMiniProfileDisplay'
import ContentLoader from '../Loader/ContentLoader'

export default function UsersDisplay(props) {
  const [usersMeta, setUsersMeta] = useState(null)
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(parseInt(props.startPage))
  const [loading, setLoading] = useState(true)

//   const loadMoreUsers = async () => {
//     try {
//       if(loading) {
//         return
//       }
//       setLoading(true) 
//       const requestUri = `${api_url}${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`
//       const newUsers = await getUsers(requestUri)
//       if(newUsers){
//         if (newUsers.length > 0) {
//           setUsers(prevUsers => [...prevUsers, ...newUsers]) // Avoid mutating the original array
//           setPage(prevPage => prevPage + 1)
//           setLoading(false)
//         }
//         else{
//           setLoading(true)
//         }
//       }
//       else{
//         setLoading(true)
//       }
//     } catch (error) {
//       console.error('Error loading posts:', error)
//       setLoading(false)
//     }
//   }

  useEffect(() => {
     const runAsyncUsersGetFunctions = async ()=>{
    //     if(!loading && users.length > 0 && page !== NaN){
    //       if(page === usersMeta.pagination.pageCount){
    //         setLoading(true)
    //         return 
    //       }
    //       loadMoreUsers() // means they are still more posts, so load more
    //    }
    //    else{
         
    //    }
        if(users.length === 0){
            const requestUri = `${api_url}${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`
            const initialUsers = await getUsers(requestUri)
            if(initialUsers){
                console.log(initialUsers)
            if(initialUsers && initialUsers.length > 0){
                // setUsersMeta(initialUsers.meta)
                setUsers(initialUsers)
                // setPage(prevPage => prevPage + 1)
                setLoading(false)
            }
            }
            else{
            return
            }
        }
      }
      runAsyncUsersGetFunctions()
    
  }, [page])

  const renderUsersCarousel = (user) => {
    console.log(user)
  }

  if(!loading && users.length === 0){ // then you have tried to load the content but nothing exists
    return <>no users found</>
  }
  if(props.displayType === "carousel"){
     return renderUsersCarousel()
  }
  return (
    <div>
      {users.map((user) => {
        const thisIsMyAccount= props.loggedInUser.user.id === user.id
        return <UserMiniProfileDisplay  user={user} loggedInUser={props.loggedInUser} thisIsMyAccount={thisIsMyAccount}/>
      })}
      {/* {loading && page !== usersMeta?.pagination.pageCount && <div>Loading more users...</div> /* means you have already loaded initial posts */}
      {loading && <ContentLoader /> /* means you have already loaded initial posts */}
    </div>
  )
}
