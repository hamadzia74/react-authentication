import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const history = useHistory();

  const onLogInClicked = async () => {
    // alert("Log in not implemented yet");
    const response = await axios.post('api/login', {
      email: emailValue,
      password: passwordValue,
      });
      // Once we get the response, we're going to get the token out of that response.
      const { token } = response.data;
      // set the token by calling setToken
      setToken(token);
      // And we're going to send the user to the user info page
      history.push('/');
  };

  return (
    <div className="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        placeholder="someone@gmail.com"
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
      />
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot your Password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have An Account? Sign Up
      </button>
    </div>
  );
};
