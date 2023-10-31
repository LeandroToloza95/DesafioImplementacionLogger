document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-product-id');
      const quantity = this.getAttribute('data-quantity-product-id');
      // Realiza una solicitud AJAX para agregar el producto al carrito
      // Puedes enviar el `productId` al servidor para manejar la lógica del carrito.
    });
  });