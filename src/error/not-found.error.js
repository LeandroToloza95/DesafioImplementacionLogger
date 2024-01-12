export default class CustomError{
    static createError(message){
        const error= new Error(`${message}`)
        throw error
    }
}