'use client';

import React from "react"
import { getUserById, handleCountsDisplay, logEngagement, logNotification } from "@/Functions"
import { Button, Modal, Box, IconButton, Typography } from '@mui/material'
import { Facebook, Twitter, Instagram, WhatsApp, ContentCopy, TikTok } from '@mui/icons-material'

export default class ShareButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            requesting: false,
            showLogInFirstModal: false,
            linkCopied: false,
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
        const userId = this.props.user.id
        const postId = this.props.post.id
        const loggedInuserDetails = await getUserById(loggedInUserId, "details")
        const fullnames = loggedInuserDetails.details?.firstname && loggedInuserDetails.details?.lastname ? `${loggedInuserDetails.details.firstname} ${loggedInuserDetails.details.lastname}` : "A user";
        const notificationTitle = fullnames + " shared your post"
        logNotification(notificationTitle, loggedInUserId, [userId], "post", postId) // send notification to the user being followed
    }

    handleShare = async () => {
        const sharedPostsIds = this.state.loggedInUser.user.sharedPostsIds
        const postId = this.state.post.id
        this.setState({
            openShareModal: true 
        })
        if(!sharedPostsIds.includes(postId)){
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
        navigator.clipboard.writeText(window.location.href+'posts/'+this.props.post.dashed_title) // Copy the current page URL
        this.setState({
            linkCopied: true
        })
    }

    shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    }

    shareOnTwitter = () => {
        const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
        window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank')
    }

    shareOnWhatsApp = () => {
        const url = encodeURIComponent(window.location.href+'posts/'+this.props.post.dashed_title)
        window.open(`https://wa.me/?text=${url}`, '_blank')
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
            <Modal open={this.props.openShareModal? this.props.openShareModal : this.state.openShareModal} onClose={this.props.handleShareModalClose? this.props.handleShareModalClose : this.handleModalClose}>
                <Box sx={style}>
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
        const sharedPostsIds = this.state.loggedInUser.user.sharedPostsIds
        const postId = this.state.post.id

        if (!sharedPostsIds) {
            return (
                <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
            )
        }
        if (sharedPostsIds.length === 0) {
            return (
                <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
            )
        }
        if (sharedPostsIds.includes(postId)) {
            return (
                <li>
                    <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                        <i className="uil uil-share-alt" style={{ color: "blue" }} />
                        <span>{handleCountsDisplay(this.state.post.shares)}</span>
                    </button>
                </li>
            )
        }
        return (
            <li>
                <button disabled={this.state.requesting} className="lkcm152" onClick={this.handleShare}>
                    <i className="uil uil-share-alt" />
                    <span>{handleCountsDisplay(this.state.post.shares)}</span>
                </button>
            </li>
        )
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
