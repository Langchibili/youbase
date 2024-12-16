import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Skeleton } from "@mui/material";
import { getPostParentComments } from "@/Functions";
import CommentForm from "@/components/Forms/CommentForm/CommentForm";
import CommentsDisplay from "../CommentsDisplay/CommentsDisplay";

class ParentCommentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsLoading: true
    };
  }

  async componentDidMount() {
    const comments = await getPostParentComments(this.props.postId);
    this.setState({ comments, commentsLoading: false });
  }
  componentDidUpdate(prevProps,nextState){
    const musicPlayer = document.getElementById('music-player-controller')
    if(musicPlayer){
      if(this.props.commentsModalIsOpen){ // remove the music player when commenting
         musicPlayer.style.display = "none"
      }
      else{
         musicPlayer.style.display = "block"
      }
    }
  }
 
  componentWillUnmount(){
     if(typeof document !== "undefined"){
        const musicPlayer = document.getElementById('music-player-controller')
        if(musicPlayer){
           musicPlayer.style.display = "block"
        }
      }
  }

  handleAddComment = (newComment) => {
    this.setState((prevState) => ({
      comments: [newComment, ...prevState.comments],
    }));
  };

  handleUpdateReplies = (updatedCommentId, newReply) => {
    this.setState((prevState) => {
      const updatedComments = prevState.comments.map((comment) =>
        comment.id === updatedCommentId
          ? { ...comment, replies: [newReply, ...(comment.replies || [])] }
          : comment
      );
      return { comments: updatedComments };
    });
  };

  render() {
    const { comments,commentsLoading } = this.state;
    if(commentsLoading){
        return <Skeleton sx={{ mt: 5, mb:10, p: 2, height:"40%", border: "1px solid #ddd", borderRadius: 1 }} variant="rectangular" height="100%" />
    }
    return (
      <Box sx={{ mt: 5, p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments {this.props.commentsCount}
        </Typography>
        {/* position:'fixed', bottom:'0',marginBottom:'120px',width:'90%' */}
        
            <CommentForm
            postId={this.props.postId}
            userId={this.props.userId}
            onAddComment={this.handleAddComment}
            />
            <Divider sx={{ my: 2 }} />
            <CommentsDisplay
                loggedInUser={this.props.loggedInUser}
                post={this.props.post}
                comments={comments}
                postId={this.props.postId}
                userId={this.props.userId}
                onUpdateReplies={this.handleUpdateReplies}
            />
      </Box>
    );
  }
}

ParentCommentsSection.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ParentCommentsSection;