document.addEventListener('DOMContentLoaded', () => {
    // Initialize Owl Carousel
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        dots: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        onChange: function(event) {
            // Reset animation for text overlay
            $('.text-overlay').css('animation', 'none');
            setTimeout(function(){
                $('.text-overlay').css('animation', 'fadeInText 1.2s ease-in-out');
            }, 100);
        }
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const whatsappNumber = '917397155193';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Navigation and section handling
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Show home section by default
    document.getElementById('home').style.display = 'block';
    
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }

    // Footer visibility handlers
    window.addEventListener('scroll', handleFooterVisibility);
    window.addEventListener('resize', handleFooterVisibility);

    // Product filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;

            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Initially hide all sections except home
    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
            section.classList.remove('active');
        }
    });

    // Show only home section initially
    document.getElementById('home').style.display = 'block';
    document.getElementById('home').classList.add('active');

    // Initialize tabs - show first tab by default
    const firstTab = document.querySelector('.tab-link');
    const firstTabContent = document.getElementById('new-arrivals');
    
    firstTab.classList.add('active');
    firstTabContent.style.display = 'block';
    firstTabContent.classList.add('active');

    // Load cart and wishlist counts on page load
    updateCartCount();
    updateWishlistCount();

    // Call these functions after the DOM is fully loaded
    displayProducts(newArrivals, 'new-arrivals-products');
    displayProducts(featuredProducts, 'featured-products');
    displayProducts(onSaleProducts, 'on-sale-products');
    updateCartDisplay();
});

// Function to show selected section
function showSection(sectionId) {
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle the about link click
document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.querySelector('a[href="#about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('about');
        });
    }
});

// Add event listener for handling hash changes
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
        showSection(hash);
    }
});

// Function to handle footer visibility
function handleFooterVisibility() {
    const footer = document.querySelector('footer');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    
    if ((windowHeight + scrollPosition) >= (documentHeight - 50)) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

$(document).ready(function(){
    $('.slideshow-container').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        smartSpeed: 1000,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        onTranslated: function() {
            // Reset and restart animations
            const activeSlide = $('.owl-item.active');
            
            activeSlide.find('.animate-fade').css('animation', 'none').height();
            activeSlide.find('.animate-slide').css('animation', 'none').height();
            
            setTimeout(() => {
                activeSlide.find('.animate-fade').css('animation', '');
                activeSlide.find('.animate-slide').css('animation', '');
            }, 50);
        }
    });
    
    // Show all products initially
    $('.product-category').addClass('active');

    // Category filtering
    $('.category-btn').click(function() {
        const category = $(this).data('category');
        
        // Update active button
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        
        if(category === 'all') {
            $('.product-category').addClass('active');
        } else {
            $('.product-category').removeClass('active');
            $(`#${category}`).addClass('active');
        }
    });

    // Wishlist functionality
    $('.wishlist-btn').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).find('i').toggleClass('far fas');
    });
});

// Function to show all products
function showAllProducts() {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // Show all products section
    const productsSection = document.getElementById('all-products');
    productsSection.style.display = 'block';
    
    // Trigger fade in animation
    setTimeout(() => {
        productsSection.classList.add('active');
    }, 10);

    // Update URL without page reload
    history.pushState({section: 'all-products'}, 'All Products', '#all-products');
    
    // Smooth scroll to products
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Handle browser back button
window.addEventListener('popstate', function(event) {
    const sectionId = event.state ? event.state.section : 'home';
    showSection(sectionId);
});

// Add to Cart functionality
function addToCart(productId) {
    const product = findProduct(productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        renderCart();
        saveCart();
        alert(`${product.name} added to cart!`);
    }
}

// Add to Wishlist functionality
function addToWishlist(productId) {
    const product = findProduct(productId); // Implement findProduct function
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        updateWishlistCount();
        renderWishlist();
        saveWishlist();
        alert(`${product.name} added to wishlist!`);
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = `Cart (${cart.length})`;
}

// Update wishlist count in header
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    wishlistCount.textContent = `Wishlist (${wishlist.length})`;
}

function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
        content.style.display = 'none';
    }

    // Remove active class from all tab links
    const tabLinks = document.getElementsByClassName('tab-link');
    for (let link of tabLinks) {
        link.classList.remove('active');
    }

    // Show the selected tab content and mark the button as active
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';
    setTimeout(() => {
        selectedTab.classList.add('active');
    }, 50);
    evt.currentTarget.classList.add('active');
}

// Sample product data (replace with your actual data source)
const newArrivals = [
    { id: 1, name: 'Product 1', price: '₹1999', image: 'images/products/bracelet.jpg' },
    { id: 2, name: 'Product 2', price: '₹2999', image: 'images/products/ring.jpg' },
    { id: 3, name: 'Product 3', price: '₹3999', image: 'images/products/bracelet.jpg' },
    { id: 4, name: 'Product 4', price: '₹4999', image: 'images/products/ring.jpg' },
    { id: 5, name: 'Product 5', price: '₹5999', image: 'images/products/bracelet.jpg' }
];

const featuredProducts = [
    { id: 6, name: 'Product 6', price: '₹6999', image: 'images/products/ring.jpg' },
    { id: 7, name: 'Product 7', price: '₹7999', image: 'images/products/bracelet.jpg' },
    { id: 8, name: 'Product 8', price: '₹8999', image: 'images/products/ring.jpg' },
    { id: 9, name: 'Product 9', price: '₹9999', image: 'images/products/bracelet.jpg' },
    { id: 10, name: 'Product 10', price: '₹10999', image: 'images/products/ring.jpg' }
];

const onSaleProducts = [
    { id: 11, name: 'Product 11', price: '₹11999', image: 'images/products/bracelet.jpg' },
    { id: 12, name: 'Product 12', price: '₹12999', image: 'images/products/ring.jpg' },
    { id: 13, name: 'Product 13', price: '₹13999', image: 'images/products/bracelet.jpg' },
    { id: 14, name: 'Product 14', price: '₹14999', image: 'images/products/ring.jpg' },
    { id: 15, name: 'Product 15', price: '₹15999', image: 'images/products/bracelet.jpg' }
];

function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item'); // Add 'item' class for Owl Carousel
        productDiv.innerHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(productDiv);
    });

    // Initialize Owl Carousel after adding products
    $(`#${elementId}`).owlCarousel({
        loop:true,
        margin:10,
        nav:false, // Remove navigation arrows
        autoplay:true, // Enable autoplay
        autoplayTimeout:3000, // Autoplay interval in milliseconds
        autoplayHoverPause:true, // Pause on hover
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
}

// Add to wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const product = this.closest('.product');
        const productName = product.querySelector('h4').textContent;
        
        // Toggle wishlist icon
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        // Show notification
        alert(`${productName} ${icon.classList.contains('fas') ? 'added to' : 'removed from'} wishlist!`);
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const product = this.closest('.product');
        const productName = product.querySelector('h4').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        // Show notification using the custom function
        showNotification(`${productName} added to cart!\nPrice: ${productPrice}`);
        
        // Update cart count in header (more robustly)
        updateCartCountDisplay();

        // Redirect to cart summary
        window.location.href = '#cart-summary';
    });
});

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';
    wishlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name}</p>
            <button onclick="removeFromWishlist('${item.id}')">Remove</button>
        `;
        wishlistItems.appendChild(itemDiv);
    });
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        const price = parseFloat(item.price);
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <div class="quantity">
                <button onclick="decreaseQuantity('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')">+</button>
            </div>
            <p>₹${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total').textContent = `Total: ₹${total}`;
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistCount();
    renderWishlist();
    saveWishlist();
}

function updateQuantity(productId, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        newQuantity = parseInt(newQuantity);
        if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
        if (newQuantity > 10) newQuantity = 10;
        
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update DOM directly without full cart refresh
        const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
        if (cartItem) {
            const priceText = cart[itemIndex].price;
            const priceNumber = parseFloat(priceText.replace(/[₹,]/g, ''));
            const itemTotal = priceNumber * newQuantity;
            
            // Update quantity input
            const quantityInput = cartItem.querySelector('.quantity-input');
            quantityInput.value = newQuantity;
            
            // Update item subtotal
            const itemTotalElement = cartItem.querySelector('.item-total');
            itemTotalElement.textContent = `Subtotal: ₹${itemTotal.toLocaleString()}`;
            
            // Update cart total
            const totalAmount = cart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace(/[₹,]/g, ''));
                return sum + (price * item.quantity);
            }, 0);
            
            document.getElementById('cart-total-amount').textContent = `₹${totalAmount.toLocaleString()}`;
            
            // Update cart count
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').textContent = `Cart (${itemCount})`;
        }
    }
}

function decreaseQuantity(productId) {
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const quantityInput = cartItem.querySelector('.quantity-input');
    const currentQuantity = parseInt(quantityInput.value);
    
    if (currentQuantity > 1) {
        updateQuantity(productId, currentQuantity - 1);
    } else {
        removeFromCart(productId);
    }
}

function increaseQuantity(productId) {
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const quantityInput = cartItem.querySelector('.quantity-input');
    const currentQuantity = parseInt(quantityInput.value);
    
    if (currentQuantity < 10) {
        updateQuantity(productId, currentQuantity + 1);
    } else {
        showNotification('Maximum quantity reached');
    }
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Remove item from DOM directly
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        cartItem.remove();
        
        // Update cart total
        const totalAmount = updatedCart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        
        document.getElementById('cart-total-amount').textContent = `₹${totalAmount.toLocaleString()}`;
        
        // Update cart count
        const itemCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = `Cart (${itemCount})`;
        
        // Show empty cart message if no items left
        if (updatedCart.length === 0) {
            document.querySelector('.cart-items').innerHTML = 
                '<div class="empty-cart">Your cart is empty</div>';
        }
        
        showNotification('Item removed from cart');
    }
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    showSection('checkout'); // Implement showSection function
});

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const pincode = document.getElementById('pincode').value;

    // Construct order details
    let orderDetails = `Order Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPincode: ${pincode}\n\nItems:\n`;
    cart.forEach(item => {
        orderDetails += `${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price * item.quantity}\n`;
    });

    // Calculate total
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    orderDetails += `\nTotal: ₹${total}`;

    // Construct WhatsApp message
    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappLink = `https://wa.me/917397155193?text=${whatsappMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappLink;

    // Clear the cart
    cart = [];
    updateCartCount();
    renderCart();
    saveCart();
});

function findProduct(productId) {
    // Consolidated product data
    const products = [
        { id: '1', name: 'Product 1', price: '1999', image: 'images/products/bracelet.jpg' },
        { id: '2', name: 'Product 2', price: '2999', image: 'images/products/ring.jpg' },
        { id: '3', name: 'Product 3', price: '3999', image: 'images/products/bracelet.jpg' },
        { id: '4', name: 'Product 4', price: '4999', image: 'images/products/ring.jpg' },
        { id: '5', name: 'Product 5', price: '5999', image: 'images/products/bracelet.jpg' },
        { id: '6', name: 'Product 6', price: '6999', image: 'images/products/ring.jpg' },
        { id: '7', name: 'Product 7', price: '7999', image: 'images/products/bracelet.jpg' },
        { id: '8', name: 'Product 8', price: '8999', image: 'images/products/ring.jpg' },
        { id: '9', name: 'Product 9', price: '9999', image: 'images/products/bracelet.jpg' },
        { id: '10', name: 'Product 10', price: '10999', image: 'images/products/ring.jpg' },
        { id: '11', name: 'Product 11', price: '11999', image: 'images/products/bracelet.jpg' },
        { id: '12', name: 'Product 12', price: '12999', image: 'images/products/ring.jpg' },
        { id: '13', name: 'Product 13', price: '13999', image: 'images/products/bracelet.jpg' },
        { id: '14', name: 'Product 14', price: '14999', image: 'images/products/ring.jpg' },
        { id: '15', name: 'Product 15', price: '15999', image: 'images/products/bracelet.jpg' },
        { id: 'gold-coin-1', name: '24K Gold Coin', price: 48999, image: 'images/6.jpg' },
        { id: 'gold-coin-2', name: '22K Gold Coin', price: 55999, image: 'images/5.jpg' }
    ];
    return products.find(product => product.id === String(productId));
}

document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();
    updateCartCount();
    renderWishlist();
    renderCart();
});

// Update existing wishlist and cart arrays
// wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
// cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update counters
function updateCounters() {
    document.getElementById('wishlist-count').textContent = `Wishlist (${wishlist.length})`;
    document.getElementById('cart-count').textContent = `Cart (${cart.length})`;
}

// Add to wishlist
    const index = wishlist.indexOf(productId);
    const icon = button.querySelector('i');
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(productId);
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Product added to wishlist');
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Product removed from wishlist');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();

// Add to cart
function addToCart(button, productId) {
    const productElement = button.closest('.product');
    const product = {
        id: productId,
        name: productElement.querySelector('h4').textContent,
        price: productElement.querySelector('.price').textContent,
        image: productElement.querySelector('img').src,
        quantity: 1
        }
    };
    
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
    renderCart();
    showNotification('Product added to cart');

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// Update cart count display
function updateCartCountDisplay() {
    const cartCount = document.querySelector('.icon-link span');
    cartCount.textContent = `Cart (${cart.length})`;
}

// Initialize functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const productId = button.closest('.product').dataset.productId;
        if (wishlist.includes(productId)) {
            const icon = button.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('active');
        }
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggleWishlist(button, productId);
        });
    });
    
    // Add click handlers to all cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.closest('.product').dataset.productId;
            addToCart(button, productId);
        });
    });
    
    // Initialize counters
    updateCounters();
});

// Product Modal Functionality
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-product-image');
    const modalName = document.getElementById('modal-product-name');
    const modalOldPrice = document.getElementById('modal-old-price');
    const modalNewPrice = document.getElementById('modal-new-price');
    const modalDescription = document.getElementById('modal-description');
    const quantityInput = document.getElementById('quantity');

    modalImage.src = product.querySelector('img').src;
    modalName.textContent = product.querySelector('h4').textContent;
    
    // Set prices
    const priceText = product.querySelector('.price').textContent;
    if(priceText.includes('del')) {
        const oldPrice = product.querySelector('del').textContent;
        const newPrice = priceText.split(' ')[1];
        modalOldPrice.textContent = oldPrice;
        modalNewPrice.textContent = newPrice;
    } else {
        modalOldPrice.textContent = '';
        modalNewPrice.textContent = priceText;
    }

    // Add description (you'll need to add this data to your products)
    modalDescription.innerHTML = `
        <h3>Product Description</h3>
        <p>${product.dataset.description || 'Product description will be displayed here.'}</p>
        <ul>
            <li>Material: ${product.dataset.material || 'Premium quality material'}</li>
            <li>Weight: ${product.querySelector('.weight')?.textContent || 'Available on request'}</li>
            <li>Certification: BIS Hallmark</li>
        </ul>
    `;

    // Reset quantity
    quantityInput.value = 1;

    modal.style.display = 'block';
}

// Add click handlers to all products
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => openProductModal(product));
});

// Close modal when clicking the close button or outside
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('product-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Quantity buttons
document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
    const input = document.getElementById('quantity');
    if(input.value > 1) input.value--;
});

document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
    const input = document.getElementById('quantity');
    if(input.value < 10) input.value++;
});

// Add to cart from modal
document.querySelector('.modal .add-to-cart-btn').addEventListener('click', function() {
    const productName = document.getElementById('modal-product-name').textContent;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('modal-new-price').textContent;
    
    // Add to cart logic here
    addToCart({
        name: productName,
        quantity: parseInt(quantity),
        price: price
    });
    
    // Close modal
    document.getElementById('product-modal').style.display = 'none';
    
    // Show confirmation
    showNotification(`Added ${quantity} ${productName} to cart`);
});

// Add this to your scripts.js file
document.querySelector('.back-btn').addEventListener('click', function() {
    // Add slide-out animation
    const modal = document.getElementById('product-modal');
    modal.style.animation = 'slideOut 0.3s ease-in-out';
    
    // After animation completes, hide modal and reset animation
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
        // If you need to clear any form data or reset state, do it here
    }, 300);
});

// Note: CSS animations should be defined in your CSS file, not in JavaScript

// Add to your scripts.js file
// Extend the existing cart object with new functionality
Object.assign(cart, {
    items: cart.items || [],
    total: 0,
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.updateTotal();
        this.updateCartDisplay();
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.updateCartDisplay();
    },
    
    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
    },
    
    updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total-amount');
        
        // Update cart count
        cartCount.textContent = `Cart (${this.items.length})`;
        
        // Update cart total
        cartTotal.textContent = `₹${this.total.toLocaleString()}`;
        
        // Update cart items display
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">₹${item.price.toLocaleString()} × ${item.quantity}</span>
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
});

// Update existing add to cart buttons to use the new cart system
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product');
        const product = {
            id: productCard.dataset.productId,
            name: productCard.querySelector('h4').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace(/[^\d.]/g, '')),
            image: productCard.querySelector('img').src
        };
        
        cart.addItem(product);
    });
});

// Cart implementation
window.cart = {
    items: [],
    
    init() {
        this.loadFromStorage();
        this.updateDisplay();
    },
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveToStorage();
        this.updateDisplay();
        this.showNotification('Product added to cart');
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateDisplay();
    },
    
    updateDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total-amount');
        
        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `Cart (${totalItems})`;
        
        // Update cart items display
        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">₹${item.price.toLocaleString()} × ${item.quantity}</span>
                    </div>
                    <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
        
        // Update total
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₹${total.toLocaleString()}`;
    },
    
    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    loadFromStorage() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => cart.init());

// Handle Add to Cart button clicks
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const product = e.target.closest('.product');
        if (!product) {
            console.warn('Product element not found');
            return;
        }
        const productData = {
            id: product.dataset.productId || product.id,
            name: product.querySelector('h4').textContent,
            price: parseFloat(product.querySelector('.price').textContent.replace(/[^\d.]/g, '')),
            image: product.querySelector('img').src
        };        
        const quantity = document.getElementById('quantity')?.value || 1;
        cart.addItem(productData, parseInt(quantity));
    });
});

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    // Create WhatsApp message with proper formatting
    let message = "*New Order from Dazzling Den*\n\n";
    message += "*🛒 Order Details*\n";
    
    // Add items
    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        message += `*${item.name}*\n`;  // Fix: Remove extra quotes
        message += `Quantity: ${item.quantity}\n`;  // Fix: Remove extra quotes
        message += `Price: ₹${price.toLocaleString()}\n`;  // Fix: Remove extra quotes
        message += `Subtotal: ₹${itemTotal.toLocaleString()}\n`;  // Fix: Remove extra quotes
        message += "-------------------\n";  // Fix: Remove extra quotes
    });

    // Add total and shipping info
    message += `\n*💰 Total Amount: ₹${total.toLocaleString()}*\n`;
    message += `${total >= 5000 ? '🚚 Free Shipping' : '🚚 Shipping: ₹500'}\n\n`;
    
    // Add customer instructions
    message += "*📝 Please provide:*\n";
    message += "1. Full Name\n";
    message += "2. Complete Delivery Address\n";
    message += "3. Contact Number\n";
    message += "4. Preferred Payment Method\n\n";
    message += "*Thank you for shopping with Dazzling Den!* ✨";

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number
    const phoneNumber = "917397155193";
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Clear cart after order is placed
    localStorage.removeItem('cart');
    updateCartDisplay();
    closeCart();
    showNotification('Order details sent to WhatsApp');
}

// Update checkout button event listener
document.querySelector('.checkout-btn').onclick = proceedToCheckout;

function closeCart() {
    const cartSection = document.getElementById('cart');
    cartSection.style.display = 'none';
}

// Add to your scripts.js file
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function validateQuantity(input) {
    let value = parseInt(input.value);
    if (value < 1) input.value = 1;
    if (value > 10) input.value = 10;
}

function addToCartAndShowSummary() {
    const productName = document.getElementById('modal-product-name').textContent;
    const productPrice = document.getElementById('modal-new-price').textContent;
    const quantity = parseInt(document.getElementById('quantity').value);
    const productImage = document.getElementById('modal-product-image').src;

    // Add to cart
    const product = {
        id: Date.now().toString(),
        name: productName,
        price: parseFloat(productPrice.replace(/[^\d.]/g, '')),
        image: productImage,
        quantity: quantity
    };

    cart.addItem(product);

    // Close the modal
    closeProductModal();

    // Show cart dropdown
    const cartDropdown = document.querySelector('.cart-dropdown-content');
    cartDropdown.style.display = 'block';

    // Scroll to cart summary if needed
    const cartSummary = document.querySelector('.cart-summary');
    cartSummary.scrollIntoView({ behavior: 'smooth' });

    // Show notification
    showNotification(`Added ${quantity} ${productName} to cart`);
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    // Reset quantity to 1
    document.getElementById('quantity').value = 1;
}

// Add to your scripts.js file
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for wishlist icon
    document.querySelector('.wishlist-icon').addEventListener('click', function(e) {
        e.preventDefault();
        showWishlistNotification('Wishlist feature coming soon!');
    });

    // Add click handlers for all wishlist buttons in product cards
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent product modal from opening
            showWishlistNotification('Wishlist feature coming soon!');
        });
    });
});

function showWishlistNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-tooltip';
    notification.textContent = message;
    
    document.querySelector('.wishlist-icon').appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
        
        // Hide and remove notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// Remove or comment out any existing wishlist button event listeners
/* Remove these lines
document.querySelectorAll('.wishlist-btn-dummy').forEach(button => {
    button.addEventListener('click', function(e) {
        // Remove existing wishlist click handlers
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    // Make sure tabs container is visible
    const tabsContainer = document.querySelector('.tabs-container');
    tabsContainer.style.display = 'block';
    
    // Show first tab by default
    const firstTab = document.querySelector('.tab-link');
    const firstTabContent = document.getElementById('new-arrivals');
    
    firstTab.classList.add('active');
    firstTabContent.style.display = 'block';
    firstTabContent.classList.add('active');
});

function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
        content.style.display = 'none';
    }

    // Remove active class from all tab links
    const tabLinks = document.getElementsByClassName('tab-link');
    for (let link of tabLinks) {
        link.classList.remove('active');
    }

    // Show the selected tab content and mark the button as active
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';
    setTimeout(() => {
        selectedTab.classList.add('active');
    }, 50);
    evt.currentTarget.classList.add('active');
}

function addToCartAndGoToCheckout(button) {
    // Get product details from the parent product div
    const productDiv = button.closest('.product');
    const productName = productDiv.querySelector('h4').textContent;
    const productPrice = productDiv.querySelector('.price').textContent;
    const productImage = productDiv.querySelector('img').src;
    
    // Create cart item object
    const cartItem = {
        name: productName,
        price: productPrice.replace(/[^\d]/g, ''), // Remove non-digits
        image: productImage,
        quantity: 1
    };
    
    // Add to cart (you can store in localStorage or your cart array)
    addToCart(cartItem);
    
    // Show brief notification
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = 'Added to cart! Redirecting to checkout...';
    document.body.appendChild(notification);
    
    // Redirect to checkout after a brief delay
    setTimeout(() => {
        window.location.href = '#checkout';
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
        notification.remove();
    }, 1500);
}

// Helper function to add item to cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = `Cart (${cart.length})`;
}

function showCheckoutForm() {
    const cartMain = document.querySelector('.cart-main');
    const cartCheckout = document.querySelector('.cart-checkout');
    
    cartMain.style.display = 'none';
    cartCheckout.style.display = 'block';
}

function backToCart() {
    const cartMain = document.querySelector('.cart-main');
    const cartCheckout = document.querySelector('.cart-checkout');
    
    cartCheckout.style.display = 'none';
    cartMain.style.display = 'block';
}

function processCheckout(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const email = document.getElementById('checkout-email').value;
    const address = document.getElementById('checkout-address').value;
    
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order object
    const order = {
        id: Date.now(),
        customer: { name, phone, email, address },
        items: cart,
        total: total,
        date: new Date().toISOString()
    };
    
    // Save order (you would typically send this to a server)
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartDisplay();
    
    // Show success message
    showNotification('Order placed successfully!');
    
    // Close cart dropdown
    document.querySelector('.cart-dropdown-content').style.display = 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// function updateCartDisplay() {
//     const cartCount = document.getElementById('cart-count');
//     const cartTotal = document.getElementById('cart-total-amount');
//     cartCount.textContent = 'Cart (0)';
//     cartTotal.textContent = '₹0';
// }

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalAmount.textContent = '₹0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const priceNumber = parseFloat(item.price.replace(/[₹,]/g, ''));
        const itemTotal = priceNumber * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${priceNumber.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="decreaseQuantity('${item.id}')">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="10" onchange="updateQuantity('${item.id}', this.value)">
                        <button class="quantity-btn plus" onclick="increaseQuantity('${item.id}')">+</button>
                    </div>
                    <div class="item-total">Subtotal: ₹${itemTotal.toLocaleString()}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
    }).join('');

    cartTotalAmount.textContent = `₹${total.toLocaleString()}`;
    
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `Cart (${itemCount})`;
}

function addToCartAndCheckout(button) {
    const productDiv = button.closest('.product');
    const productId = productDiv.dataset.id || Date.now().toString();
    const productName = productDiv.querySelector('h4').textContent;
    const productPrice = productDiv.querySelector('.price').textContent;
    const productImage = productDiv.querySelector('img').src;

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity < 10) {
            cart[existingItemIndex].quantity++;
            showNotification('Quantity updated in cart');
        } else {
            showNotification('Maximum quantity reached');
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        showNotification('Item added to cart');
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    toggleCart(event);
}

// Add these utility functions for price handling
function formatPrice(price) {
    return `₹${parseFloat(price).toLocaleString()}`;
}

function extractPrice(priceString) {
    return parseFloat(priceString.replace(/[₹,]/g, ''));
}

function updateCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear existing items
    checkoutItems.innerHTML = '';
    
    // Add each item to checkout
    cart.forEach(item => {
        const itemHTML = `
            <div class="checkout-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <div class="item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-item">&times;</button>
            </div>
        `;
        checkoutItems.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    cartTotal.innerHTML = `<strong>Total: ₹${total.toLocaleString()}</strong>`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = `Cart (${cart.length})`;
}

function processOrder(orderData) {
    // Clear cart
    localStorage.removeItem('cart');
    
    // Update UI
    updateCartDisplay();
    
    // Show success message
    showOrderSuccess();
    
    // Show notification
    showNotification('Order placed successfully!');
}

function showOrderSuccess() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div class="order-success">
            <i class="fas fa-check-circle"></i>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. We will contact you shortly.</p>
            <button onclick="window.location.href='index.html'">Continue Shopping</button>
        </div>
    `;
}

function calculateTotal(cart) {
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.toString().replace(/[^\d.]/g, ''));
        return sum + (price * (item.quantity || 1));
    }, 0);
    
    const shipping = subtotal > 5000 ? 0 : 500;
    return subtotal + shipping;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// Update the existing handleCheckout function
function handleCheckout(event) {
    event.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const checkoutData = {
        name: document.getElementById('checkout-name').value,
        phone: document.getElementById('checkout-phone').value,
        address: document.getElementById('checkout-address').value,
        items: cartItems,
        total: document.getElementById('cart-total-amount').textContent
    };

    // Process checkout (add your payment gateway integration here)
    console.log('Processing order:', checkoutData);
    alert('Order placed successfully!');
    
    // Clear cart after successful checkout
    localStorage.removeItem('cart');
    updateCartSummary();
    updateCartCount();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Update cart summary when cart section is shown
    document.getElementById('cart').addEventListener('show', updateCartSummary);
    
    // Add submit handler to checkout form
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    
    // Initial update of cart summary
    updateCartSummary();
});

function toggleCart(event) {
    event.preventDefault();
    const cart = document.querySelector('.sliding-cart');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cart.classList.contains('open')) {
        closeCart();
    } else {
        cart.classList.add('open');
        overlay.classList.add('show');
        updateCartDisplay();
    }
}

function closeCart() {
    const cart = document.querySelector('.sliding-cart');
    const overlay = document.querySelector('.cart-overlay');
    cart.classList.remove('open');
    overlay.classList.remove('show');
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalAmount.textContent = '₹0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const priceNumber = parseFloat(item.price.replace(/[₹,]/g, ''));
        const itemTotal = priceNumber * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${priceNumber.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="decreaseQuantity('${item.id}')">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="10" onchange="updateQuantity('${item.id}', this.value)">
                        <button class="quantity-btn plus" onclick="increaseQuantity('${item.id}')">+</button>
                    </div>
                    <div class="item-total">Subtotal: ₹${itemTotal.toLocaleString()}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
    }).join('');

    cartTotalAmount.textContent = `₹${total.toLocaleString()}`;
    
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `Cart (${itemCount})`;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close cart when clicking overlay
    document.querySelector('.cart-overlay').addEventListener('click', closeCart);
    
    // Close cart when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
});

// Update addToCart function to save to localStorage
function addToCartAndCheckout(button) {
    const productDiv = button.closest('.product');
    const productId = productDiv.dataset.id || Date.now().toString();
    const productName = productDiv.querySelector('h4').textContent;
    const productPrice = productDiv.querySelector('.price').textContent;
    const productImage = productDiv.querySelector('img').src;

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity < 10) {
            cart[existingItemIndex].quantity++;
            showNotification('Quantity updated in cart');
        } else {
            showNotification('Maximum quantity reached');
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        showNotification('Item added to cart');
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    toggleCart(event);
}