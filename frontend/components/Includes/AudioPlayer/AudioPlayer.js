'use client'

import React, { useEffect } from "react";
import "./AudioPlayer.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { getImage, getPostsByType } from "@/Functions";
import { backEndUrl } from "@/Constants";
import { useAudio } from "@/Contexts/AudioContext";


export default class AudioPlayer extends React.Component{
    constructor(props){
      super(props);
      this.audioinstance = null
      this.state = {
        playList: [],
        playedSongs: [],
        autoPlay: false,
        clearPriorAudioLists: true,
        audioInstance: null
      }
    }

    
    getDefaultPlaylist = async ()=>{
        const posts = await getPostsByType('music',true,'media')
        if(!this.audioinstance){
            return
        }
    //   //console.log(getInitialSongs)
    //   this.audioinstance.oncanplay = () =>{ 
    //     this.audioinstance.pause();
    //   }
    //   this.audioinstance.onerror = (e)=>{
    //     this.audioinstance.load();
    //     this.audioinstance.oncanplay = () =>{
    //       this.audioinstance.play();
    //     }
    //     console.log(e);
    //   }

      /* null because we are getting songs only and looping throgh them one by one, just the media */
      this.setState({
        playList: posts.media.map((song)=>{ 
          const backendUrl = song.provider === "aws-s3"? '' : backEndUrl
          return { key: song.id, musicSrc: backendUrl+song.url, name: song.name, singer: song.name, cover: getImage(null,'thumbnail','music')}
        })
      },()=>{
        console.log(this.state.playList)
      })
    }

    PlayNewList = async (nowPlayingListId) =>{
    //   const playlistObject = await api.getItemById("/playlists", nowPlayingListId, " "); // playlist object with song ids
    //   const playListSongs= await api.createItem("/playlists/songs", {postIds: playlistObject.postIds, limit: 20}); // playlist with song objects
    //   this.setState({
    //     playList: playListSongs.map((song)=>{ return { key: song._id, musicSrc: song.track.uri_path, name: song.title, singer: song.artist.artistName, cover: song.thumbnail.medium}})
    //   },()=>{
    //     this.setState({
    //       autoPlay: true
    //     })
    //   })
    }
    addSongToPlaylist = async (nowPlayingSongs,post)=>{
        if(nowPlayingSongs){ 
            const playList = this.state.playList;
            const newPlayList = nowPlayingSongs.map((song,index)=>{
               /// post.featuredImages.data[0] this is bount to change when multiple images and songs are allowed
               if(song.hasOwnProperty('attributes')){
                const backendUrl = song.attributes.provider === "aws-s3"? '' : backEndUrl
                return {key: song.id, musicSrc: backendUrl+song.attributes.url, name: post.title?  post.title : song.attributes.name, singer: song.attributes.name, cover: getImage(post.featuredImages.data[0],'thumbnail','music')}
               }
               const backendUrl = song.provider === "aws-s3"? '' : backEndUrl
               return {key: song.id, musicSrc: backendUrl+song.url, name: post.title? post.title : song.name, singer: song.name, cover: getImage(post.featuredImages.data[0],'thumbnail','music')}
            })
            this.setState({
                clearPriorAudioLists: true,
                playList: [newPlayList[0],...newPlayList,...playList] //since it plays only from the second song, this guarantees the added song plays
            }, 
            ()=>{
                if(!this.audioinstance){
                    return
                }
                console.log(this.state.playList)
                this.audioinstance.load();
                this.audioinstance.oncanplay = () =>{ 
                
                }
                this.audioinstance.onerror = (e)=>{
                
                this.audioinstance.oncanplay = () =>{
                    this.audioinstance.play();
                }
                console.log(e);
                }
                this.audioinstance.play();
            }
          )
        }
        else{ 
          return
        }
    }
    logPlay = async (track)=>{
    //   const songId = track.key;
    //   const playedSongs = this.state.playedSongs;
    //   this.props.nowPlayingTrackId(track.key);
    //   if(playedSongs.includes(songId)){ return }
    //   const song = await api.getItemById("/posts", songId, ""); // get song once over
    //   document.getElementsByTagName("title")[0].innerText = song.title+" | "+song.artist.artistName;
    //   if(song){ 
    //     const user = await api.getItemByUsername("/users",song.userName,""); // get song owner
    //     if(!user.plays.includes(song._id)){
    //       song.counts.unique_plays = song.counts.unique_plays + 1; // update song's unique_play count
    //       user.plays.push(song._id); //push song id into song owner's play array only if not there before
    //       user.counts.unique_plays = user.counts.unique_plays + 1; // update song owner's unique_play count
    //     }
    //     user.counts.plays = user.counts.plays + 1; // update song owner's play count
    //     if(user){
    //       const updatedUser = await api.updateItem("/users",user,user._id); // update user's document
    //       if(updatedUser){
    //         song.counts.plays = song.counts.plays + 1; // update song's play count
    //         const updatedSong = await api.updateItem("/posts",song,song._id); // post counts
    //         const playedSongs = this.state.playedSongs;
    //         playedSongs.push(song._id)
    //         this.setState({
    //           playedSongs: playedSongs
    //         })
    //       }
    //     }
    //   } 
    }
    // pauseAudio = ()=>{
    //   if(this.props.pauseAudio){
    //     this.audioinstance.pause();
    //   }
    // }
    //componentWillReceiveProps(nextProps){
    //   if(this.props.nowPlayingSongId != nextProps.nowPlayingSongId){
    //     this.addSongToPlaylist(nextProps.nowPlayingSongId); //update list then
    //   }
    //   if(this.props.nowPlayingListId != nextProps.nowPlayingListId){
    //     this.PlayNewList(nextProps.nowPlayingListId); //update list then
    //   }
    //}
    // componentWillUpdate(){
    //   this.pauseAudio();
    // }

    componentDidMount(){
      this.getDefaultPlaylist();
    }

    // Set audio instance after it's available
    componentDidUpdate(prevProps, prevState) {
        if(this.state.audioInstance){
            return
        }
        if(this.audioinstance){
            this.getDefaultPlaylist();
        }
        const audioInstance = {...this,nowPlayingSongId:NaN};
        this.setState({ audioInstance });
        
    }
    
    options = {
        autoPlay: false,
        showDownload: false,
        showMediaSession : true
    }

    render(){   
        return(
         <div>
                <ReactJkMusicPlayer
                onAudioPlay={this.logPlay}
                autoPlay={this.state.autoPlay || false}
                 defaultPosition = {{right: "4px", bottom: "170px"}}
                {...this.options} 
                clearPriorAudioLists = {this.state.clearPriorAudioLists}
                audioLists = {this.state.playList || []}
                getAudioInstance = {(instance) => {
                    if(!this.audioinstance){
                        this.audioinstance = instance
                    }
                }}
               />
               {this.state.audioInstance? <NowPlaying audioInstance={this.state.audioInstance}/> : <></>}
        </div> 
        )
    }
}

const NowPlaying = ({audioInstance})=>{
    const {setAudioInstance} = useAudio()
    useEffect(() => {
        if (audioInstance) {
            setAudioInstance(audioInstance); // Only update if there's a valid instance
        }
      }, [audioInstance]);

 return <></>
}

