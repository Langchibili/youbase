'use client'

import React from 'react'
import Link from 'next/link'
import AvatarOnly from '../UserDisplay/AvatarOnly'
import { getCategoryNames, getUserById, handleCountsDisplay, truncateText } from '@/Functions'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import TheatersIcon from '@mui/icons-material/Theaters'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Skeleton from '@mui/material/Skeleton'
import { Help, Info, Policy } from '@mui/icons-material'
import SearchModal from '@/components/Includes/Modals/SearchModal'

export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      following: [],
      follows: [],
      loading: true,
      isDrawerOpen: false,
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

  async componentDidMount() {
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
    if (!this.props.loggedInUser.status) {
      return
    }
    const userFollowing = await getUserById(
      this.props.loggedInUser.user.id,
      'profilePicture,following,following.details,follows.details'
    )
    this.setState({
      following: userFollowing.following,
      follows: userFollowing.follows,
      loading: false,
    })
  }

  toggleDrawer = (open) => () => {
    this.setState({ isDrawerOpen: open })
  }

  toggleCollapse = (key) => () => {
    this.setState((prevState) => ({ [key]: !prevState[key] }))
  }

  handleLinkClick = () => {
    this.setState({ isDrawerOpen: false })
  }

  renderFollowing = (following) => {
    return following.map((user) => {
      const fullnames =
        user.details?.firstname && user.details?.lastname
          ? `${user.details.firstname} ${user.details.lastname}`
          : 'UnNamed User'
      const followersCount = user.followersCount ?? '0'
      return (
        <li key={user.username} className="mt-3 sub_menu--item" style={{display:"flex", marginBottom:'8px'}}>
            <div className="sub_menu--link">
                    <AvatarOnly userId={user.id} profileOnly={true} exra_styles={{width:"24px",borderRadius:"50%"}}/>
            </div>
            <div>
                <Link href={"/user/"+user.username} onClick={this.handleLinkClick} className="sub_menu--link" style={{paddingLeft:'0px'}}>
                    {truncateText(fullnames,15)}
                </Link>
            </div>
            <div>{handleCountsDisplay(followersCount)}</div>
        </li>
      )
    })
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
          <Link href={`/categories/${category}`} onClick={this.handleLinkClick}>
            {category}
          </Link>
        </ListItemText>
      </ListItem>
    ))
  }

  render() {
    return (
      <>
        <IconButton
          sx={{ marginLeft: '5px' }}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={this.toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <SwipeableDrawer
          anchor="left"
          sx={{height:"100vh !important"}}
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <List style={{ width: 250, height: "100vh", overflowY: 'auto' }}>
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
            {/* to build this later, the feed stuff */}
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
            <ListItem>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText>
                <Link href="/support" onClick={this.handleLinkClick}>Help</Link>
              </ListItemText>
            </ListItem>
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
            <ListItem>
            {this.props.loggedInUser.status?<></>:<SearchModal loggedInUser={this.props.loggedInUser} text="Search"/>}
            </ListItem>
            
          </List>
        </SwipeableDrawer>
      </>
    )
  }
}
