// UTILITY FUNCTIONS

import { api_url, backEndUrl } from "./Constants"

const getPostIDFromDashedTitle = (dashed_title)=>{
    const parts = dashed_title.split('-')
    return parts[parts.length - 1]
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

// Example usage
const originalText = "This is a long piece of text that needs to be truncated.";
const truncatedText = truncateText(originalText, 20);
console.log(truncatedText); // Output: "This is a long pi..."
 
//   export const getImage = (image, size = "normal",use="normal") => {
//     if (!image || !image.attributes || !image.attributes.formats) {
//         if(use === "profilePicture") return "/default-profile.png"
//         return "/no-cover-photo.jpg"
//     }

//     const formats = image.attributes.formats;
//     const defaultUrl = image.attributes.url || null;

//     switch (size) {
//         case "thumbnail":
//             return backEndUrl+formats.thumbnail?.url || defaultUrl;
//         case "small":
//             return backEndUrl+formats.small?.url || defaultUrl;
//         case "medium":
//             return backEndUrl+formats.medium?.url || defaultUrl;
//         case "large":
//             return backEndUrl+formats.large?.url || defaultUrl;
//         default:
//             return backEndUrl+defaultUrl;
//     }
// }

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


export const getPost = async (title)=>{
    const postid = getPostIDFromDashedTitle(title)
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
    const postid = getPostIDFromDashedTitle(title)
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
    const postid = getPostIDFromDashedTitle(title)
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
    const postid = getPostIDFromDashedTitle(title)
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
    const postid = getPostIDFromDashedTitle(title)
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
    const postid = getPostIDFromDashedTitle(title)
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