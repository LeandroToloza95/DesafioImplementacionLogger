export const authMiddleware = (req, res, next) =>{
    const {isAdmin} = req.body;
    if (!isAdmin){
        return res.send('Unauthorized by middleware')
    }
    next()
}