'use client'

import React from "react"
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { signUserUp } from "@/Constants";
import { useRouter } from "next/router";
import PhoneNumberInput from "@/components/Includes/PhoneNumberInput/PhoneNumberInput";
import { textHasPhoneNumber } from "@/Functions";
import { Box } from "@mui/system";

export default class LocalSignUp extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        errorExists: false,
        showOtherCityInput: false,
        errorMessage: '',
        submitting: false,
        userExists: false,
        phoneNumber: null,
        countryCode: null,
        age: '',
        submittingText: 'Sign Up' 
      }
      this.username = React.createRef()
      this.password = React.createRef()
      this.town = React.createRef()
      this.otherTown = React.createRef()
      this.province = React.createRef()
      this.topWebsites = [
        "youbase", "facebook", "youtube", "google", "twitter", "instagram", "linkedin",
        "pinterest", "snapchat", "tiktok", "whatsapp", "reddit", "tumblr", "quora",
        "flickr", "vimeo", "dailymotion", "twitch", "medium", "wordpress", "blogspot",
        "weebly", "wix", "zoom", "slack", "discord", "github", "gitlab", "bitbucket",
        "paypal", "stripe", "shopify", "ebay", "amazon", "alibaba", "netflix", "hulu",
        "spotify", "soundcloud", "apple", "microsoft", "adobe", "yahoo", "bing", "duckduckgo",
        "airbnb", "uber", "lyft", "booking", "expedia", "tripadvisor", "cnn", "bbc",
        "nytimes", "forbes", "bloomberg", "guardian", "reuters", "aljazeera", "npr",
        "cnet", "techcrunch", "gizmodo", "engadget", "verge", "mashable", "buzzfeed",
        "vice", "vox", "wired", "huffpost", "medium", "kickstarter", "indiegogo", "patreon",
        "deviantart", "dribbble", "behance", "stackexchange", "stackoverflow", "leetcode",
        "hackerrank", "coursera", "edx", "udemy", "skillshare", "khanacademy", "codeacademy",
        "pluralsight", "zendesk", "salesforce", "trello", "asana", "jira", "notion",
        "dropbox", "onedrive", "google-drive", "icloud", "driverbase", "okrarides", "okramall"
      ]
   }

   handleChange = ()=>{
    this.setState({
          errorExists: false,
          userExists: false,
          submittingText: 'Sign Up',
          submitting: false
      })
  }

  
  containsTopWebsite = (username) => {
    return this.topWebsites.some((website) => username.toLowerCase().includes(website));
  }

  setOtherTown = (e)=>{
    if (e.target.value === "other") {
        this.setState({
          showOtherCityInput: true
        })
    } else {
        this.setState({
          showOtherCityInput:false
        })
    }
  }

  handleSubmit = async (e)=>{
    e.preventDefault()
    const username = this.username.current.value
    const password = this.password.current.value
    const town = this.town.current.value === "other"? this.otherTown.current.value : this.town.current.value  
    const province = this.province.current.value
    const phoneNumber = this.state.phoneNumber
    const age = this.state.age
    
    if(this.containsTopWebsite(username)){ // no user can use the youbase or socials username apart from youbase
      this.setState({
        errorExists: true,
        errorMessage: "To use this username, you must contact us." 
      })
      return
    }
    if(username.trim().length === 0 || password.trim().length === 0){
      this.setState({
        errorExists: true,
        errorMessage: "username or password can't be empty"
      })
      return
    }
    if(!textHasPhoneNumber(this.state.phoneNumber)){
      this.setState({
        errorExists: true,
        errorMessage: "please enter a valid phone number"
      })
      return
    }

    if(this.state.countryCode === "260" && !province && province.length === 0){
      this.setState({
        errorExists: true,
        errorMessage: "please enter your province"
      })
      return
    }
    if(this.state.countryCode === "260" && !town && town.trim().length === 0){
      this.setState({
        errorExists: true,
        errorMessage: "please enter your town"
      })
      return
    }
    
    if(!age || parseInt(age) < 1){
      this.setState({
        errorExists: true,
        errorMessage: "please enter your age"
      })
      return
    }

    const countryCode = !this.state.countryCode? '260' : this.state.countryCode // default country code is for zambia 
    const response = await signUserUp('local',username,password,countryCode, phoneNumber,province,town,age) 
    if(response.hasOwnProperty('error')){
      if(response.error.message === "userExists"){
        this.setState({
          errorExists: true,
          errorMessage: "user already exists, log in instead or choose another username"
        })
        return
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

  handleCountryCodeSelect = (code)=>{
    this.setState({
      countryCode: code
    })
  }
  handlePhoneNumberSelect = (number)=>{
    this.setState({
      phoneNumber: number
    })
  }

 handleAgeChange = (event) => {
    const age = event.target.value
    this.setState({
      age
    })
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
        {/* only for the default countrycode for zambia should a user select the location, for now */}
        {this.state.countryCode === '260'?<Box>
  <Typography variant="h6" sx={{fontWeight:'light',marginTop:'3px'}} gutterBottom align="left">
    Location
  </Typography>
  <Box display="flex" flexWrap="wrap" gap={2}>
    <FormControl fullWidth style={{ flex: 1 }}>
      <InputLabel id="province-label">Province</InputLabel>
      <Select
        labelId="province-label"
        inputRef={this.province}
        defaultValue=""
      >
        <MenuItem value="">-- Select a Province --</MenuItem>
        <MenuItem value="Central">Central</MenuItem>
        <MenuItem value="Copperbelt">Copperbelt</MenuItem>
        <MenuItem value="Eastern">Eastern</MenuItem>
        <MenuItem value="Luapula">Luapula</MenuItem>
        <MenuItem value="Lusaka">Lusaka</MenuItem>
        <MenuItem value="Muchinga">Muchinga</MenuItem>
        <MenuItem value="North-Western">North-Western</MenuItem>
        <MenuItem value="Northern">Northern</MenuItem>
        <MenuItem value="Southern">Southern</MenuItem>
        <MenuItem value="Western">Western</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth style={{ flex: 1 }}>
      <InputLabel id="city-label">City/Town</InputLabel>
      <Select
        labelId="city-label"
        inputRef={this.town}
        defaultValue=""
        onChange={this.setOtherTown}
      >
        <MenuItem value="">-- Select a city or town --</MenuItem>
        <MenuItem value="Lusaka">Lusaka</MenuItem>
        <MenuItem value="Ndola">Ndola</MenuItem>
        <MenuItem value="Kitwe">Kitwe</MenuItem>
        <MenuItem value="Kabwe">Kabwe</MenuItem>
        <MenuItem value="Chingola">Chingola</MenuItem>
        <MenuItem value="Mufulira">Mufulira</MenuItem>
        <MenuItem value="Livingstone">Livingstone</MenuItem>
        <MenuItem value="Luanshya">Luanshya</MenuItem>
        <MenuItem value="Chipata">Chipata</MenuItem>
        <MenuItem value="Chililabombwe">Chililabombwe</MenuItem>
        <MenuItem value="Kafue">Kafue</MenuItem>
        <MenuItem value="Kalulushi">Kalulushi</MenuItem>
        <MenuItem value="Mazabuka">Mazabuka</MenuItem>
        <MenuItem value="Mansa">Mansa</MenuItem>
        <MenuItem value="Solwezi">Solwezi</MenuItem>
        <MenuItem value="Choma">Choma</MenuItem>
        <MenuItem value="Mongu">Mongu</MenuItem>
        <MenuItem value="Kasama">Kasama</MenuItem>
        <MenuItem value="Mpika">Mpika</MenuItem>
        <MenuItem value="Sesheke">Sesheke</MenuItem>
        <MenuItem value="Kapiri Mposhi">Kapiri Mposhi</MenuItem>
        <MenuItem value="Nakonde">Nakonde</MenuItem>
        <MenuItem value="Kawambwa">Kawambwa</MenuItem>
        <MenuItem value="Petauke">Petauke</MenuItem>
        <MenuItem value="Samfya">Samfya</MenuItem>
        <MenuItem value="Kalabo">Kalabo</MenuItem>
        <MenuItem value="Siavonga">Siavonga</MenuItem>
        <MenuItem value="Lundazi">Lundazi</MenuItem>
        <MenuItem value="Mwinilunga">Mwinilunga</MenuItem>
        <MenuItem value="Kaoma">Kaoma</MenuItem>
        <MenuItem value="Chirundu">Chirundu</MenuItem>
        <MenuItem value="Kabompo">Kabompo</MenuItem>
        <MenuItem value="Isoka">Isoka</MenuItem>
        <MenuItem value="Mumbwa">Mumbwa</MenuItem>
        <MenuItem value="Monze">Monze</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  </Box>
  {this.state.showOtherCityInput && (
          <Box marginTop={2}>
            <TextField
              inputRef={this.otherTown}
              label="Enter the name of the city or town"
              fullWidth
            />
          </Box>
  )}
</Box>
 : <></>}
        <PhoneNumberInput setPhoneNumber={this.handlePhoneNumberSelect} setCountryCode={this.handleCountryCodeSelect}/>
        <TextField
            fullWidth
            label="Your Age"
            value={this.state.age}
            onChange={this.handleAgeChange}
            type="tel"
            placeholder="Enter your age"
          />
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