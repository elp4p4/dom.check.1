// Select all necessary elements
const items = document.querySelectorAll('.shopping-item');
const subtotalElement = document.getElementById('subtotalPrice'); // Select the subtotal element
let totalPrice = 737.00; // Set initial total price

// Function to update subtotal price display
function updateSubtotal() {
    subtotalElement.textContent = `${totalPrice.toFixed(2)} TND`;
}

// Set initial subtotal display
updateSubtotal();

// Add event listeners to each item
items.forEach(item => {
    const increaseButton = item.querySelector('.increase');
    const decreaseButton = item.querySelector('.decrease');
    const priceElement = item.querySelector('.item-price');
    const inputElement = item.querySelector('input[type="text"]'); // Select input field
    const price = parseFloat(priceElement.textContent.replace(' TND', ''));
    const trashIcon = item.querySelector('.trash-icon');
    const heartIcon = item.querySelector('.heart-icon');

    // Event listener for increase button
    increaseButton.addEventListener('click', () => {
        let currentValue = parseInt(inputElement.value);
        currentValue += 1; // Increment value
        inputElement.value = currentValue; // Update input field

        totalPrice += price; // Update total price
        updateSubtotal(); // Update subtotal display
    });

    // Event listener for decrease button
    decreaseButton.addEventListener('click', () => {
        let currentValue = parseInt(inputElement.value);
        if (currentValue > 1) { // Ensure value doesn't go below 1
            currentValue -= 1; // Decrement value
            inputElement.value = currentValue; // Update input field

            totalPrice -= price; // Update total price
            updateSubtotal(); // Update subtotal display
        }
    });

    // Event listener for trash icon
    trashIcon.addEventListener('click', () => {
        const quantity = parseInt(inputElement.value);
        totalPrice -= price * quantity; // Subtract total price for the quantity
        updateSubtotal(); // Update subtotal display
        item.remove(); // Remove the item from the DOM
    });

    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('text-pink-500'); // Toggle pink color
    });
});
