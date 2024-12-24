'use client'

import AvatarWithPostDate from "@/components/Parts/UserDisplay/AvatarWithPostDate";
import Link from "next/link";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";
import { useState } from "react";

export default function TextPostMedium(props) {
  return (
    <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
      <div className="review_item" style={{ position: 'relative'}}>
            <AvatarWithPostDate {...props} />
            {props.onSinglePostDisplayPage?
              (<p className="rvds10" style={{ marginTop: '10px' }}>
                    <ReadMoreLess text={props.post.description} length={150}/>
              </p>) : 
              (<Link href={"/posts/"+props.post.dashed_title}>
                    <p className="rvds10" style={{ marginTop: '10px' }}>
                    <ReadMoreLess text={props.post.description} length={150}/>
              </p>
            </Link>)
            }
            {props.postEngagementsDisplay(props.post)}
            {props.onSinglePostDisplayPage? 
            <div style={{width:'100%', textAlign:'center'}}>
              <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/>
            </div> :
            (<div style={{
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
             </div>)}
            </div>
    </div>
    
  )
}
