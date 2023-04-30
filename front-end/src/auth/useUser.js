import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
  // Get the token using the useToken state
  const [token] = useToken();
  // Define a function for getting the payload from the token. Remember that the token is just long string
  // of sort of random looking numbers and letters. So, what we need to do is to parse that into a JSON object.
  const getPayloadFromToken = (token) => {
    // This function is going to take a token as an argument. And get the payload from the token.
    const encodedPayload = token.split(".")[1]; // And we want the middle portion of that so that's going to be index one of that split that we made.
    return JSON.parse(atob(encodedPayload));
    // A to B is a built-in function in most browsers
  };
  // Now, define a user state
  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });
  // Lastly, useEffect that will basically watch the token for changes. And whenever the token changes, it will update the user as well.
  // This will basically allow our other components to either get the token or the user at any given point in time, and be sure that they're in sync.
  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);
  return user;
};
