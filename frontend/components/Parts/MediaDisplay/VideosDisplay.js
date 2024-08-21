'use effect'

import { getPostMedia } from "@/Functions";
import React from "react";

export default class VideosDisplay extends React.Component{
    constructor(props){
         super(props)
         this.state = {

         }
    }
    componentDidMount(){
       const videos = this.props.videos
    }

    render(){
        return (
            <div className="live1452">
            <div className="iframe-parent-class" style={{ height: "auto" }}>
              <iframe
                src="https://www.youtube.com/embed/EEIk7gwjgIM?autoplay=1"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                className=""
              />
            </div>
          </div>
        )
    }
}