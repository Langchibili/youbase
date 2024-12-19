import React, { createContext, useContext, useState, useMemo } from 'react'

// Create the context
const SocialSharingContext = createContext()

// Context provider
export const SocialSharingProvider = ({ children }) => {
  const [metaTags, setMetaTags] = useState([])

  // Function to set social sharing tags
  const setSocialSharingTags = ({ title, description, image, url }) => {
    const tags = [
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ]
    setMetaTags(tags)
  }

  // Function to set general SEO tags
  const setSEO = ({ title, description, keywords, url }) => {
    const tags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'title', content: title },
      { property: 'og:url', content: url },
    ]
    setMetaTags(tags)
  }

  const value = useMemo(
    () => ({
      setSocialSharingTags,
      setSEO,
      metaTags, // Expose the current tags
    }),
    [metaTags]
  )

  return <SocialSharingContext.Provider value={value}>{children}</SocialSharingContext.Provider>
}

// Custom hook to use the context
export const useSocialSharing = () => {
  const context = useContext(SocialSharingContext)
  if (!context) {
    throw new Error('useSocialSharing must be used within a SocialSharingProvider')
  }
  return context
}
