import { Router } from "express";
import passport from "passport";
import {sessionController} from '../controllers/session.controller.js'
import {jwtValidation} from '../middlewares/jwt.middleware.js'

const router = Router();

//Signup - Login - sin passport
router.post('/login', sessionController.login )

router.post('/signup', sessionController.signup )

// Signup - Login - Passport GITHUB
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github',
    passport.authenticate('github',
        {
            failureRedirect: '/error',
            successRedirect: '/api/views/products'
        }), (req, res) => {
            req.session.user = req.user;
            res.redirect('/api/views/products')
        }
);

router.get('/logout', sessionController.logout )

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/views/signup' }),
  function(req, res) {
    res.redirect(`/api/views/signupresponse/${req.user._id.toString()}`);
  });

router.get('/current',passport.authenticate('jwt', { session: false }),(req, res) => {
  return res.json({status:"sucess",payload:req.user})
})
export default router

