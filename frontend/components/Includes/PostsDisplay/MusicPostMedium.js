import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import PostMoreBtn from "../PostMoreBtn/PostMoreBtn";
import Link from "next/link";

export default function MusicPostMedium(props) {
    const handlePlayClick = ()=>{
        
    }
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
              <button className="play-button" onClick={handlePlayClick}>
                <i className="uil uil-play"></i>
              </button>
            </div>
            {props.postEngagementsDisplay(props.post)}
        </div>
        </div>
      </div>
    )
  }
  