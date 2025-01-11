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
