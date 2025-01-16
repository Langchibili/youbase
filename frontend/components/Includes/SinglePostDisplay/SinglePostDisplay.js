'use client'

import LikeButton from "@/components/Parts/EngageMents/LikeButton";
import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import TextPostMedium from "../PostsDisplay/TextPostMedium";
import ImagePostMedium from "../PostsDisplay/ImagePostMedium";
import VideoPostMedium from "../PostsDisplay/VideoPostMedium";
import MusicPostMedium from "../PostsDisplay/MusicPostMedium";
import EmbedPostMedium from "../PostsDisplay/EmbedPostMedium";
import ContentDisplaySection from "../ContentDisplay/ContentDisplaySection";
import PortraitContentDisplay from "../ContentDisplay/PortraitContentDisplay";
import LandscapeContent from "../ContentDisplay/LandscapeContent";
import { api_url } from "@/Constants";

export default function SinglePostDisplay(props) {

  const postEngagementsDisplay = post => {
      return (
        <div className='inline-engagements-display'>
          <ul>
            {post.type === 'video' && <ViewsDisplay post={post} user={post.user.data.attributes} {...props} />}
          </ul>
          <ul>
            {post.type === 'music' && <StreamsDisplay post={post} user={post.user.data.attributes} {...props} />}
          </ul>
          <ul>
            <LikeButton post={post} user={post.user.data.attributes} {...props} />
          </ul>
          <ul>
            <ShareButton post={post} user={post.user.data.attributes} {...props} />
          </ul>
        </div>
      )
    }
    const renderPostContent = (post, postEngagementsDisplay) => {
        switch (post.type) {
          case 'text':
            return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
          case 'image':
            return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
          case 'video':
            return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
          case 'music':
            return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
          case 'embed':
            return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} onSinglePostDisplayPage={true}/>
          default:
            return null
        }
    }

// const moreFromUserFilters = {
//       // Videos: Excludes portrait videos, includes embeds
//       'videos':`filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&populate=user,featuredImages,media`, 
      
//       // Music: Only music content
//       'music':`filters[$and][0][type][$eq]=music&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&populate=user,featuredImages,media`, 
      
//       // Images: Excludes portrait images
//       'images':`filters[$and][0][$or][0][$and][0][type][$eq]=image&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&populate=user,featuredImages,media`, 
      
//       // Reels: Portrait videos only
//      // '':'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait', 
      
//       // Captures: Portrait images only
//       //'filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait', 
      
//       // Text: Only text content
//       'text':`filters[$and][0][type][$eq]=text&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&populate=user,featuredImages,media`
// }  

// const relatedPostsFilters = {
//         // Videos: Excludes portrait videos, includes embeds
//         'videos':'filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed', 
        
//         // Music: Only music content
//         'music':'filters[$and][0][type][$eq]=music', 
        
//         // Images: Excludes portrait images
//         'images':'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait', 
        
//         // Reels: Portrait videos only
//        // '':'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait', 
        
//         // Captures: Portrait images only
//         //'filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait', 
        
//         // Text: Only text content
//         'text':'filters[$and][0][type][$eq]=text'
//      }  


const moreFromUserFilters = {
  // Videos: Excludes portrait videos, includes embeds
  'video': `filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&filters[$and][3][id][$not][$eq]=${props.post.id}&populate=user,featuredImages,media`, 
  
  // Music: Only music content
  'music': `filters[$and][0][type][$eq]=music&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&filters[$and][3][id][$not][$eq]=${props.post.id}&populate=user,featuredImages,media`, 
  
  // Images: Excludes portrait images
  'image': `filters[$and][0][$or][0][$and][0][type][$eq]=image&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&filters[$and][3][id][$not][$eq]=${props.post.id}&populate=user,featuredImages,media`, 
  
  // Text: Only text content
  'text': `filters[$and][0][type][$eq]=text&filters[$and][1][status][$eq]=published&filters[$and][2][user][id][$eq]=${props.post.user.data.id}&filters[$and][3][id][$not][$eq]=${props.post.id}&populate=user,featuredImages,media`
}

const relatedPostsFilters = {
  // Videos: Excludes portrait videos, includes embeds
  'video': 'filters[$and][0][$or][0][$and][0][type][$eq]=video&filters[$and][0][$or][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][0][$or][1][type][$eq]=embed&filters[$and][1][id][$not][$eq]=' + props.post.id + '&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$not][$eq]=' + props.post.user.data.id + '&populate=user,featuredImages,media&_sort=user.totalEngagement:desc', 
  
  // Music: Only music content
  'music': 'filters[$and][0][type][$eq]=music&filters[$and][1][id][$not][$eq]=' + props.post.id + '&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$not][$eq]=' + props.post.user.data.id + '&populate=user,featuredImages,media&_sort=user.totalEngagement:desc', 
  
  // Images: Excludes portrait images
  'image': 'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait&filters[$and][1][id][$not][$eq]=' + props.post.id + '&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$not][$eq]=' + props.post.user.data.id + '&populate=user,featuredImages,media&_sort=user.totalEngagement:desc', 
  
  // Text: Only text content
  'text': 'filters[$and][0][type][$eq]=text&filters[$and][1][id][$not][$eq]=' + props.post.id + '&filters[$and][2][status][$eq]=published&filters[$and][3][user][id][$not][$eq]=' + props.post.user.data.id + '&populate=user,featuredImages,media&_sort=user.totalEngagement:desc'
}



const nextSectionToDisplay = ()=>{
  return <ContentDisplaySection
            loggedInUser={props.loggedInUser}
            contentDisplay={(props) =><LandscapeContent content={props.content} loggedInUser={props.loggedInUser} />}
            contentUri={`${api_url}/posts`}
            contentTitle="Related Content"
            limit={10}
            contentQueryFilters={relatedPostsFilters[props.post.type]}  />
}


  return (
    <>
  <div className="sa4d25">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-8">
        {renderPostContent(props.post, postEngagementsDisplay)}
        <PostImpressions {...props}/> {/* log the impression on the post when a user views the post */}
        <ContentDisplaySection
          loggedInUser={props.loggedInUser}
          contentDisplay={(props) =><LandscapeContent content={props.content} loggedInUser={props.loggedInUser} />}
          contentUri={`${api_url}/posts`}
          contentTitle="More From User"
          totalPages={1}
          limit={10}
          contentQueryFilters={moreFromUserFilters[props.post.type]}      
          nextSectionToDisplay={()=> nextSectionToDisplay()}
          />
        </div>
        
   
        {/* <div className="col-xl-4 col-lg-4">
          <div className="right_side">
            <div className="fcrse_3">
              <div className="cater_ttle">
                <h4>Live Chat</h4>
              </div>
              <div className="live_chat">
                <div className="chat1">
                  <p>
                    <a href="#">John Doe</a>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec aliquet molestie leo ac
                    pellentesque
                  </p>
                  <p>
                    <a href="#">Poonam</a>Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra
                  </p>
                  <p>
                    <a href="#">Jass</a>Nulla sollicitudin nec nisi at
                    pellentesque. Cras fringilla est et sem tempor
                  </p>
                  <p>
                    <a href="#">Albert Smith</a>Pellentesque ultricies risus sit
                    amet congue euismod
                  </p>
                  <p>
                    <a href="#">Jassica William</a>Nullam efficitur tristique
                    consequat
                  </p>
                  <p>
                    <a href="#">Joy Dua</a>Proin sed leo eleifend,
                  </p>
                  <p>
                    <a href="#">Zoena Singh</a>Aliquam dignissim elementum sem
                    id rutrum
                  </p>
                  <p>
                    <a href="#">Amritpal Singh</a>Fusce a elit at libero
                    sollicitudin tincidunt
                  </p>
                  <p>
                    <a href="#">Johnson</a>Ut laoreet lobortis ornare
                  </p>
                  <p>
                    <a href="#">Jashan</a>Sed pretium erat eu turpis condimentum
                  </p>
                </div>
              </div>
              <div className="live_comment">
                <input
                  className="live_input"
                  type="text"
                  placeholder="Say Something..."
                />
                <button className="btn_live">
                  <i className="uil uil-message" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="section3125 mb-15 mt-20">
            <h4 className="item_title">Live Streams</h4>
            <a href="live_streams.html" className="see150">
              See all
            </a>
            <div className="la5lo1">
              <div className="owl-carousel live_stream owl-theme owl-loaded owl-drag">
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(-579px, 0px, 0px)",
                      transition: "all",
                      width: 1739
                    }}
                  >
                    <div
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-1.jpg" alt="" />
                            <h4>John Doe</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
                       >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-2.jpg" alt="" />
                            <h4>Jassica</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-9.jpg" alt="" />
                            <h4>Edututs+</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-3.jpg" alt="" />
                            <h4>Joginder Singh</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-4.jpg" alt="" />
                            <h4>Zoena</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-5.jpg" alt="" />
                            <h4>Albert Dua</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-6.jpg" alt="" />
                            <h4>Ridhima</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-7.jpg" alt="" />
                            <h4>Amritpal</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
                    >
                      <div className="item">
                        <div className="stream_1">
                          <a href="live_output.html" className="stream_bg">
                            <img src="/theme/images/left-imgs/img-8.jpg" alt="" />
                            <h4>Jimmy</h4>
                            <p>
                              live
                              <span />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <i className="uil uil-angle-left" />
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next disabled"
                  >
                    <i className="uil uil-angle-right" />
                  </button>
                </div>
                <div className="owl-dots disabled" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
  </>
  
  );
}



// <div className="section3125">
// <div style={{backgroundColor:"white",borderRadius:'5px',marginBottom:'10px'}}>
// <div className="review_item" style={{ position: 'relative'}}>
// <div style={{minHeight: '10px'}}></div>
// <MediaDisplay {...props}/>
// {/* <VideosDisplay postid={props.post.id}/> */}
// <Link href={"/posts/"+props.post.dashed_title}>
// <h4 className="rvds10" style={{ marginTop: '10px' }}>
// {truncateText(props.post.title,'50')}
// </h4>
// <p className="rvds10" style={{ marginTop: '10px' }}>
// {truncateText(props.post.description,'100')}
// </p>
// </Link>
// {props.postEngagementsDisplay(props.post)}
// </div>
// </div>
// {props.post.type === "video"? <MediaDisplay {...props}/> : <MediaDisplay {...props} displayType="mediaOnly"/> }
//   <div className="user_dt5">
//     <div className="user_dt_left">
//       <div className="live_user_dt">
//         <AvatarWithFollowButton {...props}/>
//       </div>
//     </div>
//     <div className="user_dt_right">
//       <ul>
//         {props.post.type === "video"? <ViewsDisplay {...props}/> : <></>}
        
//         {props.post.type === "music"? <StreamsDisplay {...props}/> : <></>}
//         {/* <SongPlayButton {...props} /> */}
//         <LikeButton {...props}/>
//         <ShareButton {...props}/>
//         <PostImpressions {...props}/>
//       </ul>
//     </div>
//   </div>
//   {!loadingMusicPost? <div className="user_dt5">
//     <div className="user_dt_left">
//       <div className="live_user_dt">
//       {props.post.type === "music"? <SongPlayButton post={musicPost}  loggedInUser={props.loggedInUser}/> : <></>}
//       </div>
//     </div>
//     <div className="user_dt_right">
//       {props.post.type === "music"? <button className="btn btn-danger">Download</button> : <></>}
//     </div>
//   </div> : <>Loading...</>}
// </div>