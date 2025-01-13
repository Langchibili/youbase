import React from "react";
import Link from "next/link";
import SingleNotificationsDisplay from "./SingleNotificationsDisplay";
import ContentDisplaySection from "../ContentDisplay/ContentDisplaySection";
import { api_url } from "@/Constants";


export default class NotificationsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unseenNotificationsCount: null
    };
  }
  
  async componentDidMount(){
      const unseenNotificationsCount = await fetch(`${api_url}/notifications?filters[notifiedUsers][id][$eq]=${this.props.loggedInUser.user.id}&filters[status][$not][$eq]=seen&pagination[limit]=0&pagination[withCount]=true`,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        if(unseenNotificationsCount && unseenNotificationsCount.meta && unseenNotificationsCount.meta.pagination){
          this.setState({
            unseenNotificationsCount: unseenNotificationsCount.meta.pagination.total
          })
        }
  }

  updateUnseenNotificationsCount = ()=>{
    if(!this.state.unseenNotificationsCount){
      return
    }
    this.setState({
      unseenNotificationsCount: this.state.unseenNotificationsCount - 1
    })
  }
 
  render() {
    return (
      <>
       <li className="ui dropdown" tabIndex={0}>
                    <a href="#" className="option_links" title="Notifications">
                    <i className="uil uil-bell" />
                    {this.state.unseenNotificationsCount? <span className="noti_count">{this.state.unseenNotificationsCount}</span> : <></>}
                    </a>
                    <div className="menu dropdown_mn" tabIndex={-1}>
                      <ContentDisplaySection
                          loggedInUser={this.props.loggedInUser}
                          emptyContentMessage="You have no notifications at the moment."
                          showEmptyContentMessage={true}
                          contentDisplay={(props) => <RenderNotifications notifications={props.content} loggedInUser={this.props.loggedInUser} updateUnseenNotificationsCount={this.updateUnseenNotificationsCount}/>}
                          contentUri={`${api_url}/notifications`}
                          totalPages={1}
                          limit={5}
                          removeBottomPadding={true}
                          contentQueryFilters={`filters[notifiedUsers][id][$eq]=${this.props.loggedInUser.user.id}&populate=notifier,notifier.details,post&_sort=id:desc`}
                          />
                    <Link className="vbm_btn" href="/notifications">
                        View All <i className="uil uil-arrow-right" />
                    </Link>
                    </div>
                </li>
      </>
    );
  }
}


const RenderNotifications = (props)=>{
  console.log('notifications',props.notifications)
  return props.notifications.map((notification)=> <SingleNotificationsDisplay  notification={notification} loggedInUser={props.loggedInUser} updateUnseenNotificationsCount={props.updateUnseenNotificationsCount}/>)
}