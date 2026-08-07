import React, { useState } from 'react';
import { Heart, ShoppingCart, Wrench, Trash2, Plus, Minus, LogOut } from 'lucide-react';

const initialProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "ELECTRONICS",
    price: 99.99,
    description: "High-quality sound with noise cancellation technology.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "ELECTRONICS",
    price: 149.99,
    description: "Track your daily activities, heart rate, and workouts effortlessly.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Classic Leather Jacket",
    category: "FASHION",
    price: 199.99,
    description: "Stylish premium leather jacket for modern fashion.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },
  {
    id: 4,
    name: "boAt Wave Call Smartwatch",
    category: "ELECTRONICS",
    price: 49.99,
    description: "1.69 HD display with Bluetooth calling, 550 nits brightness, and health monitoring.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"
  },
  {
    id: 5,
    name: "Minimalist Mechanical Keyboard",
    category: "ELECTRONICS",
    price: 79.99,
    description: "RGB backlit mechanical keyboard with tactile switches.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  }
];

export default function App() {
  // Yahan 'cart' ki jagah 'home' kar diya hai
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState({ name: 'baba', role: 'admin' });
  const [products, setProducts] = useState(initialProducts);
  
  // Cart pre-populated with 4 Jackets, 3 Watches, 1 Headphone, 1 Keyboard
  const [cart, setCart] = useState([
    { ...initialProducts[2], quantity: 4 }, 
    { ...initialProducts[3], quantity: 3 }, 
    { ...initialProducts[0], quantity: 1 }, 
    { ...initialProducts[4], quantity: 1 }  
  ]);
  
  const [wishlist, setWishlist] = useState([initialProducts[0], initialProducts[1]]);

  // Admin New Product State
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'ELECTRONICS', price: '', description: '', image: ''
  });

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Add to Cart
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update Cart Quantity
  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Add New Product (Admin)
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const addedItem = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      image: newProduct.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"
    };
    setProducts([...products, addedItem]);
    setNewProduct({ name: '', category: 'ELECTRONICS', price: '', description: '', image: '' });
    alert("Product added successfully!");
  };

  // Total Cart Price
  const totalCartPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-extrabold tracking-wide text-white focus:outline-none"
        >
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`hover:text-yellow-300 transition ${currentPage === 'home' ? 'text-yellow-300 font-bold underline' : ''}`}
          >
            Home
          </button>

          <button 
            onClick={() => setCurrentPage('products')} 
            className={`hover:text-yellow-300 transition ${currentPage === 'products' ? 'text-yellow-300 font-bold underline' : ''}`}
          >
            Products
          </button>

          <button 
            onClick={() => setCurrentPage('wishlist')} 
            className={`flex items-center space-x-1 hover:text-yellow-300 transition ${currentPage === 'wishlist' ? 'text-yellow-300 font-bold underline' : ''}`}
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current text-red-400' : ''}`} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button 
            onClick={() => setCurrentPage('cart')} 
            className={`flex items-center space-x-1 hover:text-yellow-300 transition ${currentPage === 'cart' ? 'text-yellow-300 font-bold underline' : ''}`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>

          {user && user.role === 'admin' && (
            <button 
              onClick={() => setCurrentPage('admin')} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 transition"
            >
              <Wrench className="w-3 h-3" />
              <span>Admin</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-yellow-300 font-semibold text-sm">
                Hi, am {user.name}
              </span>
              <button 
                onClick={() => setUser(null)} 
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold transition flex items-center space-x-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setUser({ name: 'baba', role: 'admin' })} 
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main View */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Cart Page */}
        {currentPage === 'cart' && (
          <div>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Shopping Cart 🛒</h1>
            {cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">Your cart is empty!</p>
                <button 
                  onClick={() => setCurrentPage('products')} 
                  className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          <p className="text-sm font-semibold text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                          <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => alert("Checkout complete! Order placed.")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Home Page */}
        {currentPage === 'home' && (
          <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              WELCOME TO JAWAD KHAN STORE
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-6 tracking-tight">
              Discover Premium Quality<br />Products Online
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Shop the best deals on fashion, electronics, and everyday essentials.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => setCurrentPage('products')} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow transition"
              >
                Shop Now 🚀
              </button>
            </div>
          </div>
        )}

        {/* Products Page */}
        {currentPage === 'products' && (
          <div>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => {
                const isLiked = wishlist.some(w => w.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                      <h2 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h2>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      <p className="text-xl font-extrabold text-gray-900 mt-3">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wishlist Page */}
        {currentPage === 'wishlist' && (
          <div>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">My Wishlist ❤️</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">Your wishlist is empty!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-red-500 hover:bg-gray-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                      <h2 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h2>
                      <p className="text-xl font-extrabold text-gray-900 mt-3">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Admin Dashboard */}
        {currentPage === 'admin' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <Wrench className="w-6 h-6 text-purple-600" />
              <span>Admin Panel - Add New Product</span>
            </h1>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title</label>
                <input 
                  type="text" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-md"
                  placeholder="e.g. Wireless Mouse"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-md"
                  >
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="FASHION">FASHION</option>
                    <option value="FURNITURE">FURNITURE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-md"
                    placeholder="29.99"
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition"
              >
                Add Product to Store
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}