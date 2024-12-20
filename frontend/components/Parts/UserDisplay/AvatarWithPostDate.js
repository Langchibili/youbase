'use client'

import React from "react"
import AvatarOnly from "./AvatarOnly"
import Link from "next/link"
import PostMoreBtn from "@/components/Includes/PostMoreBtn/PostMoreBtn"
import { displayDateOrTime, getPostUser } from "@/Functions"

export default class AvatarWithPostDate extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        thisIsMyPost: false
      }
   }

   async componentDidMount(){
       const postUser = await getPostUser(this.props.post.dashed_title)
       this.setState({
        thisIsMyPost: this.props.loggedInUser.user.id === postUser.id
       })
   }
   
   renderUserName = ()=>{
       const textColor = this.props.textColor? this.props.textColor: ''
       const user = this.props.post.user.data.attributes
       if(!user.details){
          return <h4 style={{color:textColor}}>Unnamed User</h4>  
       }
       if(!user.details && !user.details.firstname && !user.details.lastname){
           return <h4 style={{color:textColor}}>Unnamed User</h4> 
       }
       if(!user.details.firstname || user.details.lastname){ // if any of the first or last name is not set, then you are an unnamed user
           return <h4 style={{color:textColor}}>Unnamed User</h4> 
       }
       // both of them have to be set for us to display your name
       return <h4 style={{color:textColor}}>{truncateText(user.details.firstname+" "+user.details.lastname,20)}</h4>
    }

   render(){
    if(!this.props.post && !this.props.post.user && !this.props.post.user.data){
      return <></>
    }
    console.log('user here',this.props.post)
    const user = this.props.post.user.data.attributes
   
    return ( 
      <div style={{width:"100%",display:'flex', justifyContent:'space-between'}}>
        <div className="live_user_dt">
            <AvatarOnly {...this.props} userId={this.props.post.user.data.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+user.username}>   
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