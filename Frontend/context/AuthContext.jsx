// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem('loggedInUser');
//       return stored && stored !== 'undefined' ? JSON.parse(stored) : null;
//     } catch (err) {
//       return null;
//     }
//   });

//   const login = (userData) => {
//     localStorage.setItem('loggedInUser', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('loggedInUser');
//     setUser(null);
//   };

//   const isLoggedIn = !!user; // <-- Add this line

//   useEffect(() => {
//     const syncUser = () => {
//       try {
//         const stored = localStorage.getItem('loggedInUser');
//         setUser(stored && stored !== 'undefined' ? JSON.parse(stored) : null);
//       } catch {
//         setUser(null);
//       }
//     };
//     window.addEventListener('storage', syncUser);
//     return () => window.removeEventListener('storage', syncUser);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('loggedInUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('loggedInUser');
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
