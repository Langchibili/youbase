import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import { getImage } from "@/Functions";
import Link from "next/link";
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay";

export default function ImagePostMedium(props) {
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative' }}>
          <AvatarWithPostDate {...props} />
          <MediaDisplay post={props.post} displayType="mediaOnly" imageType="medium" listtype="carousel"/>
          <Link href={"/posts/"+props.post.dashed_title}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
            {props.post.description}
          </p>
          
          </Link>
          {props.postEngagementsDisplay(props.post)}
        </div>
      </div>
    )
  }
  