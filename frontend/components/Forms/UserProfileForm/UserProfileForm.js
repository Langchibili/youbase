// 'use client'

// import Uploader from "@/components/Includes/Uploader/Uploader"
// import { api_url, getJwt } from "@/Constants"
// import { getImage, validateUrl } from "@/Functions"
// import React from "react"

// export default class UserProfileForm extends React.Component{
//    constructor(props){
//       super(props)
//       this.state = {
//         user: this.props.user,
//         profilePicture: this.props.user.profilePicture,
//         details: this.props.user.details || {},
//         socials: this.props.user.socials || {},
//         updating: false,
//         submittingText: "Save Changes",
//         errorExists: false,
//         errorText: <></>,
//         updated: false
//       }
//    }

//    handleProvinceChange = (event) => {
//       const newProvince = event.target.value
//       this.setState((prevState) => ({
//          details: { 
//             ...prevState.details, 
//             province: newProvince
//          },
//          submittingText: 'Save Changes',
//          updating: false,
//          errorExists: false,
//       }))
//    }

//    handleCityChange = (event) => {
//       const newCity = event.target.value
//       this.setState((prevState) => ({
//          details: { 
//             ...prevState.details, 
//             town: newCity
//          },
//          submittingText: 'Save Changes',
//          updating: false,
//          errorExists: false 
//       }))
//    }

//    addProfilePicture = (image) => {
//       this.setState({
//         profilePicture: image,
//         submittingText: 'Save Changes',
//         updating: false,
//         errorExists: false
//       })
//    }

//    handleSubmit = async ()=>{
//     const updateObject = {
//           details: this.state.details,
//           socials: this.state.socials
//     }
//     if(!updateObject.details.province){
//         delete updateObject.details.province
//     }
//     if(!updateObject.details.town){
//         delete updateObject.details.town
//     }
//     if(!updateObject.details.gender){
//         delete updateObject.details.gender
//     }
//     console.log('the update object',updateObject)
//     if(validateUrl(updateObject.socials.x) || validateUrl(updateObject.socials.facebook) || validateUrl(updateObject.socials.youtube) || validateUrl(updateObject.socials.tiktok) || validateUrl(updateObject.socials.youtube) || validateUrl(updateObject.socials.telegram)){
//         this.setState({
//             errorExists: true,
//             errorText: "Please Enter a valid URL"
//         })
//         return
//     }
//     this.setState({
//         errorExists: false,
//         updating: true,
//         submittingText: 'Updating...'
//      })
//     const response =  await fetch(api_url+'/users/'+this.state.user.id, {
//         method: 'PUT',
//         headers: {
//          'Authorization': `Bearer ${getJwt()}`,
//          'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateObject)
//       })
//      .then(response => response.json())
//      .then(data => data)
//      if(response){
//         this.setState({
//             errorExists: false,
//             submittingText: 'Saved'
//         })
//      }
//    }

//    render(){
//     return ( 
//         <>
//         <div className="account_setting" style={{marginTop:'0px'}}>
//         <div className="basic_profile" style={{marginTop:'0px'}}>
//             <div className="basic_ptitle" style={{marginTop:'0px'}}>
//             <p>Add information about yourself</p>
//             </div>
//             <h4>Update Profile Picture</h4>
//             <Uploader
//                     displayType="circular"
//                     refId={this.props.user.id}
//                     refName="plugin::users-permissions.user"
//                     fieldName="profilePicture"
//                     allowedTypes={['image/*']}
//                     allowMultiple={false}
//                     addProfilePicture={this.addProfilePicture}
//                 />
//             {this.state.profilePicture? <img src={getImage(this.state.profilePicture,'medium')} style={{width:'100%'}} alt="profile picture"/> : <></>}
//             <div className="basic_form">
//             <div className="row">
//                 <div className="col-lg-8">
//                 <div className="row">
//                     <div className="col-lg-6">
//                     <div className="ui search focus mt-30">
//                         <div className="ui left icon input swdh11 swdh19">
                        
//                         <input
//                             className="prompt srch_explore"
//                             type="text"
//                             name="name"
//                             value={this.state.details.firstname ?? ""}
//                             onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, details: { ...this.state.details, firstname: e.target.value } })}
//                             id="id[name]"
//                             required=""
//                             maxLength={64}
//                             placeholder="First Name"
//                         />
//                         </div>
//                     </div>
//                     </div>
//                     <div className="col-lg-6">
//                     <div className="ui search focus mt-30">
//                         <div className="ui left icon input swdh11 swdh19">
//                         <input
//                             className="prompt srch_explore"
//                             type="text"
//                             name="surname"
//                             value={this.state.details.lastname ?? ""}
//                             onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, details: { ...this.state.details, lastname: e.target.value } })}
//                             id="id[surname]"
//                             required=""
//                             maxLength={64}
//                             placeholder="Last Name"
//                         />
//                         </div>
//                     </div>
//                     </div>
                    
//                     <div className="col-lg-12">
//                     <div className="ui search focus mt-30">
//                         <div className="ui form swdh30">
//                         <div className="field">
//                             <textarea
//                             rows={3}
//                             name="description"
//                             id="id_about"
//                             placeholder="Write a little description about you..."
//                             value={this.state.details.about ?? ""}
//                             onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, details: { ...this.state.details, about: e.target.value } })}
//                             />
//                         </div>
//                         </div>
//                         <div className="help-block">
//                         Links and coupon codes are not permitted in this section.
//                         </div>
//                     </div>
//                     </div> 
//                     <div className="col-lg-6">
//                     <div className="ui search focus mt-30">
//                         <div className="ui left icon input swdh11 swdh19">
//                         <input
//                             className="prompt srch_explore"
//                             type="number"
//                             name="age"
//                             value={this.state.details.age ?? ""}
//                             onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, details: { ...this.state.details, age: e.target.value } })}
//                             id="id[age]"
//                             required
//                             maxLength={3}
//                             placeholder="Age"
//                         />
//                         </div>
//                     </div>
//                     </div>

//                     <div className="col-lg-6">
//                     <div className="ui search focus mt-30">
//                         <div className="ui form swdh19">
//                         <select
//                             className="prompt srch_explore"
//                             name="gender"
//                             value={this.state.details.gender ?? ""}
//                             onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, details: { ...this.state.details, gender: e.target.value } })}
//                             id="id[gender]"
//                             required
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                         </div>
//                     </div>
//                     </div>

//                     <div className="col-lg-12">
//                     <div className="divider-1" />
//                     </div>
//                     {/* Province Select */}
//                     <div className="col-lg-6">
//                         <div className="ui search focus mt-30">
//                         <div className="ui form swdh19">
//                             <select
//                                         className="prompt srch_explore"
//                                         value={this.state.details.province} 
//                                         onChange={this.handleProvinceChange}>
//                                         <label>Province &nbsp;</label>
//                                             <option value="">-- Select a Province --</option>
//                                             <option value="Central">Central</option>
//                                             <option value="Copperbelt">Copperbelt</option>
//                                             <option value="Eastern">Eastern</option>
//                                             <option value="Luapula">Luapula</option>
//                                             <option value="Lusaka">Lusaka</option>
//                                             <option value="Muchinga">Muchinga</option>
//                                             <option value="North-western">North-Western</option>
//                                             <option value="Northern">Northern</option>
//                                             <option value="Southern">Southern</option>
//                                             <option value="Western">Western</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                         </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="ui search focus mt-30">
//                         <div className="ui form swdh19">
//                             <select
//                                         className="prompt srch_explore" 
//                                         value={this.state.details.town} 
//                                         onChange={this.handleCityChange}>
//                                             <label>City/Town &nbsp;</label>
//                                             <option value="">-- Select a city or town --</option>
//                                             <option value="Lusaka">Lusaka</option>
//                                             <option value="Ndola">Ndola</option>
//                                             <option value="Kitwe">Kitwe</option>
//                                             <option value="Kabwe">Kabwe</option>
//                                             <option value="Chingola">Chingola</option>
//                                             <option value="Mufulira">Mufulira</option>
//                                             <option value="Livingstone">Livingstone</option>
//                                             <option value="Luanshya">Luanshya</option>
//                                             <option value="Chipata">Chipata</option>
//                                             <option value="Chililabombwe">Chililabombwe</option>
//                                             <option value="Kafue">Kafue</option>
//                                             <option value="Kalulushi">Kalulushi</option>
//                                             <option value="Mazabuka">Mazabuka</option>
//                                             <option value="Mansa">Mansa</option>
//                                             <option value="Solwezi">Solwezi</option>
//                                             <option value="Choma">Choma</option>
//                                             <option value="Mongu">Mongu</option>
//                                             <option value="Kasama">Kasama</option>
//                                             <option value="Mpika">Mpika</option>
//                                             <option value="Sesheke">Sesheke</option>
//                                             <option value="Kapiri Mposhi">Kapiri Mposhi</option>
//                                             <option value="Nakonde">Nakonde</option>
//                                             <option value="Kawambwa">Kawambwa</option>
//                                             <option value="Petauke">Petauke</option>
//                                             <option value="Samfya">Samfya</option>
//                                             <option value="Kalabo">Kalabo</option>
//                                             <option value="Siavonga">Siavonga</option>
//                                             <option value="Lundazi">Lundazi</option>
//                                             <option value="Mwinilunga">Mwinilunga</option>
//                                             <option value="Kaoma">Kaoma</option>
//                                             <option value="Chirundu">Chirundu</option>
//                                             <option value="Kabompo">Kabompo</option>
//                                             <option value="Isoka">Isoka</option>
//                                             <option value="Mumbwa">Mumbwa</option>
//                                             <option value="Monze">Monze</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                         </div>
//                         </div>
//                     </div>
//                     <div className="basic_profile1">
//                         <div className="basic_ptitle">
//                             <h4>Social Links</h4>
//                         </div>
//                         <div className="basic_form">
//                             <div className="row">
//                             <div className="col-lg-8">
//                                 <div className="row">

//                                 {/* Facebook */}
//                                 <div className="col-lg-12">
//                                     <div className="ui search focus mt-30">
//                                     <div className="ui left icon labeled input swdh11 swdh31">
//                                         <div className="ui label lb12">Facebook</div>
//                                         <input
//                                         className="prompt srch_explore"
//                                         type="text"
//                                         name="facebook"
//                                         value={this.state.socials.facebook ?? ""}
//                                         onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, socials: { ...this.state.socials, facebook: e.target.value } })}
//                                         id="id_facebook"
//                                         placeholder="Facebook URL"
//                                         />
//                                     </div>
//                                     </div>
//                                 </div>

//                                 {/* Instagram */}
//                                 <div className="col-lg-12">
//                                     <div className="ui search focus mt-30">
//                                     <div className="ui left icon labeled input swdh11 swdh31">
//                                         <div className="ui label lb12">Instagram</div>
//                                         <input
//                                         className="prompt srch_explore"
//                                         type="text"
//                                         name="instagram"
//                                         value={this.state.socials.instagram ?? ""}
//                                         onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, socials: { ...this.state.socials, instagram: e.target.value } })}
//                                         id="id_instagram"
//                                         placeholder="Instagram URL"
//                                         />
//                                     </div>
//                                     </div>
//                                 </div>

//                                 {/* Twitter (X) */}
//                                 <div className="col-lg-12">
//                                     <div className="ui search focus mt-30">
//                                     <div className="ui left icon labeled input swdh11 swdh31">
//                                         <div className="ui label lb12">Twitter (X)</div>
//                                         <input
//                                         className="prompt srch_explore"
//                                         type="text"
//                                         name="x"
//                                         value={this.state.socials.x ?? ""}
//                                         onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, socials: { ...this.state.socials, x: e.target.value } })}
//                                         id="id_x"
//                                         placeholder="Twitter (X) URL"
//                                         />
//                                     </div>
//                                     </div>
//                                 </div>

//                                 {/* TikTok */}
//                                 <div className="col-lg-12">
//                                     <div className="ui search focus mt-30">
//                                     <div className="ui left icon labeled input swdh11 swdh31">
//                                         <div className="ui label lb12">TikTok</div>
//                                         <input
//                                         className="prompt srch_explore"
//                                         type="text"
//                                         name="tiktok"
//                                         value={this.state.socials.tiktok ?? ""}
//                                         onChange={(e) => this.setState({ errorExists: false,  submittingText: 'Save Changes',updating: false, socials: { ...this.state.socials, tiktok: e.target.value } })}
//                                         id="id_tiktok"
//                                         placeholder="TikTok URL"
//                                         />
//                                     </div>
//                                     </div>
//                                 </div>

//                                 {/* YouTube */}
//                                 <div className="col-lg-12">
//                                     <div className="ui search focus mt-30">
//                                     <div className="ui left icon labeled input swdh11 swdh31">
//                                         <div className="ui label lb12">YouTube</div>
//                                         <input
//                                         className="prompt srch_explore"
//                                         type="text"
//                                         name="youtube"
//                                         value={this.state.socials.youtube ?? ""}
//                                         onChange={(e) => this.setState({ errorExists: false, submittingText: 'Save Changes',updating: false, socials: { ...this.state.socials, youtube: e.target.value } })}
//                                         id="id_youtube"
//                                         placeholder="YouTube URL"
//                                         />
//                                     </div>
//                                     </div>
//                                 </div>

//                                 </div>
//                             </div>
//                             </div>
//                         </div>
//                         </div>

//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         {/* Other profile links and save button code here */}
//         <button  disabled={this.state.updating} className="save_btn" type="submit" onClick={this.handleSubmit}>
//             {this.state.submittingText}
//         </button>
//         </div>
//        {this.state.errorExists? <p className="text text-danger">{this.state.errorText}</p> : <></>}
//         </>
//     )
//    }
// }

'use client'

import React from "react"
import { TextField, Button, Grid, Box, Typography, MenuItem, Select, FormControl, InputLabel, TextareaAutosize } from "@mui/material"
import { api_url, getJwt } from "@/Constants"
import { getImage, validateUrl } from "@/Functions"
import Uploader from "@/components/Includes/Uploader/Uploader"

export default class UserProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      profilePicture: this.props.user.profilePicture,
      details: this.props.user.details || {},
      socials: this.props.user.socials || {},
      updating: false,
      showOtherCityInput: false,
      submittingText: "Save Changes",
      errorExists: false,
      errorText: <></>,
      updated: false
    }
    this.otherTown = React.createRef()
    this.towns = [
        "Lusaka", "Ndola", "Kitwe", "Kabwe", "Chingola", "Mufulira", 
        "Livingstone", "Luanshya", "Chipata", "Chililabombwe", "Kafue", 
        "Kalulushi", "Mazabuka", "Mansa", "Solwezi", "Choma", "Chama", "Chinsali", "Mongu", 
        "Kasama", "Mpika", "Sesheke", "Kapiri Mposhi", "Nakonde", 
        "Kawambwa", "Petauke", "Samfya", "Kalabo", "Siavonga", 
        "Lundazi", "Mwinilunga", "Kaoma", "Chirundu", "Kabompo", 
        "Isoka", "Mumbwa", "Monze", "other"
    ]
    this.provinces = [
        "Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", 
        "Muchinga", "North-Western", "Northern", "Southern", "Western"
    ]
  }

  componentDidMount(){
    if(!this.towns.includes(this.state.details.town)){
        this.setState({
            showOtherCityInput: true
        })
    }
  }

  handleProvinceChange = (event) => {
    const newProvince = event.target.value
    this.setState((prevState) => ({
      details: { 
        ...prevState.details, 
        province: newProvince
      },
      submittingText: 'Save Changes',
      updating: false,
      errorExists: false,
    }))
  }

  handleOtherTownChange = (event) => {
    const newTown = event.target.value
    this.setState((prevState) => ({
      details: { 
        ...prevState.details, 
        town: newTown
      },
      submittingText: 'Save Changes',
      updating: false,
      errorExists: false,
    }))
  }
  
  handleCityChange = (event) => {
    const newCity = event.target.value
    if (newCity === "other") {
        this.setState({
          showOtherCityInput: true
        })
    } else {
        this.setState({
          showOtherCityInput:false
        })
    }
    this.setState((prevState) => ({
      details: { 
        ...prevState.details, 
        town: newCity
      },
      submittingText: 'Save Changes',
      updating: false,
      errorExists: false 
    }))
  }

  handleSocialChange = (platform, value) => {
    this.setState((prevState) => ({
      socials: { 
        ...prevState.socials, 
        [platform]: value 
      },
      submittingText: 'Save Changes',
      updating: false,
      errorExists: false,
    }))
  }

  addProfilePicture = (image) => {
    this.setState({
      profilePicture: image,
      submittingText: 'Save Changes',
      updating: false,
      errorExists: false
    })
  }

  handleSubmit = async () => {
    const updateObject = {
      details: this.state.details,
      socials: this.state.socials
    }
    if (!updateObject.details.province){
        this.setState({
            errorExists: true,
            errorText: "Please select a province"
          })
          return
    }
    if (!updateObject.details.town) {
       this.setState({
        errorExists: true,
            errorText: "Please select a town"
        })
        return
    }
    if (!updateObject.details.age) {
        this.setState({
         errorExists: true,
             errorText: "Please enter your age"
         })
         return
    }

    if (!updateObject.details.firstname || !updateObject.details.lastname) {
        this.setState({
         errorExists: true,
             errorText: "Please enter your fullnames"
         })
         return
    }
    
    if (!updateObject.details.gender) {
        updateObject.details.gender = null
    }

    if(updateObject.details.town === "other" && !this.otherTown.current.value.trim()){
        this.setState({
            errorExists: true,
            errorText: "Please enter a town"
          })
          return
    }
    if(validateUrl(updateObject.socials.x) || validateUrl(updateObject.socials.facebook) || validateUrl(updateObject.socials.youtube) || validateUrl(updateObject.socials.tiktok) || validateUrl(updateObject.socials.youtube) || validateUrl(updateObject.socials.telegram)){
        this.setState({
            errorExists: true,
            errorText: "Please Enter a valid URL"
        })
        return
    }
    this.setState({
      errorExists: false,
      updating: true,
      submittingText: 'Updating...'
    })

    const response = await fetch(api_url + '/users/' + this.state.user.id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateObject)
    }).then((res) => res.json())

    if (response) {
      this.setState({
        errorExists: false,
        submittingText: 'Saved',
        updating: false
      })
    }
  }

  render() {
    const { details, socials, profilePicture, submittingText, errorExists, errorText } = this.state

    return (
      <Box sx={{ maxWidth: "100%", margin: 'auto', padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>Update Your Profile</Typography>
        <Uploader
          displayType="circular"
          refId={this.props.user.id}
          refName="plugin::users-permissions.user"
          fieldName="profilePicture"
          allowedTypes={['image/*']}
          allowMultiple={false}
          addProfilePicture={this.addProfilePicture}
        />
        {profilePicture && (
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <img src={getImage(profilePicture, 'medium')} alt="Profile" style={{ borderRadius: '50%', width: 120, height: 120 }} />
          </Box>
        )}
        <Box>
        {/* names */}
        <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="First Name"
                    value={details.firstname || ""}
                    onChange={(e) => this.setState({ details: { ...details, firstname: e.target.value } })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Last Name"
                    value={details.lastname || ""}
                    onChange={(e) => this.setState({ details: { ...details, lastname: e.target.value } })}
                    />
          </Grid>
        </Grid>
        {/* age and gender */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <FormControl fullWidth style={{ flex: 1 }}>
                <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={details.age || ""}
                    onChange={(e) => this.setState({ details: { ...details, age: e.target.value } })}
                    />
             </FormControl>
            <FormControl fullWidth style={{ flex: 1 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                    value={details.gender || ""}
                    onChange={(e) => this.setState({ details: { ...details, gender: e.target.value } })}
                >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
             </FormControl>
        </Box>

        {/* location */}
        <Typography variant="h6" sx={{fontWeight:'light',marginTop:'3px'}} gutterBottom align="left">
            Location
        </Typography>
        
        <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControl fullWidth style={{ flex: 1 }}>
            <InputLabel id="province-label">Province</InputLabel>
            <Select
                labelId="province-label"
                defaultValue={details.province || ""}
                onChange={this.handleProvinceChange}
            >
                <MenuItem value="">-- Select a Province --</MenuItem>
                {this.provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                        {province}
                    </MenuItem>
                ))}
            </Select>

            </FormControl>
            <FormControl fullWidth style={{ flex: 1 }}>
            <InputLabel id="city-label">City/Town</InputLabel>
            <Select
                    labelId="city-label"
                    defaultValue={!this.towns.includes(this.state.details.town)? "other" : details.town}
                    onChange={this.handleCityChange}
                >
                    <MenuItem value="">-- Select a city or town --</MenuItem>
                    {this.towns.map((town) => (
                        <MenuItem key={town} value={town}>
                            {town}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
        {this.state.showOtherCityInput && (
          <Box marginTop={2}>
            <TextField
              onChange={this.handleOtherTownChange}
              defaultValue={details.town === 'other'? '' : details.town}
              inputRef={this.otherTown}
              label="Enter the name of the city or town"
              fullWidth
            />
          </Box>
  )}
         </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={4}
              style={{ width: "100%", padding: 10, borderRadius: 4 }}
              placeholder="Write a little description about you..."
              value={details.about ?? ""}
              onChange={(e) =>
                this.setState({ details: { ...details, about: e.target.value } })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Social Media Links</Typography>
          </Grid>
          {['Facebook', 'Twitter', 'YouTube', 'TikTok', 'Telegram'].map((platform) => (
            <Grid item xs={12} sm={6} key={platform}>
              <TextField
                fullWidth
                label={platform}
                value={socials[platform.toLowerCase()] || ""}
                onChange={(e) => this.handleSocialChange(platform.toLowerCase(), e.target.value)}
              />
            </Grid>
          ))}
          {errorExists && (
            <Grid item xs={12}>
              <Typography color="error">{errorText}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              disabled={this.state.updating}
            >
              {submittingText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }
}
