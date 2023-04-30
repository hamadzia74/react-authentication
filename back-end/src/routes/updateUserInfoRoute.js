// Backend route for updating the user data to integrate our UserInfoPage

import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const updateUserInfoRoute = {
  // Path for our route & we're going to use a URL parameter here to specify the ID of the user
  // that we're trying to update
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    // get the the authorization header from the client. So, basically when the client makes
    // a request to our server, they're going to send along a header that contains the JSON web tokens
    // so, that we know that it's them.
    const { authorization } = req.headers;
    // Then get the value of the user id url parameter.
    const { userId } = req.params;
    // Now, we're going to get the updates from the body. So the client side is going to send along a JSON
    // object containing the updates that they want to make to the user object.
    //  and then we're going to define an anonymous function that will basically get a subset of properties
    //  from the request body
    const updates = ({
      // We're going to use object de-structuring here to get the favorite food, the hair color, and the bio property from the request body.
      favoriteFood,
      hairColor,
      bio,
    }) =>
      // and return an object containing those exact same properties
      ({
        favoriteFood,
        hairColor,
        bio,
      }(
        // Call this anonymous function on request body by adding parentheses after it
        req.body
      ));
    // What this function does? This function takes only a subset of properties from an object. So, forever the request body, e.g, it returns an
    // object that contains only the favorite food, hair color, and bio properties that were included on the request body. And the reason we're doing
    // this is to make sure that users don't include extraneous data in the updates that they're trying to make to the database.

    // Now check if the authorization header that we got up at the top that was actually included.
    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }
    // Make sure that token is actually legitimate. We need to make sure that the user hasn't tampered with it in any way to modify that data.
    // Now the reason we have to split is because the authorization header that we got uo at the top, is going to look something like:
    // Bearer sjwiosj.xbjsxihwdiwoxmx.kjiosqw
    const token = authorization.split(" ")[1];

    // So, now we have our JSON Web Token, we need to verify that it hasn't been tampered with. Do this by using the JSON Web Token packages verify method.
    // pass the token as a first argument, second argument is our process.env.jwt_secret, and they we've our callback which is asynchronous. And the two arguments
    // here are going to be an error and the decoded JSON object.
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        //  If there was an error, chances are that means that token was not intact. It has been tampered within some way or just wasn't valid anymore.
        return res.status(401).json({ message: "Unable to verify token" });

      // If an error didn't occur, then we can get the ID from the decoded data & the decoded data is the user's data that they sent back to the server.
      const { id, isVerified } = decoded;
      // First thing we need to do is make sure that this ID of the token that was sent along matches the ID up at the top here of the user that they're trying to update
      // Users should only be able to update their own data.
      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
          if(!isVerified) return res.status(403).json({ message: 'You need to verify your email before you can update your data'});
      //  If the ID & the user ID match then we can actually update the user's data in our database. sO for this will have to connect the the DB.
      const db = getDbConnection("react-auth-db");
      const result = await db.collection("users").findOneAndUpdate(
        // The first arugument is going to be filter, so we want to update the document with the ID matching the user's ID. And that's what we imported that object ID
        { _id: ObjectID(id) },
        // We need to specify the changes we want to make. Info to the updated info
        { $set: { info: updates } },
        // Pass the configuration object with the property returnOriginal set to false. This is becuase this query returns the updated object instead of the original one
        { returnOriginal: false }
      );
      // The next thing is get the relevant data from the updated user and send it back to the client. So, we already have id
      // const { email, isVerified, info } = result.value;
      const { email, info } = result.value;
      jwt.sign(
        { id, email, isVerified, info },
        proces.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          //   Send token back to the client
          res.status(200).json({ token });
        }
      );
    });
  },
};
