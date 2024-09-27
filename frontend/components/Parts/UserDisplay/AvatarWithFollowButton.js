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
   renderUserName = ()=>{
   
    const textColor = this.props.textColor? this.props.textColor: ''
    return !this.props.user.details? <h4 style={{color:textColor}}>Unnamed User</h4> : <h4 style={{color:textColor}}>{truncateText(this.props.user.details.firstname+" "+this.props.user.details.lastname,20)}</h4>
   }
   render(){
    return ( 
        this.props.shiftAvatarDisplay? <div className="live_user_dt">
            <div className="user_cntnt" style={{marginRight:'10px'}}>
            <Link href={'/user/'+this.props.user.username}>   
            {this.renderUserName()}
            </Link>
            <UserFollowingButtons {...this.props} userId={this.props.user.id}/>
            </div>
            <AvatarOnly {...this.props} userId={this.props.user.id}/>
        </div> : 
        <div className="live_user_dt">
            <AvatarOnly {...this.props} userId={this.props.user.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+this.props.user.username}>   
            {this.renderUserName()}
            </Link>
            <UserFollowingButtons {...this.props} userId={this.props.user.id}/>
            </div>
        </div>
    )
   }
  }