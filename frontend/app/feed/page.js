"use client"

import { useUser } from "@/Contexts/UserContext"
import { dynamicConfig } from "@/Functions"
import { Book, FeedOutlined, ImageOutlined, VideocamOutlined } from "@mui/icons-material"
import React, { useEffect, useRef, useState } from "react"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box, Typography } from '@mui/material'
import TheatersIcon from '@mui/icons-material/Theaters'
import PostIcon from '@mui/icons-material/Article'
import VideoIcon from '@mui/icons-material/PlayCircleFilled'
import MusicIcon from '@mui/icons-material/MusicNote'
import ImageIcon from '@mui/icons-material/Image'
import CaptureIcon from '@mui/icons-material/CameraAlt'
import ContentDisplaySection from "@/components/Includes/ContentDisplay/ContentDisplaySection"
import PortraitContentDisplay from "@/components/Includes/ContentDisplay/PortraitContentDisplay"
import { api_url } from "@/Constants"
import Link from "next/link"
import FeedLandScapeContentDisplay from "@/components/Includes/ContentDisplay/FeedLandScapeContentDisplay"

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig()

const Feed = () => {
    const loggedInUser = useUser()
    const [value, setValue] = React.useState(0)
    const [tabStyle, setTabStyle] = useState({})
    const containerRef = useRef(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        const updateTabStyle = () => {
            const container = containerRef.current
            if (container) {
                const rect = container.getBoundingClientRect()
                setTabStyle({
                    width: `${rect.width}px`,
                    left: `${rect.left}px`,
                })
            }
        }

        updateTabStyle()
        window.addEventListener('resize', updateTabStyle)

        return () => {
            window.removeEventListener('resize', updateTabStyle)
        }
    }, [])

    // Tab-specific filters for the custom feed controller
    const tabFilters = [
        // Posts: Combined filter for multiple content types
        '{"$and":[{"$or":[{"type":{"$eq":"image"}},{"type":{"$eq":"text"}},{"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$ne":"portrait"}}]},{"type":{"$eq":"embed"}},{"type":{"$eq":"music"}}]},{"status":{"$eq":"published"}}]}',
        // Videos: Excludes portrait videos, includes embeds
        '{"$and":[{"$or":[{"type":{"$eq":"video"}},{"type":{"$eq":"embed"}}]},{"mediaDisplayType":{"$ne":"portrait"}},{"status":{"$eq":"published"}}]}',
        // Music: Only music content
        '{"$and":[{"type":{"$eq":"music"}},{"status":{"$eq":"published"}}]}',
        // Images: Excludes portrait images
        '{"$and":[{"type":{"$eq":"image"}},{"mediaDisplayType":{"$ne":"portrait"}},{"status":{"$eq":"published"}}]}',
        // Reels: Portrait videos only
        '{"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$eq":"portrait"}},{"status":{"$eq":"published"}}]}',
        // Captures: Portrait images only
        '{"$and":[{"type":{"$eq":"image"}},{"mediaDisplayType":{"$eq":"portrait"}},{"status":{"$eq":"published"}}]}',
        // Text: Only text content
        '{"$and":[{"type":{"$eq":"text"}},{"status":{"$eq":"published"}}]}',
    ]

    const AllPostTypesContent = () => {
        const ReelsSection = () => {
            return <ContentDisplaySection
            loggedInUser={loggedInUser}
            contentDisplay={(props) => <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />}
            contentUri={`${api_url}/get-user-feed`}
            customPagination={true}
            limit={15}
            totalPages={1}
            contentQueryFilters={'loggedInUserId='+loggedInUser.user.id+'/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters={"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$eq":"portrait"}},{"status":{"$eq":"published"}}]}'}
            nextSectionToDisplay={() => firstPostsDisplay()}
        />
        }

        const firstPostsDisplay = () => {
          return <ContentDisplaySection
              loggedInUser={loggedInUser}
              removeBottomPadding={true}
              contentDisplay={(props) => <FeedLandScapeContentDisplay content={props.content} loggedInUser={loggedInUser} />}
              contentUri={`${api_url}/get-user-feed`}
              customPagination={true}
              limit={5}
              startPage={2}
              totalPages={1}
              contentQueryFilters={'loggedInUserId='+loggedInUser.user.id+'/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters={"$and":[{"$or":[{"type":{"$eq":"image"}},{"type":{"$eq":"text"}},{"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$ne":"portrait"}}]},{"type":{"$eq":"embed"}},{"type":{"$eq":"music"}}]},{"status":{"$eq":"published"}}]}'}
              nextSectionToDisplay={() => CapturesSection()}
          />
       }

        const CapturesSection = () => {
            return <ContentDisplaySection
                loggedInUser={loggedInUser}
                contentDisplay={(props) => <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />}
                contentUri={`${api_url}/get-user-feed`}
                customPagination={true}
                limit={15}
                totalPages={1}
                contentQueryFilters={'loggedInUserId='+loggedInUser.user.id+'/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters={"$and":[{"type":{"$eq":"image"}},{"mediaDisplayType":{"$eq":"portrait"}},{"status":{"$eq":"published"}}]}'}
                nextSectionToDisplay={() => lastPostsDisplay()}
            />
        }

        const lastPostsDisplay = () => {
            return <ContentDisplaySection
                loggedInUser={loggedInUser}
                removeBottomPadding={true}
                contentDisplay={(props) => <FeedLandScapeContentDisplay content={props.content} loggedInUser={loggedInUser} />}
                contentUri={`${api_url}/get-user-feed`}
                customPagination={true}
                limit={5}
                startPage={3}
                contentQueryFilters={'loggedInUserId='+loggedInUser.user.id+'/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters={"$and":[{"$or":[{"type":{"$eq":"image"}},{"type":{"$eq":"text"}},{"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$ne":"portrait"}}]},{"type":{"$eq":"embed"}},{"type":{"$eq":"music"}}]},{"status":{"$eq":"published"}}]}'}
            />
        }
        {/* if this is empry, then that means your following has no posts at all, or you aren't following anyone */}
        return <ContentDisplaySection
              loggedInUser={loggedInUser}
              contentDisplay={(props) => <FeedLandScapeContentDisplay content={props.content} loggedInUser={loggedInUser} />}
              contentUri={`${api_url}/get-user-feed`}
              customPagination={true}
              limit={5}
              totalPages={1}
              emptyContentMessage="Your feed is empty, follow some users"
              showEmptyContentMessage={true}
              actionIfContentIsEmpty = {()=><Link className="btn btn-info" href="/users">Find Users To Follow</Link>}
              contentQueryFilters={'loggedInUserId='+loggedInUser.user.id+'/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters={"$and":[{"$or":[{"type":{"$eq":"image"}},{"type":{"$eq":"text"}},{"$and":[{"type":{"$eq":"video"}},{"mediaDisplayType":{"$ne":"portrait"}}]},{"type":{"$eq":"embed"}},{"type":{"$eq":"music"}}]},{"status":{"$eq":"published"}}]}'}
              nextSectionToDisplay={() => ReelsSection()}
          />
    }
    

    if (typeof document !== "undefined") {
        return (
            <>
                <div className="sa4d25">
                    <div className="container-fluid">
                        <div className="row">
                          <div className="col-xl-9 col-lg-8" style={{marginTop:'10px'}}>
                              <h4 class="item_title" style={{paddingTop:'1px'}}>FEED | </h4> <small style={{paddingLeft: '5px'}}> posts from who you follow</small>
                          </div>
                            <div className="col-xl-9 col-lg-8"
                                styles={{
                                    position: 'relative',
                                    height: '400px',
                                    border: '1px solid #ddd',
                                    overflow: 'hidden',
                                }}
                                ref={containerRef}
                            >  <Box>
                                    {value === 0 ? AllPostTypesContent() : <ContentDisplaySection
                                        key={value}
                                        loggedInUser={loggedInUser}
                                        emptyContentMessage="No content available for this tab."
                                        showEmptyContentMessage={true}
                                        contentDisplay={(props) =>
                                            value === 4 || value === 5 ? (
                                                <PortraitContentDisplay content={props.content} loggedInUser={loggedInUser} />
                                            ) : (
                                                <FeedLandScapeContentDisplay content={props.content} loggedInUser={loggedInUser} />
                                            )
                                        }
                                        contentUri={`${api_url}/get-user-feed`}
                                        customPagination={true}
                                        limit={10}
                                        contentQueryFilters={`loggedInUserId=${loggedInUser.user.id}/get-user-feed&sort=id:desc&populate=user,featuredImages,media&filters=${tabFilters[value]}`}
                                    />}

                                    <Box
                                        sx={{
                                            position: 'fixed',
                                            bottom: 0,
                                            backgroundColor: 'white',
                                            boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.1)',
                                            ...tabStyle,
                                            zIndex: 90,
                                        }}
                                    >
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="media tabs"
                                            variant="fullWidth"
                                            sx={{
                                                minHeight: '56px',
                                                '& .MuiTab-root': {
                                                    minWidth: 0,
                                                    padding: '8px 0',
                                                },
                                            }}
                                        >
                                            <Tab icon={<PostIcon />} aria-label="posts" />
                                            <Tab icon={<VideoIcon />} aria-label="videos" />
                                            <Tab icon={<MusicIcon />} aria-label="music" />
                                            <Tab icon={<ImageIcon />} aria-label="images" />
                                            <Tab icon={<TheatersIcon />} aria-label="reels" />
                                            <Tab icon={<CaptureIcon />} aria-label="captures" />
                                            <Tab icon={<Book />} aria-label="text" />
                                        </Tabs>
                                    </Box>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Feed