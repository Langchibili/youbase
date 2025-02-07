'use client'

import Link from "next/link"
import React from "react"

export default class FormFooter extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ...props
      }
   }
  
   render(){
    return (
      <>
       {/* postSaved={this.postSaved}
       ={this.postSavedAsDraft} */}
       <div style={{minHeight:'50px', marginTop:'100px'}}></div>
  {this.props.postSavedAsDraft? <></> : <div style={{position:'fixed', bottom:'0',marginBottom:'120px',width:'90%',textAlign:'center'}}>{this.props.post.status === "published" || this.props.postSaved? <Link href={"/posts/"+this.props.post.dashed_title} onClick={this.props.handlePostModalClose}>View Post</Link> : <></>}</div>}
  <div id="form-footer" style={{ display: 'flex', justifyContent: 'space-between', position:'fixed', bottom:'0', left:'0', right:'0', width:'100%',marginBottom:'10px', padding:'0px 20px 0px 20px' }}>
  <button 
    disabled={this.props.action === "edit" || (this.props.postSaving && this.props.postSavingAsDraft)}
    style={{
      textTransform:'uppercase',
      flex: '1',
      padding: '10px 20px',
      fontSize: '16px',
      marginRight: '10px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '5px'
    }}
    onClick={()=>{this.props.savePost(false)}}
  >
    
  {this.props.postSaving && this.props.postSavingAsDraft? "Saving Draft..." : "Save As Draft"}
  </button>
  {this.props.action === "edit"? <> </> : <button 
    disabled={this.props.action === "edit" || (this.props.postSaving && this.props.postSavingAsDraft)}
    style={{
      textTransform:'uppercase',
      flex: '1',
      padding: '10px 20px',
      fontSize: '16px',
      marginRight: '10px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '5px'
    }}
    onClick={()=>{localStorage.removeItem('draftPostId'); this.props.handlePostModalClose() /* remove the draft post id to ensure a new draft post can be created*/ }}
  >
    Clear
  </button>}
  <button 
    disabled={this.props.postSaving && !this.props.postSavingAsDraft}
    style={{
      textTransform:'uppercase',
      flex: '1',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '5px'
    }}
    onClick={()=>{this.props.savePost(true)}}
  >
    {this.props.postSaving && !this.props.postSavingAsDraft? this.props.action === "edit" ? "Updating..." : "Publishing..." : this.props.action === "edit"? "Update" : "Publish"}
  </button>
</div>
</>
    )
  }
}