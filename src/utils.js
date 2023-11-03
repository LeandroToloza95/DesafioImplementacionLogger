//creacion __dirname
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default __dirname
// console.log(__dirname);

export const hashData = async(data) => {
    const hash = await bcrypt.hash(data,10);
    return hash
}

export const compareData=async(data,hashData)=>{
    return await bcrypt.compare(data,hashData)
}