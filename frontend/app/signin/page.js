"use client"

import { checkUserLogginStatus, getFeature } from "@/Constants";
import LocalLogin from "@/components/Forms/LocalLogin/LocalLogin";
import FaceBookSignIn from "@/components/Includes/FaceBookSignIn/FaceBookSignIn";
import GoogleSignIn from "@/components/Includes/GoogleSingIn/GoogleSignIn";
import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Alert } from "@mui/material";
import { useUser } from "@/Contexts/UserContext";

export default function Signin() {
  const loggedInUser = useUser()
  // Custom hook to check if a feature is enabled
  function useFeature(featureId) {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(()=>{
      function runcheckUserLogginStatus(){
        checkUserLogginStatus()
      }
      runcheckUserLogginStatus()
    },[])

    useEffect(() => { 
      async function checkFeature() {
        const status = await getFeature(featureId);
        if (status) {
          setIsEnabled(true);
        }
      }
      checkFeature();
    }, [featureId]);

    return isEnabled;
  }

  // Using numerical IDs for features
  const isFacebookEnabled = useFeature(4);  // Assuming 4 is the ID for Facebook login
  const isGoogleEnabled = useFeature(3);    // Assuming 3 is the ID for Google login
  if(loggedInUser.status){
    return <Alert severity="info">You are already logged in, log out to into another account</Alert>
  }
  return (
    <>
    <Head>
        <title>Sign Up - Youbase</title>
        <meta name="description" content="Sign up and start creating on Youbase!" />
      </Head>
    <div className="sign_in_up_bg">
            <div className="container">
                <div className="row justify-content-lg-center justify-content-md-center">
                {/* <div className="col-lg-12">
                    <div className="main_logo25" id="logo">
                    <a href="index.html">
                        <img src="/youbase-logo.png" alt="" />
                    </a>
                    <a href="index.html">
                        <img className="logo-inverse" src="/youbase-logo.png" alt="" />
                    </a>
                    </div>
                </div> */}
                <div className="col-lg-6 col-md-8">
                    <div className="sign_form">
                    <h2>Welcome Back</h2>
                    <p>Log In to Your Youbase Account!</p>
                    {isFacebookEnabled && <FaceBookSignIn />}
                    {isGoogleEnabled && <GoogleSignIn />}
                    <div style={{marginTop:10}}><strong>OR</strong></div>
                     <LocalLogin/>
                    <p className="sgntrm145">
                        Or <Link href="/support">Forgot Password</Link>.
                    </p>
                    <p className="mb-0 mt-30 hvsng145">
                      {"  Don't"} have an account? <Link href="/signup">Sign Up</Link>
                    </p>
                    </div>
                    <div className="sign_footer">
                    <img src="images/sign_logo.png" alt="" />© 2024{" "}
                    <strong>Youbase</strong>. All Rights Reserved.
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
  );
}
