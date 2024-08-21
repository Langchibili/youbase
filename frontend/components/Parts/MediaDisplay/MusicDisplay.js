'use effect'

import { getPostMedia } from "@/Functions";
import React from "react";

export default class MusicDisplay extends React.Component{
    constructor(props){
         super(props)
         this.state = {

         }
    }
    componentDidMount(){
        const songs = this.props.songs
    }

    render(){
        return (
            <div className="live1452">
            song file
          </div>
        )
    }
}