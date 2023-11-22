import passport from "passport";
import { Strategy } from "passport-jwt";
import { pool } from "../db/index.js";
import config from "../constants/index.js";

const { SECRET } = config;

// const cookieExtractor = (req) =>{
//     let token = null;
//     // Extract the token from the Authorization header
//     if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
//       token = req.headers.authorization.split(" ")[1];
//     }
//     return token;
//   };
const bearerAuthExtractor = (req) => {
  let token = null;
  // Extract the token from the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: bearerAuthExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT user_id, email, is_admin FROM users WHERE user_id = $1",
        [id],
      );

      if (!rows.length) {
        // If user is not found, send an "Unauthorized" error
        return done(null, false, { message: "" });
      }

      let user = {
        user_id: rows[0].user_id,
        email: rows[0].email,
        is_admin: rows[0].is_admin,
      };

      // If user is found, return the user object
      return done(null, user);
    } catch (error) {
      // If an unexpected error occurs, return a 500 status
      return done(null, false, { message: "Internal Server Error" });
    }
  }),
);
