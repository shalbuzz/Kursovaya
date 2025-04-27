document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="bi bi-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any products to your cart yet.</p>
                    <a href="index.html" class="btn btn-primary mt-3">Start Shopping</a>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            let total = 0;
            
            let cartItemsHtml = `
                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            cart.forEach(item => {
                const price = parseFloat(item.price.replace('$', ''));
                const subtotal = price * item.quantity;
                total += subtotal;
                
                cartItemsHtml += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-img rounded me-3">
                                <div>
                                    <h6 class="mb-0">${item.name}</h6>
                                </div>
                            </div>
                        </td>
                        <td>${item.price}</td>
                        <td>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary quantity-btn minus" data-product="${item.name}" type="button">-</button>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                <button class="btn btn-outline-secondary quantity-btn plus" data-product="${item.name}" type="button">+</button>
                            </div>
                        </td>
                        <td>$${subtotal.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-product="${item.name}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            cartItemsHtml += `
                        </tbody>
                    </table>
                </div>
                
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5>Subtotal:</h5>
                            <h5>$${total.toFixed(2)}</h5>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h5>Shipping:</h5>
                            <h5>Free</h5>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <h4>Total:</h4>
                            <h4>$${total.toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            `;
            
            cartContainer.innerHTML = cartItemsHtml;
            checkoutBtn.disabled = false;
            
            document.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productName = this.dataset.product;
                    const isPlus = this.classList.contains('plus');
                    updateQuantity(productName, isPlus);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productName = this.dataset.product;
                    removeItem(productName);
                });
            });
        }
    }
    
    function updateQuantity(productName, increase) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const itemIndex = cart.findIndex(item => item.name === productName);
        
        if (itemIndex !== -1) {
            if (increase) {
                cart[itemIndex].quantity++;
            } else if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            
            showToast(`${productName} quantity updated!`, 'info');
        }
    }
    
    function removeItem(productName) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const updatedCart = cart.filter(item => item.name !== productName);
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        loadCartItems();
        
        showToast(`${productName} removed from cart!`, 'info');
    }
    
    checkoutBtn.addEventListener('click', function() {
        alert('Checkout functionality would go here in a real application.');
    });
    
    function showToast(message, type) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: type === 'success' ? "#4CAF50" : "#2196F3",
        }).showToast();
    }
    
    loadCartItems();
});