import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus, LogOut, CheckCircle, CreditCard, DollarSign, Search } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

const categories = [
  "All", "Shoes", "Electronics", "Bags", "Clothing", "Accessories", "Sports", "Watches", "Skincare", "Books", "Kitchen", "Toys & Games", "Jewelry"
];

const initialProducts = [
  {
    id: 1,
    name: "Nike Air Max Stealth Black",
    category: "Shoes",
    price: 129.99,
    description: "Premium black sports shoes for daily wear and athletics.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 2,
    name: "Air Max Metallic Silver",
    category: "Shoes",
    price: 139.99,
    description: "Sleek silver running shoes with superior cushioning.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
  },
  {
    id: 3,
    name: "Electric Blue Dynamic Runners",
    category: "Shoes",
    price: 119.99,
    description: "Vibrant blue sneakers with recycled eco-sole technology.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
  },
  {
    id: 4,
    name: "Classic Grey Retro Edition",
    category: "Shoes",
    price: 109.99,
    description: "Stylish neutral shade sneakers for street fashion.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500"
  },
  {
    id: 5,
    name: "Wireless ANC Headphones",
    category: "Electronics",
    price: 99.99,
    description: "Over-ear noise-cancelling wireless headphones.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 6,
    name: "Smart Watch Series X",
    category: "Watches",
    price: 149.99,
    description: "Fitness and health tracking smartwatch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 7,
    name: "Leather Travel Backpack",
    category: "Bags",
    price: 79.99,
    description: "Water-resistant premium laptop backpack.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 8,
    name: "Classic Denim Jacket",
    category: "Clothing",
    price: 69.99,
    description: "Durable cotton denim jacket for everyday comfort.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filter, Search, and Sort States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPaid, setIsPaid] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Login failed! Ensure 'jawad-khan-store.vercel.app' is added to Firebase Authorized Domains.");
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Filtering & Sorting Logic
  const filteredProducts = products
    .filter(item => selectedCategory === "All" || item.category === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  const totalCartPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleProcessOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty!");
    setIsPaid(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <button onClick={() => setCurrentPage('products')} className="text-xl font-bold tracking-wider focus:outline-none uppercase">
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => setCurrentPage('products')} className={`hover:text-gray-300 transition ${currentPage === 'products' ? 'text-white font-bold underline' : ''}`}>
            Products
          </button>
          <button onClick={() => setCurrentPage('wishlist')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'wishlist' ? 'text-white font-bold underline' : ''}`}>
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current text-red-500' : ''}`} />
            <span>Wishlist ({wishlist.length})</span>
          </button>
          <button onClick={() => setCurrentPage('cart')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'cart' ? 'text-white font-bold underline' : ''}`}>
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center space-x-3">
              <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User" className="w-7 h-7 rounded-full" />
              <span className="text-gray-200 text-sm">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className="bg-white text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm">
              Sign in with Google
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        {currentPage === 'products' && (
          <div>
            {/* Header Title */}
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">BROWSE</span>
              <h1 className="text-4xl font-serif font-extrabold text-gray-900 mt-1">All Products</h1>
              <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products found</p>
            </div>

            {/* Category Buttons Bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 my-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Sort Inputs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-black"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>

              <div className="w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-white border border-gray-300 rounded-full py-2 px-4 text-xs font-medium focus:outline-none"
                >
                  <option value="default">Sort by</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => {
                const isLiked = wishlist.some(w => w.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div className="relative">
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition z-10"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
                    </div>

                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <h2 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h2>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-extrabold text-gray-900">${item.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cart Page */}
        {currentPage === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
            {isPaid ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-green-200 shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Payment Method: <span className="font-bold uppercase">{paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}</span>
                </p>
                <button onClick={() => { setIsPaid(false); setCart([]); setCurrentPage('products'); }} className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-semibold text-xs">
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Your cart is empty!</p>
                <button onClick={() => setCurrentPage('products')} className="mt-4 bg-black text-white px-5 py-2 rounded-lg font-semibold text-xs">
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Summary</h2>
                  <div className="flex justify-between mb-2 text-xs text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-xs text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-sm font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>

                  <form onSubmit={handleProcessOrder} className="space-y-4">
                    <label className="block text-xs font-bold uppercase text-gray-500">Payment Option:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 border rounded-lg text-xs font-bold flex items-center justify-center space-x-1 ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200 text-gray-500'}`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 border rounded-lg text-xs font-bold flex items-center justify-center space-x-1 ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200 text-gray-500'}`}
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>COD</span>
                      </button>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-lg text-xs transition mt-4">
                      {paymentMethod === 'card' ? 'Pay Now' : 'Place Order'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Page */}
        {currentPage === 'wishlist' && (
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Wishlist</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Wishlist is empty!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm p-4">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
                    <h2 className="font-bold text-gray-900 text-sm mt-3">{item.name}</h2>
                    <p className="text-sm font-extrabold text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(item)} className="w-full mt-3 bg-black text-white font-semibold py-2 rounded-lg text-xs">
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}