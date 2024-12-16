import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Chip, Button } from '@mui/material'
import { getCategoryNames, getPostFromId, pushCategories } from '@/Functions'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const CategorySelector = ({ post, parentCategory, handleCategorySet }) => {
  const [categories, setCategories] = useState([])
  const [existingCategories, setExistingCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isSaved, setIsSaved] = useState(false)
  useEffect(() => {
    // Fetch categories from backend API
    const fetchCategories = async () => {
      try {
        const categoryNames = await getCategoryNames(parentCategory)
        console.log('the post here',post)
        const postWithCategories = await getPostFromId(post.id,'categories') // get the post's existing categories and prepopulate
        handleSetExistingCategories(postWithCategories.categories)
        if(postWithCategories.categories.data && postWithCategories.categories.data.length >= 1){
          handleCategorySet(true)
        }
        console.log('these are the existing categories', categories)
        setCategories(categoryNames)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [parentCategory])

  const handleSetExistingCategories = (categories)=>{
    if(categories && categories.data){
      categories.data.forEach(category => {
        existingCategories.push(category.attributes.categoryName)
        setExistingCategories(existingCategories)
        selectedCategories.push(category.attributes.categoryName)
        setSelectedCategories(selectedCategories)
      })
    }
  }
  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
    setIsSaved(false)
  }

  const handleSaveCategories = async () => {
    // Save the selected categories (e.g., update post)
    console.log('Saving categories:', selectedCategories)
    pushCategories(selectedCategories,existingCategories,parentCategory,post.id)
    if(selectedCategories.length === 0){ // if no category is added, you haven't saved anything then
      if(handleCategorySet){
        handleCategorySet(false)
      }
      setIsSaved(false)
      return
    }
    if(handleCategorySet){
      handleCategorySet(true)
    }
    setIsSaved(true)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Select {parentCategory === "music"? "Genres": "Categories"}</Typography>

      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="multiple-category-label">{parentCategory === "music"? "Genres": "Categories"}</InputLabel>
        <Select
          labelId="multiple-category-label"
          id="multiple-category-select"
          multiple
          sx={{marginLeft:'-8px'}}
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((categoryName) => (
            <MenuItem
              key={categoryName}
              value={categoryName}
              style={{ fontWeight: selectedCategories.includes(categoryName) ? 'bold' : 'normal' }}
            >
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategories.length > 0 && (
        <Box mt={2}>
          <Typography variant="body1">Selected {parentCategory === "music"? "Genre": "Categories"}: <span style={{fontWeight:600}}>{selectedCategories.join(', ')}</span></Typography>
          {!isSaved ? (
            <Button variant="contained" color="primary" onClick={handleSaveCategories} sx={{ mt: 2 }}>
              Save {parentCategory === "music"? "genres": "categories"}
            </Button>
          ) : (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              {parentCategory === "music"? "Genre": "Categories"} saved successfully!
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

CategorySelector.propTypes = {
  post: PropTypes.object.isRequired,
  parentCategory: PropTypes.string
}

export default CategorySelector
