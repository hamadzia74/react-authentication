import { ObjectId } from 'mongodb'; // To find the users in out database by their ID
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        // Start off by getting the verification string from request body that the client sent.
        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');
        // Find the user with this verification string in the database
        const result = await db.collection('users').findOne({
            verificationString, // Whose verification matches
        });
        if (!result) return res.status(401).json({ message: 'The email verification code is incorrect'})
        const { _id: id, email, info } = result;
        await db.collection('users').updateOne({_id: ObjectId(id)}, {
            // For update
            $set: { isVerified: true}
        });
        // Now send that information back to the user. So, generate JWT
        jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d'}, (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token }); 
        });

    }
}