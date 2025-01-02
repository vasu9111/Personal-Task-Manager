import { config } from "dotenv-safe";
config({
  example: "./.env.example",
  path: "./.env",
});

export default {
  port: process.env.PORT,
  dbUrl: process.env.MY_DB_URL,
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  },
  sessionSecret: process.env.SESSION_KEY,
  mail: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
    SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
    MAIL_API_KEY: process.env.MAIL_API_KEY,
  },
};
