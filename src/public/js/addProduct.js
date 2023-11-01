document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async function () {
        const productId = this.getAttribute('data-product-id');
        const quantityInput = document.querySelector(`input[data-quantity-product-id='${productId}']`);
        const quantityValue = quantityInput.value
        const user = "653b8e95f811bb5b4ce7d19d"
        const cartId = await getCartByUserId(user);
        const response = await sendProductToCart(cartId, productId, quantityValue);


    });
});

async function getCartByUserId(user) {
    try {
        const response = await fetch(`/api/carts/getCartByUser/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener el carrito');
        }
        const cart = await response.json()
        return cart.cart[0]._id
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
