import passport from "passport";
import { Strategy } from "passport-jwt";
import { pool } from "../db/index.js";
import config from "../constants/index.js";

const { SECRET } = config;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT user_id, email, is_admin FROM users WHERE user_id = $1",
        [id],
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = {
        user_id: rows[0].user_id,
        email: rows[0].email,
        is_admin: rows[0].is_admin,
      };
      return done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  }),
);
