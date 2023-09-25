//creacion __dirname
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default __dirname
// console.log(__dirname);