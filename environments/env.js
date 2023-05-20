import dotenv from 'dotenv';
dotenv.config();

export const mongoUrl = process.env.MONGO_URL;
export const mongoDbPass = process.env.MONGO_PASS;
export const hostEmail = process.env.EMAIL_HOST;
export const emailUser = process.env.EMAIL_USER;
export const emailPass = process.env.EMAIL_PASS; 