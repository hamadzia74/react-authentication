import { v4 as uuid } from 'uuid' //import uuid package which we'll be using to generate the reset code 
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid(); //generate a random string for us 

        // Update the user with this corresponding email & sent this password reset code that we just generated
        // on that user's object database

        const { result } = await db.collection('users').updateOne({ email }, { $set: { passwordResetCode } })

        if (result.nModified > 0) { // this is how mongodb specifies how many documents were actually modified here?
            // if there is a user in our database with that email, we send an email to that address
            try {
                await sendEmail({
                    to: email,
                    from: 'hamadzia74@gmail.com',
                    subject: 'Password Reset',
                    text: `
                    To reset your password, click this link:
                    http://localhost:3000/reset-password/${passwordResetCode}
                    `
                });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }

        }
        res.sendStatus(200);
    }
    
}