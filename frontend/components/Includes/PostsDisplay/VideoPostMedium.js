'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import { log } from "@/Constants";
import VideoFileDisplay from "../VideoDisplay/VideoFileDisplay";
import { getVideoMetaFromPostAndId, truncateText } from "@/Functions";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";
import { useSearchModalOpen } from "@/Contexts/SearchModalContext";


export default function VideoPostMedium(props) {
    const useSearchModalOpenContext = useSearchModalOpen()

    log(props.post.media? props.post.media : 'nothing here')
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        {props.onSinglePostDisplayPage? 
        (<div className="review_item" style={{ position: 'relative'}}>
          <VideoFileDisplay post={props.post} loggedInUser={props.loggedInUser} videoMeta={getVideoMetaFromPostAndId(props.post,props.post.media.id)} file={props.post.media} hideRemoveButton={true}/>
          <h4 className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.title} length={50}/>
          </h4>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.description} length={150}/>
          </p>
          <AvatarWithPostDate {...props} />
          <div style={{minHeight: '10px'}}></div>
          {props.postEngagementsDisplay(props.post)}
          <div style={{width:'100%', textAlign:'center'}}><CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} /></div>
        </div>)
           :
        (<div className="review_item" style={{ position: 'relative'}}>
          <AvatarWithPostDate {...props} />
          <div style={{minHeight: '10px'}}></div>
          <VideoFileDisplay post={props.post} loggedInUser={props.loggedInUser} videoMeta={getVideoMetaFromPostAndId(props.post,props.post.media.id)} file={props.post.media} hideRemoveButton={true}/>
          <Link href={"/posts/"+props.post.dashed_title} onClick={()=>{useSearchModalOpenContext.setOpenSearchModal(false)}}>
          <h4 className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.title} length={50}/>
          </h4>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.description} length={150}/>
          </p>
          </Link>
          {props.postEngagementsDisplay(props.post)}
          <div style={{
                width: "100%",
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '1rem 0',
                borderTop: '2px solid whitesmoke', // Optional for a separator
            }}>
              <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} />
              <PostMoreModal {...props}/>
          </div>
        </div>)}
      </div>
    )
  }
  