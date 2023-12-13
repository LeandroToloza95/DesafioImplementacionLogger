import { userManagerClass } from "../dao/db/userManagerDb.js";

// export const createOne = async () => {
//     const createdUser = await userManagerClass.addUser()
//     return createdUser
// }

export const findAll = async (limit, sort, page) => {
    if (!limit) {
        limit = 10
    }
    if (!page) {
        page = 1
    }
    let order
    if (sort) {
        switch (sort) {
            case 'ASC':
                order = 1
                break;
            case 'DESC':
                order = -1
                break;
            default:
                order = 1
                break;
        }
    } else {
        order = 1
    }

    let mensajeLimite = 'without limit'
    if (limit && +limit > 0) {
        mensajeLimite = `limited to ${limit} elements`
    }

    let mensajeOrden = 'without order'
    if (order && (order == 'DESC' || order == 'ASC')) {
        mensajeOrden = `ordered to ${order}`
    }

    const result = await userManagerClass.getUsers(limit, order, page)
    const info = {
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage ? `http://localhost:8080/api/users?page=${result.prevPage}` : null,
        hasNextPage: result.hasNextPage ? `http://localhost:8080/api/users?page=${result.nextPage}` : null

    }

    return { status: 'success', payload: result.docs, info ,mensajeOrden,mensajeLimite}
}

export const findById = async (iduser) => {
    const user = await userManagerClass.getUsersbyID(iduser)
    return user
}

export const deleteOne = async (iduser) => {
    const user = await userManagerClass.deleteUserss(iduser)
    return user
}