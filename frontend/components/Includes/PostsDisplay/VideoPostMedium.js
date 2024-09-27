import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import PostMoreBtn from "../PostMoreBtn/PostMoreBtn";
import Link from "next/link";
import VideosDisplay from "@/components/Parts/MediaDisplay/VideosDisplay";
import { log } from "@/Constants";

export default function VideoPostMedium(props) {
    log(props.post.media? props.post.media : 'nothing here')
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative'}}>
          <AvatarWithPostDate {...props} />
          <VideosDisplay postid={props.post.id}/>
          <Link href={"/posts/"+props.post.dashed_title}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
            {[props.post.description]}
          </p>
          </Link>
          {props.postEngagementsDisplay(props.post)}
        </div>
      </div>
    )
  }
  