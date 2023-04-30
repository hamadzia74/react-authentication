import { useState } from "react";

export const useToken = () => {
  // Create Internal State that's linked to the user's local storage of their browser
  const [token, setTokenInternal] = useState(() => {
    // Pass a function to useState that will allow us to compute the initial state ourselves.
    return localStorage.getItem("token");
    // What this is going to do is if there's a token already in local storage,
    // it will set that token as the initial value for our token state inside this hook.
  });
  // Define a function that we'll actually expose to the user called setToken
  // and this is why I called the other one setTokenInternal becuase what this one's going to do,
  // it's actually going to take care of setting the token in localStorage, when the user wants to change it.
  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };
  // Lastly, return our token state variable & the setToken function that we've defined. So, if any of our
  // components wants to change the token it'll automatically becuase of the function we just created, change it in local storage as well.
  return [token, setToken];
};
