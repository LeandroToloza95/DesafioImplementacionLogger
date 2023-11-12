import passport from "passport";
import { userManagerClass } from "./dao/db/userManagerDb.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

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
        clientID: 'clientID',
        clientSecret: 'clientSecret',
        callbackURL: "http://localhost:8080/api/views/users/github"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try{
            const userDB=await userManagerClass.getUsersbyMail(profile.mail);
            //login user
            if (userDB !== -1) {
                if(userDB.from_github){
                    return done(null,userDB)
                }else{
                    return done(null,false)
                }
            }
            //signup user
            const newUser={
                first_name:"prueba",
                last_name:"test",
                email:profile.mail,
                password: "12345",
                from_github:true,
                isAdmin: "on"
            }
            const createdUser=await userManagerClass.addUser(newUser);
            done(null,createdUser)
        }catch(error){
            done(error)
        }
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