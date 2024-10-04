'use client'

import React from "react"
import { Alert } from '@mui/material';
import { signUserUp } from "@/Constants";
import { useRouter } from "next/router";

export default class LocalSignUp extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        errorExists: false,
        errorMessage: '',
        submitting: false,
        userExists: false,
        submittingText: 'Sign Up' 
      }
      this.username = React.createRef()
      this.password = React.createRef()
   }

   handleChange = ()=>{
    this.setState({
          errorExists: false,
          userExists: false,
          submittingText: 'Sign Up',
          submitting: false
      })
  }

  handleSubmit = async (e)=>{
    e.preventDefault()
    const username = this.username.current.value
    const password = this.password.current.value
    if(username.length === 0 || password.length === 0){
      this.setState({
        errorExists: true,
        errorMessage: "username or password can't be empty"
      })
      return
    }
    const response = await signUserUp('local',username,password) 
    if(response.hasOwnProperty('error')){
      if(response.error.message === "userExists"){
        if(typeof window !== "undefined"){
           window.location = "/signin"
        }
        // this.setState({
        //   userExists: true
        // })
      }
      else{
        this.setState({
          errorExists: true,
          userExists: false,
          errorMessage: response.error.message,
          submittingText: 'Sign Up',
          submitting: false
      })
      }
    }
  }

   render(){
    return (
        <form>
        <div className="ui search focus">
          <div className="ui left icon input swdh11 swdh19">
            <input
              onChange={this.handleChange}
              ref={this.username}
              className="prompt srch_explore"
              type="text"
              name="username"
              defaultValue=""
              id="username"
              required=""
              maxLength={64}
              placeholder="Username"
            />
          </div>
        </div>
        <div className="ui search focus mt-15">
          <div className="ui left icon input swdh11 swdh19">
            <input
              onChange={this.handleChange}
              ref={this.password}
              className="prompt srch_explore"
              type="password"
              name="password"
              defaultValue=""
              id="id_password"
              required=""
              maxLength={64}
              placeholder="Password"
            />
          </div>
        </div>
        <button onClick={this.handleSubmit} className="login-btn" type="submit">
          {this.state.submittingText}
        </button>
        {this.state.errorExists? <Alert severity='error' sx={{marginTop:1}}>{this.state.errorMessage}</Alert> : <></>}
        <br/>
        {this.state.userExists? <><RedirectUser url="/sigin"/></> : <></>}
      </form>
    )
   }
  }
  
  function RedirectUser(props){
    const router = useRouter();
    router.push(props.url)
    return <Alert severity='warning' sx={{marginTop:1}}>User Already Exists, Log In Instead...</Alert>
  }