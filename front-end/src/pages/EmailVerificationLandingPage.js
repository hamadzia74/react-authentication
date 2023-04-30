import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Using this to get the verification code out of the URL when the the user clicks on the link
import axios from "axios";
import { useToken } from "../auth/useToken"; // custom hook
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true); // is Loading or not
  const [isSuccess, setIsSuccess] = useState(false); // whether or not the verification was successful
  const { verificationString } = useParams(); // get the verificatioString from our URL parameters
  const [, setToken] = useToken(); // import setToken function so that once we get the token back from the server, we can set this locally.

  useEffect(() => {
    // make the request to the server endpoint that we just created.
    const loadVerification = async () => {
      try {
        const response = await axios.put("/api/verify-email", {
          verificationString,
        }); // request contain the verificationString as the request body
        const { token } = response.data; // that's the token we got back from the server 
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);
  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return <EmailVerificationFail />;
  return <EmailVerificationSuccess />; //otherwise
};
