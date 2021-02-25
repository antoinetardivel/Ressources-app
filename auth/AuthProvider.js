import { useContext, createContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import firebase from "../config/fire-config";

const AuthContext = createContext(
  {
  user: null,
  }
);

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.nookies = nookies;
    }
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);
  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};