'use client'

import React from "react"
import AvatarOnly from "./AvatarOnly"
import UserFollowingButtons from "../UserActionButtons/UserFollowingButtons"
import Link from "next/link"
import { getUserById, truncateText } from "@/Functions"
import { Skeleton } from "@mui/material"

export default class AvatarWithFollowButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        user: null,
        userNameLoaded: false
      }
   }

   renderUserName = () => {
    const user = this.state.user;
    const textColor = this.props.textColor ? this.props.textColor : '';
    console.log('user in post date', user);

    // Handle cases where user or user details are missing
    if (!user || !user.details) {
        return <h4 style={{ color: textColor }}>Unnamed User</h4>;
    }

    // Safely access and set defaults for firstname and lastname
    const firstName = user.details.firstname ? user.details.firstname.trim() : '';
    const lastName = user.details.lastname ? user.details.lastname.trim() : '';

    // Logic for rendering the user name
    if (firstName && !lastName) {
        return <h4 style={{ color: textColor }}>{truncateText(firstName, 20)}</h4>;
    }

    if (lastName && !firstName) {
        return <h4 style={{ color: textColor }}>{truncateText(lastName, 20)}</h4>;
    }

    if (firstName && lastName) {
        return (
            <h4 style={{ color: textColor }}>
                {truncateText(`${firstName} ${lastName}`, 20)}
            </h4>
        );
    }

    // Default fallback for unnamed users
    return <h4 style={{ color: textColor }}>Unnamed User</h4>;
};


     async componentDidMount(){
        const user = await getUserById(this.props.userId,"profilePicture,details")
        this.setState({
            user: user,
            userNameLoaded: true
        })
    }  
   render(){
    const loggedInUserId = this.props.loggedInUser.status? this.props.loggedInUser.user.id : null
    if(!this.state.userNameLoaded){
        return <Skeleton
                    variant="text"
                    width={100}
                    height={10}
                    animation="wave"
                    style={{ marginBottom: "8px" }} // Spacing between lines
                />
      } 
    return ( 
        !this.props.user? <></> :
        this.props.shiftAvatarDisplay? <div className="live_user_dt">
            <div className="user_cntnt" style={{marginRight:'10px'}}>
            <Link href={'/user/'+this.props.user.username}>   
            {this.renderUserName()}
            </Link>
            {this.props.user.id === loggedInUserId? <Link
                className="btn btn-success"
                href="/manage/profile"
                style={{ display:'inline-block',alignContent: 'center'}}
                
            >
                Update
            </Link> :
            <UserFollowingButtons {...this.props} userId={this.props.user.id}/>}
            </div>
            <AvatarOnly {...this.props} userId={this.props.user.id}/>
        </div>: 
        <div className="live_user_dt">
            <AvatarOnly {...this.props} userId={this.props.user.id}/>
            <div className="user_cntnt">
            <Link href={'/user/'+this.props.user.username}>   
            {this.renderUserName()}
            </Link>
            {this.props.user.verified? <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                </div> : <></>}
            {this.props.user.id === loggedInUserId? <Link
                className="btn btn-success"
                href="/manage/profile"
                style={{ display:'inline-block',alignContent: 'center'}}
                
            >
                Update
            </Link> :
            <UserFollowingButtons {...this.props} userId={this.props.user.id}/>}
            </div>
        </div>
    )
   }
  }