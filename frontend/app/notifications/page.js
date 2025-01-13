'use client'

import ContentDisplaySection from "@/components/Includes/ContentDisplay/ContentDisplaySection"
import SingleNotificationsDisplay from "@/components/Includes/NofiticationsDisplay/SingleNotificationsDisplay"
import { api_url } from "@/Constants"
import { useUser } from "@/Contexts/UserContext"

export default function Notifications() {
    const loggedInUser = useUser()
    if(!loggedInUser.status){
        window.location = "/signin"
        return <>Log in to see your notifications</>
    }
    return (
            <ContentDisplaySection
            key="nav-texts-tab"
            loggedInUser={loggedInUser}
            emptyContentMessage="You have no notifications at the moment."
            showEmptyContentMessage={true}
            contentDisplay={(props) => <RenderNotifications notifications={props.content} loggedInUser={loggedInUser}/>}
            contentUri={`${api_url}/notifications`}
            limit={10}
            contentQueryFilters={`filters[notifiedUsers][id][$eq]=${loggedInUser.user.id}&populate=notifier,notifier.details,post&sort=id:desc`}
        />
    )
}


const RenderNotifications = (props)=>{
    return props.notifications.map((notification)=> <SingleNotificationsDisplay  notification={notification} loggedInUser={props.loggedInUser}/>)
  }






