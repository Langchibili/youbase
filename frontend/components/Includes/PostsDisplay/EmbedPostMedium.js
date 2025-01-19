'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import EmbedDisplay from "../EmbedDisplay/EmbedDisplay";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";
import { useSearchModalOpen } from "@/Contexts/SearchModalContext";

export default function EmbedPostMedium(props) {
    const useSearchModalOpenContext = useSearchModalOpen()
    
    return (
      <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
        {props.onSinglePostDisplayPage? 
        (<div className="review_item" style={{ position: 'relative'}}>
          <EmbedDisplay url={props.post.embedLink}/>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.description} length={100}/>
          </p>
          <AvatarWithPostDate {...props} /><br/>
          {props.postEngagementsDisplay(props.post)}
          <div style={{width:'100%', textAlign:'center'}}><CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} /></div>
        </div>) : (<div className="review_item" style={{ position: 'relative'}}>
          <EmbedDisplay url={props.post.embedLink}/>
          <Link href={"/posts/"+props.post.dashed_title} onClick={()=>{useSearchModalOpenContext.setOpenSearchModal(false)}}>
          <p className="rvds10" style={{ marginTop: '10px' }}>
          <ReadMoreLess text={props.post.description} length={100}/>
          </p>
          </Link>
          <AvatarWithPostDate {...props} /><br/>
          {props.postEngagementsDisplay(props.post)}
          {props.onSinglePostDisplayPage? <div style={{width:'100%', textAlign:'center'}}><CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} /></div> :
            (<div style={{
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
             </div>)}
        </div>)}
      </div>
    )
  }
  