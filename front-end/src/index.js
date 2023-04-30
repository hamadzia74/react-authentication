import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes } from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*User Authentication Basics: 
We have a working authentication flow that allows users to both sign up
and log in to our application. And it also uses JWTs to keep our users logged in
and make sure users can only access their own user data.

1. Building a login page
2. Building a sign-up page
3. Creating private React Routes
4. Adding a sign-up route to the server
5. Generating JSON Web Tokens
6. Adding a login route to the server
7. Implementing JWTs on the front end
8. Adding JWTs to sign-up page
9. Adding JWTs to login page
10. Adding an update user route
11. Verifying JSON Web Tokens
12. Adding JWTS to the user info page
13. Adding logout functionality*/

/* Email Verification - The Basic  Email Verification Process
Adding to our application is an email verification flow.
We need to make sure that our users own the email addressed they're signing up with.

1. Setting up an email provider
2. Sending emails from Node
3. Integrating verification tokens
4. Creating a verify email page
5. Adding a verify email route
6. Creating a verification landing page
7. Handling successful and failed verifications

Steps:
1. The email verification flow begins when a user created a new account on our
application. At this point, they've entered their email & password.
2. This information will then be sent to the signup end point on our server which
creates a new user account & then stores the user's information in mongoDB.
3. Now, here's where email verification comes in. In addition to the email & password
that the user created their account with, our server is going to create a randomly generated verification hash 
that the user can't see. And this will be used to prove that the user actually has access to thay email address.
4. The the server sends an email link with this verification hash to the provided email address.
5. If the user really owns the email, they can click this link, which sends them to a special landing page in
our application.
6. The landing page parses the verification hash from the URL and sends it to the server.
7. If the Verification hash matches, the user is marked as "verified".
*/

/*
Resetting Passwords
1. The basic password reset process
2. Adding a forget password page
3. Sending a reset password email
4. Creating a reset password landing page
5. Handling password reset success and failur
6. Adding a reset password server endpoint

Steps: Very similiar to the email verficiation process
1. The user clicks the "forgot password" button, which takes them to another page.
2. The user enters their email into this page, which sends it to the server.
3. The serve will then check to see if an account with that email exists, the server generates a random verification 
hash and sends a link to that email address.
4. When the user clicks the link, they're taken to a landing page where they can enter a new password.
5. The new password is sent to the server, which checks to make sure the verification hash matches.
6. If it matches, the user's password is updated and they can log in with their new password.
*/
