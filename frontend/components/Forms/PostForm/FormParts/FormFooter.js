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
       <div style={{minHeight:'50px'}}></div>
  {this.props.postSavedAsDraft? <></> : <div style={{position:'fixed', bottom:'0',marginBottom:'120px',width:'90%',textAlign:'center'}}>{this.props.post.status === "published" || this.props.postSaved? <Link href={"/posts/"+this.props.post.dashed_title}>View Post</Link> : <></>}</div>}
  <div id="form-footer" style={{ display: 'flex', justifyContent: 'space-between', position:'fixed', bottom:'0', width:'90%',marginBottom:'10px' }}>
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