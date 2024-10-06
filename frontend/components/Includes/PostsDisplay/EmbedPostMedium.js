'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import EmbedDisplay from "../EmbedDisplay/EmbedDisplay";
import { truncateText } from "@/Functions";

export default function EmbedPostMedium(props) {
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative'}}>
          <AvatarWithPostDate {...props} /><br/>
          <EmbedDisplay url={props.post.embedLink}/>
          <Link href={"/posts/"+props.post.dashed_title}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          {truncateText(props.post.description,'150')}
          </p>
          </Link>
          {props.postEngagementsDisplay(props.post)}
        </div>
      </div>
    )
  }
  