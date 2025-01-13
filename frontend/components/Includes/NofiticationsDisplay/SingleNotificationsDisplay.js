import AvatarOnly from "@/components/Parts/UserDisplay/AvatarOnly";
import { api_url, getJwt } from "@/Constants";
import { displayDateOrTime, getImage, truncateText } from "@/Functions";
import Link from "next/link";
import React from "react";


export default class SingleNotificationsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: this.props.notification.attributes.status && this.props.notification.attributes.status === "seen"? "seen" : "unseen"
    }
  }


  handleNotificationClick = async ()=>{
      await fetch(`${api_url}/notifications/${this.props.notification.id}`, { // change notification status to seen
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:{status:'seen'}})
      })
      this.setState({
        seen:"seen"
      })
      if(this.props.updateUnseenNotificationsCount){
        this.props.updateUnseenNotificationsCount()
      }
  }

   renderUserName = ()=>{
         const textColor = this.props.textColor? this.props.textColor: ''
         const user = this.props.notification.attributes.notifier.data.attributes
         if(!user.details){
            return <h6 style={{color:textColor}}>Unnamed User</h6>  
         }
         if(!user.details && !user.details.firstname && !user.details.lastname){
             return <h6 style={{color:textColor}}>Unnamed User</h6> 
         }
         if(!user.details.firstname || user.details.lastname){ // if any of the first or last name is not set, then you are an unnamed user
             return <h6 style={{color:textColor}}>Unnamed User</h6> 
         }
         // both of them have to be set for us to display your name
         return <h6 style={{color:textColor}}>{truncateText(user.details.firstname+" "+user.details.lastname,20)}</h6>
      }
  
  renderNotificationLink = ()=>{
    if(this.props.notification.attributes.type === "post"){
      if(this.props.notification.attributes.post && this.props.notification.attributes.post.data && this.props.notification.attributes.post.data.attributes){
        return "/posts/"+this.props.notification.attributes.post.data.attributes.dashed_title
      }
    }
    else{ // user notification type checks already checked in render method
      return "/user/"+this.props.notification.attributes.notifier.data.attributes.username
    }
    return "#"
    
  }    

  render() {
    if(this.props.notification.attributes.notifier && this.props.notification.attributes.notifier.data && this.props.notification.attributes.notifier.data.attributes){
      return (
        <div style={this.state.seen === "seen"? {paddingLeft:'10px',paddingRight:'3px'} : {backgroundColor:'aliceblue',paddingLeft:'10px',paddingRight:'3px'}}>
          <Link href={this.renderNotificationLink()} className="channel_my item" onClick={this.handleNotificationClick}>
            <div className="profile_link">
            <AvatarOnly userId={this.props.notification.attributes.notifier.data.id}/>
            <div className="pd_content">
                {this.renderUserName()}
                <p>
                {this.props.notification.attributes.title}
                </p>
                <span className="nm_time">{displayDateOrTime(this.props.notification.attributes.createdAt)}</span>
            </div>
            </div>
         </Link>
        </div>
     )
    }
    else{
       return <></>
    }
  }
}