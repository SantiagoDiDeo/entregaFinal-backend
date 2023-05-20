import nodemailer from 'nodemailer';
import { hostEmail, emailUser, emailPass} from '../environments/env.js';
import logger from '../logger/logger.js';

export const handleSendEmail = async (test, subject, to) => {
    const transporter = nodemailer.createTransport({
        host: hostEmail,
        port: 587,
        auth: {
            user: emailUser,
            pass: emailPass,
        }
    });

    const info = await transporter.sendMail({
        from: emailUser,
        to,
        subject,
        text,
    });

    logger.info(`email sent ${JSON.stringify(info, null, 2)}`);
    return info;
};
