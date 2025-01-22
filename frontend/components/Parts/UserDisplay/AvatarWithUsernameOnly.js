'use client'

import { useSearchModalOpen } from "@/Contexts/SearchModalContext"
import { getImage, getUserById, truncateText } from "@/Functions"
import { Skeleton } from "@mui/material"
import Link from "next/link"
import React from "react"

export default class AvatarWithUsernameOnly extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        avatarLoaded: false,
        redirectUser: false,
        avatarLoaded: true,
        user: null
      }
   }
   renderUserName = () => {
    const textColor = this.props.textColor ? this.props.textColor : '';

    // Check if the user or user details are not available
    if (!this.state.user || !this.state.user.details) {
        return <h6 style={{ color: textColor }}>Unnamed User</h6>;
    }

    // Safely access and handle `firstname` and `lastname`
    const { firstname = '', lastname = '' } = this.state.user.details;
    const trimmedFirstName = firstname.trim();
    const trimmedLastName = lastname.trim();

    // Determine the appropriate name to display
    if (trimmedFirstName && !trimmedLastName) {
        return <h6 style={{ color: textColor }}>{truncateText(trimmedFirstName, 20)}</h6>;
    }

    if (trimmedLastName && !trimmedFirstName) {
        return <h6 style={{ color: textColor }}>{truncateText(trimmedLastName, 20)}</h6>;
    }

    if (trimmedFirstName && trimmedLastName) {
        return (
            <h6 style={{ color: textColor }}>
                {truncateText(`${trimmedFirstName} ${trimmedLastName}`, 20)}
            </h6>
        );
    }

    // Fallback for unnamed users
    return <h6 style={{ color: textColor }}>Unnamed User</h6>;
};

  async componentDidMount(){
        const user = await getUserById(this.props.userId,"profilePicture,details")
        this.setState({
            user: user,
            avatarLoaded: true
        })
  }      

   render(){
    if(!this.state.avatarLoaded){
        return <>  <div className="live_user_dt"><Skeleton
                        variant="circular"
                        width={36}
                        height={36}
                        animation="wave"
                    />

                       <Skeleton
                             variant="text"
                             width={100}
                             height={10}
                             animation="wave"
                             style={{ marginBottom: "8px" }} // Spacing between lines
                         />
            </div>
         </>
    }
    if(this.state.user){
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
    return null
  }
 }

  const RedirectUser = ()=>{
    const useSearchModalOpenContext = useSearchModalOpen()
    useSearchModalOpenContext.setOpenSearchModal(false)
  }
