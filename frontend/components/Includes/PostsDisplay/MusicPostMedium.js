'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import SongPlayButton from "../SongPlayButton/SongPlayButton";
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";

export default function MusicPostMedium(props) {
    if(!props.post.media){
      return null
    }
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        {props.onSinglePostDisplayPage? 
        (<div className="review_item" style={{ position: 'relative'}}>
            <MediaDisplay post={props.post} displayType="mediaOnly" imageType="medium" listtype="carousel"/>
            <hr style={{marginLeft:'5px', marginRight:'5px'}}/>
            <div className="post-info" style={{paddingLeft:'5px'}}>
                <div style={{marginTop:'15px'}}><strong><h3> <ReadMoreLess text={props.post.title} length={50}/> </h3></strong></div>
                <p className="rvds10" style={{ marginTop: '10px' }}>
                <ReadMoreLess text={props.post.description} length={100}/>
                </p>
            </div>
        <div className="music-post-container" style={{backgroundColor:"lightyellow",marginTop:'10px'}}>
            <div>
              <SongPlayButton {...props} />
            </div>
            {props.postEngagementsDisplay(props.post)}
        </div>
        <AvatarWithPostDate {...props} />
        <div style={{minHeight:'10px'}}></div>

        {props.post.media.data && props.post.media.data.length > 1? <h3>{props.post.media.data.length} Songs</h3> : <></>}
        <div style={{width:"60%",margin:'0 auto',display:'flex',justifyContent:'space-between'}}>
          <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/>
          {props.post.type === "music"? <button className="btn btn-danger">Download</button> : <></>}
        </div>
        </div>) :
        (<div className="review_item" style={{ position: 'relative'}}>
          <AvatarWithPostDate {...props} />
          <div style={{minHeight:'10px'}}></div>
          <MediaDisplay loggedInUser={props.loggedInUser} post={props.post} displayType="mediaOnly" imageType="medium" listtype="carousel"/>
          <hr style={{marginLeft:'5px', marginRight:'5px'}}/>
          <div className="post-info" style={{paddingLeft:'5px'}}>
              <Link href={"/posts/"+props.post.dashed_title}>
              <div style={{marginTop:'15px'}}><strong><h3> <ReadMoreLess text={props.post.title} length={50}/></h3></strong></div>
              <p className="rvds10" style={{ marginTop: '10px' }}>
              <ReadMoreLess text={props.post.description} length={100}/>
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
          <div style={{
                width: "100%",
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '1rem 0',
                borderTop: '2px solid whitesmoke', // Optional for a separator
            }}>
              <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/>
              <PostMoreModal {...props}/>
          </div>
        </div>)
        }
      </div>
    )
  }
  