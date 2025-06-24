// Cart functionality
let cart = [];

// Initialize cart from localStorage
function initializeCart() {
    console.log('Initializing cart...');
    try {
        const savedCart = localStorage.getItem('cart');
        console.log('Saved cart from localStorage:', savedCart);
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Cart parsed successfully:', cart);
        } else {
            console.log('No saved cart found in localStorage');
            cart = [];
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
    updateCartCount();
    console.log('Cart initialization complete');
}

// Update cart count in header
function updateCartCount() {
    console.log('Updating cart count...');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('New cart count:', cartCount);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
        console.log('Cart count updated in UI');
    } else {
        console.log('Cart count element not found in DOM');
    }
}



// Sample data for demonstration
const sampleData = {
    "categories": [
        {
            "id": "exotic",
            "name": "Exotic line",
            "image": "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
        },
        {
            "id": "coverup",
            "name": "Cover-up",
            "image": "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg"
        },
        {
            "id": "dresses",
            "name": "Dresses",
            "image": "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg"
        },
        {
            "id": "sets",
            "name": "Sets",
            "image": "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg"
        },
        {
            "id": "accessories",
            "name": "Accessories",
            "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
        }
    ],
    "products": [
        {
            "id": "sample-product-1",
            "name": "Elegant Summer Dress",
            "category": "exotic",
            "price": 1875.00,
            "description": "Beautiful handmade product with unique design",
            "images": [
                "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
                "https://images.pexels.com/photos/994524/pexels-photo-994524.jpeg"
            ],
            "inStock": true
        },
        {
            "id": "sample-product-2",
            "name": "Modern Casual Outfit",
            "category": "dresses",
            "price": 1950.00,
            "description": "Elegant dress with modern style",
            "images": [
                "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg",
                "https://images.pexels.com/photos/1375737/pexels-photo-1375737.jpeg"
            ],
            "inStock": true
        },
        {
            "id": "sample-product-3",
            "name": "Stylish Cover-up",
            "category": "coverup",
            "price": 1200.00,
            "description": "Perfect for beach days and summer outings",
            "images": [
                "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg"
            ],
            "inStock": true
        },
        {
            "id": "sample-product-4",
            "name": "Chic Accessories Set",
            "category": "accessories",
            "price": 850.00,
            "description": "Complete your look with these elegant accessories",
            "images": [
                "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
            ],
            "inStock": true
        }
    ]
};

// Load products from the server or use sample data
async function loadProducts() {
    try {
        console.log('Fetching products...');
        const response = await fetch('/data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Products loaded from server:', data);
        return data;
    } catch (error) {
        console.error('Error loading products from server, using sample data:', error);
        return sampleData;
    }
}

// Render best selling products
async function renderBestSelling() {
    const bestSellingSection = document.getElementById('bestSelling');
    if (!bestSellingSection) return;

    try {
        const { products } = await loadProducts();
        console.log('Rendering best selling products:', products);
        const bestSellingProducts = products.slice(0, 4); // Show first 4 products

        bestSellingSection.innerHTML = bestSellingProducts.map(product => `
            <div class="group relative">
                <div class="aspect-w-4 aspect-h-5 bg-gray-100 rounded-lg overflow-hidden h-80">
                    <img src="${product.images[0]}" alt="${product.name}" 
                         class="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500">
                </div>
                <div class="mt-4 space-y-2">
                    <h3 class="text-lg font-medium text-gray-900">${product.name}</h3>
                    <p class="text-gray-500">EGP ${product.price.toFixed(2)}</p>
                    <button onclick="addToCart('${JSON.stringify(product).replace(/'/g, "\\'")}')" 
                            class="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering best selling products:', error);
        bestSellingSection.innerHTML = '<p class="text-center text-gray-500">Failed to load products</p>';
    }
}

// Render collections
async function renderCollections() {
    const collectionsSection = document.getElementById('collections');
    if (!collectionsSection) return;

    try {
        const { categories } = await loadProducts();
        console.log('Rendering collections:', categories);

        collectionsSection.innerHTML = categories.map(category => `
            <a href="/collections.html?category=${category.id}" class="group relative">
                <div class="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden h-64">
                    <img src="${category.image}" alt="${category.name}" 
                         class="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500">
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 class="text-2xl font-bold text-white">${category.name}</h3>
                    </div>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error rendering collections:', error);
        collectionsSection.innerHTML = '<p class="text-center text-gray-500">Failed to load collections</p>';
    }
}

// Add to cart functionality
window.addToCart = function(productJson) {
    try {
        const product = JSON.parse(productJson);
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Product added to cart!');
        
        if (document.getElementById('cartItems')) {
            renderCart();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add product to cart');
    }
};

// Update item quantity
window.updateQuantity = function(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== itemId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
};

// Remove item from cart
window.removeItem = function(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

// Update cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-full transform transition-all duration-300 z-50';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');
    initializeCart();
    renderBestSelling();
    renderCollections();
});

// Cart rendering functions
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    
    if (!cartItems || !emptyCartMessage) return; // Not on cart page
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        return;
    }

    emptyCartMessage.classList.add('hidden');
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <img src="${item.images[0]}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-grow">
                <h3 class="font-medium">${item.name}</h3>
                <p class="text-gray-500">EGP ${item.price.toFixed(2)}</p>
                <div class="flex items-center gap-2 mt-2">
                    <button onclick="updateQuantity('${item.id}', -1)" 
                            class="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)"
                            class="px-2 py-1 border rounded hover:bg-gray-100">+</button>
                </div>
            </div>
            <button onclick="removeItem('${item.id}')" 
                    class="text-red-500 hover:text-red-600">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    updateTotals();
}

// Update item quantity
function updateQuantity(itemId, change) {
    console.log('Updating quantity for item:', itemId, 'change:', change);
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== itemId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Updated cart:', cart);
        renderCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeItem(itemId) {
    console.log('Removing item:', itemId);
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Updated cart after removal:', cart);
    renderCart();
    updateCartCount();
}

// Update totals
function updateTotals() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!subtotalElement || !totalElement) return; // Not on cart page
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    subtotalElement.textContent = `EGP ${subtotal.toFixed(2)}`;
    totalElement.textContent = `EGP ${subtotal.toFixed(2)}`;
}

// Add to cart functionality with debug logging
window.addToCart = function(productJson) {
    try {
        console.log('Adding to cart, received:', productJson);
        const product = JSON.parse(productJson);
        console.log('Parsed product:', product);
        
        // Initialize cart if not already done
        if (!cart) {
            console.log('Cart not initialized, initializing now...');
            initializeCart();
        }
        
        const existingItem = cart.find(item => item.id === product.id);
        console.log('Existing item:', existingItem);
        
        if (existingItem) {
            existingItem.quantity += 1;
            console.log('Updated quantity for existing item:', existingItem);
        } else {
            const newItem = {
                ...product,
                quantity: 1
            };
            cart.push(newItem);
            console.log('Added new item to cart:', newItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Updated cart in localStorage. Current cart:', cart);
        
        updateCartCount();
        showNotification('Product added to cart!');
        
        // If we're on the cart page, update the display
        if (document.getElementById('cartItems')) {
            console.log('On cart page, updating display');
            renderCart();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        console.error('Error details:', error.message);
        console.error('Product JSON received:', productJson);
        showNotification('Failed to add product to cart');
    }
};

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    if (mobileMenuButton) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden fixed inset-0 bg-white z-50 transform translate-x-full transition-transform duration-300 ease-in-out';
        mobileMenu.innerHTML = `
            <div class="p-4">
                <button class="float-right text-2xl">&times;</button>
                <nav class="mt-16 space-y-4">
                    <a href="/" class="block text-xl py-2">Home</a>
                    <a href="/collections.html" class="block text-xl py-2">Collections</a>
                    <a href="/cart.html" class="block text-xl py-2">Cart</a>
                    <a href="/admin-login.html" class="block text-xl py-2">Admin</a>
                </nav>
            </div>
        `;

        document.body.appendChild(mobileMenu);

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
        });

        mobileMenu.querySelector('button').addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }
});
