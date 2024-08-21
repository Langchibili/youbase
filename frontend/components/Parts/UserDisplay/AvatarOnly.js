'use client'

import { getImage, getUserById } from "@/Functions"
import Link from "next/link"
import React from "react"

export default class AvatarOnly extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        avatarLoaded: false,
        user: null
      }
   }

  async componentDidMount(){
        const user = await getUserById(this.props.userId,"profilePicture")
        this.setState({
            user: user,
            avatarLoaded: true
        })
  }      

   render(){
    return (
           !this.state.avatarLoaded? <></> :
           <Link href={'/user/'+this.state.user.username}>
            <div className="user_img5">
                    <img src={getImage(this.state.user.profilePicture,'thumbnail','profilePicture') } alt="profile pic" />
            </div>
           </Link>
           
    )
   }
  }