import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid} from 'uuid';
import { getDbConnection } from "../db";
import { sendEmail } from '../util/sendEmail';

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    // get the email and password that our front end sent to us
    const { email, password } = req.body;
    // get a connection to the database to use that we have to use the getDbConnection helper method
    const db = getDbConnection("react-auth-db");
    // make that we don't already have a user with that email
    // It is a normal mongodb request
    const user = await db.collection("users").findOne({ email });
    if (user) {
      res.sendStatus(409); //this is basically a conflict error code.
    }
    // In general, we're never going to want to store a user's password in the database as plain text.
    // This is very unsecure since it been that if a hacker were to get access to our database they'd basically have all of our user's passwords.
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate a verification string to send to the user.
    const verificationString = uuid(); // Generate a unique verification string for us
    // Create a new user in our database with all of this data that we have.
    const startingInfo = {
        hairColor: '',
        favoriteFood: '',
        bio: '',
    };

    // Insert a user into our database
    const result = await db.collection('users').insertOne({
        email,
        passwordHash,
        info: startingInfo,
        isVerified: false,
        verificationString,
    });
    // Now, get the Id from the above result. When MongoDB inserts a given document, it automatically assigns an ID.
    // We want to be able to send that back to the client
    const { insertedId } = result;

    /* And then before we actually sign the JWT token & send it back to the user, we're going to send this verification email
    using the function that we created previously */
    try {
      await sendEmail({
        to: email,
        from: 'hamadzia74@gmail.com',
        subject: 'Please verify your email',
        text: `
          Thanks for signing up! To verify your email click here:
          http://localhost:3000/verify-email/${verificationString}
        `,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500); 
    }

    // Generate  a JSON Web Token with all of this information, except for the passwordHash that we're going to basically
    // send back to the client so that they can store it and use it.
    jwt.sign({
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
    }, 
    // Second argument is going to be the JSON Web Token Secret. This is the secret that only our server is going to know
    // that it'll use to sign the token that it creates. So this is where the .env package that we created comes in
    process.env.JWT_SECRET,
    // And the third argument that we pass to jwt.sign is some more configuration.
    {
        expiresIn: '2d',
    },
    (err, token) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ token });
    // Now we have to export this signUpRoute from our routes => index file
    });
  }
};
