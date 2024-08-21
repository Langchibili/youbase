'use client'

import {  logUserOut } from "@/Constants";
import { useEffect } from "react";

export default function Signup() {
 
  // Custom hook to check if a feature is enabled
  useEffect(()=>{
   const runLogUserOut = async ()=> {
     const userLoggedOut = await logUserOut()
     if(userLoggedOut){
      window.location = "/"
     }
     else{
      window.location = "/logout"
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
