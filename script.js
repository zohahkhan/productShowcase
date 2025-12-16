// script.js - Zoha Khan, Assignment 10 

document.addEventListener('DOMContentLoaded', () => {
	
	//getting elements and saving them as const
	const statusMessageBox = document.getElementById('statusMessageBox');
    const updateLaptopBtn = document.getElementById('updateLaptopBtn');
    const markHeadphonesOutOfStockBtn = document.getElementById('markHeadphonesOutOfStockBtn');
    const highlightFeaturedBtn = document.getElementById('highlightFeaturedBtn');
    const showProductDataBtn = document.getElementById('showProductDataBtn');
    const addRandomProductBtn = document.getElementById('addRandomProductBtn');
    const recentlyViewedContainer = document.getElementById('recentlyViewedContainer');

	const laptopProXCard = document.getElementById('laptopProX');
    const wirelessHeadphonesCard = document.getElementById('wirelessHeadphones');
    const smartwatchEliteCard = document.getElementById('smartwatchElite')


    // Helper function to update the status message box
    const updateStatus = (message) => {
		statusMessageBox.textContent = message; //purpose is to display messages to user, immediate feedback
	};

    // --- Helper function to create a new "Recently Viewed" item (for Task 5) ---
    const createRecentlyViewedItem = (name, imageUrl) => {
		const itemDiv = document.createElement('div'); //main container
        itemDiv.classList.add('recently-viewed-item'); //adds it
		
        const img = document.createElement('img');
        img.src = imageUrl;
		img.setAttribute('alt', `${name} Image`);

        const p = document.createElement('p');
        p.textContent = name;

        itemDiv.appendChild(img); //appends the <img> and <p>
        itemDiv.appendChild(p);

        return itemDiv; //returns the fully constructed itemDiv
   };

    // --- Initial setup for "Remove Card" buttons on static cards (for Task 6) ---
    const setupRemoveButton = (cardElement) => {
		const removeBtn = cardElement.querySelector('.remove-card-btn'); //find remove button 
        
		removeBtn.addEventListener('click', () => { //when clicked
            const productName = cardElement.querySelector('h3').textContent;
            cardElement.remove();
            updateStatus(`"${productName}" card removed from display.`); //updating status message
        });
	};

    // Apply remove button listener to initial cards
    setupRemoveButton(laptopProXCard);
    setupRemoveButton(wirelessHeadphonesCard);
    setupRemoveButton(smartwatchEliteCard);

    // --- Task 1: Update "Laptop Pro X" Details (Lesson 10-1 & 10-2) ---
    // Objective: When the "Update 'Laptop Pro X'" button is clicked, change the name, description, and price of the Laptop Pro X card.
    
	updateLaptopBtn.addEventListener('click', () => {
		const nameEl = laptopProXCard.querySelector('h3'); //retrieving
        const descriptionEl = laptopProXCard.querySelector('p.description');
        const priceEl = laptopProXCard.querySelector('p.price');

        nameEl.textContent = 'Laptop Pro X (Updated)'; //updating
        descriptionEl.innerHTML = 'This is an <strong style="color:#0056b3;">ALL-NEW</strong> and improved model.'; //strong tag for styling
        priceEl.textContent = '$1099.00'; //decription and price

        updateStatus('Laptop Pro X updated successfully!'); //update message
    });

    // --- Task 2: Mark "Wireless Headphones" Out of Stock (Lesson 10-1 & 10-2) ---
    // Objective: When "Mark 'Headphones' Out of Stock" button is clicked, visually mark the headphones card as out of stock.
    
	markHeadphonesOutOfStockBtn.addEventListener('click', () => {
		const addToCartBtn = wirelessHeadphonesCard.querySelector('.add-to-cart-btn'); 
		const img = wirelessHeadphonesCard.querySelector('img');

		wirelessHeadphonesCard.classList.add('out-of-stock'); //using classList.add()
		addToCartBtn.disabled = true; /// disables add to Cart Button
		addToCartBtn.textContent = 'Sold Out!';
		
		img.src = 'https://placehold.co/150x150/FF0000/FFFFFF?text=SOLD+OUT'; //bonus
		img.setAttribute('alt', `sold out image`); //chnaging the alt 
		
		updateStatus('wireless headphones are out of stock.'); //updates the status Message 
    });

    // --- Task 3: Highlight Featured Products (Lesson 10-1 & 10-2) ---
    // Objective: When "Highlight Featured Products" button is clicked, add a special highlight to cards marked as featured.
	
    highlightFeaturedBtn.addEventListener('click', () => {
		const featuredCards = document.querySelectorAll('.product-card[data-is-featured="true"]'); //featured cards
		
        featuredCards.forEach(card => { //for each loop to add the css for featured
            card.classList.add('featured');
        });

        updateStatus(`${featuredCards.length} featured products.`); //updates the status message 
    });

    // --- Task 4: Show All Product Data (Data Attributes) (Lesson 10-1 & 10-2) ---
    // Objective: When "Show All Product Data" button is clicked, log all custom `data-*` attributes for each product card to the console.
  
    showProductDataBtn.addEventListener('click', () => {
		const productCards = document.querySelectorAll('.product-card'); //selects products cards

		console.clear();
        productCards.forEach(card => { //loop
            console.log(`Product ID: ${card.dataset.productId}`); //card dataset console.log
            console.log(`Stock Level: ${card.dataset.stockLevel}`);
            console.log(`Is Featured: ${card.dataset.isFeatured}`);
        });

        updateStatus('check console for data.'); //updates the status message
    });

    // --- Task 5: Add a New Product to "Recently Viewed" History (Lesson 10-3: Create & Append) ---
    // Objective: When "Add Random Product to History" is clicked, create a simplified product item and add it to the 'Recently Viewed Products' section.

    const sampleProducts = [
        { name: 'Gaming Mouse', imageUrl: 'https://placehold.co/80x80/FFC107/FFFFFF?text=Mouse' },
        { name: 'Monitor', imageUrl: 'https://placehold.co/80x80/007bff/FFFFFF?text=Monitor' },
        { name: 'Webcam', imageUrl: 'https://placehold.co/80x80/84BC9C/0A2342?text=Webcam' },
        { name: 'External SSD', imageUrl: 'https://placehold.co/80x80/53A2BE/FFFFFF?text=SSD' }
    ];

    addRandomProductBtn.addEventListener('click', () => {
		const randomIndex = Math.floor(Math.random() * sampleProducts.length); //picks a random int-given
        const randomProduct = sampleProducts[randomIndex]; //gets random product 

        if (recentlyViewedContainer.textContent.includes('No items viewed')) {
            recentlyViewedContainer.innerHTML = ''; //clearing the innerHTML
        }

        const newItem = createRecentlyViewedItem(randomProduct.name, randomProduct.imageUrl); //calling function
        recentlyViewedContainer.appendChild(newItem); //append

        updateStatus(`"${randomProduct.name}" was recently viewed.`);
    });

    // --- Task 6: Remove Product Card from Display (Lesson 10-3: Remove) ---
    // Objective: Implement functionality for the "Remove Card" button on each product card to remove it from the display.
});
