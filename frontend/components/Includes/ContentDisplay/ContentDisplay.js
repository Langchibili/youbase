"use client"

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import TextPostMedium from '../PostsDisplay/TextPostMedium';
import ImagePostMedium from '../PostsDisplay/ImagePostMedium';
import VideoPostMedium from '../PostsDisplay/VideoPostMedium';
import MusicPostMedium from '../PostsDisplay/MusicPostMedium';
import EmbedPostMedium from '../PostsDisplay/EmbedPostMedium';
import { api_url } from '@/Constants';
import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay';
import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay';
import LikeButton from '@/components/Parts/EngageMents/LikeButton';
import ShareButton from '@/components/Parts/EngageMents/ShareButton';

export default function ContentDisplay(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(props.startPage);
  const [loading, setLoading] = useState(false);
  const [postIds, setPostIds] = useState([]);
  const observer = useRef();

  const loadMorePosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(api_url + `${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`);
      console.log('the posts', data);

      // Filter out duplicates
      const newPosts = data.data.filter(post => !postIds.includes(post.id));
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPostIds(prevIds => [...prevIds, ...newPosts.map(post => post.id)]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error loading posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  // Infinite scroll handler
  const lastPostRef = useRef();
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.5,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastPostRef.current) observer.current.observe(lastPostRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [lastPostRef]);

  const renderPostContent = (post, postEngagementsDisplay) => {
    switch (post.type) {
      case 'text':
        return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />;
      case 'image':
        return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />;
      case 'video':
        return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />;
      case 'music':
        return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />;
      case 'embed':
        return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props} />;
      default:
        return <></>;
    }
  };

  const postEngagementsDisplay = (post) => {
    return (
      <div className='inline-engagements-display'>
        <ul>
          {post.type === "video" && (
            <ViewsDisplay post={post} user={post.user.data.attributes} {...props} />
          )}
        </ul>
        <ul>
          {post.type === "music" && (
            <StreamsDisplay post={post} user={post.user.data.attributes} {...props} />
          )}
        </ul>
        <ul>
          <LikeButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
        <ul>
          <ShareButton post={post} user={post.user.data.attributes} {...props} />
        </ul>
      </div>
    );
  };

  return (
    <div>
      {posts.map((post, index) => {
        post.attributes.id = post.id /// add id to primary post content object
        const postAttributes = post.attributes;
        if (!postAttributes.user || postAttributes.status !== "published") return <></>;
        return (
          <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : null}>
            {renderPostContent(postAttributes, postEngagementsDisplay)}
          </div>
        );
      })}
      {loading && <div>Loading more...</div>}
    </div>
  );
}


// "use client"

// import { useEffect, useState, useRef } from 'react'
// import axios from 'axios';
// import TextPostMedium from '../PostsDisplay/TextPostMedium'
// import ImagePostMedium from '../PostsDisplay/ImagePostMedium'
// import VideoPostMedium from '../PostsDisplay/VideoPostMedium'
// import MusicPostMedium from '../PostsDisplay/MusicPostMedium'
// import EmbedPostMedium from '../PostsDisplay/EmbedPostMedium'
// import { api_url } from '@/Constants'
// import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay';
// import StreamsDisplay from '@/components/Parts/EngageMents/StreamsDisplay';
// import LikeButton from '@/components/Parts/EngageMents/LikeButton';
// import ShareButton from '@/components/Parts/EngageMents/ShareButton';

// export default function ContentDisplay(props){
//   const [posts, setPosts] = useState([])
//   const [page, setPage] = useState(props.startPage)
//   const [loading, setLoading] = useState(false)
//   const [postIds, setPostIds] = useState([])
//   const observer = useRef()
  
//   const loadMorePosts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(api_url+`${props.contentUri}&pagination[page]=${page}&pagination[pageSize]=${props.limit}&sort=createdAt:${props.sort}`)
//       console.log('the posts', data)
//       setPosts(prevPosts => [...prevPosts, ...data.data]);
//       setPage(prevPage => prevPage + 1);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error loading posts:', error);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadMorePosts();
//   }, []);

//   // Infinite scroll handler
//   const lastPostRef = useRef();
//   const handleObserver = (entries) => {
//     const target = entries[0];
//     if (target.isIntersecting) {
//       loadMorePosts();
//     }
//   };

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '20px',
//       threshold: 0.5
//     };
//     observer.current = new IntersectionObserver(handleObserver, options);
//     if (lastPostRef.current) observer.current.observe(lastPostRef.current);

//     return () => {
//       if (observer.current) observer.current.disconnect();
//     };
//   }, [lastPostRef]);

//   const renderPostContent = (post,postEngagementsDisplay) => {
//     switch (post.type) {
//       case 'text':
//         return <TextPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props}/>
//       case 'image':
//         return <ImagePostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props}/>
//       case 'video':
//         return <VideoPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props}/>
//       case 'music':
//         return <MusicPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props}/>
//       case 'embed':
//         return <EmbedPostMedium post={post} postEngagementsDisplay={postEngagementsDisplay} {...props}/>
//       default:
//         return <></>;
//     }
//   }

//  const postEngagementsDisplay = (post)=>{
//     return (
//       <div className='inline-engagements-display'>
//           <ul>
//           {post.type === "video"? <ViewsDisplay
//                                               post={post} 
//                                               user={post.user.data.attributes}
//                                               {...props}
//                                               /> : <></>}
//           </ul>
//           <ul>
//           {post.type === "music"? <StreamsDisplay 
//                                               post={post} 
//                                               user={post.user.data.attributes}
//                                               {...props}/> : <></>}
//           </ul>               
//           <ul>
//           <LikeButton                         post={post} 
//                                               user={post.user.data.attributes}
//                                               {...props}/> 
//           </ul>            
//           <ul>
//           <ShareButton                        post={post} 
//                                               user={post.user.data.attributes}
//                                               {...props}/>
//           </ul>  
//       </div>
//     )
//  }

//   return (
//     <div>
//       {posts.map((post, index) => {
//         if(postIds.includes(post.id)) { return <></> }
//         postIds.push(post.id)
//         setPostIds(postIds)
//         post.attributes.id = post.id
//         post.attributes.user.data.attributes.id = post.attributes.user.data.id
//         if(!post.attributes.user) return <></>
//         if(post.attributes.status !== "published") return <></>
//         return (<div key={index+post.id} ref={index === posts.length - 1? lastPostRef : null}>   
//                  {renderPostContent(post.attributes,postEngagementsDisplay)}
//                </div>)
//       })}
//       {loading && <div>Loading more...</div>}
//     </div>
//   );
// }



