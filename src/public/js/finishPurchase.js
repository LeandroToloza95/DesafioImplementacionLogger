document.getElementById('finish_purchase_button').addEventListener('click', async function () {

    const todasLasCookies = document.cookie;

    const miCookie = obtenerCookie(todasLasCookies, 'token');

    // Agregar encabezados a la solicitud
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Puedes ajustar el tipo de contenido según tus necesidades
    headers.append('authorization', `Bearer ${miCookie}`);

    const userName = document.getElementById('user_name').textContent;
    const cartId = document.getElementById('cart_id').textContent;
    const userMail = document.getElementById('user_mail').textContent;

    const productElements = document.querySelectorAll('.container-product');

    // Crear un array para almacenar los datos de los productos
    const productsData = [];

    // Recorrer los elementos de productos y extraer la información
    productElements.forEach(function (productElement) {
        const title = productElement.querySelector('#product_title').textContent;
        const productId = productElement.querySelector('#product_id').textContent;
        const price = parseFloat(productElement.querySelector('#product_price').textContent);
        const quantity = parseInt(productElement.querySelector('#product_quantity').textContent);
        const amount = parseFloat(productElement.querySelector('#purchase_amount').textContent);

        // Crear un objeto con los datos del producto
        const productData = {
            title: title,
            productId:productId,
            price: price,
            quantity: quantity,
            amount: amount
        };

        // Agregar el objeto al array
        productsData.push(productData);

    })



    // Objeto de datos a enviar en la solicitud
    const requestData = {
        user: {
            name: userName,
            email: userMail
        },
        cart_id: cartId,
        products: productsData
    };

    console.log(requestData);
    //Configurar la solicitud fetch
    try {
        const response = await fetch(`/api/tickets/${cartId}/purchase`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData),
        })
        if (!response.ok) {
            throw new Error('Error al grabar producto en carrito');
        }

        // const redirectUrl = response.url;
        // if (redirectUrl) {
        //     window.location.href = redirectUrl;
        // }
    }

    catch (error) {
        console.error('Error al grabar producto nuevo', error.message);
        throw error;
    }

});

function obtenerCookie(todasLasCookies, nombre) {
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