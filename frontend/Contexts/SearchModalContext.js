import { createContext, useContext, useState } from 'react';

// Create a context
const SearchModalContext = createContext(null);

// Create a provider component
export function SearchModalProvider({ children }) {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <SearchModalContext.Provider value={{openSearchModal, setOpenSearchModal}}>
      {children}
    </SearchModalContext.Provider>
  )
}

// Create a custom hook to use the loggedInUser
export function useSearchModalOpen() {
  return useContext(SearchModalContext);
}
