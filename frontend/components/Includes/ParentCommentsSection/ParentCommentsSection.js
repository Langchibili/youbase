import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Skeleton } from "@mui/material";
import { getPostParentComments } from "@/Functions";
import CommentForm from "@/components/Forms/CommentForm/CommentForm";
import CommentsDisplay from "../CommentsDisplay/CommentsDisplay";
import ContentDisplaySection from "../ContentDisplay/ContentDisplaySection";
import { api_url } from "@/Constants";

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
  
  commentsDisplaySection = (content)=>{
    console.log(content)
    return <CommentsDisplay
                loggedInUser={this.props.loggedInUser}
                post={this.props.post}
                comments={content}
                postUserId={this.props.post.user.data.id}
                postId={this.props.postId}
                onUpdateReplies={this.handleUpdateReplies}
            />
  }
  render() {
    const { comments,commentsLoading } = this.state;
    // if(commentsLoading){
    //     return <Skeleton sx={{ mt: 5, mb:10, p: 2, height:"40%", border: "1px solid #ddd", borderRadius: 1 }} variant="rectangular" height="100%" />
    // }
    console.log('the comments props',this.props)
    return (
      <Box sx={{ mt: 5, p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments {this.props.commentsCount}
        </Typography>
        {/* position:'fixed', bottom:'0',marginBottom:'120px',width:'90%' */}
          <CommentForm
              loggedInUser={this.props.loggedInUser}
              postId={this.props.postId}
              postUserId={this.props.post.user.data.id}
              onAddComment={this.handleAddComment}
            />
            <Divider sx={{ my: 2 }} />
            <ContentDisplaySection
              loggedInUser={this.props.loggedInUser}
              removeBottomPadding={true}
              contentDisplay={(props) => this.commentsDisplaySection(props.content)}
              contentUri={`${api_url}/comments`}
              limit={5}
              contentQueryFilters={'/comments?filters[parentComment][id][$null]=true&filters[post][id][$eq]='+this.props.postId}
          />
            
      </Box>
    );
  }
}

ParentCommentsSection.propTypes = {
  postId: PropTypes.string.isRequired
};

export default ParentCommentsSection;