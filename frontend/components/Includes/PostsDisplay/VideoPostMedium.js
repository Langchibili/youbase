'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import { log } from "@/Constants";
import VideoFileDisplay from "../VideoDisplay/VideoFileDisplay";
import { getVideoMetaFromPostAndId, truncateText } from "@/Functions";


export default function VideoPostMedium(props) {
    log(props.post.media? props.post.media : 'nothing here')
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative'}}>
          <AvatarWithPostDate {...props} />
          <div style={{minHeight: '10px'}}></div>
          <VideoFileDisplay post={props.post} loggedInUser={props.loggedInUser} videoMeta={getVideoMetaFromPostAndId(props.post,props.post.media.id)} file={props.post.media} hideRemoveButton={true}/>
          {/* <VideosDisplay postid={props.post.id}/> */}
          <Link href={"/posts/"+props.post.dashed_title}>
          <h4 className="rvds10" style={{ marginTop: '10px' }}>
          {truncateText(props.post.title,'50')}
          </h4>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          {truncateText(props.post.description,'100')}
          </p>
          </Link>
          {props.postEngagementsDisplay(props.post)}
        </div>
      </div>
    )
  }
  