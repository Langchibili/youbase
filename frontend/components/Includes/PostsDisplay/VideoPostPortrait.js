'use client'

import VideoThumbnailDisplay from "../VideoDisplay/VideoThumbnailDisplay";
import AvatarOnly from "@/components/Parts/UserDisplay/AvatarOnly";
import { useEffect, useState } from "react";
import { getPostUser } from "@/Functions";


export default function VideoPostPortrait(props) {
    const [postUser,setUser] = useState(null)
    useEffect(()=>{
       const runGetPostUser = async ()=>{
            setUser(await getPostUser(props.post.dashed_title))
       }
       runGetPostUser()
    },[props.post])
    return (
      <div style={{backgroundColor:"rgb(71 55 71)",borderRadius:'5px'}}>
        <div>
          <VideoThumbnailDisplay postid={props.post} title={props.post.title} avatar={()=>{ return <AvatarOnly userId={postUser.id}/> } }/>
        </div>
      </div>
    )
  }