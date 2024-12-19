'use client'

import Uploader from "@/components/Includes/Uploader/Uploader"
import { api_url, getJwt, log } from "@/Constants"
import { getImage, getPostFromId, sendPushNotification, truncateText, validateUrl } from "@/Functions"
import React from "react"

export default class ReportPostForm extends React.Component{
   constructor(props){
      super(props)
      this.state = {
          submittingText: "Submit Report",
          submitting: false,
          errorExists: false,
          errorText: '',
          reason: '',
          reasonBody: '',
          showReasonBody: false,
          reported: false,
          reportReasons: [],
          adminUserIds : []
      }
   }

   async componentDidMount(){
    const reportReasons = await fetch(api_url+'/report-reason/',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(reportReasons && reportReasons.data && reportReasons.data.attributes.reasons){
         this.setState({
            reportReasons: reportReasons.data.attributes.reasons
         })
      }
      const firebaseConfig = await fetch(api_url+'/firebase-fcm-config',{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        if(firebaseConfig && firebaseConfig.data && firebaseConfig.data.attributes.adminUserIds){
           this.setState({
              adminUserIds: firebaseConfig.data.attributes.adminUserIds
           })
        }
   }

   handleReasonSelect = (event) => {
      const newReason = event.target.value
      if(newReason === "other"){
        this.setState({
            submittingText: 'Submit Report',
            submitting: false,
            errorExists: false,
            showReasonBody: true
        })
      }
      this.setState({
        submittingText: 'Submit Report',
        submitting: false,
        errorExists: false,
        reason: newReason
      })
   }

 
   handleAddReasonBody = (event)=>{
    const reasonBody = event.target.value
    this.setState({
      submittingText: 'Submit Report',
      submitting: false,
      errorExists: false,
      reasonBody: reasonBody
    })
   }
 
   handleSubmit = async ()=>{
    if(this.state.reason === "other" && this.state.reasonBody.length < 1){
        this.setState({
            errorExists: true,
            errorText: 'Please write something about why you are reporting this post'
        })
        return
    }
    if(this.state.reason.length < 1){
           this.setState({
            errorExists: true,
            errorText: "Please select a reason for reporting this post or select other and tell us why you are reporting this post" 
           })
           return
    }
    
    const newReportObject = {
        data: {
            reason: this.state.reason,
            reasonBody: this.state.reason !== "other"? this.state.reason : this.state.reasonBody,
            reportedPostUser: {connect: [this.props.post.user.data.id]},
            post: {connect: [this.props.post.id]}
        }
    }
    console.log(newReportObject)
    const newReport =  await fetch(api_url+'/reported-posts', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReportObject),
      })
      .then(response => response.json())
      .then(data => data)
    if(!newReport.hasOwnProperty('error')){
        this.setState({
             reported: true
        })
        const title = "Youbase Reported alert on post with id: "+this.props.post.id
        const body = "Youbase post report reason: "+truncateText(reason,"50")
        const postUrl = clientUrl+"/posts/"+this.props.post.dashed_title
        sendPushNotification(title,body,[this.state.adminUserIds],postUrl,"","")
     }
   }

   render(){
    if(this.state.reported){
        return (
            <>
        <div className="account_setting" style={{marginTop:'0px'}}>
        <div className="basic_profile" style={{marginTop:'0px'}}>
            <div className="basic_ptitle" style={{marginTop:'0px'}}>
            </div>
           <div className="basic_form">
            <div className="row">
                <div className="col-lg-8">
                <div className="row">
                <p className="text text-info">Post reported, we shall do our best to investigate the post and take the needed action.</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* Other profile links and save button code here */}
        <button disabled={true} className="save_btn" type="submit">
            repoted
        </button>
        </div>
         </>
        )
    }
    return ( 
        <>
        <div className="account_setting" style={{marginTop:'0px'}}>
        <div className="basic_profile" style={{marginTop:'0px'}}>
            <div className="basic_ptitle" style={{marginTop:'0px'}}>
            </div>
           <div className="basic_form">
            <div className="row">
                <div className="col-lg-8">
                <div className="row">
                
                    {/* Province Select */}
                    <div className="col-lg-6">
                        <div className="ui search focus mt-30">
                        <div className="ui form swdh19">
                            <select
                                        className="prompt srch_explore"
                                        value={this.state.reason} 
                                        onChange={this.handleReasonSelect}>
                                        <label>Reason &nbsp;</label>
                                            <option key="reason1" value="">-- Select a Reason --</option>
                                            <option key="reason-other "value="other">Other</option>
                                            {
                                                this.state.reportReasons.map((reason,index)=>{
                                                    return <option key={'reason-number-'+index} value={reason}>{reason}</option>
                                                })
                                            }
                                        </select>
                                        </div>
                        </div>
                    </div>
                    {this.state.showReasonBody? <div className="col-lg-12">
                        <div className="ui search focus mt-30">
                            <div className="ui form swdh30">
                            <div className="field">
                                <textarea
                                onChange={this.handleAddReasonBody}
                                rows={3}
                                name="description"
                                id="id_about"
                                placeholder="Tell us a little bit more..."
                                value={this.state.reasonBody}
                                />
                            </div>
                            </div>
                        </div>
                    </div> : <></>} 

                </div>
                </div>
            </div>
            </div>
        </div>
        {/* Other profile links and save button code here */}
        <button disabled={this.state.submitting} className="save_btn" type="submit" onClick={this.handleSubmit}>
            {this.state.submittingText}
        </button>
        </div>
       {this.state.errorExists? <p className="text text-warning">{this.state.errorText}</p> : <></>}
        </>
    )
   }
}