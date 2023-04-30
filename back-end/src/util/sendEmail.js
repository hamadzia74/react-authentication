import sendgrid from "@sendgrid/mail";

/* Set the API Key that we added to the .env file for SendGrid. SendGrid will basically
use that to link up to our project/
*/
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

/* Define our functions. Generally like to have functions like this since this function is going to need
 to take five different arguments, usually like to have those inside an object. */
export const sendEmail = ({ to, from, subject, text, html }) => {
    const msg = { to, from, subject, text, html };
    return sendgrid.send(msg);
};
