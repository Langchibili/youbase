import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ContentDisplaySection from '@/components/Includes/ContentDisplay/ContentDisplaySection';
import PortraitContentDisplay from '@/components/Includes/ContentDisplay/PortraitContentDisplay';
import LandscapeContent from '@/components/Includes/ContentDisplay/LandscapeContent';
import { api_url } from '@/Constants';

export default function SearchForm(props) {
  const [value, setValue] = useState(0); // Active tab index
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Filters for each tab
  const tabFilters = [
    'filters[$and][0][$or][0][type][$eq]=image&filters[$and][0][$or][1][type][$eq]=text&filters[$and][0][$or][2][$and][0][type][$eq]=video&filters[$and][0][$or][2][$and][1][mediaDisplayType][$eq]=landscape', // Combined filter for "posts"
    'filters[$and][0][type][$eq]=video', // Videos
    'filters[$and][0][type][$eq]=music', // Music
    'filters[$and][0][type][$eq]=image', // Images
    'filters[$and][0][type][$eq]=text', // Text
    'filters[$and][0][type][$eq]=user', // Users
    'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait', // Reels
    'filters[$and][0][type][$eq]=image&filters[$and][1][mediaDisplayType][$eq]=portrait', // Captures
    'filters[$and][0][type][$eq]=embed', // Embeds
  ];

  // Debounce search term update
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, [searchTerm])

  useEffect(() => {
    if(typeof document !== "undefined"){
        const musicPlayer = document.getElementById('music-player-controller')
        if(musicPlayer){
          musicPlayer.style.display = "none"
        }
      }
      return () => {
        if(typeof document !== "undefined"){
          const musicPlayer = document.getElementById('music-player-controller')
          if(musicPlayer){
             musicPlayer.style.display = "block"
          }
        }
      }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term
  };
  const contentKey = `${value}-${debouncedSearchTerm}`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '85%',
          right: 0,
          marginRight: "10px",
          zIndex: 10,
          bgcolor: 'background.paper',
          padding: 1,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          flex: 1,
          marginBottom: 8, // Adjust to make space for the fixed tabs
          overflowY: 'auto',
          padding: 2,
        }}
      >
        <ContentDisplaySection
          key={contentKey}
          loggedInUser={props.loggedInUser}
          emptyContentMessage="No results found"
          showEmptyContentMessage={true}
          contentDisplay={(props) =>
            value === 1 || value === 6 || value === 7 ? (
              <PortraitContentDisplay content={props.content} loggedInUser={props.loggedInUser} />
            ) : (
              <LandscapeContent content={props.content} loggedInUser={props.loggedInUser} />
            )
          }
          contentUri={`${api_url}/posts`}
          limit={10}
          contentQueryFilters={`${tabFilters[value]}&filters[$and][2][$or][0][title][$containsi]=${debouncedSearchTerm}&filters[$and][2][$or][1][description][$containsi]=${debouncedSearchTerm}&filters[$and][3][status][$eq]=published&populate=user,featuredImages,media`}
        />
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: "10px",
          width: '100%',
          zIndex: 10,
          bgcolor: 'background.paper',
          boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="Posts" />
          <Tab label="Videos" />
          <Tab label="Music" />
          <Tab label="Images" />
          <Tab label="Text" />
          <Tab label="Users" />
          <Tab label="Reels" />
          <Tab label="Captures" />
          <Tab label="Embeds" />
        </Tabs>
      </Box>
    </Box>
  );
}
