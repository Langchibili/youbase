'use client'

import {  logUserOut } from "@/Constants";
import { useEffect } from "react";

export default function Signup() {
 
  // Custom hook to check if a feature is enabled
  useEffect(()=>{
   const runLogUserOut = async ()=> {
     const userLoggedOut = await logUserOut()
     if(userLoggedOut){
      if(typeof window !== "undefined"){
          window.location = "/"
      }
     }
     else{
      if(typeof window !== "undefined"){
         window.location = "/logout"
      }
      
     }
   }
   runLogUserOut()
  },[])


  return (
    <>
    logging you out...
    </>
  );
}
