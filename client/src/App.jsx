import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus, Search, CheckCircle, CreditCard, DollarSign } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

const categories = [
  "All", "Shoes", "Electronics", "Bags", "Clothing", "Accessories", "Sports", "Watches", "Skincare", "Books", "Kitchen", "Toys & Games", "Jewelry"
];

// Expanded product list organized by Category
const initialProducts = [
  // SHOES
  {
    id: 1,
    name: "Nike Air Max Stealth Black",
    category: "Shoes",
    price: 129.99,
    description: "Premium black athletic sports shoes for running and training.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 2,
    name: "Air Max Metallic Silver",
    category: "Shoes",
    price: 139.99,
    description: "Sleek metallic silver running sneakers with extra bounce.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
  },
  {
    id: 3,
    name: "Electric Blue Dynamic Runners",
    category: "Shoes",
    price: 119.99,
    description: "Vibrant blue eco-friendly lightweight walking sneakers.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
  },
  {
    id: 4,
    name: "Classic Grey Retro Edition",
    category: "Shoes",
    price: 109.99,
    description: "Urban lifestyle grey casual sneakers for street fashion.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500"
  },

  // ELECTRONICS
  {
    id: 5,
    name: "Wireless ANC Headphones",
    category: "Electronics",
    price: 99.99,
    description: "Active noise-cancelling Bluetooth over-ear headphones.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 6,
    name: "Smart Earbuds Pro",
    category: "Electronics",
    price: 59.99,
    description: "True wireless in-ear earbuds with long battery power.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"
  },

  // WATCHES
  {
    id: 7,
    name: "Smart Watch Series X",
    category: "Watches",
    price: 149.99,
    description: "HD AMOLED Display smartwatch with heart & fitness monitoring.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 8,
    name: "Minimalist Leather Chronograph",
    category: "Watches",
    price: 89.99,
    description: "Classic analog watch with real brown leather strap.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
  },

  // BAGS
  {
    id: 9,
    name: "Leather Travel Backpack",
    category: "Bags",
    price: 79.99,
    description: "Water-resistant brown leather 15-inch laptop backpack.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 10,
    name: "Casual Crossbody Sling Bag",
    category: "Bags",
    price: 39.99,
    description: "Compact waterproof sling bag for daily essentials.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
  },

  // CLOTHING
  {
    id: 11,
    name: "Classic Denim Jacket",
    category: "Clothing",
    price: 69.99,
    description: "Rugged vintage blue cotton denim outerwear jacket.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },
  {
    id: 12,
    name: "Organic Cotton Black Hoodie",
    category: "Clothing",
    price: 49.99,
    description: "Soft fleece pullover hoodie for maximum comfort.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500"
  },

  // ACCESSORIES
  {
    id: 13,
    name: "UV Protection Aviator Sunglasses",
    category: "Accessories",
    price: 29.99,
    description: "Polarized metal frame glasses for sun protection.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
  },

  // SPORTS
  {
    id: 14,
    name: "Professional Football / Soccer Ball",
    category: "Sports",
    price: 34.99,
    description: "Match-quality stitched training and match football.",
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500"
  },

  // SKINCARE
  {
    id: 15,
    name: "Hydrating Facial Moisturizer",
    category: "Skincare",
    price: 24.99,
    description: "Nourishing daily skin cream for deep hydration.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"
  },

  // BOOKS
  {
    id: 16,
    name: "Hardcover Graphic Novel",
    category: "Books",
    price: 19.99,
    description: "Bestselling illustrated story book in hardcover edition.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
  },

  // KITCHEN
  {
    id: 17,
    name: "Stainless Steel Coffee Thermos",
    category: "Kitchen",
    price: 22.99,
    description: "Insulated vacuum flask keeps drinks hot or cold for hours.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500"
  },

  // TOYS & GAMES
  {
    id: 18,
    name: "Speed Rubik's Cube 3x3",
    category: "Toys & Games",
    price: 14.99,
    description: "Smooth rotating puzzle cube for brain exercises.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500"
  },

  // JEWELRY
  {
    id: 19,
    name: "Silver Pendant Necklace",
    category: "Jewelry",
    price: 45.00,
    description: "Elegant sterling silver chain with crystal pendant.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filters
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
      alert("Login failed! Please check your Firebase authorized domain settings.");
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

  // Category Filter & Search Logic
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
      {/* Top Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <button onClick={() => setCurrentPage('products')} className="text-xl font-bold tracking-wider uppercase focus:outline-none">
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

          {/* User Profile / Login */}
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

      {/* Main Area */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        {currentPage === 'products' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">BROWSE</span>
              <h1 className="text-4xl font-serif font-extrabold text-gray-900 mt-1">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products found</p>
            </div>

            {/* Interactive Category Buttons */}
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

            {/* Search Box & Sort */}
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

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">No products found in this category.</p>
              </div>
            ) : (
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
                        <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
                      </div>

                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-gray-400">{item.category}</span>
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

        {/* Cart Page */}
        {currentPage === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
            {isPaid ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-green-200 shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Payment Option: <span className="font-bold uppercase">{paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}</span>
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
                    <label className="block text-xs font-bold uppercase text-gray-500">Payment Method:</label>
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