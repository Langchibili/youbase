import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { createNewComment, updateCommentEngagement } from "@/Functions";
import LogInFirstModal from "@/components/Includes/Modals/LogInFirstModal";

class ReplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      replying: false,
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
      replying: true
    })
    const newReplyObject = {
      text:text,
      type: "text",
      post:  { connect: [this.props.postId] },
      user:  { connect: [this.props.userId] },
      postId: this.props.postId.toString(),
      userId: this.props.userId.toString(),
      parentComment: { connect: [this.props.commentId] },
    };

    const newReply = await createNewComment({data:newReplyObject});
    this.props.onAddReply(newReply);
    updateCommentEngagement(this.props.postUserId,this.props.postId)
    this.setState({ text: "", replying: false })
  }

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
      <Box component="form" onSubmit={this.handleSubmit} sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={this.state.text}
          disabled={this.state.replying}
          onChange={this.handleChange}
          placeholder="Write a reply..."
        />
        <Button disabled={this.state.replying} type="submit" variant="contained" color="secondary" endIcon={<ReplyIcon />}>
          Reply
        </Button>
      </Box>
      </>
    );
  }
}

ReplyForm.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  onAddReply: PropTypes.func.isRequired,
};

export default ReplyForm;
