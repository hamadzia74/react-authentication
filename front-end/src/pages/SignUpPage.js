import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
    // alert("Sign up not implemented yet");
    // load data from the server by making a request
    const response = await axios.post('/api/signup', {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    // Once get data set it to setToken
    setToken(token);
    // history.push('/');
    history.push('/please-verify');
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
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
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPasswordValue}
        onChange={e => setConfirmPasswordValue(e.target.value)}
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => history.push("/login")}>
        Already have An Account? Log In
      </button>
    </div>
  );
};
