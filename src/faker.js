import { fakerES_MX as faker } from '@faker-js/faker';

export const generateProducts =() => {
    const product ={
        
        title:faker.commerce.productName(), 
        description:faker.commerce.productAdjective(), 
        price:faker.commerce.price({ min: 100, max: 200, dec: 0 }), 
        trademark:faker.commerce.productMaterial(), 
        status:"true", 
        category:faker.commerce.department(), 
        code:faker.number.int({ min: 10, max: 1000 }), 
        stock:faker.number.int({ min: 10, max: 100 })
    }
    return product;
}