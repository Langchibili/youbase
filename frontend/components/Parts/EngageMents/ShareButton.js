'use client';

import React, { useEffect } from "react"
import { checkIfUserHasEngagedWithPost, getUserById, getVideoThumbnail, handleCountsDisplay, logEngagement, logNotification, sendPushNotification, truncateText } from "@/Functions"
import { Button, Modal, Box, IconButton, Typography } from '@mui/material'
import { Facebook, Twitter, Instagram, WhatsApp, ContentCopy, TikTok } from '@mui/icons-material'
import { useSocialSharing } from "@/Contexts/SocialSharingContext";
import { getImage, getPostFromId } from "../../../Functions";
import { clientUrl } from "@/Constants";

export default class ShareButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            requesting: false,
            showLogInFirstModal: false,
            linkCopied: false,
            userHasEngagedWithPost: false,
            openShareModal: false // to control share modal visibility
        }
    }

    componentDidMount(){
        if(this.props.hideButton){
            this.setState({
                hideButton: this.props.hideButton
            })
        }
    }

    createShareNotification = async () => {
        const loggedInUserId = this.props.loggedInUser.user.id
        const userId = this.props.post.user.data? this.props.post.user.data.id : this.props.post.user.id
        const postId = this.props.post.id
        const loggedInuserDetails = await getUserById(loggedInUserId, "details")
        const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
        const notificationTitle = fullnames + " shared your post"
        logNotification(notificationTitle, loggedInUserId, [userId], "post", postId) // send notification to the user being followed
        // send a push notification
        const followersCount = parseInt(this.props.loggedInUser.user.followersCount)
        const shares = parseInt(this.props.post.shares)
        if(shares === 0){ // if for any reason it's 0, return
            return
        }
        
        if(followersCount > 1000){ // this means the user has a big enough following, the post's user might need to know 
           const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
           const title = notificationTitle
           const body = notificationTitle + " on youbase"
           const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
           const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
           sendPushNotification(title,body,[userId],postUrl,image,"")
        }
        if(shares < 5 || shares % 10 === 0){ // determine whether to send a push notification, because we cannot be spamming users anyhow with each share
           const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
           const title = "Your post has been shared "+shares+ " times"
           const body = "Your post on youbase has been shared "+shares+ " times"
           const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
           const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
           sendPushNotification(title,body,[userId],postUrl,image,"")
        }
    }

    handleShare = async (e) => { // also a logged in user can share their own post
        event.stopPropagation(); // Prevent parent click handler
        const userHasEngagedWithPost = this.state.userHasEngagedWithPost
        const postId = this.state.post.id
        this.setState({
            openShareModal: true 
        })
        if(!userHasEngagedWithPost){
            this.setState({
                requesting: true ,// to show user something is happening
                openShareModal: true 
            })
            logEngagement('shares', this.props.post.id, this.props.loggedInUser.user, this, this.createShareNotification)
        }
    }

    handleModalClose = () => {
        this.setState({ openShareModal: false })
    }

    copyLink = () => {
        if(typeof window !== "undefined"){
            navigator.clipboard.writeText(window.location.href+'posts/'+this.props.post.dashed_title) // Copy the current page URL
            this.setState({
                linkCopied: true
            })
       }
    }

    shareOnFacebook = () => {
        if(typeof window !== "undefined"){
            const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        }
    }

    shareOnTwitter = () => {
        if(typeof window !== "undefined"){
            const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
            window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank')
        }
    }

    shareOnWhatsApp = () => {
        if(typeof window !== "undefined"){
            const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
            window.open(`https://wa.me/?text=${url}`, '_blank')
        }
    }

    // shareOnTikTok = () => {
    //     // TikTok doesn't have an official web share URL, similar to Instagram
    //     alert("TikTok sharing is not supported on the web. Please share via the app.")
    // }
    // shareOnInstagram = () => {
    //     // Instagram doesn't have a direct sharing URL for web, so usually sharing is done via app.
    //     // This can be enhanced using Instagram API if you plan to integrate that.
    //     alert("Instagram sharing is not supported on the web. Please share via the app.")
    // }

    renderShareModal = () => {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        }

        return (
            <Modal sx={{zIndex:1990}} open={this.props.openShareModal? this.props.openShareModal : this.state.openShareModal} onClose={this.props.handleShareModalClose? this.props.handleShareModalClose : this.handleModalClose}>
               <Box sx={style}>
                <SetPostMetaTags post={this.props.post}/>
                    <Typography variant="h6" component="h2">
                        Share this post
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                        <IconButton color="primary" aria-label="share on Facebook" onClick={this.shareOnFacebook}>
                            <Facebook />
                        </IconButton>
                        <IconButton color="primary" aria-label="share on Twitter" onClick={this.shareOnTwitter}>
                            <Twitter />
                        </IconButton>
                        {/* <IconButton color="primary" aria-label="share on Instagram" onClick={this.shareOnInstagram}>
                            <Instagram />
                        </IconButton> */}
                        <IconButton color="primary" aria-label="share on WhatsApp" onClick={this.shareOnWhatsApp}>
                            <WhatsApp />
                        </IconButton>
                        {/* <IconButton color="primary" aria-label="share on TikTok" onClick={this.shareOnTikTok}>
                            <TikTok />
                        </IconButton> */}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                        <Button disabled={this.state.linkCopied} variant="outlined" startIcon={<ContentCopy />} onClick={this.copyLink}>
                            {this.state.linkCopied? "Copied": "Copy Link"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        )
    }

    renderShareButton = () => {
        const userHasEngagedWithPost = this.state.userHasEngagedWithPost
        if(userHasEngagedWithPost){
            return (
                <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" style={{ color: "blue" }} />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
            )
        }
        else{
            return (
                <li style={this.props.inFullScreen? {color:'snow',display: "block"} : {} }>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
            )
        }
    }
    
    async componentDidMount(){
        const checkIfUserSharedPost = await checkIfUserHasEngagedWithPost(this.props.loggedInUser,this.props.post.id,'shares')
        this.setState({
            userHasEngagedWithPost: checkIfUserSharedPost
        })
    }

    render() {
        return (
            <>
                {this.props.hideButton? <></> : this.renderShareButton() }
                {this.renderShareModal()}
            </>
        )
    }
}


/* NOTE: post.media.data[0] and post.featuredImages.data[0]; this is only like this bacause we have not yet allowed multiple video uploads, when we do, it shall need to be different */
const SetPostMetaTags = ({post})=>{
    const renderThumbNail = ()=>{
    if(post.featuredImages && post.featuredImages.data && post.featuredImages.data[0]){
          return getImage(post.featuredImages.data[0] || null, "thumbnail", "notifications")
        }
    }
    const { setSocialSharingTags } = useSocialSharing()
    useEffect(() => {
        setSocialSharingTags({
            title: post.title? post.title : "A post on youbase",
            description:  truncateText(post.description? post.description : "View this post on youbase."),
            image: post.type === "video"? getVideoThumbnail(post.media && post.media.data && post.media.data[0]? post.media.data[0].attributes : null,post) : renderThumbNail(),
            url: window.location.origin+'/posts/'+post.dashed_title,
          })
    }, [])
    return <></>
}
