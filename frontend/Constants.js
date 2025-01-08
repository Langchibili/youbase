'use client'

import { getJWT, saveJwt } from "./secrets"

export const youtubeApiKey = 'AIzaSyCpjeIW-IKAUQSZuc5bb0Ncx1ksxEB5J_8'


 /*localhost: */ export const environment = 'local'
 ///*liveserver1: */ export const environment = 'live'
 ///*liveserver2: */ export const environment = 'live2'
 ///*testserver: */ export const environment = 'test' // mvp will run here
 ///*local-liveserver-testing: */ export const environment = 'local-liveserver-testing' // testing the live server locally

// export the client side stuff

export const getJwt = getJWT

let apiurl, backendUrl, clienturl

 if(environment === 'local'){
   /*localhost: */  apiurl = 'http://localhost:1340/api'
 }
 else if(environment === 'live'){
   /*liveserver1: */ apiurl = 'https://api.youbase.app/api' // for production's sake
 }
 else if(environment === 'live2'){
  /*liveserver2: */ apiurl = 'https://api.youbase.com/api' // for production's sake
 }
 else if(environment === 'local-liveserver-testing'){
  /*local-liveserver-testing: */  apiurl = 'https://api.youbase.app/api'
 }
 else{ // if environment is default, it means it's a test server
  /*testserver: */  apiurl = 'https://youbaseapi.driverbase.app/api' // the api to be used when deployed to the test site
 }
// if(environment === 'local'){ // for testing on the phone
//   /*localhost: */  apiurl = 'http://192.168.27.143:1339/api'
// }


 // for removing the api part when handling /uploads and the like
 if(environment === 'local'){
  /*localhost: */  backendUrl = apiurl.replace('http://localhost:1340/api','http://localhost:1340')
 }
 else if(environment === 'live'){
  /*liveserver: */ backendUrl =  apiurl.replace('youbase.app/api','youbase.app') // for production's sake
 }
 else if(environment === 'live2'){
  /*liveserver: */ backendUrl =  apiurl.replace('youbase.com/api','youbase.com') // for production's sake
 }
 else if(environment === 'local-liveserver-testing'){
  /*liveserver: */ backendUrl =  apiurl.replace('youbase.app/api','youbase.app') // for testing the production environment api's sake
 }
 else{ // if environment is default, it means it's a test server
  /*testserver: */ backendUrl =  apiurl.replace('youbaseapi.driverbase.app/api','youbaseapi.driverbase.app') // the api to be used when deployed to the test site
 }
 

if(environment === 'local'){
  /*localhost: */  clienturl = 'http://localhost:3002'
}
else if(environment === 'live'){
  /*liveserver1: */ clienturl = 'https://youbase.app' // for production's sake
}
else if(environment === 'live2'){
   /*liveserver2: */ clienturl = 'https://youbase.com' // for production's sake
}
else if(environment === 'local-liveserver-testing'){
  /*local-liveserver-testing: */  clienturl = 'http://localhost:3002' // this is because we are testing the live server on our local machine
}
else{ // if environment is default, it means it's a test server
  /*testserver: */  clienturl = 'https://youbase.driverbase.app' // the api to be used when deployed to the test site
}

 

 export let api_url = apiurl
 export let backEndUrl = backendUrl
 export let clientUrl = clienturl
 

 export function log(...args) {
    if (environment === "local" || environment === 'local-liveserver-testing') {
      console.log(...args)
    } else {
      return // Do nothing on live or test servers unless environment is set to local
      }
 }

export const getFeature = async (featureId)=>{
    const feature = await fetch(api_url+'/app-features/'+featureId,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(feature && feature.data && feature.data.attributes){
         return feature.data.attributes.status
      }
      return null
  }
 
  

  const getUserAccount = async (jwt)=>{
    return await fetch(api_url+'/users/me',{
     headers: {
       'Authorization': `Bearer ${jwt}`,
       'Content-Type': 'application/json'
     }
   }).then(response => response.json())
     .then(data => data)
     .catch(error => console.error(error))
 }
 
 const getUserAccountWithUsernameAndPassword = async (username,password)=>{
  const authObject = {
    identifier: username,
    password: password
  } 
  return await fetch(api_url+'/auth/local', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(authObject),
  })
  .then(response => response.json())
  .then(data => data)
}

 const checkIfUserWithUsernameExists = async (username)=>{
  const response = await fetch(api_url+'/auths?username='+username,{
   headers: {
     'Content-Type': 'application/json'
   }
 }).then(response => response.json())
   .then(data => data)
   .catch(error => console.error(error))

   if(response.hasOwnProperty('user')) { 
    return true 
   } // means a user with the username exists
   return false
}

const updateDefaultUserAccountToSignUp = async (username,password,countryCode,phoneNumber,province,town,age)=>{
  const jwt = getJwt()
  if(!jwt){
    alert('could not create your account, reload the page and try again.')
    return
  }
  const user = await getUserAccount(jwt) // get the user account because you actually have the jwt
  const updateObject = {
    username: username,
    email:user.email,
    password: password,
    details:{
      countryCode: countryCode? countryCode: null,
      phoneNumber: phoneNumber? phoneNumber : null,
      province: province? province : null,
      town:town? town : null,
      age:age? age : null,
    },
    type:'loggedin',
    status: "published"
  }
  return await fetch(api_url+'/users/'+user.id, {
    method: 'PUT',
    headers: {
     'Authorization': `Bearer ${jwt}`,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateObject),
  })
  .then(response => response.json())
  .then(data => data)
}

const updateDefaultUserAccountToLogOut = async ()=>{
  let logOutStatus = false
  const jwt = getJwt()
  const user = await getUserAccount(jwt) // get the user account because you actually have the jwt
  const response =  await fetch(api_url+'/users/'+user.id, {
    method: 'PUT',
    headers: {
     'Authorization': `Bearer ${jwt}`,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({type:'default'}),
  })
  .then(response => response.json())
  .then(data => data)
  if(response.hasOwnProperty("username")){
     localStorage.removeItem('jwt') // because if someone attempts to log into another account using this client(browser or phone) they can log into this user's account because they have the same jwt
     logOutStatus = true
  }
  if(response && response.accountBlocked){
    window.location = "/blocked" // means you were logged out forcefully due to your account being blocked 
  }
  return logOutStatus
}

const updateDefaultUserAccountToLogIn = async (username,password)=>{
  const jwt = getJwt()
  const response = await getUserAccountWithUsernameAndPassword(username,password)
  let returnObject = response
  if(response.hasOwnProperty('jwt')){
    localStorage.removeItem('jwt') // remove whatever existing jwt
    saveJwt(response.jwt) // save new jwt
    const userUpdated = await fetch(api_url+'/users/'+response.user.id, {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${jwt}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({type:'loggedin'}),
    })
    .then(response => response.json())
    .then(data => data)
    if(response && response.user && response.user.accountBlocked){
      logUserOut() // if you are logged in but your account is blocked, then we log you out
    }
    if(returnObject.hasOwnProperty("username")){
      returnObject = userUpdated
    }
  }
  return returnObject
}

export const signUserUp = async (type,username="",password="", countryCode="", phoneNumber="",province="",town="",age="") => { // username and password only important if it's a local sign up
  if(type === "local"){
      const accountExists = await checkIfUserWithUsernameExists(username)  
      if(accountExists){
        return {
          error:{
              message: 'userExists'
          }
        }
      }
      else{
         const updatedUserAccount = await updateDefaultUserAccountToSignUp(username,password,countryCode,phoneNumber,province,town,age)
         if(updatedUserAccount.hasOwnProperty('error')){
          return {
            error:{
                message:  updatedUserAccount.error.message
            }
          }
         }
         window.location = "/" // means you are logged in
      }
    }
    else if(type === "facebook"){

    }
    else if(type === 'google'){

    }
}

export const logUserIn = async (type,username="",password="") =>{ // username and password only important if it's a local sign up
  // you supply the username and password and we log you in
  if(type === "local"){ 
    return await updateDefaultUserAccountToLogIn(username,password)
  }
  else if(type === "facebook"){

  }
  else if(type === 'google'){

  }
}

const submitCreateUserRequest = async (registerObject)=>{
  return await fetch(api_url+'/auth/local/register', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerObject),
    })
    .then(response => response.json())
    .then(data => data)
}

export const logUserOut = async ()=>{
  return await updateDefaultUserAccountToLogOut()
}

let lastGeneratedTime = 0; // Debounce timer for username generation
const generateUniqueUsername = () => {
  // debouncing to ensure only one unique username is made in 5 minutes
  const now = Date.now();
  const debounceTime = 5 * 60 * 1000; // 5 minutes in milliseconds

  // If the last username was generated within the debounce time, reuse the last username
  if (now - lastGeneratedTime < debounceTime && sessionStorage.getItem("generatedUsername")) {
    return sessionStorage.getItem("generatedUsername");
  }

  // Generate a new unique username
  const timestamp = now.toString(36); // Convert timestamp to a base-36 string
  const randomPart = Math.random().toString(36).substr(2, 9); // Random base-36 string
  const newUsername = `User${timestamp}-${randomPart}`;

  // Save the username in session storage and update the timer
  sessionStorage.setItem("generatedUsername", newUsername);
  lastGeneratedTime = now;

  return newUsername;
};

export const checkUserLogginStatus = async () => {
  const jwt = getJwt();
  const logginStatusObject = {
    user: null,
    status: false,
  };
  let userObject = {};

  if (!jwt) {
    const username = generateUniqueUsername(); // Generate a unique username
    userObject.username = username;
    userObject.email = `unset_${username}@email.com`;
    userObject.password = username;

    const defaultUser = await submitCreateUserRequest(userObject); // Make the user account
    logginStatusObject.user = defaultUser.user; // Current account is a default one
    logginStatusObject.status = false; // User has not logged in
    saveJwt(defaultUser.jwt); // Save the JWT of the default user
  } else {
    // Check if user is logged in or not, using JWT
    const user = await getUserAccount(jwt); // Get the user account because you actually have the JWT
    logginStatusObject.user = user;

    if (user.type && user.type === "default") {
      logginStatusObject.status = false;
    } else {
      logginStatusObject.status = true;
    }
  }

  return logginStatusObject;
}

const runPeriodicUserStatusChecks = async () => {
  // Perform the initial check immediately
  const loggedInUser = await checkUserLogginStatus()
  if (loggedInUser.user.accountBlocked) {
    if(loggedInUser.user.status){
      logUserOut() // if you are logged in, then we log you out
    }
    return // Stop further execution if the user is blocked
  }

  // Schedule subsequent checks to run every 5 minutes (300000 milliseconds)
  setInterval(async () => {
    const updatedUserStatus = await checkUserLogginStatus()
    if (updatedUserStatus.user.accountBlocked) {
      if(loggedInUser.user.status){
        logUserOut() // if you are logged in, then we log you out and redirect you to /blocked page to inform you
      }
    }
  }, 300000) // 5 minutes in milliseconds
}

if(typeof document !== "undefined"){ // only run the periodic check for login if it's in the
  runPeriodicUserStatusChecks()  
}
