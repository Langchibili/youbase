
import React from 'react'
import { displayDateOrTime, getImage } from '@/Functions'
import SongPlayButton from '../../SongPlayButton/SongPlayButton'
import AvatarWithPostDate from '@/components/Parts/UserDisplay/AvatarWithPostDate'
import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay'
import LikeButton from '@/components/Parts/EngageMents/LikeButton'
import ShareButton from '@/components/Parts/EngageMents/ShareButton'
import Link from 'next/link'
import { IconButton } from '@mui/joy';
import CommentsModal from '../../Modals/CommentsModal'
import PostMoreModal from '../../Modals/PostMoreModal'
import AvatarWithUsernameOnly from '@/components/Parts/UserDisplay/AvatarWithUsernameOnly'
import PostMoreBtn from '../../PostMoreBtn/PostMoreBtn'

export default function MusicPlayerCardType(props) {
  const renderThumbNail = () => {
    if (props.post.featuredImages && props.post.featuredImages.data && props.post.featuredImages.data[0]) {
      return getImage(props.post.featuredImages.data[0] || null, 'thumbnail', 'blank')
    }
    return getImage(null, 'thumbnail', 'blank')
  }

  return (
      <div style={{backgroundColor:"white",borderRadius:'24px',marginBottom:'10px'}}>
    <div
  className="container py-3"
  style={{
    position: 'relative',
    backgroundImage: `url(${renderThumbNail()})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition:'center',
    borderTopRightRadius:'24px',
    borderTopLeftRadius: '24px',
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderTopRightRadius:'24px',
      borderTopLeftRadius: '24px',
      background: 'linear-gradient(to right, rgba(128, 128, 128, 0.8), rgba(128, 128, 128, 0.3))', // Linear gradient overlay
      zIndex: 1, // Place it beneath the content
    }}
  ></div>

  {/* Content */}
  <div style={{ position: 'relative', zIndex: 2 }}>
    <div className="row align-items-center">
      {/* Content Section */}
      <div
        style={{
          width: '100%',
          marginTop: '10px',
          display: 'flex',
          marginRight:'20px',
          alignItems:'center',
          justifyContent: 'space-between',
        }}
      >
        <AvatarWithUsernameOnly userId={props.post.user.data.id} textColor="white" extra_styles={  {color:"white !important",width:'24px !important', height:'24px !important'}} postMoreContent={()=>{}}/>
        <PostMoreBtn {...props} iconColor="white" action="edit" post={props.post}/>
        </div>
      
      {/* <div style={{margin:'20px'}}><AvatarWithUsernameOnly post={props.post} {...props} textColor="white"/></div> */}
      <div
        style={{
          width: '100%',
          marginTop: '10px',
          display: 'flex',
          alignItems:'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ marginLeft: '20px' }}>
          <Link href={`/posts/${props.post.dashed_title}`}>
            <h5 className="text-truncate mb-1" style={{color:'white'}}>{props.post.title}</h5>
          
          <p className="mb-2 text-muted small">
          <span className="time_145" style={{color:'white'}}> posted {displayDateOrTime(props.post.createdAt)}</span>
          </p>
          </Link>
        </div>
        <div>
          <SongPlayButton post={props.post} />
        </div>
      </div>
    </div>

    {/* Bottom Section: Avatar and Comment Modal */}
    <div className="row mt-3">
      <div style={{ margin: '0 auto' }} className="col-12 text-center">
        <IconButton
          aria-label="previous"
          onClick={(e) => {
            e.preventDefault()
          }}
          sx={{ backgroundColor: 'ghostwhite' , background:'linear-gradient(to right, rgba(128, 128, 128, 0.8), #fff)'}}
        >
          <ul>
            <StreamsDisplay
              post={props.post}
              user={props.post.user.data.attributes}
              {...props}
            />
          </ul>
          <ul>
            <LikeButton
              post={props.post}
              user={props.post.user.data.attributes}
              {...props}
            />
          </ul>
          <ul>
            <ShareButton
              post={props.post}
              user={props.post.user.data.attributes}
              {...props}
            />
          </ul>
        </IconButton>
      </div>
    </div>
  </div>
</div>

    <div className="col-12 d-flex justify-content-between align-items-center pt-3">
    <div style={{
        width: "100%",
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem 0',
     }}>
      <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/>
      <PostMoreModal {...props}/>
    </div>
      </div>
    </div>
  )
}