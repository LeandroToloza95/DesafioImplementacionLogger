document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', async function (event) {
        event.preventDefault();
        const productId = this.getAttribute('data-product-id');
        const response = await deleteProduct(productId);
        location.reload()
    });
});

document.querySelectorAll('.update-product').forEach(button => {
    button.addEventListener('click', async function (event) {
        event.preventDefault();


        const productId = this.getAttribute('data-product-id');
        const form = document.getElementById(`productForm ${productId}`)
        const formData = new FormData(form);
        console.log(form);
        const response = await updateProduct(productId,formData);
        location.reload()
    });
});

async function deleteProduct(productId) {
    try {

        const todasLasCookies = document.cookie;
        const miCookie = obtenerCookie(todasLasCookies,'token');
        // Crear un objeto FormData con los datos del formulario

        const headers = new Headers();
        headers.append('Content-Type',  'application/json'); // Puedes ajustar el tipo de contenido según tus necesidades
        headers.append('authorization',  `Bearer ${miCookie}`); 

        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: headers
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar producto con id: ${productId}`);
        }
        
        const deletedProduct = await response.json()
        return deletedProduct
    }
    catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

async function updateProduct(productId,formData) {
    try {
        
        const todasLasCookies = document.cookie;
        const miCookie = obtenerCookie(todasLasCookies,'token');
        // Crear un objeto FormData con los datos del formulario

        const headers = new Headers();
        headers.append('Content-Type',  'application/json'); // Puedes ajustar el tipo de contenido según tus necesidades
        headers.append('authorization',  `Bearer ${miCookie}`); 
        const filteredObject = Object.fromEntries(
            Object.entries(Object.fromEntries(formData.entries())).filter(([key, value]) => value !== "")
        );
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(filteredObject),
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar producto con id: ${productId}`);
        }
        
        const deletedProduct = await response.json()
        return deletedProduct
    }
    catch (error) {
        console.error('Error al actualizar producto ', error);
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