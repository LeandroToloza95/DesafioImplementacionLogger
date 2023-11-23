//creacion __dirname
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __dirname = dirname(fileURLToPath(import.meta.url))

//jwt
const JWT_SECRET='jwtSECRET'

export default __dirname
// console.log(__dirname);

//bcrypt
export const hashData = async(data) => {
    const hash = await bcrypt.hash(data,10);
    return hash
}

export const compareData=async(data,hashData)=>{
    return await bcrypt.compare(data,hashData)
}

//jwt
export const generateToken = (user)=>{
    const token = jwt.sign(user,JWT_SECRET,{expiresIn:300});
    return token
}