import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import PostMoreBtn from "../PostMoreBtn/PostMoreBtn";
import { getImage } from "@/Functions";
import Link from "next/link";

export default function ImagePostMedium(props) {
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative' }}>
          <AvatarWithPostDate {...props} />
          <Link href={"/posts/"+props.post.dashed_title}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
            {props.post.description}
          </p>
          <img style={{width:'100%'}} src={getImage(props.post.featuredImages, "medium")}/>
          </Link>
          {props.postEngagementsDisplay(props.post)}
        </div>
      </div>
    )
  }
  