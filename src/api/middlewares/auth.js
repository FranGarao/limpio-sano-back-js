const GoogleStrategy = require("passport-google-oauth20").Outh2Strategy;
const speakEasy = require("speakeasy");

var secret = speakEasy.generateSecret({
  name: "WeAreDevs",
  length: 20,
});
console.log(secret);

// module.exports = (passport) => {
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       },
//       (accessToken, refreshToken, profile, done) => {
//         return done(null, profile);
//       }
//     )
//   );
// };

//      66573749681-vad0cje2ufq0u5eifvr9qin5inor15p1.apps.googleusercontent.com

// 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
