import React from "react";
import PropTypes from "prop-types";
import { Typography, List } from "@mui/material";
import SingleCommentDisplay from "./SingleCommentDisplay";

class CommentsDisplay extends React.Component {
  render() {
    const { comments, postId, post, loggedInUser, userId, postUserId, onUpdateReplies } = this.props;
    if(!comments){
      return null
    }
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
                    postUserId={postUserId}
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
