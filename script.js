"use strict";                                                       // Enforce strict mode globally, catching common coding errors and preventing unsafe actions

function greetUser() {
    const greetingElement = document.getElementById('greeting');    // Gets the element with id 'greeting' to display the message
    const currentHour = new Date().getHours();                      // Gets the current hour (0-23)

    let greetingMessage;                                            // Variable to store the appropriate greeting message
    if (currentHour < 12) {
        greetingMessage = 'Good morning!';                          // before noon, the message is 'Good morning!'
    } else if (currentHour < 18) {
        greetingMessage = 'Good afternoon!';                        // between noon and 6 PM, the message is 'Good afternoon!'
    } else {
        greetingMessage = 'Good evening!';                          // after 6 PM, the message is 'Good evening!'
    }

    greetingElement.textContent = greetingMessage;                  // Set the greeting element's text to the greeting message
}

                function toggleDarkMode() {
                    const body = document.body;                                     // Access the <body> element to toggle the dark mode class
                    const calvinImage = document.getElementById('calvin-image');    // Access the image to change the source based on the mode
                    body.classList.toggle('dark-mode');                             // Toggle the 'dark-mode' class on the <body> to switch themes
                    
                    // Apply dark mode to header and navigation explicitly
                    const header = document.querySelector('header');                // Access the <header> element
                    header.classList.toggle('dark-mode');                           // Toggle the 'dark-mode' class on the header

                    const navLinks = document.querySelectorAll('nav ul li a, nav ul li button'); // Get all navigation links and buttons
                    navLinks.forEach(link => {
                        link.classList.toggle('dark-mode');                         // Toggle the 'dark-mode' class on each link and button
                    });

                    // Switch the Calvin image based on the current mode
                    if (body.classList.contains('dark-mode')) {
                        calvinImage.src = 'pictures/Calvin_dark_mode.png';          // If dark mode is active, switch to the dark mode image
                    } else {
                        calvinImage.src = 'pictures/Calvin_light_mode.png';         // else, switch to the light mode image
                    }
                    
                    // Toggle button text between 'Dark Mode' and 'Light Mode'
                    const darkModeButton = document.getElementById('dark-mode-toggle'); // Access the dark mode button
                    if (body.classList.contains('dark-mode')) {
                        darkModeButton.textContent = 'Light Mode';                  // If in dark mode, set the button text to 'Light Mode'
                    } else {
                        darkModeButton.textContent = 'Dark Mode';                   // If in light mode, set the button text to 'Dark Mode'
                    }
                }

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,             // Scroll to the top of the document
        behavior: 'smooth'  // scrolling animation
    });
}


// Add event listeners to the logo and title
document.getElementById('logo').addEventListener('click', scrollToTop); // Event listener to logo to trigger scrollToTop on click
document.querySelector('h1').addEventListener('click', scrollToTop);    // Event listener to main heading (h1) to trigger scrollToTop on click


// Open the modal and display the clicked image
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');        // Access the modal container
    const modalImage = document.getElementById('modalImage');   // Access the modal image element
    modal.style.display = "flex";                               // Set the modal's display to 'flex' to make it visible
    modalImage.src = imageSrc;                                  // Set the modal image's source to the clicked image's source
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');        // Access the modal container
    modal.style.display = "none";                               // Hide the modal by setting its display to 'none'
}

                // Function to play the number guessing game
                function playGame() {
                    const userGuess = document.getElementById('userGuess').value;   // Get the user's guess from the input field
                    
                    // Generate a random number between 1 and 10
                    const randomNumber = Math.floor(Math.random() * 10) + 1;        // Math.random generates a number between 0 and 1, then scale to 1-10

                    const result = document.getElementById('gameResult');           // Get the element to display the game result
                    
                    // Check if the user's guess matches the random number
                    if (userGuess == randomNumber) {
                        result.textContent = `Congratulations! You guessed ${userGuess}, and the random number was ${randomNumber}. You win!`; // Display message
                        result.style.color = 'rgb(0, 150, 0)';                      // Change the text color to green (indicating success)
                    } else {
                        result.textContent = `You guessed ${userGuess}, but the random number was ${randomNumber}. Try again!`; // Display loss message
                        result.style.color = 'rgb(150, 0, 0)';                      // Change the text color to red (indicating failure)
                    }
                }

// Variables to store subtotal, tax rate, and shipping cost
let subtotal = 0;           // Initialize subtotal to 0
const taxRate = 0.085;      // Define a constant tax rate (8.5%)
const shippingCost = 5.00;  // Define a fixed shipping cost

// Array to hold items added to the cart
let cart = [];              // Initialize an empty cart array

// Function to add items to the cart and update totals
function addToCart(productName, price) {
    // Check if the product is already in the cart
    let item = cart.find(product => product.name === productName);                  // Search for the product in the cart by name

    if (item) {
                                                                                    // If the item is already in the cart, increment the quantity
        item.quantity += 1;                                                         // Increase the item's quantity by 1
    } else {
                                                                                    // If the item is not in the cart, add it with quantity 1
        cart.push({ name: productName, price: parseFloat(price), quantity: 1 });    // Add new item to the cart with quantity 1
    }

    // Update the subtotal by adding the price of the new item
    subtotal += parseFloat(price);                                                  // Convert price to a number and add to subtotal

    // Update the cart display
    updateCartDisplay();                                                            // Call the function to update the visual cart display

    // Calculate and update totals (subtotal, tax, and total)
    const tax = subtotal * taxRate;                                                 // Calculate tax as a percentage of the subtotal
    const total = subtotal + tax + shippingCost;                                    // Calculate the total cost including tax and shipping

    // Update the display with the new amounts
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);          // Display the subtotal rounded to 2 decimal places
    document.getElementById('tax').textContent = tax.toFixed(2);                    // Display the calculated tax
    document.getElementById('total').textContent = total.toFixed(2);                // Display the total cost

    // Clear any checkout messages when items are added
    document.getElementById('checkout-message').textContent = '';                   // Clear existing checkout messages
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');                     // Get the div that displays cart items
    cartItemsDiv.innerHTML = '';                                                    // Clear the current contents of the cart display

    // Loop through each item in the cart and create a display element for it
    cart.forEach(item => {
        const itemDiv = document.createElement('div');                              // Create a new div for each item
        itemDiv.textContent = `${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`; // Display the item name, quantity, and total price
        cartItemsDiv.appendChild(itemDiv);                                          // Add the item div to the cart display
    });
}

// Function to handle the checkout process
function checkout() {
    const total = parseFloat(document.getElementById('total').textContent);        // Get the total from the display and convert it to a number

    if (subtotal === 0) {
        // If the cart is empty, show an error message
        document.getElementById('checkout-message').textContent = 'Please add items to your cart before checking out.'; // Display error
        document.getElementById('checkout-message').style.color = 'red';            // Set the error message color to red
    } else {
        // If the cart has items, show a success message
        document.getElementById('checkout-message').textContent = `Thank you for your order! Your total cost is $${total.toFixed(2)}.`; // Show success message with total
        document.getElementById('checkout-message').style.color = 'green';          // Set the success message color to green

        // Clear the cart
        cart = [];                                                                  // Reset the cart array
        subtotal = 0;                                                               // Reset the subtotal to 0
        document.getElementById('subtotal').textContent = '0.00';                   // Reset the subtotal display
        document.getElementById('tax').textContent = '0.00';                        // Reset the tax display
        document.getElementById('total').textContent = '0.00';                      // Reset the total display
        updateCartDisplay();                                                        // Clear the cart display
    }
}

                // Function to validate the contact form
                function validateForm(event) {
                    event.preventDefault();                                         // Prevent the form from submitting

                    // Clear previous error messages by hiding them
                    document.querySelectorAll('.error').forEach(error => error.style.visibility = 'hidden');

                    // Get the values entered by the user in the form fields
                    const firstName = document.getElementById('firstName').value.trim();        // Get the first name and trim whitespace
                    const lastName = document.getElementById('lastName').value.trim();          // Get the last name
                    const phone = document.getElementById('phone').value.trim();                // Get the phone number
                    const email = document.getElementById('email').value.trim();                // Get the email address
                    const comments = document.getElementById('comments').value.trim();          // Get the comments
                    const contactByPhone = document.getElementById('contactByPhone').checked;   // Preferred contact is by Phone
                    const contactByEmail = document.getElementById('contactByEmail').checked;   // Preferred contact is by Email

                    // Define regex patterns for phone and email validation
                    const phonePattern = /^[0-9]{10}$/;                                         // Regex for a 10-digit phone number
                    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;     // Regex for a valid email address

                    let isValid = true;                                                         // Assume the form is valid until proven otherwise

                    // Validate the first and last names
                    if (!firstName) {
                        document.getElementById('firstNameError').textContent = 'First name is required.';  // Show error if first name is empty
                        document.getElementById('firstNameError').style.visibility = 'visible';             // Make the error visible
                        isValid = false; // Mark the form as invalid
                    }

                    if (!lastName) {
                        document.getElementById('lastNameError').textContent = 'Last name is required.';    // Show error if last name is empty
                        document.getElementById('lastNameError').style.visibility = 'visible';              // Make the error visible
                        isValid = false;                                                                    // Mark the form as invalid
                    }

                    // Validate the comments field
                    if (!comments) {
                        document.getElementById('commentsError').textContent = 'Comments are required.';    // Show error if comments are empty
                        document.getElementById('commentsError').style.visibility = 'visible';              // Make the error visible
                        isValid = false;                                                                    // Mark the form as invalid
                    }

                    // Validate the preferred contact method
                    if (!contactByPhone && !contactByEmail) {
                        document.getElementById('contactMethodError').textContent = 'Please select a contact method.';  // Show error if no contact method is selected
                        document.getElementById('contactMethodError').style.visibility = 'visible';                     // Make the error visible
                        isValid = false; // Mark the form as invalid
                    }

                    // Validate the phone number if 'Phone' is selected
                    if (contactByPhone && !phone.match(phonePattern)) {
                        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';  // Show error for invalid phone number
                        document.getElementById('phoneError').style.visibility = 'visible';                                 // Make the error visible
                        isValid = false;                                                                                    // Mark the form as invalid
                    }

                    // Validate the email address if 'Email' is selected
                    if (contactByEmail && !email.match(emailPattern)) {
                        document.getElementById('emailError').textContent = 'Please enter a valid email address.';          // Show error for invalid email
                        document.getElementById('emailError').style.visibility = 'visible';                                 // Make the error visible
                        isValid = false;                                                                                    // Mark the form as invalid
                    }

                    // If the form is valid, create a customer object and show a success message
                    if (isValid) {
                        const customer = {
                            firstName,                                                                      // Customer's first name
                            lastName,                                                                       // Customer's last name
                            phone: contactByPhone ? phone : 'N/A',                                          // Customer's phone number if provided, otherwise 'N/A'
                            email: contactByEmail ? email : 'N/A',                                          // Customer's email if provided, otherwise 'N/A'
                            comments,                                                                       // Customer's comments
                            preferredContact: contactByPhone ? 'Phone' : 'Email'                            // Preferred contact method
                        };

                        showSuccessMessage(customer);                                                       // Call function to show the success message
                        document.getElementById('contactForm').reset();                                     // Reset the form

                        // Automatically scroll to the success message
                        const successMessage = document.getElementById('successMessage');
                        successMessage.scrollIntoView({ behavior: 'smooth' });                              // Smooth scroll to the success message
                    }
                }

                // Function to display the success message after form submission
                function showSuccessMessage(customer) {
                    const successMessage = document.getElementById('successMessage');                       // Get the success message container
                    successMessage.innerHTML = `
                        <p>Thank you for your submission, ${customer.firstName} ${customer.lastName}!</p>
                        <p>Preferred Contact: ${customer.preferredContact}</p>
                        <p>${customer.preferredContact === 'Phone' ? 'Phone: ' + customer.phone : 'Email: ' + customer.email}</p>
                        <p>Comments: ${customer.comments}</p>
                    `; // Set the content of the success message with the customer's details
                    successMessage.style.display = 'block';                                                 // Make the success message visible
                }


