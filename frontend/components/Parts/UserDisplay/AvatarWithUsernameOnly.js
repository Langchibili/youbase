'use client'

import { getImage, getUserById, truncateText } from "@/Functions"
import Link from "next/link"
import React from "react"

export default class AvatarWithUsernameOnly extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        avatarLoaded: false,
        user: null
      }
   }
   renderUserName = ()=>{
    const textColor = this.props.textColor? this.props.textColor: ''
    return !this.state.user.details? <h6 style={{color:textColor}}>Unnamed User</h6> : <h6 style={{color:textColor}}>{truncateText(this.state.user.details.firstname+" "+this.state.user.details.lastname,20)}</h6>
   }
  async componentDidMount(){
        const user = await getUserById(this.props.userId,"profilePicture,details")
        this.setState({
            user: user,
            avatarLoaded: true
        })
  }      

   render(){
    if(!this.state.avatarLoaded){
        return <></>
    }
    return(<div className="live_user_dt" style={{color:'GrayText'}}> 
                <Link href={'/user/'+this.state.user.username} style={{fontSize:'smaller'}}>
                    <div className="menu--link user_img">
                            <img id="comments-avatar" src={getImage(this.state.user.profilePicture,'thumbnail','profilePicture') } alt="profile pic" style={{width:'24px !important', height:'24px !important',...this.props.exra_styles}}/>
                    </div>
                </Link>
                <Link href={'/user/'+this.state.user.username} style={{color:'GrayText'}}>   
                    {this.renderUserName()}
               </Link>
               {this.props.postMoreContent()}
          </div>)
   }
  }
