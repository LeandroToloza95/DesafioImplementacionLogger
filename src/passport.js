import passport from "passport";
import { userManagerClass } from "./dao/db/userManagerDb.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";
import config from "./config.js";
import { cartManagerClass } from './dao/db/cartManagerDb.js'


//local
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, username, password, done) => {
        try {

            const userDB = await userManagerClass.getUsersbyMail(username);

            if (userDB !== -1) {
                return done(null, false)
            }
            const hashedPassword = await hashData(password);
            const createdUser = await userManagerClass.addUser({ ...req.body, password: hashedPassword });
            done(null, createdUser)
        }
        catch (error) {
            done(error);
        }
    }

))

passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            const userDB = await userManagerClass.getUsersbyMail(username);
            if (userDB === -1) {
                return done(null, false)
            }
            const comparePassword = await compareData(password, userDB.password)
            if (!comparePassword) {
                return done(null, false)
            }
            return done(null, userDB)
        }
        catch (error) {
            done(error)
        }
    }
))

//GitHub
passport.use('github', new GitHubStrategy(
    {
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url
    }, async (accessToken, refreshToken, profile, done) => {

        try {

            const userDB = await userManagerClass.getUsersbyMail(profile._json.email);

            //login user
            if (userDB !== -1) {

                if (userDB.from_github) {
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            //signup user
            const cart = await cartManagerClass.createCart()
            const newUser = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || "",
                email: profile._json.email,
                password: "12345",
                cart:cart.id,
                from_github: true
            }

            const createdUser = await userManagerClass.addUser(newUser);
            done(null, createdUser)
        } catch (error) {
            done(error)
        }
    }
))

//Google
passport.use('google', new GoogleStrategy(
    {
        clientID: config.google_client_id,
        clientSecret: config.google_client_secret,
        callbackURL: config.google_callback_url
      },
      async(accessToken, refreshToken, profile, done)=>{
        // console.log("email",profile._json.email);
        try{
            const userDB = await userManagerClass.getUsersbyMail(profile._json.email);

            //login user
            if (userDB !== -1) {

                if (userDB.from_google) {
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            //signup user
            const cart = await cartManagerClass.createCart()
            const newUser = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || "",
                email: profile._json.email,
                password: "12345",
                cart:cart.id,
                from_google: true
            }
            const createdUser = await userManagerClass.addUser(newUser);
            done(null, createdUser)

        }catch(error){
            done(error)
        }
        
      }
))

//JWT
passport.use('jwt', new JWTStrategy(
    {
        secretOrKey: config,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (jwt_payload, done) => {
        done(null, jwt_payload)
    }

))

//JWT con cookies

const fromCookies = (req)=>{
    return req.cookies.token;
}

passport.use('jwt', new JWTStrategy(
    {
        secretOrKey: config.jwt_secret,
        jwtFromRequest: ExtractJwt.fromExtractors([fromCookies])
    },
    async (jwt_payload, done) => {
        done(null, jwt_payload)
    }

))


passport.serializeUser(function (user, done) {
    done(null, user._id);
})


passport.deserializeUser(async function (id, done) {
    try {
        const user = await userManagerClass.getUsersbyID(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
}
)