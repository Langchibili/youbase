'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import SongPlayButton from "../SongPlayButton/SongPlayButton";
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay";
import CommentsModal from "../Modals/CommentsModal";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";
import MusicPlayerCardType from "./PostsDisplayTypes/MusicPlayerCardType";
import DownloadSongButton from "../DownloadSongButton/DownloadSongButton";

export default function MusicPostMedium(props) {
    if(!props.post.media){
      return null
    }
    const renderDownloadButton = ()=>{
      if(props.post.media.data && props.post.media.data[0] && props.post.media.data[0].attributes && props.post.media.data[0].attributes.url){
        return <DownloadSongButton {...props} filepath={props.post.media.data[0].attributes.url}/>
      }
      else{
        return <button disabled className="btn btn-danger">Download</button>
      }
    }
    return (
         <>
        {props.onSinglePostDisplayPage? 
        (<div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
          <div className="review_item" style={{ position: 'relative'}}>
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
              <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} />
              {props.post.type === "music"? renderDownloadButton() : <></>}
            </div>
          </div>
        </div>) : <MusicPlayerCardType loggedInUser={props.loggedInUser} {...props}/>
        }
      </>
    )
  }
  

