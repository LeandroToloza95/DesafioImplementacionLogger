import jwt from 'jsonwebtoken'



export const authMiddleware = (roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.rol)){
            return res.status(401).json({message:'Not authorized'})
        }
        next();
    }
}
// } (req, res, next) =>{
//     const {isAdmin} = req.body;
//     if (!isAdmin){
//         return res.send('Unauthorized by middleware')
//     }
//     next()
// }