'use client'

import React from "react"
import AvatarOnly from "./AvatarOnly"
import Link from "next/link"
import PostMoreBtn from "@/components/Includes/PostMoreBtn/PostMoreBtn"
import { displayDateOrTime, getPostUser, truncateText } from "@/Functions"
import { useSearchModalOpen } from "@/Contexts/SearchModalContext"

export default class AvatarWithPostDate extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        thisIsMyPost: false,
        redirectUser: false,
        user: null,
        avatarLoaded: true
      }
   }

   async componentDidMount(){
       const postUser = await getPostUser(this.props.post.dashed_title)
       this.setState({
        user: postUser,
        thisIsMyPost: this.props.loggedInUser.status? this.props.loggedInUser.user.id === postUser.id : false
       })
   }
   
   renderUserName = () => {
    const user = this.state.user;
    const textColor = this.props.textColor ? this.props.textColor : '';
    console.log('user in post date', user);

    if (!user || !user.details) {
        return <h4 style={{ color: textColor }}>Unnamed User</h4>;
    }

    const firstName = user.details.firstname || '';
    const lastName = user.details.lastname || '';

    if (firstName.trim() && !lastName.trim()) {
        return <h4 style={{ color: textColor }}>{truncateText(firstName.trim(), 20)}</h4>;
    }

    if (lastName.trim() && !firstName.trim()) {
        return <h4 style={{ color: textColor }}>{truncateText(lastName.trim(), 20)}</h4>;
    }

    if (firstName.trim() && lastName.trim()) {
        return (
            <h4 style={{ color: textColor }}>
                {truncateText(`${firstName.trim()} ${lastName.trim()}`, 20)}
            </h4>
        );
    }

    return <h4 style={{ color: textColor }}>Unnamed User</h4>;
}

   render(){
    if(!this.props.post && !this.props.post.user && !this.props.post.user.data){
      return <></>
    }
    console.log('user here',this.props.post)
    const user = this.props.post.user.data.attributes
   
    return ( 
      <div style={{width:"100%",display:'flex', justifyContent:'space-between'}}>
        {this.state.redirectUser? <RedirectUser/> : <></>}
        <div className="live_user_dt" onClick={()=>{ this.setState({redirectUser:true}) }}>
            <AvatarOnly {...this.props} userId={this.props.post.user.data.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+user.username} >  
            {this.renderUserName()}
            </Link>
            <Link href={"/posts/"+this.props.post.dashed_title}>
            <span className="time_145">{displayDateOrTime(this.props.post.createdAt)}</span>
            </Link>
            </div>
           
        </div>
         <PostMoreBtn {...this.props}  action="edit" thisIsMyPost={this.state.thisIsMyPost} postId={this.props.post.id}/>
      </div> 
    )
   }
  }

  const RedirectUser = ()=>{
    const useSearchModalOpenContext = useSearchModalOpen()
    useSearchModalOpenContext.setOpenSearchModal(false)
  }