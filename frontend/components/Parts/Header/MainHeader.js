'use client'

import CreatePostButton from "@/components/Includes/CreatePostButton/CreatePostButton"
import React, { useEffect } from "react"
import AvatarOnly from "../UserDisplay/AvatarOnly"
import Link from "next/link"
import { getUserById, handleCountsDisplay, truncateText } from "@/Functions"
import SearchModal from "@/components/Includes/Modals/SearchModal"
import NotificationsDisplay from "@/components/Includes/NofiticationsDisplay/NotificationsDisplay"
import { Button } from "@mui/material"
import { Feed, FeedOutlined } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default class MainHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          fullnames: "",
          RedirectUserToFeedPage: false
        }
     }
  
     async componentDidMount(){ 
      if(!this.props.loggedInUser.status){ // no need to make a request when a user is logged out
        return
      }
      const user = await getUserById(this.props.loggedInUser.user.id,"details") // the post without populating anything
      const fullnames = user.details?.firstname && user.details?.lastname ? `${user.details.firstname} ${user.details.lastname}` : "UnNamed User";
      this.setState({
          fullnames: fullnames
      })
     }
    renderLogo = ()=>{
        if(!this.props.loggedInUser.status){
            return (
                <div className="main_logo" id="logo">
                <Link href="/">
                <img id="logo" src="/youbase-logo-with-wordings.png" alt="" />
                </Link>
                <Link href="/">
                <img id="logo" className="logo-inverse" src="/youbase-logo-with-wordings.png" alt="" />
                </Link>
            </div>
            )
        }
        else{
            if(typeof window !== "undefined"){
                if(window.innerWidth < 324){
                    return <></>
                }
            }
            return (
                <div className="main_logo" id="logo">
                <Link href="/">
                <img src="/youbase-logo.png" alt="" style={{width:'36px',height:'36px'}}/>
                </Link>
                <Link href="/">
                <img  src="/youbase-logo.png" className="logo-inverse" alt="" style={{width:'36px',height:'36px'}}/>
                </Link>
               </div>
            )
        }
    }
    renderFeedButton = ()=>{
         if(typeof window !== "undefined"){
            if(window.innerWidth < 400){
                return <FeedOutlined onClick={this.handleRedirectUserToFeedPage}/>
            }
         }
         return <Button onClick={this.handleRedirectUserToFeedPage} sx={{color:'cadetblue',borderColor:'cadetblue'}} variant="outlined" size="small" startIcon={<Feed />}>Feed</Button>
    }
    handleRedirectUserToFeedPage = ()=>{
        const RedirectUserToFeedPage = this.state.RedirectUserToFeedPage
        this.setState({
            RedirectUserToFeedPage: !RedirectUserToFeedPage
        })
   }
   render(){
    return (
        <header className="header clearfix">
            {this.state.RedirectUserToFeedPage && typeof window !== "undefined"? <RedirectUserToFeedPage handleRedirectUserToFeedPage={this.handleRedirectUserToFeedPage}/> : <></>}
            {!this.props.loggedInUser.status? <></> : <CreatePostButton action="create" {...this.props}/>}
            {this.props.menu? this.props.menu() : <>
               <button type="button" id="toggleMenu" className="toggle_menu">
                    <i className="uil uil-bars" />
                </button>
                <button id="collapse_menu" className="collapse_menu">
                    <i className="uil uil-bars collapse_menu--icon " />
                    <span className="collapse_menu--label" />
                </button>
            </>}
            
           {this.renderLogo()}
            {/* <div className="search120">
                <div className="ui search">
                <div className="ui left icon input swdh10">
                    <input
                    className="prompt srch10"
                    type="text"
                    placeholder="Search for Tuts Videos, Tutors, Tests and more.."
                    />
                    <i className="uil uil-search-alt icon icon1" />
                </div>
                </div>
            </div> */}
            <div className="header_right">
                <ul>
                {/* <li>
                    <a
                    href="create_new_course.html"
                    className="upload_btn"
                    title="Create New Course"
                    >
                    Create New Course
                    </a>
                </li>
                <li>
                    <a href="shopping_cart.html" className="option_links" title="cart">
                    <i className="uil uil-shopping-cart-alt" />
                    <span className="noti_count">2</span>
                    </a>
                </li> */}
                 {!this.props.loggedInUser.status? (<><li><Link className="btn btn-danger mr-2" href="/signin">Login</Link></li> <li><Link className="btn btn-danger" href="/signup">Signup</Link></li></>)
                 : <li><SearchModal loggedInUser={this.props.loggedInUser}/></li>}
                {/* {!this.props.loggedInUser.status? <li>
                    <Link className="btn btn-danger mr-2" href="/signin">Login</Link></li> : <li className="ui dropdown" tabIndex={0}>
                 <a href="#" className="option_links" title="Messages">
                    <i className="uil uil-envelope-alt" />
                    <span className="noti_count">3</span>
                </a>
                <div className="menu dropdown_ms left transition hidden" tabIndex={-1}>
                    <a href="#" className="channel_my item">
                    <div className="profile_link">
                        <img src="images/left-imgs/img-6.jpg" alt="" />
                        <div className="pd_content">
                        <h6>Zoena Singh</h6>
                        <p>
                            Hi! Sir, How are you. I ask you one thing please explain it this
                            video price.
                        </p>
                        <span className="nm_time">2 min ago</span>
                        </div>
                    </div>
                    </a>
                    <a href="#" className="channel_my item">
                    <div className="profile_link">
                        <img src="images/left-imgs/img-5.jpg" alt="" />
                        <div className="pd_content">
                        <h6>Joy Dua</h6>
                        <p>Hello, I paid you video tutorial but did not play error 404.</p>
                        <span className="nm_time">10 min ago</span>
                        </div>
                    </div>
                    </a>
                    <a href="#" className="channel_my item">
                    <div className="profile_link">
                        <img src="images/left-imgs/img-8.jpg" alt="" />
                        <div className="pd_content">
                        <h6>Jass</h6>
                        <p>Thanks Sir, Such a nice video.</p>
                        <span className="nm_time">25 min ago</span>
                        </div>
                    </div>
                    </a>
                    <a className="vbm_btn" href="instructor_messages.html">
                    View All <i className="uil uil-arrow-right" />
                    </a>
                </div>
                </li>} */}
                {/*  notifications  */}
                {!this.props.loggedInUser.status? <></> : this.renderFeedButton()}
                 {!this.props.loggedInUser.status? <></> : <NotificationsDisplay loggedInUser={this.props.loggedInUser}/> } 
                {!this.props.loggedInUser.status? <></> : <li className="ui dropdown" tabIndex={0}>
                    <a href="#" className="opts_account" title="Account">
                    {/* <img src="/theme/images/hd_dp.jpg" alt="" /> */}
                    <AvatarOnly userId={this.props.loggedInUser.user.id} profileOnly={true}/>
                    </a>
                    <div className="menu dropdown_account" tabIndex={-1}>
                    <div className="channel_my">
                        <Link href='/user/profile'>
                        <div className="profile_link">
                            <AvatarOnly userId={this.props.loggedInUser.user.id} profileOnly={true}/>
                            <div className="pd_content">
                                <div className="rhte85">
                                    <h6>{truncateText(this.state.fullnames,25)}</h6>
                                    {this.props.loggedInUser.user.verified? <div className="mef78" title="Verify">
                                        <i className="uil uil-check-circle" />
                                    </div> : <></>}
                                </div>
                                <span>{this.props.loggedInUser.user.username}</span>
                                <div>{handleCountsDisplay(this.props.loggedInUser.user.followersCount)} Followers</div>
                                <div>{handleCountsDisplay(this.props.loggedInUser.user.followingCount)} Following</div> 
                            </div>
                        </div>
                        </Link>
                        <Link href='/user/profile' className="dp_link_12" style={{textTransform:'capitalize'}}>  
                        {this.props.loggedInUser.user.loggedInUserType === "default"? "View Profile" : "View "+this.props.loggedInUser.user.loggedInUserType+ " Profile"}
                        </Link>
                    </div>
                    {/* <div className="night_mode_switch__btn">
                        <a href="#" id="night-mode" className="btn-night-mode">
                        <i className="uil uil-moon" /> Night mode
                        <span className="btn-night-mode-switch">
                            <span className="uk-switch-button" />
                        </span>
                        </a>
                    </div> */}
                    
                    <Link href="/manage/profile" className="item channel_item">
                        Update Profile
                    </Link>
                    <Link href="/manage/posts" className="item channel_item">
                        Manage Posts
                    </Link>
                    {/* <Link href="/manage/account" className="item channel_item">
                        Settings
                    </Link> */}
                    <Link href="/support" className="item channel_item">
                        Help
                    </Link>
                    <Link href="/logout" className="item channel_item">
                        Sign Out
                    </Link>
                    </div>
                </li>}
                </ul>
            </div>
        </header>
    )
   }
  }

  const RedirectUserToFeedPage = ({handleRedirectUserToFeedPage})=>{
    const router = useRouter()
    useEffect(() => {
       handleRedirectUserToFeedPage()
       router.push('/feed');
    }, [router])
  
    return null; // Or an empty fragment if you prefer: <></>
  }