// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();
// import { OAuth2Client } from 'google-auth-library';

// router.post('/', async function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
//   res.header("Access-Control-Allow-Credentials", 'true');
//   res.header("Referrer-Policy","no-referrer-when-downgrade");
//   const redirectURL = 'http://localhost:8080/oauth';

//   const oAuth2Client = new OAuth2Client(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//       redirectURL
//     );

//     // Generate the url that will be used for the consent dialog.
//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
//       prompt: 'consent'
//     });

//     res.json({url:authorizeUrl})

// });

// export default router;