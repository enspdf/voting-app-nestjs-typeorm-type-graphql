import { createTransport, getTestMessageUrl } from 'nodemailer';

export const sendEmail = async (email: string, link: string) => {
    let transporter = createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        }
    });

    const info = await transporter.sendMail({
        from: '',
        to: email,
        subject: '',
        text: '',
        html: `<a href='${link}'>Confirm Email</a>`,
    });

    console.log('Message Sent: %s', info.messageId);
};
