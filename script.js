document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const chatbotBody = document.getElementById("chatbot-body");
    const sendBtn = document.getElementById("send-btn");

    // Define a global variable to store the order details
    let currentOrder = {
        items: [],
        totalCost: 0
    };

    // Function to display messages in the chat interface
    function displayMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatbotBody.appendChild(messageElement);
    }

    // Function to process user messages
    function processUserMessage(message) {
        // Check if the message is a greeting
        if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
            displayMessage('bot', 'Hello! How can I help you today?');
            return;
        }

        // Check if the message contains keywords related to placing an order
        if (message.toLowerCase().includes('place order') || message.toLowerCase().includes('order')) {
            displayMessage('bot', 'Sure, please specify the items and quantities you want to order.');
            return;
        }


    // If not a greeting or order request, proceed with processing the order
    const items = {
        '1': { name: 'Pav Bhaji', price: 6.00 },
        '2': { name: 'Chole Bhature', price: 7.00 },
        '3': { name: 'Pizza', price: 8.00 },
        '4': { name: 'Mango Lassi', price: 5.00 },
        '5': { name: 'Masala Dosa', price: 6.00 },
        '6': { name: 'Vegetable Biryani', price: 9.00 },
        '7': { name: 'Vada Pav', price: 4.00 },
        '8': { name: 'Rava Dosa', price: 7.00 },
        '9': { name: 'Samosa', price: 5.00 }
    };

    const orderRegex = /(\d+)\s*(\w+\s*\w*)/gi;
    let totalCost = 0;
    let orderSummary = '';
    let match;

    while ((match = orderRegex.exec(message)) !== null) {
        const quantity = parseInt(match[1]);
        const itemName = match[2].trim().toLowerCase();
        const item = Object.values(items).find(item => item.name.toLowerCase() === itemName);
        if (item) {
            const itemCost = item.price * quantity;
            totalCost += itemCost;
            orderSummary += `${quantity} ${item.name} - $${itemCost.toFixed(2)}\n`;
            // Update the current order details
            currentOrder.items.push({ name: item.name, quantity: quantity, cost: itemCost });
        }
    }

    if (orderSummary) {
        currentOrder.totalCost = totalCost;
        orderSummary += `Total cost: $${totalCost.toFixed(2)}`;
        displayMessage('bot', orderSummary);
        displayMessage('bot', 'Anything else you would like to add to your order? (Yes/No)');
        return;
    }

    // Handle user response to adding anything else
    if (message.toLowerCase() === 'yes') {
        displayMessage('bot', 'Sure, please specify the additional items and quantities you want to add.');
        return;
    }

    if (message.toLowerCase() === 'no') {
        const orderID = generateOrderID();
        displayMessage('bot', `Your order has been placed. Order ID: ${orderID}`);
        currentOrder = { items: [], totalCost: 0 }; // Reset current order
        return;
    }

    displayMessage('bot', 'Sorry, I could not understand your order. Please try again.');
}


// Function to generate a random two-digit order ID
function generateOrderID() {
    return 'ID: ' + Math.floor(Math.random() * 90 + 10);
}

// Event listener for send button click
sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        displayMessage('user', userMessage);
        processUserMessage(userMessage);
        userInput.value = ''; // Clear the input field
    }
});

// Event listener for user input field keypress (Enter key)
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});
});