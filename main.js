class Item {
    constructor(element, cart) {
        this.element = element;
        this.cart = cart;
        this.price = parseFloat(element.querySelector('.item-price').textContent.replace(' TND', ''));
        this.inputElement = element.querySelector('input[type="text"]');
        this.increaseButton = element.querySelector('.increase');
        this.decreaseButton = element.querySelector('.decrease');
        this.trashIcon = element.querySelector('.trash-icon');
        this.heartIcon = element.querySelector('.heart-icon');
        
        this.initEventListeners();
    }

    // Initialize event listeners for item buttons
    initEventListeners() {
        this.increaseButton.addEventListener('click', () => this.increaseQuantity());
        this.decreaseButton.addEventListener('click', () => this.decreaseQuantity());
        this.trashIcon.addEventListener('click', () => this.removeItem());
        this.heartIcon.addEventListener('click', () => this.toggleFavorite());
    }

    // Increase item quantity
    increaseQuantity() {
        let currentValue = parseInt(this.inputElement.value);
        currentValue += 1;
        this.inputElement.value = currentValue;
        this.cart.updateTotalPrice(this.price);
        this.cart.updateCartCount();
    }

    // Decrease item quantity
    decreaseQuantity() {
        let currentValue = parseInt(this.inputElement.value);
        if (currentValue > 1) {
            currentValue -= 1;
            this.inputElement.value = currentValue;
            this.cart.updateTotalPrice(-this.price); // Subtract price per unit
        } else if (currentValue === 1) {
            // Subtract the price of the last item and remove it
            this.inputElement.value = 0; // Set input field to 0 before removal
            this.cart.updateTotalPrice(-this.price); // Subtract the price once
            this.removeItem(); // Remove the item from the DOM
        }
        this.cart.updateCartCount();
    }



    // Remove the item from the cart
    removeItem() {
        const quantity = parseInt(this.inputElement.value);
        this.cart.updateTotalPrice(-this.price * quantity);
        this.element.remove();
        this.cart.updateCartCount();
    }

    // Toggle favorite (heart) icon color
    toggleFavorite() {
        this.heartIcon.classList.toggle('text-pink-500');
    }
}

class ShoppingCart {
    constructor() {
        this.totalPrice = 737.00; // Initial total price
        this.items = [];
        this.subtotalElement = document.getElementById('subtotalPrice');
        this.cartBadge = document.getElementById('itemCountBadge');
        this.initializeCart();
    }

    // Initialize cart with all items
    initializeCart() {
        const itemElements = document.querySelectorAll('.shopping-item');
        itemElements.forEach(itemElement => {
            const item = new Item(itemElement, this);
            this.items.push(item);
        });
        
        this.updateSubtotal();
        this.updateCartCount();
    }

    // Update the displayed total price
    updateTotalPrice(amount) {
        this.totalPrice += amount;
        this.updateSubtotal();
    }

    // Display the subtotal price
    updateSubtotal() {
        this.subtotalElement.textContent = `${this.totalPrice.toFixed(2)} TND`;
    }

    // Update and display the cart item count
    updateCartCount() {
        let totalItems = 0;
        this.items = this.items.filter(item => document.body.contains(item.element)); // Filter out removed items
        this.items.forEach(item => {
            const quantity = parseInt(item.inputElement.value);
            totalItems += quantity;
        });
        this.cartBadge.textContent = totalItems;
    }
}

// Initialize the shopping cart
document.addEventListener('DOMContentLoaded', () => {
    const shoppingCart = new ShoppingCart();
});
