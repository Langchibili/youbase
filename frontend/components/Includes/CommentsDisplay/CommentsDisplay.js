import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import RepliesDisplay from "../RepliesDisplay/RepliesDisplay";
import SingleCommentDisplay from "./SingleCommentDisplay";

class CommentsDisplay extends React.Component {
  render() {
    const { comments, postId, post,loggedInUser, userId, onUpdateReplies } = this.props;
    return (
      <List>
        {comments.length > 0 ? (
          comments.map((commentObject) => {
            if(!commentObject){
                    return null
            }
            let comment = commentObject // means the comment has already been made as one object
            if(commentObject.hasOwnProperty('attributes')){ // means the comment object is not structured as one
                comment.attributes.id = comment.id
                comment = comment.attributes
            }

            return <SingleCommentDisplay
                    loggedInUser={loggedInUser}
                    key={comment.id}
                    comment={comment}
                    post={post}
                    postId={postId}
                    userId={userId}
                    onUpdateReplies={onUpdateReplies}
                />
            })
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet.
          </Typography>
        )}
      </List>
    );
  }
}

CommentsDisplay.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  onUpdateReplies: PropTypes.func.isRequired,
};

export default CommentsDisplay;
