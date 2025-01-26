import * as dotenv from 'dotenv';
dotenv.config();

export const credentials = {
    password: process.env.PASSWORD,
    username: process.env.USER,
    invalidPassword: process.env.INVALIDPASSWORD
}