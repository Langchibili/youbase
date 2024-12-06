'use client'

// UTILITY FUNCTIONS

import { api_url, backEndUrl, getJwt, log } from "./Constants"
import { getJWT } from "./secrets";

export const createYouTubeEmbedLink = (url)=>{
  // Regular expression to match different YouTube URL formats
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|playlist\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // Extract the VIDEO_ID from the URL
  const match = url.match(regex);

  // If there's a match, return the embed URL, otherwise return null or handle invalid URLs
  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    return null; // Or handle invalid YouTube URLs as needed
  }
}

// Example usage:
const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const embedLink = createYouTubeEmbedLink(youtubeUrl);
log(embedLink); // Outputs: https://www.youtube.com/embed/dQw4w9WgXcQ

export const validateUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;

  if (!url || url.length === 0) {
      return null // for now it means no error
      // return 'URL cannot be empty.' // Optional: Check for empty input
  }

  if (!urlRegex.test(url)) {
    console.log(url)
      return 'Please enter a valid URL.'; // Error message for invalid URL
  }

  return null; // No error
}

const getIDFromDashedString = (dashed_title)=>{
    const parts = dashed_title.split('-')
    return parts[parts.length - 1]
}
export const generateDashedString = (str)=> {
  // Trim the string to 100 characters if it's longer
  let trimmedStr = str.length > 100 ? str.substring(0, 100) : str;
  // Replace spaces with dashes and return the result
  return trimmedStr.trim().replace(/\s+/g, '-');
}

export const generateUniqueText = ()=>{
    const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    const randomPart = Math.random().toString(36).substr(2, 9); // Random base-36 string
    return `untitled${timestamp}-${randomPart}`;
}

export const removeIdFromArray = (arr,id)=>{
    // Find the index of the element you want to remove
    let index = arr.indexOf(id);
    // Check if the element is found
    if (index !== -1) {
        // Remove the element at the found index
        arr.splice(index, 1);
    }
    return arr
}

export const dynamicConfig = (config="auto")=>{
    return config
}

export const handleCountsDisplay = (counts) => { // formating counts like: likes, views, shares, etc
    if(counts === null) return "0"
    if (parseInt(counts) >= 1_000_000_000) {
      return (parseInt(counts) / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B'
    } else if (parseInt(counts) >= 1_000_000) {
      return (parseInt(counts) / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M'
    } else if (parseInt(counts) >= 1_000) {
      return (parseInt(counts) / 1_000).toFixed(2).replace(/\.00$/, '') + 'K'
    } else {
      return counts.toString()
    }
  }

 export const truncateText = (text, maxLength)=> {
    if(!text){
      return ''
    }
    // Check if the text length exceeds the specified maxLength
    if (text.length > maxLength) {
        // Cut the text to the maxLength, subtracting 3 to account for the "..."
        return text.slice(0, maxLength - 3) + "...";
    }
    // If the text is within the limit, return it as is
    return text;
}

export const getImage = (image, size = "normal", use = "normal") => {
    // Default URLs for profile pictures and cover photos
    const defaultProfilePicture = "/default-profile.png"
    const defaultMusicCover = "/youbase-logo.png"
    const defaultCoverPhoto = "/no-cover-photo.jpg"

    // Check if the image object is valid and contains necessary attributes
    if (!image) {
        if(use === "music"){
          return defaultMusicCover
        }
        // If the image is not provided, return the appropriate default image based on the usage context
        return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
    }
  
    // Handle the first format where the image object contains 'attributes' property
    let formats, defaultUrl;
    let backendUrl = ''
    if (image.attributes) {
        formats = image.attributes.formats;
        defaultUrl = image.attributes.url || null;
        backendUrl = image.attributes.provider === "aws-s3"? '' : backEndUrl
    } else {
        // Handle the second format where the image object directly contains the necessary properties
        formats = image.formats;
        defaultUrl = image.url || null;
        backendUrl = image.provider === "aws-s3"? '' : backEndUrl
    }

    // Ensure formats exist before proceeding
    if (!formats) {
        if(!defaultUrl){
          if(use === "music"){
            return defaultMusicCover
          }
          return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
        }
        else{
          return backendUrl + defaultUrl
        }
    }
    
    
    // Return the appropriate image URL based on the requested size
    switch (size) {
        case "thumbnail":
            return formats.thumbnail?.url ? backendUrl + formats.thumbnail.url : backendUrl + defaultUrl;
        case "small":
            return formats.small?.url ? backendUrl + formats.small.url : backendUrl + defaultUrl;
        case "medium":
            return formats.medium?.url ? backendUrl + formats.medium.url : backendUrl + defaultUrl;
        case "large":
            return formats.large?.url ? backendUrl + formats.large.url : backendUrl + defaultUrl;
        default:
            return backendUrl + defaultUrl;
    }
}


  

// POSTS FUNCTIONS

export const createNewPost = async (data)=>{
    const post =  await fetch(api_url+'/posts', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => data)
    if(post && post.data && post.data.attributes){
        post.data.attributes.id = post.data.id
        return post.data.attributes
     }
    return null
}

export const updatePost = async (data,postId)=>{
  const post =  await fetch(api_url+'/posts/'+postId, {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(post && post.data && post.data.attributes){
      post.data.attributes.id = post.data.id
      return post.data.attributes
   }
  return null
}

export const getPosts = async (customUri=null,getMeta=false)=>{
  console.log(customUri)
  let posts = null
  if(customUri){
    posts = await fetch(customUri,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  else{
    posts = await fetch(api_url+'/posts',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  if(!posts || !posts.data){
    return posts
  }
  if(getMeta){
    return posts
  }
  return posts.data
 }

export const getPost = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post',post)
      
      if(post && post.data && post.data.attributes){
         post.data.attributes.id = post.data.id
         return post.data.attributes
      }
      return null
  }

  export const getPostFromId = async (postid,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    const post = await fetch(api_url+'/posts/'+postid+populate,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        log('this is a post',post)
         
        if(post && post.data && post.data.attributes){
           post.data.attributes.id = post.data.id
           return post.data.attributes
        }
        return null
  }

  export const getPostsByType = async (posttype,mediaOnly=false,populateString="")=>{
    let populate = '&populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    let requestUri = api_url+'/contents/?type='+posttype+populate
    if(mediaOnly){
      requestUri = api_url+'/contents/?type='+posttype+"&mediaOnly=true"+populate
    }
    const posts = await fetch(requestUri,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(posts){
           return posts
        }
        return null
  }

  export const getPostsBySeachAndType = async (search,posttype="all",mediaOnly=false,populateString="")=>{
    let populate = '&populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    let requestUri =  requestUri = api_url+'/contents/?type='+posttype+"&search="+search+populate
    if(mediaOnly){
     requestUri = api_url+'/contents/?type='+posttype+"&search="+search+"&mediaOnly=true"+populate    
    }
    const posts = await fetch(requestUri,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(posts){
           return posts
        }
        return null
  }

  export const getPostUser = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=user,user.details',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with user',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.user){
        post.data.attributes.user.data.attributes.id = post.data.attributes.user.data.id  // put the id inside the attributes object to reflect the way the logged in user object looks
        return post.data.attributes.user.data.attributes
      }
      return null
  }

  export const getPostEngagement = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=engagements',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with engagement',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.engagements){
        return post.data.attributes.engagements.data
     }
      return null
  }

  export const getPostComments = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=comments',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with comments',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.comments){
        return post.data.attributes.comments.data
     }
      return null
  }

  export const getPostMedia = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=media',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with media',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.media){
         return post.data.attributes.media.data
      }
      return null
  }

  export const getPostfeaturedImages = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=featuredImages',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with feauted images',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.featuredImages){
        return post.data.attributes.featuredImages.data
     }
     return null
  }

 // uploads stuff
 


 export const getMediaFile = async (uploadId)=>{
  const upload = await fetch(api_url+'/upload/files/'+uploadId,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
    log('this is a post with media',post)
    
    if(upload && upload.data && upload.data.attributes && upload.data.attributes.media){
       return upload.data.attributes.media.data
    }
    return null
}

export const getVideoMetaFromPostAndId = (post,videoId)=>{
  if(!post.extra_payload){
      return null
  }
  else{
     if(!post.extra_payload.media){
        return null
     }
     else{
       if(!post.extra_payload.media.videos){
          return null
       }
       else{
         return !post.extra_payload.media.videos[videoId]? null : post.extra_payload.media.videos[videoId]
       }
     }
  }
}
 //  logging and deleting an engagement to a post, like a like or view 

  const engagementMappings = {
    likes: {
        action: 'likedPosts',
        idArray: 'likedPostsIds',
        postBy: 'postLikedBy'
    },
    shares: {
        action: 'sharedPosts',
        idArray: 'sharedPostsIds',
        postBy: 'postSharedBy'
    },
    views: {
        action: 'viewedPosts',
        idArray: 'viewedPostsIds',
        postBy: 'postViewedBy'
    },
    plays: {
        action: 'playedPosts',
        idArray: 'playedPostsIds',
        postBy: 'postPlayedBy'
    },
    impressions: {
        action: 'seenPosts',
        idArray: 'seenPostsIds',
        postBy: 'postSeenBy'
    }
};


export const logEngagement = async (type, postId, loggedInUser, ctx,createNotification=()=>{})=> {
    const { action, idArray, postBy } = engagementMappings[type];

    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];
    
    if (!userEngagementIds.includes(postId)) {
        userEngagementIds.push(postId);
    }

    const updateUserObject = {
        [action]: { connect: [postId] },
        [idArray]: userEngagementIds
    };
    console.log('the engagement object',updateUserObject)
    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUserObject)
    }).then(response => response.json());

    if (response) {
        const postEngagements = parseInt(ctx.state.post[type] || 0);
        const updatePostObject = {
            data: {
                [postBy]: { connect: [loggedInUser.id] },
                [type]: postEngagements + 1
            }
        };
        const response2 = await fetch(`${api_url}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePostObject)
        }).then(response => response.json());
        if (response2) {
            if(type === "likes" || type === "shares"){
                createNotification() // send notification to respective parties
            }
            ctx.setState(prevState => {
                return {
                    ...prevState,
                    loggedInUser: {
                        ...prevState.loggedInUser,
                        user: {
                            ...prevState.loggedInUser.user,
                            [idArray]: response[idArray]
                        }
                    },
                    post: {
                        ...prevState.post,
                        [type]: postEngagements + 1
                    },
                    requesting: false
                };
            });
        }
    }
}

export const deleteEngagement = async (type, postId, loggedInUser, ctx)=> {
    const { action, idArray, postBy } = engagementMappings[type];

    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];

    userEngagementIds = userEngagementIds.filter(id => id !== postId);

    const updateUserObject = {
        [action]: { disconnect: [postId] },
        [idArray]: userEngagementIds
    };

    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUserObject)
    }).then(response => response.json());

    if (response) {
        const postEngagements = parseInt(ctx.state.post[type] || 1)
        const updatePostObject = {
            data: {
                [postBy]: { disconnect: [loggedInUser.id] },
                [type]: postEngagements - 1
            }
        };

        const response2 = await fetch(`${api_url}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePostObject)
        }).then(response => response.json());
        if (response2) {
            ctx.setState(prevState => {
                return {
                    ...prevState,
                    loggedInUser: {
                        ...prevState.loggedInUser,
                        user: {
                            ...prevState.loggedInUser.user,
                            [idArray]: response[idArray]
                        }
                    },
                    post: {
                        ...prevState.post,
                        [type]: postEngagements - 1
                    },
                    requesting: false
                }
            })
        }
    }
}
 


// USER FUNCTIONS

export const getUsers = async (customUri=null)=>{
  console.log(customUri)
  let users = null
  if(customUri){
    users = await fetch(customUri,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  else{
    users = await fetch(api_url+'/users',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  console.log(users)
  if(!users || !users.data){
    return users
  }
  return users
 }

export const getUserById = async (id,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }

    const response = await fetch(api_url+'/users/'+id+populate,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        if(response){
           return response
        }
        return null
}


export const getUserFromDashedId = async (dashedId,populateString)=>{
    const userId = getIDFromDashedString(dashedId)
    return await getUserById(userId,populateString)
}

   export const getUserFromUsername = async (username, populateString)=>{
    const response = await fetch(api_url+'/auths?username='+username,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
    if(!response.hasOwnProperty('user')){
       return null
    }    
    return await getUserById(response.user.id,populateString)
   }



   // notifications logging

   export const logNotification = async(title,userId,notifiedUserIds,contentType="user",contentId="")=>{
       const notificationObject = {
          data:{
            title: title,
            notifier: {connect: [parseInt(userId)]},
            notifiedUsers: { connect: notifiedUserIds},
            type: contentType
          }
       }
       console.log('inside notifications object',notificationObject)
       if(contentType === "post"){
           notificationObject.data.post = {connect: [parseInt(contentId)]}  
       }
       // if it is a user, then the activity logger is the user of interest
       await fetch(api_url+'/notifications', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationObject),
      })
      .then(response => response.json())
      .then(data => data)
   }