import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createNewComment, updateCommentEngagement } from "@/Functions";
import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      commenting: false,
      showLogInFirstModal: false
    };
  }

  createCommentNotification = async ()=>{
          const loggedInUserId = this.props.loggedInUser.user.id
          const userId = this.props.postUserId
          const postId = this.props.postId
          if(userId === loggedInUserId){
            return
          }
          const loggedInUserDetails = await getUserById(loggedInUserId, "details")
          const fullnames = loggedInUserDetails.details?.firstname && loggedInUserDetails.details?.lastname ? `${loggedInUserDetails.details.firstname} ${loggedInUserDetails.details.lastname}` : "A user";
          const notificationTitle = fullnames + " commented on your post"
          log('the post user ', this.props.post)
          logNotification(notificationTitle,loggedInUserId,[userId], "post", postId) // send notification to the user being followed
          // send a push notification
          const followersCount = parseInt(this.props.loggedInUser.user.followersCount)
          const commentsCount = parseInt(this.props.post.commentsCount)
          // always notify a user that someone has commented on their post
          sendPushNotification(notificationTitle,notificationTitle+" on youbase",[userId],clientUrl+"/posts/"+this.props.post.dashed_title,await getPostFromId(postId,"media,featuredImages"),"")
          if(commentsCount === 0){ // if for any reason it's 0, return
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
         
          if(commentsCount < 5 || commentsCount % 100 === 0){ // determine whether to send a push notification, because cannot be spamming users anyhow with each like
             const postWithThumbnail = await getPostFromId(postId,"media,featuredImages")
             const title = "Your post has been commented on "+commentsCount+ " times"
             const body = "Your post on youbase has been commented on "+commentsCount+ " times"
             const image = getImage(postWithThumbnail.featuredImages.data,"thumbnail","notifications")
             const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
             sendPushNotification(title,body,[userId],postUrl,image,"")
          }
   } 

  handleSubmit = async (e) => {
    e.preventDefault();
    if(!this.props.loggedInUser.status){ // means you are logged out or you have never followed anyone before
                this.setState({
                   showLogInFirstModal: true
                })
                return
    }
    const { text } = this.state;
    if (!text.trim()) return;
    this.setState({
      commenting: true
    })
    // const commentsCount = (this.props.loggedInUser.user.commentsCount || 1)
   // postToSaveObject.data.postCount = postsCount + 1
    
   const newCommentObject = {
      text:text,
      type: "text",
      post:  { connect: [this.props.postId] },
      user:  { connect: [this.props.loggedInUser.user.id] },
      postId: this.props.postId.toString(),
      userId: this.props.loggedInUser.user.id.toString(),

    };
    const newComment = await createNewComment({data:newCommentObject});
    this.props.onAddComment(newComment);
    this.setState({ text: "", commenting: false },()=>{
      updateCommentEngagement(this.props.postUserId,this.props.postId) // add the comment count and engagemt up
      this.createCommentNotification() // notify the user
    })
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleModalClose = ()=>{
    this.setState({
        showLogInFirstModal: false
    })
   }

  render() {
    return (
      <>
      {this.state.showLogInFirstModal? <LogInFirstModal open={this.state.showLogInFirstModal} handleClose={this.handleModalClose}/> : <></>}
      <Box component="form" sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={this.state.text}
          disabled={this.state.commenting}
          onChange={this.handleChange}
          placeholder="Write a comment..."
        />
        {/* <Button onClick={this.handleSubmit} variant="contained" endIcon={<SendIcon />}>
        </Button> */}
        <IconButton onClick={this.handleSubmit} disabled={this.state.commenting}>
        <SendIcon />
        </IconButton>
      </Box>
      </>
    );
  }
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
