import React from "react";
import { Box,  ListItem, ListItemText, Divider, Skeleton, Button } from "@mui/material";
import RepliesDisplay from "../RepliesDisplay/RepliesDisplay";
import { displayDateOrTime, getCommentFromId, getRepliesCount, handleCountsDisplay } from "@/Functions";
import AvatarWithUsernameOnly from "@/components/Parts/UserDisplay/AvatarWithUsernameOnly";
import PostMoreBtn from "../PostMoreBtn/PostMoreBtn";
import { ArrowDropUp, ArrowUpward, Reply } from "@mui/icons-material";
import ReadMoreLess from "../ReadMoreLess/ReadMoreLess";

export default class SingleCommentDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        commentLoaded: false,
        comment: null,
        thisIsMyComment: false,
        repliesCount: "",
        showReplies: false
    }
  }
  
  async componentDidMount(){
      const comment = await getCommentFromId(this.props.comment.id,"user")
      const repliesCount = await getRepliesCount(this.props.comment.id)
      
      this.setState({
        comment:comment,
        commentLoaded: true,
        thisIsMyComment: this.props.loggedInUser.user.id === comment.user.data.id,
        repliesCount: repliesCount
      })
  }
  handleShowReplies = (e)=>{
    e.preventDefault()
    this.setState({
        showReplies: true
    })
  }
  handleHideReplies = (e)=>{
    e.preventDefault()
    this.setState({
        showReplies: false
    })
  }
  render() {
    if(!this.state.commentLoaded){
        return <Skeleton variant="text"/>
    }
    const { postId, post, loggedInUser, postUserId, onUpdateReplies } = this.props;
    const comment = this.state.comment
    if(!comment){
        return null
    }
    return ( // this is also used a display for replies
        <div id={"comment-"+comment.id}>
            <Box key={comment.id} sx={{ mb: 2 }}>
                <AvatarWithUsernameOnly userId={comment.user.data.id} extra_styles={  {width:'24px !important', height:'24px !important'}} postMoreContent={()=><PostMoreBtn loggedInUser={loggedInUser} post={post} isComment={true} commentId={comment.id} action="delete" thisIsMyComment={this.state.thisIsMyComment} postId={postId}/>}/>
                <ListItem alignItems="flex-start">
                
                <ListItemText
                    primary={<ReadMoreLess text={comment.text} length={100}/>}
                    secondary={`${displayDateOrTime(comment.createdAt,true)}`}
                />
                
                </ListItem>
                {this.props.commentType === "reply"? <></> : (
                    this.state.showReplies? <><RepliesDisplay
                    repliesCount={this.state.repliesCount? " "+handleCountsDisplay(this.state.repliesCount).toString() : " "}
                    loggedInUser={loggedInUser} 
                    commentId={comment.id}
                    post={post}
                    postUserId={postUserId}
                    postId={postId}
                    onAddReply={(newReply) => onUpdateReplies(comment.id, newReply)}
                />
                <Divider sx={{ my: 1 }} />
                <div style={{width:'100%', textAlign:'center'}}>
                   <Button size="small" sx={{marginLeft:'8px'}} onClick={this.handleHideReplies}>Hide Replies <ArrowDropUp/></Button>
                </div>
                
                </> : <Button size="small" sx={{marginLeft:'8px'}} onClick={this.handleShowReplies}>replies{this.state.repliesCount? " "+handleCountsDisplay(this.state.repliesCount).toString() : " "} <Reply/></Button> 
                )
                }
            
        </Box>
        </div>
    )
  }
}
