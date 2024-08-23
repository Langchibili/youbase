// UTILITY FUNCTIONS

import { api_url, backEndUrl, getJwt } from "./Constants"

const getIDFromDashedString = (dashed_title)=>{
    const parts = dashed_title.split('-')
    return parts[parts.length - 1]
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

export const handleCountsDisplay = (counts) => { // formating counts like: likes, views, shares, etc
    if(counts === null) return "0"
    if (counts >= 1_000_000_000) {
      return (counts / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B'
    } else if (counts >= 1_000_000) {
      return (counts / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M'
    } else if (counts >= 1_000) {
      return (counts / 1_000).toFixed(2).replace(/\.00$/, '') + 'K'
    } else {
      return counts.toString()
    }
  }

 export const truncateText = (text, maxLength)=> {
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
    const defaultProfilePicture = "/default-profile.png";
    const defaultCoverPhoto = "/no-cover-photo.jpg";

    // Check if the image object is valid and contains necessary attributes
    if (!image) {
        // If the image is not provided, return the appropriate default image based on the usage context
        return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
    }

    // Handle the first format where the image object contains 'attributes' property
    let formats, defaultUrl;
    if (image.attributes) {
        formats = image.attributes.formats;
        defaultUrl = image.attributes.url || null;
    } else {
        // Handle the second format where the image object directly contains the necessary properties
        formats = image.formats;
        defaultUrl = image.url || null;
    }

    // Ensure formats exist before proceeding
    if (!formats) {
        return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
    }

    // Return the appropriate image URL based on the requested size
    switch (size) {
        case "thumbnail":
            return formats.thumbnail?.url ? backEndUrl + formats.thumbnail.url : backEndUrl + defaultUrl;
        case "small":
            return formats.small?.url ? backEndUrl + formats.small.url : backEndUrl + defaultUrl;
        case "medium":
            return formats.medium?.url ? backEndUrl + formats.medium.url : backEndUrl + defaultUrl;
        case "large":
            return formats.large?.url ? backEndUrl + formats.large.url : backEndUrl + defaultUrl;
        default:
            return backEndUrl + defaultUrl;
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


export const getPost = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      console.log('this is a post',post)
      
      if(post && post.data && post.data.attributes){
         post.data.attributes.id = post.data.id
         return post.data.attributes
      }
      return null
  }

  export const getPostFromId = async (postid)=>{
    const post = await fetch(api_url+'/posts/'+postid,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        console.log('this is a post',post)
        
        if(post && post.data && post.data.attributes){
           post.data.attributes.id = post.data.id
           return post.data.attributes
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
      console.log('this is a post with user',post)
      
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
      console.log('this is a post with engagement',post)
      
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
      console.log('this is a post with comments',post)
      
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
      console.log('this is a post with media',post)
      
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
      console.log('this is a post with feauted images',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.featuredImages){
        return post.data.attributes.featuredImages.data
     }
     return null
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