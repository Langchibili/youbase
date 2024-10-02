'use client'

import React from "react"
import AvatarOnly from "./AvatarOnly"
import Link from "next/link"
import PostMoreBtn from "@/components/Includes/PostMoreBtn/PostMoreBtn"
import { getPostUser } from "@/Functions"

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

   displayDateOrTime = () => {
        const postCreatedAt = new Date(this.props.post.createdAt);
        const now = new Date();
        const timeDifference = Math.abs(now - postCreatedAt); // Difference in milliseconds
      
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const years = Math.floor(days / 365);
      
        if (seconds < 60) {
          return <span>Just now</span>;
        } else if (minutes < 60) {
          return <span>{minutes} minute{minutes > 1 ? "s" : ""} ago</span>;
        } else if (hours < 24) {
          return <span>{hours} hour{hours > 1 ? "s" : ""} ago</span>;
        } else if (days < 7) {
          return <span>{days} day{days > 1 ? "s" : ""} ago</span>;
        } else if (weeks < 52) {
          return <span>{weeks} week{weeks > 1 ? "s" : ""} ago</span>;
        } else {
          return <span>{years} year{years > 1 ? "s" : ""} ago</span>;
        }
  }
   
   
   render(){
    const user = this.props.post.user.data.attributes

    return ( 
      <div style={{width:"100%",display:'flex', justifyContent:'space-between'}}>
        <div className="live_user_dt">
            <AvatarOnly {...this.props} userId={this.props.post.user.data.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+user.username}>   
            {!user.details? <h4>Unnamed User</h4> : <h4>{truncateText(user.details.firstname+" "+user.details.lastname,20)}</h4>}
            </Link>
            <Link href={"/posts/"+this.props.post.dashed_title}>
            <span className="time_145">{this.displayDateOrTime()}</span>
            </Link>
            </div>
           
        </div>
         <PostMoreBtn {...this.props}  action="edit" thisIsMyPost={this.state.thisIsMyPost} postId={this.props.post.id}/>
      </div> 
    )
   }
  }