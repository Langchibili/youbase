import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createNewComment } from "@/Functions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      commenting: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (!text.trim()) return;
    this.setState({
      commenting: true
    })
    const newCommentObject = {
      text:text,
      type: "text",
      post:  { connect: [this.props.postId] },
      user:  { connect: [this.props.userId] },
      postId: this.props.postId.toString(),
      userId: this.props.userId.toString(),
    };
    const newComment = await createNewComment({data:newCommentObject});
    this.props.onAddComment(newComment);
    this.setState({ text: "", commenting: false });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
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
    );
  }
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
