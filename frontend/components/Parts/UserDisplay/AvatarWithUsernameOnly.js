'use client'

import { useSearchModalOpen } from "@/Contexts/SearchModalContext"
import { getImage, getUserById, truncateText } from "@/Functions"
import Link from "next/link"
import React from "react"

export default class AvatarWithUsernameOnly extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        avatarLoaded: false,
        redirectUser: false,
        user: null
      }
   }
   renderUserName = ()=>{
    const textColor = this.props.textColor? this.props.textColor: ''
    if(!this.state.user.details){
        return <h6 style={{color:textColor}}>Unnamed User</h6>  
    }
    if(!this.state.user.details && !this.state.user.details.firstname && !this.state.user.details.lastname){
        return <h6 style={{color:textColor}}>Unnamed User</h6> 
    }
    if(!this.state.user.details.firstname || this.state.user.details.lastname){ // if any of the first or last name is not set, then you are an unnamed user
        return <h6 style={{color:textColor}}>Unnamed User</h6> 
    }
    // both of them have to be set for us to display your name
    return <h6 style={{color:textColor}}>{truncateText(this.state.user.details.firstname+" "+this.state.user.details.lastname,20)}</h6>
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
    return(<div className="live_user_dt" style={{color:'GrayText',alignItems:"center"}}> 
                {this.state.redirectUser? <RedirectUser/> : <></>}
                <Link href={'/user/'+this.state.user.username} style={{fontSize:'smaller'}} onClick={()=>{ this.setState({redirectUser:true}) }}>
                    <div className="menu--link user_img">
                            <img id="comments-avatar" src={getImage(this.state.user.profilePicture,'thumbnail','profilePicture') } alt="profile pic" style={{width:'24px !important', height:'24px !important',...this.props.exra_styles}}/>
                    </div>
                </Link>
                <Link href={'/user/'+this.state.user.username} style={{color:'GrayText',fontSize:'16px'}} onClick={()=>{ this.setState({redirectUser:true}) }}>   
                    {this.renderUserName()}
               </Link>
               {this.props.postMoreContent()}
          </div>)
   }
  }

  const RedirectUser = ()=>{
    const useSearchModalOpenContext = useSearchModalOpen()
    useSearchModalOpenContext.setOpenSearchModal(false)
  }
