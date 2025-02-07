'use client'

import { useSearchModalOpen } from "@/Contexts/SearchModalContext"
import { getImage, getUserById } from "@/Functions"
import { Skeleton } from "@mui/material"
import Link from "next/link"
import React from "react"

export default class AvatarOnly extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        avatarLoaded: false,
        redirectUser: false,
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
  
  renderAvatar = ()=>{
     if(!this.state.user){ 
      return <img style={{width:'36px !important', height:'36px !important'}} src={getImage(this.state.user,'thumbnail','profilePicture')} />
     }
     if(!this.props.profileOnly){
      return (!this.state.avatarLoaded? <></> :
         <Link href={'/user/'+this.state.user.username} onClick={(event) => {
            event.stopPropagation(); // Prevent parent click handler
            this.setState({redirectUser:true}) 
           }}>
         <div className={this.props.custom_styles? "" : "user_img5"}>
                  <img src={getImage(this.state.user.profilePicture,'thumbnail','profilePicture') } alt="profile pic" style={{...this.props.custom_styles,...this.props.exra_styles}}/>
         </div>
         </Link>)
     }
     else{
      return <img style={{width:'36px !important', height:'36px !important',...this.props.exra_styles}} src={getImage(this.state.user.profilePicture,'thumbnail','profilePicture') } alt="profile pic" />
     }
  }
   render(){
    if(!this.state.avatarLoaded){
      return <Skeleton
               variant="circular"
               width={36}
               height={36}
               animation="wave"
            />
    }  
    return (<>
          {this.state.redirectUser? <RedirectUser/> : <></>}
          {this.renderAvatar()}</>)
   }
  }
  const RedirectUser = ()=>{
   const useSearchModalOpenContext = useSearchModalOpen()
   useSearchModalOpenContext.setOpenSearchModal(false)
 }