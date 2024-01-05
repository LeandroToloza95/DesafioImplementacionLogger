import { compareData, generateToken, hashData } from "../utils.js";
import {sessionService} from "../services/session.services.js"

class SessionController {
    login = async (req, res) => { 
        //validacion del body de campos obligatorios
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }
            
            const response = await sessionService.login(email, password)
            if (response.status === 'success') {
                req.session["email"] = response.userDB.email;
                req.session["first_name"] = response.userDB.first_name;
                req.session["last_name"] = response.userDB.last_name;
                req.session["userId"] = response.userDB._id.toString();
                req.session["isAdmin"] = email === 'adminCoder@coder.com' && password === 'adminCod3r123' ? true : false
                //httpOnly : true -> no permite sacar desde el front la cookie
                // return res.redirect(`/api/views/products`)
                return res
                    .cookie("token", response.token,
                    //  { httpOnly: true }
                     )
                    .redirect(302,`/api/views/products`)


            }
            return res.status(400).json({ status: 'login failured', message: response.message })



        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    signup = async (req, res) => {
        //validacion del body de campos obligatorios
        try {
            const { first_name, last_name, email, password, age, role } = req.body

            const hashedPassword = await hashData(password)
            //FS
            //req.session["email"] = email

            if (!first_name || !last_name || !email || !password || !age || !role ){
                return res.status(400).json({ message: 'Information sent is incompleted' })
            }

            const newUser = await sessionService.signup({ ...req.body, password: hashedPassword})

            //En vez de enviar la anterior linea envio una ventana mas personalizada
            res.status(200)//.json({ message: `New users created with id ${newUser.id}`, users: newUser })
            res.redirect(`/api/views/signupresponse/${newUser.id}`)
            //return res.status(200).json({ message: `New users created with id ${newUser.id}`, users: newUser })
            //res.user=newUser
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: error.message })
        }

    }

    logout = (req, res) => {

        req.session.destroy(() => {
            res.redirect(`/api/views/login`)
        })

    }
}

export const sessionController = new SessionController()