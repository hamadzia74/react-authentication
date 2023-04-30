import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'hamadzia74+tet1@gmail.com',
                from: 'junaid.imedhealth@gmail.com',
                subject: 'Does this work?',
                text: 'If you\'re reading this... yes!',
            });
            res.sendStatus(200);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}