import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo_uri:process.env.MONGO_URI,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    secret_key:process.env.SESSION_SECRET_KEY,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    jwt_secret:process.env.JWT_SECRET
}