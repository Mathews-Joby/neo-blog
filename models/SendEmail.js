const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAIL_SERVICE_CLIENT_ID,
    MAIL_SERVICE_CLIENT_SECRET,
    MAIL_SERVICE_REFRESH_TOKEN,
    USER
} = process.env

const oauth2Client = new OAuth2(
    MAIL_SERVICE_CLIENT_ID,
    MAIL_SERVICE_CLIENT_SECRET,
    MAIL_SERVICE_REFRESH_TOKEN,
    USER
)

const sendMail = async (email, subject, text) => {
    oauth2Client.setCredentials({
        refresh_token: MAIL_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    try{
        const transporter = nodemailer.createTransport({
            // host: process.env.PORT,
            service: 'gmail',
            // port: 587,
            // secure: true,
            auth: {
                // user: process.env.USER,
                // pass: process.env.PASS,
                type: 'OAUTH2',
                user: 'neohelp0@gmail.com',
                pass: 'Mathews.Joby@@@@91827',
                clientId: MAIL_SERVICE_CLIENT_ID,
                clientSecret: MAIL_SERVICE_CLIENT_SECRET,
                refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
                accessToken
            },
        });

        const mailOptions = {
            from: USER,
            to: email, 
            subject: subject,
            html: text
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) return err;
            return info
        })

        // await transporter.sendMail({
        //     from: process.env.USER,
        //     to: email,
        //     subject: subject,
        //     text: text
        // })

        console.log("email sent successfully!")

    }catch (error) {
        console.log("email not sent!", error)
    }
}

module.exports = sendMail;