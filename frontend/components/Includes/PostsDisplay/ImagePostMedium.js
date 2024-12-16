'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay";
import { truncateText } from "@/Functions";
import CommentsModal from "../Modals/CommentsModal";

export default function ImagePostMedium(props) {
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative' }}>
          <AvatarWithPostDate {...props} />
          <MediaDisplay post={props.post} displayType="mediaOnly" imageType="medium" listtype="carousel"/>
          <Link href={"/posts/"+props.post.dashed_title}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
            {truncateText(props.post.description,'150')}
          </p>
          </Link>
          {props.postEngagementsDisplay(props.post)}
          <div style={{width:'100%', textAlign:'center'}}><CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/></div>
        </div>
      </div>
    )
  }
  