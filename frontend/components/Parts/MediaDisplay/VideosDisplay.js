'use effect'

import { clientUrl } from "@/Constants";
import React from "react";

export default class VideosDisplay extends React.Component{
    constructor(props){
         super(props)
         this.state = {

         }
    }
    
    render(){
        return (
            <div className="live1452">
            <div className="iframe-parent-class" style={{ height: "auto" }}>
              <iframe
                src={clientUrl+"/videods/"+this.props.postid}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                className=""
              />
            </div>
          </div>
        )
    }
}