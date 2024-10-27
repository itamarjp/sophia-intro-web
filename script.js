const books = [
    {
        "title": "Brie Mine 4Ever",
        "description": "A book for cheese lovers",
        "type": "Book",
        "image_url": "images/Client3_Book1.png",
        "best_seller": true,
        "price": "12.99"
    },
    {
        "title": "Glory Riders",
        "description": "A book about bikers",
        "type": "Book",
        "image_url": "images/Client3_Book2.png",
        "best_seller": false,
        "price": "14.49"
    },
    {
        "title": "Sorcerer's Shadowed Chronicles",
        "description": "A fantasy book",
        "type": "Book",
        "image_url": "images/Client3_Book3.png",
        "best_seller": true,
        "price": "19.99"
    },
    {
        "title": "Ball",
        "description": "A magazine about pickleball",
        "type": "Magazine",
        "image_url": "images/Client3_Magazine1.png",
        "best_seller": false,
        "price": "9.99"
    },
    {
        "title": "Travel",
        "description": "A magazine for travelers",
        "type": "Magazine",
        "image_url": "images/Client3_Magazine2.png",
        "best_seller": false,
        "price": "11.49"
    },
    {
        "title": "Eat",
        "description": "A magazine for foodies",
        "type": "Magazine",
        "image_url": "images/Client3_Magazine3.png",
        "best_seller": true,
        "price": "13.59"
    },
    {
        "title": "Tote Bag",
        "description": "A canvas tote bag with black lettering that says 'ALL I DO IS READ READ READ'",
        "type": "Accessory",
        "image_url": "images/Client3_ToteBag.png",
        "best_seller": false,
        "price": "15.99"
    },
    {
        "title": "Book Haven Notebook",
        "description": "A notebook with text on the cover that says 'Book Haven Bookstore'",
        "type": "Stationery",
        "image_url": "images/Client3_Notebook.png",
        "best_seller": false,
        "price": "7.99"
    },
    {
        "title": "Book Haven Stickers",
        "description": "A set of four Book Haven Bookstore stickers that promote reading",
        "type": "Accessory",
        "image_url": "images/Client3_Stickers.png",
        "best_seller": false,
        "price": "5.49"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log("Loading products...");
    loadProducts();
    loadBestSellers();
});

function loadProducts() {
    console.log("Loading books from script.js...");
    const productGallery = document.getElementById('product-gallery');
    if (!productGallery) {
        console.error("Product gallery element not found.");
        return;
    }
    let count = 0;
    let productRow;

    books.forEach((book, index) => {
        if (count % 2 === 0) {
            productRow = document.createElement('div');
            productRow.classList.add('product-row');
            productRow.style.display = 'flex';
            productRow.style.flexWrap = 'wrap';
            productGallery.appendChild(productRow);
            console.log(`Creating new row for books starting from index: ${index}`);
        }
        
        const productBlock = document.createElement('div');
        productBlock.classList.add('product-block');
        productBlock.style.flex = '1 1 45%';
        productBlock.style.margin = '10px';
        productBlock.innerHTML = `
            <img src="${book.image_url}" alt="${book.title}" class="product-image">
            <h3>${book.title}</h3>
            <p>${book.description}</p>
            <p>Price: $${book.price}</p>
            <button onclick="addToCart('${book.title}')"><i class="fas fa-cart-plus"></i> Add to Cart</button>
        `;
        productRow.appendChild(productBlock);
        console.log(`Added product: ${book.title}`);
        count++;
    });
}

function loadBestSellers() {
    console.log("Loading best sellers...");
    const container = document.getElementById('best-sellers-container');
    if (!container) {
        console.error("Best sellers container element not found.");
        return;
    }
    const bestSellers = books.filter(book => book.best_seller);

    bestSellers.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <img src="${book.image_url}" alt="${book.title}" style="width: 100%; max-width: 200px;">
            <h3>${book.title}</h3>
            <p>${book.description}</p>
            <p>Price: $${book.price}</p>
            <button onclick="addToCart('${book.title}')">Add to Cart</button>
        `;

        container.appendChild(bookElement);
        console.log(`Added best seller: ${book.title}`);
    });
}

function addToCart(title) {
    console.log(`Adding to cart: ${title}`);
    const selectedBook = books.find(book => book.title === title);
    if (!selectedBook) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(selectedBook);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${selectedBook.title} has been added to your cart.`);
}

function loadCart() {
    console.log("Loading cart...");
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.error("Cart items container element not found.");
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<li>Your cart is empty.</li>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.title} - ${item.description} - $${item.price}`;
            cartItemsContainer.appendChild(li);
        });
    }
}

function clearCart() {
    console.log("Clearing cart...");
    localStorage.removeItem('cart');
    loadCart();
    alert("Your cart has been cleared.");
}
