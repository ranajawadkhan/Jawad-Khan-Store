import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus, Search, CheckCircle, CreditCard, DollarSign, Home, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

const categories = [
  "All", "Shoes", "Electronics", "Bags", "Clothing", "Sports", "Watches", "Skincare", "Books", "Kitchen", "Toys", "Games", "Jewelry"
];

const initialProducts = [
  // --- SHOES ---
  { id: 101, name: "Nike Air Max Black", category: "Shoes", price: 129.99, description: "Running Shoes - Lightweight breathable mesh.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 102, name: "Air Max Silver Sneakers", category: "Shoes", price: 139.99, description: "Sneakers - Metallic finish for daily wear.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80" },
  { id: 103, name: "Dynamic Blue Runners", category: "Shoes", price: 119.99, description: "Sports Shoes - Eco-friendly high elasticity.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80" },
  { id: 104, name: "Classic Retro Grey", category: "Shoes", price: 109.99, description: "Casual Shoes - Retro grey vintage design.", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80" },
  { id: 105, name: "Brown Leather Oxfords", category: "Shoes", price: 149.99, description: "Formal Shoes - Genuine leather classic oxfords.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80" },

  // --- SPORTS ---
  { id: 201, name: "Professional Football", category: "Sports", price: 34.99, description: "Football - FIFA standard stitched ball.", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=600&q=80" },
  { id: 202, name: "English Willow Bat", category: "Sports", price: 149.99, description: "Cricket - Grade 1 English Willow professional bat.", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80" },
  { id: 203, name: "Pro Grip Basketball", category: "Sports", price: 29.99, description: "Basketball - High grip composite leather.", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80" },
  { id: 204, name: "Tennis Racket Carbon", category: "Sports", price: 89.99, description: "Tennis - Lightweight powerful string frame.", image: "https://images.unsplash.com/photo-1617083934555-56321683938f?auto=format&fit=crop&w=600&q=80" },

  // --- ELECTRONICS ---
  { id: 301, name: "Wireless Headphones", category: "Electronics", price: 99.99, description: "Headphones - Active noise cancelling over-ear.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { id: 302, name: "Smart Wireless Earbuds", category: "Electronics", price: 59.99, description: "Earbuds - True wireless Bluetooth 5.3 in-ear.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80" },
  { id: 303, name: "Portable Speaker", category: "Electronics", price: 49.99, description: "Speakers - Waterproof bass-boosted speaker.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80" },
  { id: 304, name: "RGB Mechanical Keyboard", category: "Electronics", price: 79.99, description: "Computer - Blue switch backlight keyboard.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },

  // --- CLOTHING ---
  { id: 401, name: "Classic Denim Jacket", category: "Clothing", price: 69.99, description: "Jackets - Rugged vintage blue cotton denim.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
  { id: 402, name: "Black Cotton Hoodie", category: "Clothing", price: 49.99, description: "Hoodies - Soft fleece heavy drawstring hoodie.", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
  { id: 403, name: "White Crewneck T-Shirt", category: "Clothing", price: 19.99, description: "T-Shirts - 100% breathable pure cotton t-shirt.", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },

  // --- BAGS ---
  { id: 501, name: "Leather Laptop Backpack", category: "Bags", price: 79.99, description: "Backpacks - Waterproof vintage brown leather bag.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
  { id: 502, name: "Crossbody Sling Bag", category: "Bags", price: 39.99, description: "Sling Bags - Chest pouch bag for essentials.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },

  // --- WATCHES ---
  { id: 601, name: "Smart Watch Series X", category: "Watches", price: 149.99, description: "Smartwatches - AMOLED heart rate fitness watch.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
  { id: 602, name: "Classic Leather Watch", category: "Watches", price: 89.99, description: "Leather Watches - Analog classic brown leather watch.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" },

  // --- SKINCARE ---
  { id: 801, name: "Facial Moisturizer", category: "Skincare", price: 24.99, description: "Moisturizers - Deep moisture hyaluronic cream.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
  { id: 802, name: "Vitamin C Serum", category: "Skincare", price: 29.99, description: "Serums - Anti-aging dark spot serum.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },

  // --- BOOKS ---
  { id: 901, name: "Hardcover Sci-Fi Novel", category: "Books", price: 19.99, description: "Fiction - Space adventure epic story book.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
  { id: 902, name: "Full-Stack Web Dev Guide", category: "Books", price: 39.99, description: "Technology - Complete MERN stack coding guide.", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80" },

  // --- KITCHEN ---
  { id: 1001, name: "Coffee Thermos Bottle", category: "Kitchen", price: 22.99, description: "Bottles - Insulated vacuum flask 1000ml.", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80" },
  { id: 1002, name: "Non-Stick Frying Pan", category: "Kitchen", price: 34.99, description: "Cookware - Scratch resistant induction skillet.", image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&w=600&q=80" },

  // --- TOYS ---
  { id: 1101, name: "Building Bricks Set (500 Pcs)", category: "Toys", price: 39.99, description: "Building Toys - Creative block construction kit.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80" },
  { id: 1102, name: "RC High-Speed Monster Truck", category: "Toys", price: 49.99, description: "RC Toys - 4WD rechargeable off-road car.", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80" },
  { id: 1103, name: "Soft Teddy Bear", category: "Toys", price: 16.99, description: "Plush - Ultra soft cuddly stuffed animal toy.", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80" },

  // --- GAMES ---
  { id: 1201, name: "Speed Rubik's Cube 3x3", category: "Games", price: 14.99, description: "Puzzles - Smooth rotating brain puzzle cube.", image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80" },
  { id: 1202, name: "Wooden Chess Set Board", category: "Games", price: 29.99, description: "Board Games - Handcrafted folding magnetic chess.", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80" },
  { id: 1203, name: "Monopoly Strategy Board Game", category: "Games", price: 34.99, description: "Board Games - Real estate trading classic game.", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&w=600&q=80" },

  // --- JEWELRY ---
  { id: 1301, name: "Silver Pendant Necklace", category: "Jewelry", price: 45.00, description: "Necklaces - Sterling silver chain crystal pendant.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
  { id: 1302, name: "Gold Plated Hoop Earrings", category: "Jewelry", price: 29.99, description: "Earrings - Lightweight polished gold hoops.", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80" }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Default Home Page
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPaid, setIsPaid] = useState(false);

  // Google Sign-in
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Login failed! Check Firebase authorized domains.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
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

  // Combined Search, Category Filter & Sorting Logic
  const filteredProducts = products
    .filter(item => selectedCategory === "All" || item.category === selectedCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <button 
          onClick={() => { setCurrentPage('home'); }} 
          className="text-xl font-bold tracking-wider uppercase focus:outline-none hover:text-gray-300 transition"
        >
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          {/* Home Button */}
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'home' ? 'text-amber-400 font-bold underline' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          {/* Products Button */}
          <button 
            onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }} 
            className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'products' ? 'text-amber-400 font-bold underline' : ''}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products</span>
          </button>

          {/* Wishlist Button */}
          <button onClick={() => setCurrentPage('wishlist')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'wishlist' ? 'text-amber-400 font-bold underline' : ''}`}>
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current text-red-500' : ''}`} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          {/* Cart Button */}
          <button onClick={() => setCurrentPage('cart')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'cart' ? 'text-amber-400 font-bold underline' : ''}`}>
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>

          {/* Login / User */}
          {user ? (
            <div className="flex items-center space-x-3">
              <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User" className="w-7 h-7 rounded-full border border-white" />
              <span className="text-gray-200 text-sm hidden md:inline">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm">
              Sign in
            </button>
          )}
        </div>
      </nav>

      {/* Main App Screens */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        
        {/* ==================== HOME PAGE ==================== */}
        {currentPage === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white rounded-3xl p-8 md:p-16 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 z-10 space-y-4">
                <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Welcome To Jawad Khan Store
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-tight">
                  Discover Quality Products Everyday
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  Explore our exclusive collection of shoes, electronics, watches, skincare, toys, and games with top discounts.
                </p>
                <button 
                  onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center space-x-2 transition shadow-lg"
                >
                  <span>Explore Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-8 md:mt-0 md:w-5/12 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" 
                  alt="Shopping" 
                  className="rounded-2xl shadow-2xl border-4 border-slate-800 object-cover max-h-80" 
                />
              </div>
            </div>

            {/* Quick Categories Bar */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {categories.filter(c => c !== 'All').slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage('products'); }}
                    className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-black hover:shadow-md transition text-center font-bold text-sm text-gray-800"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Deals Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Trending Products</h2>
                <button 
                  onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }} 
                  className="text-amber-600 hover:underline font-bold text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">{item.category}</span>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-base font-extrabold">${item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-800"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== PRODUCTS PAGE ==================== */}
        {currentPage === 'products' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">STORE CATALOG</span>
              <h1 className="text-3xl font-serif font-extrabold text-gray-900 mt-1">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} items available</p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 my-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-black"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>

              <div className="w-full sm:w-auto flex items-center space-x-3">
                <span className="text-xs font-bold text-gray-500 uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl py-2 px-4 text-xs font-semibold focus:outline-none"
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm font-medium">No matching products found!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item) => {
                  const isLiked = wishlist.some(w => w.id === item.id);
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                      <div className="relative">
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition z-10"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                        </button>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-52 object-cover bg-gray-100" 
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80"; }}
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-amber-600">{item.category}</span>
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
            )}
          </div>
        )}

        {/* ==================== CART PAGE ==================== */}
        {currentPage === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
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
                <p className="text-gray-500 text-sm">Your cart is currently empty.</p>
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

        {/* ==================== WISHLIST PAGE ==================== */}
        {currentPage === 'wishlist' && (
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Wishlist</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Your wishlist is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-4">
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