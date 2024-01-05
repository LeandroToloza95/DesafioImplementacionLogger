import config from '../config.js'
import {cartManagerClass as cartManagerClassMongo} from "./db/carts.mongo.js";
import {cartManagerClass as cartManagerClassFile} from "./FS/cartManager.js";

import {productManagerClass as productManagerClassMongo} from "./db/products.mongo.js";
import {productManagerClass as productManagerClassFile} from "./FS/productManager.js";

import {userManagerClass as userManagerClassMongo} from "./db/users.mongo.js";
import {userManagerClass as userManagerClassFile} from "./FS/UserManager.js";

import {ticketManagerClass as ticketManagerClassMongo} from "./db/ticket.mongo.js";
import {ticketManagerClass as ticketManagerClassFile} from "./FS/ticketManager.js";

const URI = config.mongo_uri

export let cartManagerClass;
export let productManagerClass;
export let userManagerClass;
export let ticketManagerClass;

switch (config.persistence) {
    case "MONGO":
        cartManagerClass = cartManagerClassMongo;
        productManagerClass = productManagerClassMongo;
        userManagerClass = userManagerClassMongo;
        ticketManagerClass = ticketManagerClassMongo
        break;
    case "FILE":
        cartManagerClass = cartManagerClassFile;
        productManagerClass = productManagerClassFile;
        userManagerClass = userManagerClassFile;
        ticketManagerClass = ticketManagerClassFile
        break;
}
