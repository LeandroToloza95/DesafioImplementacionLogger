document.getElementById('productForm').addEventListener('submit',async function(event) {
    // Obtener el formulario
    event.preventDefault();
    const form = event.target;
    const todasLasCookies = document.cookie;

    const miCookie = obtenerCookie(todasLasCookies,'token');
    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(form);

    // Agregar encabezados a la solicitud
    const headers = new Headers();
    headers.append('Content-Type',  'application/json'); // Puedes ajustar el tipo de contenido según tus necesidades
    headers.append('authorization',  `Bearer ${miCookie}`); 

    // Configurar la solicitud fetch
    try {
        const response = await fetch(`/api/products`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        })
        if (!response.ok) {
            throw new Error('Error al grabar producto en carrito');
        }
        
        const redirectUrl = response.url;
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }
    catch (error) {
        console.error('Error al grabar producto nuevo', error.message);
        throw error;
    }

    // Prevenir que el formulario se envíe de la manera tradicional

});

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