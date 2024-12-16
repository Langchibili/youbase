import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { getCommentReplies } from "@/Functions";
import ReplyForm from "@/components/Forms/ReplyForm/ReplyForm";
import SingleCommentDisplay from "../CommentsDisplay/SingleCommentDisplay";

class RepliesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      showReplyForm: false,
    };
  }

  async componentDidMount() {
    const replies = await getCommentReplies(this.props.commentId);
    this.setState({ replies });
  }

  handleAddReply = (newReply) => {
    // Update the replies list when a new reply is added
    this.setState((prevState) => ({
      replies: [newReply, ...prevState.replies],
      showReplyForm: false,
    }));
  };

  toggleReplyForm = () => {
    this.setState((prevState) => ({ showReplyForm: !prevState.showReplyForm }));
  };

  render() {
    const { replies, showReplyForm } = this.state;

    return (
      <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid #ddd" }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Replies {this.props.repliesCount}
        </Typography>
        <List>
          {replies.length > 0 ? (
            replies.map((replyObject) => {
              if (!replyObject) {
                return null;
              }

              let reply = replyObject; // Default to assuming the reply is one object
              if (replyObject.hasOwnProperty("attributes")) {
                // If the reply object is not structured as one
                reply.attributes.id = reply.id;
                reply = reply.attributes;
              }
              return <SingleCommentDisplay
                    commentType="reply"
                    loggedInUser={this.props.loggedInUser}
                    key={reply.id}
                    comment={reply}
                    post={this.props.post}
                    postId={this.props.postId}
                    userId={this.props.userId}
                />

              // return (
              //   <ListItem key={reply.id} alignItems="flex-start">
              //     <ListItemText
              //       primary={reply.text}
              //       secondary={`Replied on ${new Date(reply.createdAt).toLocaleString()}`}
              //     />
              //   </ListItem>
              // );
            })
          ) : (
            <Typography variant="body2" color="textSecondary">
              No replies yet.
            </Typography>
          )}
        </List>
        <Divider sx={{ my: 1 }} />
        {showReplyForm ? (
          <ReplyForm
            postId={this.props.postId}
            commentId={this.props.commentId}
            userId={this.props.userId}
            onAddReply={this.handleAddReply} // Pass down handleAddReply as a prop
          />
        ) : (
          <Button
            color="secondary"
            size="small"
            startIcon={<ReplyIcon />}
            onClick={this.toggleReplyForm}
            sx={{ mt: 1 }}
          >
            Reply
          </Button>
        )}
      </Box>
    );
  }
}

RepliesDisplay.propTypes = {
  commentId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  onAddReply: PropTypes.func.isRequired,
};

export default RepliesDisplay;
