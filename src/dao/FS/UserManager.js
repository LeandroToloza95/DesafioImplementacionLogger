import { log } from 'console';
import fs from 'fs';

class userManager {

    constructor(path) {
        this.path = path;
    }

    async addUser(obj) {

        try {
            const users = await this.getUsers();
            
            let id;
            if (!users.length) {
                id = 1;
            } else {
                id = users[users.length - 1].id + 1
            };
            const newUser = { id, ...obj }
            users.push(newUser);
            await fs.promises.writeFile(this.path, JSON.stringify(users))
                .then(() => console.log(`Usuario ${id} agregado con exito`))
                .catch(error => console.log(error))

            return newUser

        } catch (error) {
            return error
        }

    }

    async getUsers(queryObj = null) {
        
        try {
            let queryObjNew;

            if(!queryObj){
                queryObjNew = {
                    order: null,
                    limit: null
                };
            }else{
                queryObjNew=queryObj
            }

            const { order } = queryObjNew 
            const { limit } = queryObjNew 
            
            const existeArchivo = fs.existsSync(this.path)

            if (existeArchivo) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                const infoParsed = JSON.parse(info)
                const infoSorted = await this.infoSorter(order,infoParsed)
                const infoLimited = await this.infoLimiter(limit,infoSorted)

                return infoLimited

            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getUsersbyID(idUsuario) {
        try {
            const users = await this.getUsers();
            const usuario = users.find(u => u.id === idUsuario)
            if (usuario) {
                return usuario
            } else {
                return null
            }
        }
        catch (error) {
            return error
        }

    }

    async deleteUsuario(idUsuario) {
        try {
            const users = await this.getUsers();
            const usuario = users.find(u => u.id === idUsuario)

            if (usuario) {
                const newArrayUsers = users.filter(u => u.id !== idUsuario)
                const usuarioEliminado = users.filter(u => u.id == idUsuario)

                await fs.promises.writeFile(this.path, JSON.stringify(newArrayUsers))
                    .then(() => console.log(`usuario ${idUsuario} eliminado con exito`))
                    .catch(error => console.log(error))

                return usuarioEliminado

            } else {
                return -1
            }
        }
        catch (error) {
            return error
        }
    }

    async updateUser(idUsuario, obj) {
        try {
            const users = await this.getUsers();
            const usuario = users.find(u => u.id === idUsuario)
            // console.log(usuario)
            if (usuario) {
                let indice = await this.calculaIndice(users, idUsuario)
                // console.log(indice)
                for (const property in obj) {
                    users[indice][`${property}`] = obj[`${property}`];
                    console.log(`Propiedad ${property} actualizada a: ${obj[`${property}`]}`);
                }
                await fs.promises.writeFile(this.path, JSON.stringify(users))
                    .then(() => console.log(`usuario ${idUsuario} actualizado con exito`))
                    .catch(error => console.log(error))
                console.log(users[indice])
                return users[indice]
            }
            else {
                return -1
            }
        }
        catch (error) {
            return error
        }
    }

    async calculaIndice(users, idUsuario) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === idUsuario) {
                return i;
            }
        }
    }

    async isNumber(val) {
        return typeof val === 'number';
    }
    
    async infoSorter (order,infoParsed) { 
        return order === 'ASC' ? infoParsed.sort((a, b) => a.trademark.localeCompare(b.trademark)) : 
        order === 'DESC' ? infoParsed.sort((a, b) => b.trademark.localeCompare(a.trademark)) :
        infoParsed    
    }

    async infoLimiter (limit,infoSorted) { 
        return +limit>0 ? infoSorted.slice(0, limit): infoSorted
    }
}
const user1 = {
    first_name: 'Leandro',
    last_name: 'Toloza',
    email: 'leatol@mail.com',
    password: '12345',
    isAdmin: true
}
const user2 = {
    first_name: 'Mariano',
    last_name: 'Rodriguez',
    email: 'marrod@mail.com',
    password: 'abcdef',
    isAdmin: true
}
const user3 = {
    first_name: 'Lorena',
    last_name: 'Estevez',
    email: 'lorest@mail.com',
    password: '11111',
    isAdmin: false
}
const user4 = {
    first_name: 'Sofia',
    last_name: 'Martinez',
    email: 'sofmar@mail.com',
    password: '54321',
    isAdmin: false
}

const user1actulizado = {
    title: 'Procesador Intel Celeron G4900 3.10GHz Socket 1151 OEM Coffe Lake',
    trademark : "Intel",
    description: 'Procesador',
    price: 26600,
    thumbnail: 'https://static-geektopia.com/storage/t/i/535/53506/9b3da83b7fb28625e02195fac.webp',
    code: 54,
    stock: 45
}

async function test() {
    
    const usuario1 = new userManager('users.json')
    await usuario1.addUser(user1)
    await usuario1.addUser(user2)
    await usuario1.addUser(user3)
    await usuario1.addUser(user4)

    // const usuario1consulta = await usuario1.getUsers()
    // console.log(usuario1consulta)
    // console.log(await usuario1.getUsersbyID(2))
    // await usuario1.deleteUsuario(3)
    // await usuario1.updateUser(1,user1actulizado)
}

// test()

export const userManagerClass = new userManager('users.json')