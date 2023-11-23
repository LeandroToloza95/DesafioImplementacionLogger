import passport from "passport";
import { userManagerClass } from "./dao/db/userManagerDb.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";

const JWT_SECRET = 'jwtSECRET'

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
        clientID: 'Iv1.dea0b4ac7692d16e',
        clientSecret: '82d5f50447020e5788dd7312adeacd58ea5fcfb8',
        callbackURL: "http://localhost:8080/api/sessions/github"
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
            const newUser = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || "",
                email: profile._json.email,
                password: "12345",
                from_github: true,
                isAdmin: "on"
            }
            const createdUser = await userManagerClass.addUser(newUser);
            done(null, createdUser)
        } catch (error) {
            done(error)
        }
    }
))

//JWT
passport.use('jwt', new JWTStrategy(
    {
        secretOrKey: JWT_SECRET,
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
        secretOrKey: JWT_SECRET,
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