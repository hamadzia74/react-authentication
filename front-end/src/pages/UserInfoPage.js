import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

export const UserInfoPage = () => {
  const user = useUser(); // That'll get us the user info from the token that we have stored in local storage.
  const [token, setToken] = useToken(); // To update the Token when we update the user's data

  // Now, get the ID, email, and Info properties from our user
  const { id, email, isVerified, info } = user;

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const history = useHistory();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || ""); // Use the actual properties from that info thing we just got off of the user to populate the initial values for our text boxes down here.
  const [hairColor, setHairColor] = useState(info.hairColor || "");
  const [bio, setBio] = useState(info.bio || "");

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    // Send a request to the server to
    // update the user's info with any changes we've
    // made to the text input values
    // alert("Save functionality not implemented yet");
    // Instead of alert, we're going to have it make a network request to the endpoint we just created
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          favoriteFood,
          hairColor,
          bio,
        },
        {
          // last thing we have to add to this request is a header that contains the token that we stored in local storage.
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Get the new token that the server is going to send back to us.
      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    // We'll want to log the user out here
    // and send them to the "login page"
    // alert("Log out functionality not implemented yet");
    localStorage.removeItem('token');
    history.push('/login');
  };

  const resetValues = () => {
    // Reset the text input values to
    // their starting values (the data we loaded from the server)
    // alert("Reset functionality not implemented yet");
    setFavoriteFood(info.favoriteFood); // Reset the state value to their initial contents
    setHairColor(info.hairColor);
    setBio(info.bio);
    // So, basically when the user clicks the reset button, it will just reset all of these text boxes to the initial values we loaded from the server.
  };

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="content-container">
      {/* <h1>Info for ______</h1> */}
      <h1>Info for {email}</h1>
      {!isVerified && <div className="fail">You Won't be able to make any changes until you verify your email</div>}
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          onChange={(e) => setFavoriteFood(e.target.value)}
          value={favoriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
