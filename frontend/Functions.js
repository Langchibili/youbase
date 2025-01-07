'use client'

// UTILITY FUNCTIONS

import { api_url, backEndUrl, clientUrl, getJwt, log } from "./Constants"
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

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const textHasPhoneNumber = (text)=>{
  // Regular expression to match sequences of digits that are 8 characters or longer
  const phoneNumberRegex = /[0-9]{9,}/;
  // Use the test method to check if the text contains a phone number
  return phoneNumberRegex.test(text);
} 

const getIDFromDashedString = (dashed_title)=>{
    const parts = dashed_title.split('-')
    return parts[parts.length - 1]
}

export const generateDashedString = (str) => {
  if(!str){
    return 
  }
  // Trim the string to 100 characters if it's longer
  let trimmedStr = str.length > 100 ? str.substring(0, 100) : str;

  // Remove all unwanted characters (anything not a word, digit, or space)
  let cleanedStr = trimmedStr.replace(/[^a-zA-Z0-9\s-]/g, '');

  // Replace multiple spaces or dashes with a single dash
  let dashedStr = cleanedStr.trim().replace(/[\s-]+/g, '-');

  return dashedStr.toLowerCase(); // Convert to lowercase for URL friendliness
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
   if(!counts){
     return <></>
   } 
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

export const getVideoThumbnail = (video,post) => {
  if(video.provider === "aws-s3"){
    return video.previewUrl? video.previewUrl : null // this is bound to change
  }
  else{
    return video.previewUrl? backEndUrl+video.previewUrl : null // this is bound to change
  }
  const videoMeta = getVideoMetaFromPostAndId(post,video.id)
  // Default URLs for profile pictures and cover photos
  const defaultProfilePicture = "/default-profile.png"
  const defaultMusicCover = "/youbase-logo.png"
  const defaultCoverPhoto = "/no-cover-photo.jpg"
  return videoMeta

  // Check if the image object is valid and contains necessary attributes
  if (!videoId) {
      if(use === "music"){
        return defaultMusicCover
      }
      // If the image is not provided, return the appropriate default image based on the usage context
      return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
  }
}

export const getImage = (image, size = "normal", use = "normal") => {
    // Default URLs for profile pictures and cover photos
    const defaultProfilePicture = "/default-profile.png"
    const defaultMusicCover = "/youbase-logo.png"
    const defaultCoverPhoto = "/no-cover-photo.jpg"

    // Check if the image object is valid and contains necessary attributes
    if (!image) {
        if(use === "music" || use === "notifications"){
          return defaultMusicCover
        }
        if(use === "blank"){
          return '' // then return a blank url if no url exists for the image 
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
          if(use === "music" || use === "notifications"){
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

export const displayDateOrTime = (createdAt,returnTextOnly=false) => {
  const contentCreatedAt = new Date(createdAt);
  const now = new Date();
  const timeDifference = Math.abs(now - contentCreatedAt); // Difference in milliseconds

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);
  
  if(returnTextOnly){
    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (weeks < 52) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  }
  else{
    if (seconds < 60) {
      return <span>Just now</span>;
    } else if (minutes < 60) {
      return <span>{minutes} minute{minutes > 1 ? "s" : ""} ago</span>;
    } else if (hours < 24) {
      return <span>{hours} hour{hours > 1 ? "s" : ""} ago</span>;
    } else if (days < 7) {
      return <span>{days} day{days > 1 ? "s" : ""} ago</span>;
    } else if (weeks < 52) {
      return <span>{weeks} week{weeks > 1 ? "s" : ""} ago</span>;
    } else {
      return <span>{years} year{years > 1 ? "s" : ""} ago</span>;
    }
  }
}

export const fetchContentMetaOnly = async (contentUri, pageSizeOverride = null) => {
  try {
      // Fetch the content, requesting no fields to reduce the payload
      const response = await fetch(`${contentUri}&pagination[withCount]=true&fields=`)
      const result = await response.json()

      // Extract the meta information
      const meta = result?.meta?.pagination || {}

      // Calculate pageSize if it's missing
      const pageSize = meta.pageSize || pageSizeOverride || (meta.total && meta.pageCount ? Math.ceil(meta.total / meta.pageCount) : null)

      // Return only the meta object with the calculated pageSize
      return {
          ...meta,
          pageSize,
      }
  } catch (error) {
      console.error("Error fetching meta:", error)
      throw new Error("Failed to fetch meta")
  }
}

export const getContentCount = async ({
  contentName,
  contentToFilterById = null,
  idField = "user",
  status = "published",
  orderByFieldName = "id",
  orderType = "desc",
}) => {
  try {
      // Construct the base URL
      let url = `${api_url}/${contentName}?pagination[limit]=0&pagination[withCount]=true&sort=${orderByFieldName}:${orderType}`

      // Add filtering for contentToFilterById if provided
      if (contentToFilterById) {
          url += `&filters[${idField}][id][$eq]=${contentToFilterById}`
      }

      // Add status filter only if the content is 'posts'
      if (contentName === "posts" && status) {
          url += `&filters[status][$eq]=${status}`
      }

      // Fetch the data
      const response = await fetch(url, {
          headers: {
              "Content-Type": "application/json",
          },
      })

      const data = await response.json()

      // Return the count if meta and pagination exist
      if (data?.meta?.pagination) {
          return data.meta.pagination.total
      }
      // Fallback if count is not available
      return null
  } catch (error) {
      console.error("Error fetching content count:", error)
      return null
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

export const createBugReport = async (data)=>{
   await fetch(api_url+'/bug-reports', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
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

  export const pushCategories = async (categoryNames,existingCategoryNames,parentCategoryName,postId)=>{
    const parentCategory = await getCategoryByName(parentCategoryName)
    categoryNames.forEach(async (categoryName) => {
           const newCategoryObject = {
              categoryName: categoryName,
              parentCategories:{connect:[parentCategory.id]},
              posts:{connect:[postId]}
           }
           const updateCategoryObject = {
              posts:{connect:[postId]}
           }
           const category = await getCategoryByName(categoryName)
           if(category){ // means the category does exist, so push in new post
                 if(!existingCategoryNames.includes(categoryName)){ // only run an update when the category doesn't exist to the post
                    updateCategory({data:updateCategoryObject}, category.id)
                 }
           }     
           else{ // otherwise category doesn't exist so create new one and push in new post
               createNewCategory({data:newCategoryObject})
           }
           
      })
      // only if the post has existing categories added
      existingCategoryNames.forEach(async(existingCategoryName)=>{ // remove the post from the category which a user has disselected
        const updateCategoryObject = {
          posts:{disconnect:[postId]}
        }
        const category = await getCategoryByName(existingCategoryName)
        if(!categoryNames.includes(existingCategoryName)){
          updateCategory({data:updateCategoryObject}, category.id)
        }
      })
  }

  

  export const getCategoryByName = async (categoryName)=>{
    console.log('the category name',api_url+'/categories?filters[categoryName][$contains]='+categoryName)
    const category = await fetch(api_url+'/categories?filters[categoryName][$contains]='+categoryName,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        console.log('the category name',category) 
        if(category && category.data && category.data[0] && category.data[0].attributes){
           category.data[0].attributes.id = category.data[0].id
           return category.data[0].attributes
        }
        return null
  }


  

export const createNewCategory = async (data)=>{
  const category =  await fetch(api_url+'/categories', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(category && category.data && category.data.attributes){
      category.data.attributes.id = category.data.id
      return category.data.attributes
  }
  return null
}


export const updateCategory = async (data,categoryId)=>{
  const category =  await fetch(api_url+'/categories/'+categoryId, {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(category && category.data && category.data.attributes){
      category.data.attributes.id = category.data.id
      return category.data.attributes
   }
  return null
}
  
  export const getCategoryNames = async (parentCategory=null)=>{
    const categoryNames = await fetch(api_url+'/category-name',{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(categoryNames && categoryNames.data && categoryNames.data.attributes){
           if(parentCategory === 'videos'){
            return categoryNames.data.attributes.videosCategories
           }
           else if(parentCategory === 'music'){
            return categoryNames.data.attributes.musicCategories
           }
           else if(parentCategory === 'images'){
            return categoryNames.data.attributes.imageCategories
           }
           else if(parentCategory === 'text'){
            return categoryNames.data.attributes.textCategories
           }
           return categoryNames.data.attributes.CategoryNamesList
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

  export const getPostParentComments = async (postid)=>{
    const post = await fetch(api_url+'/posts/'+postid+'?populate=comments,comments.parentComment',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(post && post.data && post.data.attributes && post.data.attributes.comments){
        return post.data.attributes.comments.data.filter((comment)=>{ // return only posts without a parentcomment
            if(!comment.attributes.parentComment.data){
              return true
            }
        })
      }
      return null
  }

  export const createNewComment = async (data)=>{
    const comment =  await fetch(api_url+'/comments', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => data)
    if(comment && comment.data && comment.data.attributes){
        comment.data.attributes.id = comment.data.id
        return comment.data.attributes
     }
    return null
}

  export const getCommentReplies = async (commentId)=>{
    const comment = await fetch(api_url+'/comments/'+commentId+'?populate=replies',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(comment && comment.data && comment.data.attributes && comment.data.attributes.replies){
        return comment.data.attributes.replies.data
      }
      return null
  }

  export const getCommentsCount = async (postId)=>{
    const post = await fetch(api_url+'/comments?filters[post][id][$eq]='+postId+'&pagination[limit]=0&pagination[withCount]=true',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(post && post.meta && post.meta.pagination){
        return post.meta.pagination.total
      }
      return null
  }

  export const getUserPostsCount = async (userId)=>{
    const post = await fetch(`${api_url}/posts?filters[user][id][$eq]=${userId}&filters[status][$eq]=published&pagination[limit]=0&pagination[withCount]=true`,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      console.log('the posts count',post)
      if(post && post.meta && post.meta.pagination){
        return post.meta.pagination.total
      }
      return null
  }

  export const getRepliesCount = async (commentId)=>{
    const comment = await fetch(api_url+'/comments?filters[parentComment][id][$eq]='+commentId+'&pagination[limit]=0&pagination[withCount]=true',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(comment && comment.meta && comment.meta.pagination){
        return comment.meta.pagination.total
      }
      return null
  }

  export const getCommentFromId = async (commentId,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    const comment = await fetch(api_url+'/comments/'+commentId+populate,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(comment && comment.data && comment.data.attributes){
           comment.data.attributes.id = comment.data.id
           return comment.data.attributes
        }
        return null
  }

  export const updateCommentEngagement = async (userId,postId)=>{
    const postUser = await getUserWithOnlySpecifiedFields(userId,"fields=totalEngagement&fields=commentsCount")
    const post = await getPostWithOnlySpecifiedFields(postId,"fields=totalEngagement&fields=commentsCount")
    const userCountUpdateObject = {
         commentsCount: parseInt(postUser.commentsCount || 0) + 1,
         totalEngagement: parseInt(postUser.totalEngagement || 0)+ 1
    }
    const postCountUpdateObject = {
      data:{
        commentsCount: parseInt(post.commentsCount || 0) + 1,
        totalEngagement: parseInt(post.totalEngagement || 0) + 1
      }
    } 
    await fetch(`${api_url}/users/${userId}`, { // update user account
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCountUpdateObject)
     })
     updatePost(postCountUpdateObject,postId) // update post account
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

 export const getUserWithOnlySpecifiedFields = async (id,fieldString)=>{
    let fields = "?"+fieldString
    if(fieldString.length === 0){
       fields = "*" // it means populate nothing
    }
    const response = await fetch(api_url+'/users/'+id+fields,{
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

export const getPostWithOnlySpecifiedFields = async (id,fieldString)=>{
  let fields = "?"+fieldString
  if(fieldString.length === 0){
     fields = "*" // it means populate nothing
  }
  const post = await fetch(api_url+'/posts/'+id+fields,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
    if(post && post.data && post.data.attributes){
      return post.data.attributes
    }
    return null
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
  // getting the user's current count, to avoid 2 users who have clicked or engaged concurrently having their engagements added as one
  // but when updating the logged in user, it's ok to update directly, because it's dependent on you yourself taking an action at a time
  const postUser = await getUserWithOnlySpecifiedFields(ctx.state.post.user.data.id,"fields=totalEngagement&fields="+type)  
  const post = await getPostWithOnlySpecifiedFields(postId,"fields=totalEngagement&fields="+type)  
  
  const { action, idArray, postBy } = engagementMappings[type];
    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];
    // the other user or the user who posted should have their engagement count incremented
    const userEngagementCount = parseInt(postUser[type] || 0)
    const userTotalEngagementCount = parseInt(postUser.totalEngagement || 0)
    
    if (!userEngagementIds.includes(postId)) {
        userEngagementIds.push(postId);
    }

    const updateLoggedInUserObject = {
        [action]: { connect: [postId] },
        [idArray]: userEngagementIds,
    }
    const updatePostUserObject = {
        [type]: userEngagementCount + 1,
        totalEngagement: userTotalEngagementCount + 1
    }
     
    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateLoggedInUserObject)
    }).then(response => response.json());

    if (response) {
        const postEngagements = parseInt(post[type] || 0);
        const postTotalEngagementCount = parseInt(post.totalEngagement || 0)
    
        const updatePostObject = {
            data: {
                [postBy]: { connect: [loggedInUser.id] },
                [type]: postEngagements + 1,
                totalEngagement: postTotalEngagementCount + 1
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
        // update the postUser's engagements count
        await fetch(`${api_url}/users/${ctx.state.post.user.data.id}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${getJwt()}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePostUserObject)
        }).then(response => response.json());
  
        if (response2) { // update the state to show the engagement on the post
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
            if(type === "likes" || type === "shares"){
              createNotification() // send notification to respective parties
            }
        }
    }
}

export const deleteEngagement = async (type, postId, loggedInUser, ctx)=> {
    const postUser = await getUserWithOnlySpecifiedFields(ctx.state.post.user.data.id,"fields=totalEngagement&fields="+type)  
    const post = await getPostWithOnlySpecifiedFields(postId,"fields=totalEngagement&fields="+type)  
    const { action, idArray, postBy } = engagementMappings[type];

    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];

    userEngagementIds = userEngagementIds.filter(id => id !== postId);
    // the other user or the user who posted should have their engagement count decremented
    const userEngagementCount = parseInt(postUser[type] || 1)
    const userTotalEngagementCount = parseInt(postUser.totalEngagement || 1)
    
    const updateLoggedInUserObject = {
      [action]: { disconnect: [postId] },
      [idArray]: userEngagementIds,
    }
    const updatePostUserObject = {
        [type]: userEngagementCount - 1,
        totalEngagement: userTotalEngagementCount - 1
    }
   
    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateLoggedInUserObject)
    }).then(response => response.json());

    if (response) { // delete engagement to post
        const postEngagements = parseInt(post[type] || 0);
        const postTotalEngagementCount = parseInt(post.totalEngagement || 1)
        
        const updatePostObject = {
            data: {
                [postBy]: { disconnect: [loggedInUser.id] },
                [type]: postEngagements - 1,
                totalEngagement: postTotalEngagementCount - 1
            }
        }
        // update the postUser's engagements count
        await fetch(`${api_url}/users/${ctx.state.post.user.data.id}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${getJwt()}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePostUserObject)
        }).then(response => response.json())

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


   export async function sendPushNotification(title,body,targetUserIds,url="",image="/youbase-logo.png",payload=""){
   
    const notificationObject =  {
          data: {
              title: title,
              body: body,
              image_path: image === "/youbase-logo.png"? clientUrl+"/youbase-logo.png" : image,
              payload: payload,
              targetUserIds: targetUserIds,
              clickAction: url
          }
    }
    fetch(api_url+'/send-fc-mnotifications', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getJwt()}`
      },
      body: JSON.stringify(notificationObject)
    })
  }