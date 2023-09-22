import nodemailer from 'nodemailer';
import { appConfig } from '../common/appconfig';

const email = appConfig.env.EMAIL_USER;
const pass = appConfig.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: pass,
  },
});

export async function sendEmail(email,subject,text) {
  try {
    const info = await transporter.sendMail({
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

