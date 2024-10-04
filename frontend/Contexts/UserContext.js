import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserLogginStatus } from '@/Constants';

// Create a context
const UserContext = createContext(null);

// Create a provider component
export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkUserLogginStatus();
        setLoggedInUser(user);
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchUser();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state if needed
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to use the loggedInUser
export function useUser() {
  return useContext(UserContext);
}
