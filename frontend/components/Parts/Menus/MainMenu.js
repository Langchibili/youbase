'use client'

import Link from "next/link"
import React from "react"
import AvatarOnly from "../UserDisplay/AvatarOnly"
import { getCategoryNames, getUserById, handleCountsDisplay, truncateText } from "@/Functions"
import ContentLoader from "@/components/Includes/Loader/ContentLoader"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LayersIcon from '@mui/icons-material/Layers'
import TheatersIcon from '@mui/icons-material/Theaters'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Skeleton from '@mui/material/Skeleton'
import { Help, Info, InfoOutlined, Policy, Support } from "@mui/icons-material"
import SearchModal from "@/components/Includes/Modals/SearchModal"

export default class MainMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            following: [],
            follows: [],
            loading: true,
            followingOpen: false,
            followersOpen: false,
            categoriesOpen: false,
            videosCategoriesOpen: false,
            musicCategoriesOpen: false,
            imagesCategoriesOpen: false,
            textCategoriesOpen: false,
            videosCategories: [],
            musicCategories: [],
            imageCategories: [],
            textCategories: [],
            loadingCategories: true,
        }
     }
  
     async componentDidMount(){ 
        const videosCategories = await getCategoryNames('videos')
        const musicCategories = await getCategoryNames('music')
        const imageCategories = await getCategoryNames('images')
        const textCategories = await getCategoryNames('texts')

        this.setState({
        videosCategories: videosCategories,
        musicCategories: musicCategories,
        imageCategories: imageCategories,
        textCategories: textCategories,
        loadingCategories: false,
        })
        if(!this.props.loggedInUser.status){ // no need to make a request when a user is logged out
            return
        }
        const userFollowing = await getUserById(this.props.loggedInUser.user.id,"profilePicture,following,following.details,follows.details") // the post without populating anything
        this.setState({
            following: userFollowing.following,
            follows: userFollowing.follows,
            loading: false
        })
     }

     toggleCollapse = (key) => () => {
        this.setState((prevState) => ({ [key]: !prevState[key] }))
     }

     renderCategories = (categories, loading) => {
        if (loading) {
          return [...Array(5)].map((_, index) => (
            <ListItem key={index} style={{ paddingLeft: 32 }}>
              <Skeleton variant="text" width="80%" />
            </ListItem>
          ))
        }
    
        return categories.map((category) => (
          <ListItem key={category} style={{ paddingLeft: 32 }}>
            <ListItemText>
              <Link href={`/categories/${category}`}>
                {category}
              </Link>
            </ListItemText>
          </ListItem>
        ))
      }
    
     renderFollowing = (following)=>{
            return following.map((user)=>{
                const fullnames = user.details?.firstname && user.details?.lastname ? `${user.details.firstname} ${user.details.lastname}` : "UnNamed User";
                const followersCount = user.followersCount ?? "0";
                return (
                    <li key={user.username} className="sub_menu--item" style={{display:"flex"}}>
                        <div className="sub_menu--link">
                             <AvatarOnly userId={user.id} profileOnly={true} exra_styles={{width:"36px",borderRadius:"50%"}}/>
                        </div>
                        <div>
                            <Link href={"/user/"+user.username} className="sub_menu--link" style={{paddingLeft:'0px'}}>
                                {truncateText(fullnames,15)}
                            </Link>
                        </div>
                        <div>{handleCountsDisplay(followersCount)}</div>
                    </li>
                )
            })
     }

    render(){
        return (
            <nav className="vertical_nav">
                <div className="left_section menu_left" id="js-menu">
                    <div className="left_section">
                   <ul>
                   <List style={{ width: 250, height: window.innerHeight, overflowY: 'scroll' }}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>
                <Link href="/" onClick={this.handleLinkClick}>
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            {/* will work on this later */}
            {/* {this.props.loggedInUser.status && (
              <ListItem>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="/feed" onClick={this.handleLinkClick}>Explore</Link>
                </ListItemText>
              </ListItem>
            )} */}
            {this.props.loggedInUser.status && (
              <>
                <ListItem button onClick={this.toggleCollapse('followingOpen')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText>Following</ListItemText>
                  {this.state.followingOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.followingOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {this.state.loading ? (
                      <ListItem style={{ paddingLeft: 32 }}>
                        <Skeleton variant="text" width="80%" />
                      </ListItem>
                    ) : (
                      this.renderFollowing(this.state.following)
                    )}
                    <Link href="/users" className="mb-3 sub_menu--link" onClick={this.handleLinkClick}>
                                Follow Users
                    </Link>
                    <hr/>
                  </List>
                </Collapse>

                <ListItem button onClick={this.toggleCollapse('followersOpen')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText>Followers</ListItemText>
                  {this.state.followersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.followersOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {this.state.loading ? (
                      <ListItem style={{ paddingLeft: 32 }}>
                        <Skeleton variant="text" width="80%" />
                      </ListItem>
                    ) : (
                      this.renderFollowing(this.state.follows)
                    )}
                    <Link href="/users" className="mb-3 sub_menu--link" onClick={this.handleLinkClick}>
                                Follow Users
                    </Link>
                  </List>
                </Collapse>
              </>
            )}

            <Divider />

            <ListItem button onClick={this.toggleCollapse('categoriesOpen')}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText>Categories</ListItemText>
              {this.state.categoriesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.categoriesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={this.toggleCollapse('videosCategoriesOpen')} style={{ paddingLeft: 16 }}>
                  <ListItemText>Videos</ListItemText>
                  {this.state.videosCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.videosCategoriesOpen} timeout="auto" unmountOnExit>
                  {this.renderCategories(this.state.videosCategories, this.state.loadingCategories)}
                </Collapse>

                <ListItem button onClick={this.toggleCollapse('musicCategoriesOpen')} style={{ paddingLeft: 16 }}>
                  <ListItemText>Music</ListItemText>
                  {this.state.musicCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.musicCategoriesOpen} timeout="auto" unmountOnExit>
                  {this.renderCategories(this.state.musicCategories, this.state.loadingCategories)}
                </Collapse>

                <ListItem button onClick={this.toggleCollapse('imagesCategoriesOpen')} style={{ paddingLeft: 16 }}>
                  <ListItemText>Images</ListItemText>
                  {this.state.imagesCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.imagesCategoriesOpen} timeout="auto" unmountOnExit>
                  {this.renderCategories(this.state.imageCategories, this.state.loadingCategories)}
                </Collapse>

                <ListItem button onClick={this.toggleCollapse('textCategoriesOpen')} style={{ paddingLeft: 16 }}>
                  <ListItemText>Text</ListItemText>
                  {this.state.textCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.textCategoriesOpen} timeout="auto" unmountOnExit>
                  {this.renderCategories(this.state.textCategories, this.state.loadingCategories)}
                </Collapse>
              </List>
            </Collapse>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText>
                <Link href="/terms_and_conditions" onClick={this.handleLinkClick}>Terms Of Use</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Policy />
              </ListItemIcon>
              <ListItemText>
                <Link href="/privacy_policy" onClick={this.handleLinkClick}>Privacy Policy</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Policy />
              </ListItemIcon>
              <ListItemText>
                <Link href="/account_deletion_policy" onClick={this.handleLinkClick}>Account Deletion Policy</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Policy />
              </ListItemIcon>
              <ListItemText>
                <Link href="/data_deletion_policy" onClick={this.handleLinkClick}>Data Deletion Policy</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
               {this.props.loggedInUser.status?<></>:<SearchModal loggedInUser={this.props.loggedInUser} text="Search"/>}
            </ListItem>
          </List>
                   </ul>
                    </div>
                  
                    <div className="left_footer">
                    <div className="left_footer_content">
                        <p>
                        © 2024~ <strong>Youbase</strong>. All Rights Reserved.
                        </p>
                    </div>
                    </div>
                </div>
            </nav>
        )
      }
    }