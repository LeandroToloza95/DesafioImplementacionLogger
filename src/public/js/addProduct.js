document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async function () {
        const productId = this.getAttribute('data-product-id');
        const quantityInput = document.querySelector(`input[data-quantity-product-id='${productId}']`);
        const quantityValue = quantityInput.value
        const userId = await getUserId()
        const cartId = await getCartByUserId(userId);
        const response = await sendProductToCart(cartId, productId, quantityValue);


    });
});

async function getUserId() {
    try {

        const todasLasCookies = document.cookie;

        const miCookie = obtenerCookie(todasLasCookies,'token');
        // Crear un objeto FormData con los datos del formulario

        const headers = new Headers();
        headers.append('Content-Type',  'application/json'); // Puedes ajustar el tipo de contenido según tus necesidades
        headers.append('authorization',  `Bearer ${miCookie}`); 

        const response = await fetch(`/api/sessions/current`, {
            method: 'GET',
            headers: headers
        })

        if (!response.ok) {
            throw new Error('Error al obtener el userID');
        }
        
        const user = await response.json()
        return user.payload.id
    }
    catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

async function getCartByUserId(userId) {
    try {
        const response = await fetch(`/api/carts/getCartByUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener el carrito');
        }
        const cart = await response.json()
        return cart.cart._id
    }
    catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

async function sendProductToCart(cartId, productId, quantity) {
    try {
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "quantity": quantity }),
        })

        if (!response.ok) {
            throw new Error('Error al grabar producto en carrito');
        }
        const responseMessage = await response.json()
        return responseMessage
    }
    catch (error) {
        console.error('Error al grabar producto en carrito:', error.message);
        throw error;
    }
}

function obtenerCookie(todasLasCookies,nombre) {
    const nombreCookie = `${nombre}=`;
    const cookiesArray = todasLasCookies.split(';');

    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }

    return null; // Si no se encuentra la cookie
}