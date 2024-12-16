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
            <span className="time_145">{displayDateOrTime(this.props.post.createdAt)}</span>
            </Link>
            </div>
           
        </div>
         <PostMoreBtn {...this.props}  action="edit" thisIsMyPost={this.state.thisIsMyPost} postId={this.props.post.id}/>
      </div> 
    )
   }
  }