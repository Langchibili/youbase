'use client'

import React from "react"
import AvatarOnly from "./AvatarOnly"
import UserFollowingButtons from "../UserActionButtons/UserFollowingButtons"
import Link from "next/link"
import { truncateText } from "@/Functions"

export default class AvatarWithFollowButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {}
   }
   
   render(){
    return ( 
        <div className="live_user_dt">
            <AvatarOnly {...this.props} userId={this.props.user.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+this.props.user.username}>   
            {!this.props.user.details? <h4>Unnamed User</h4> : <h4>{truncateText(this.props.user.details.firstname+" "+this.props.user.details.lastname,20)}</h4>}
            </Link>
            <UserFollowingButtons {...this.props} userId={this.props.user.id}/>
            </div>
        </div>
    )
   }
  }