import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import SongPlayButton from "../SongPlayButton/SongPlayButton";

export default function MusicPostMedium(props) {
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        <div className="review_item" style={{ position: 'relative'}}>
            <AvatarWithPostDate {...props} />
            <hr style={{marginLeft:'5px', marginRight:'5px'}}/>
            <div className="post-info" style={{paddingLeft:'5px'}}>
                <Link href={"/posts/"+props.post.dashed_title}>
                <div style={{marginTop:'15px'}}><strong><h3>{props.post.title}</h3></strong></div>
                <p className="rvds10" style={{ marginTop: '10px' }}>
                {props.post.description}
                </p>
                </Link>
            </div>

        <div className="music-post-container" style={{backgroundColor:"lightyellow",marginTop:'10px'}}>
            <div>
              <SongPlayButton {...props} />
            </div>
            {props.postEngagementsDisplay(props.post)}
        </div>
        {props.post.media.data && props.post.media.data.length > 1? <h3>{props.post.media.data.length} Songs</h3> : <></>}
        </div>
      </div>
    )
  }
  