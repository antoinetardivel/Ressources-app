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
      console.log("nookies:")
      console.log(nookies)
    }
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {});
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {});
      // nookies.set(null, "token", token, {maxAge: 30 * 24 * 60 * 60,});
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