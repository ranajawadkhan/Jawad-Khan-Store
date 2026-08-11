import React, { useState } from 'react';
import { Heart, ShoppingCart, Wrench, Trash2, Plus, Minus, LogOut, CheckCircle, CreditCard, DollarSign } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

// 15 Main Products with Sub-Products (Variations/Options)
const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    category: "ELECTRONICS",
    price: 99.99,
    description: "High-quality sound with active noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    subProducts: [
      { id: 101, name: "Matte Black", price: 99.99 },
      { id: 102, name: "Silver White", price: 109.99 },
      { id: 103, name: "Rose Gold", price: 119.99 }
    ]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "ELECTRONICS",
    price: 149.99,
    description: "Track heart rate, steps, and sleep effortlessly.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    subProducts: [
      { id: 201, name: "Silicone Strap", price: 149.99 },
      { id: 202, name: "Leather Strap", price: 169.99 }
    ]
  },
  {
    id: 3,
    name: "Classic Leather Jacket",
    category: "FASHION",
    price: 199.99,
    description: "Premium leather jacket for a sleek modern outfit.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    subProducts: [
      { id: 301, name: "Size M - Brown", price: 199.99 },
      { id: 302, name: "Size L - Black", price: 209.99 }
    ]
  },
  {
    id: 4,
    name: "boAt Wave Call Smartwatch",
    category: "ELECTRONICS",
    price: 49.99,
    description: "1.69 HD display with Bluetooth calling.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    subProducts: [
      { id: 401, name: "Active Black", price: 49.99 },
      { id: 402, name: "Deep Blue", price: 49.99 }
    ]
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    category: "ELECTRONICS",
    price: 79.99,
    description: "RGB backlit mechanical keyboard with tactile switches.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    subProducts: [
      { id: 501, name: "Blue Switches (Clicky)", price: 79.99 },
      { id: 502, name: "Red Switches (Linear)", price: 84.99 }
    ]
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    category: "FURNITURE",
    price: 249.99,
    description: "Breathable mesh back with adjustable armrests.",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=500",
    subProducts: [
      { id: 601, name: "Standard Mesh", price: 249.99 },
      { id: 602, name: "With Footrest", price: 289.99 }
    ]
  },
  {
    id: 7,
    name: "Ultra HD 4K Monitor 27-inch",
    category: "ELECTRONICS",
    price: 329.99,
    description: "Vibrant IPS display with 144Hz refresh rate.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    subProducts: [
      { id: 701, name: "Flat Screen", price: 329.99 },
      { id: 702, name: "Curved Display", price: 369.99 }
    ]
  },
  {
    id: 8,
    name: "Running Sports Shoes",
    category: "FASHION",
    price: 89.99,
    description: "Lightweight, breathable sneakers for daily training.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    subProducts: [
      { id: 801, name: "Red Edition (Size 42)", price: 89.99 },
      { id: 802, name: "Black Edition (Size 43)", price: 89.99 }
    ]
  },
  {
    id: 9,
    name: "Minimalist Wooden Desk",
    category: "FURNITURE",
    price: 179.99,
    description: "Solid oak wooden desk suitable for work & gaming.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500",
    subProducts: [
      { id: 901, name: "Natural Oak", price: 179.99 },
      { id: 902, name: "Dark Walnut", price: 199.99 }
    ]
  },
  {
    id: 10,
    name: "Wireless Optical Mouse",
    category: "ELECTRONICS",
    price: 29.99,
    description: "Silent click high precision wireless mouse.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    subProducts: [
      { id: 1001, name: "Battery Version", price: 29.99 },
      { id: 1002, name: "Rechargeable Type-C", price: 34.99 }
    ]
  },
  {
    id: 11,
    name: "Casual Denim Shirt",
    category: "FASHION",
    price: 45.00,
    description: "100% Cotton durable denim shirt for everyday wear.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    subProducts: [
      { id: 1101, name: "Light Blue (M)", price: 45.00 },
      { id: 1102, name: "Dark Wash (L)", price: 45.00 }
    ]
  },
  {
    id: 12,
    name: "Portable Bluetooth Speaker",
    category: "ELECTRONICS",
    price: 59.99,
    description: "Waterproof outdoor speaker with deep bass.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    subProducts: [
      { id: 1201, name: "Standard 10W", price: 59.99 },
      { id: 1202, name: "Pro 20W Bass Boost", price: 79.99 }
    ]
  },
  {
    id: 13,
    name: "Urban Travel Backpack",
    category: "FASHION",
    price: 64.99,
    description: "Water-resistant laptop bag with USB charging port.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    subProducts: [
      { id: 1301, name: "Grey - 15 inch", price: 64.99 },
      { id: 1302, name: "Black - 17 inch", price: 74.99 }
    ]
  },
  {
    id: 14,
    name: "Smart LED Desk Lamp",
    category: "FURNITURE",
    price: 39.99,
    description: "Touch control lamp with wireless phone charger base.",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500",
    subProducts: [
      { id: 1401, name: "Warm Light", price: 39.99 },
      { id: 1402, name: "RGB Multi-color", price: 49.99 }
    ]
  },
  {
    id: 15,
    name: "Noise-Cancelling Earbuds",
    category: "ELECTRONICS",
    price: 119.99,
    description: "True wireless earbuds with 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    subProducts: [
      { id: 1501, name: "Standard Case", price: 119.99 },
      { id: 1502, name: "Wireless Charging Case", price: 139.99 }
    ]
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Selected Sub-products map
  const [selectedVariants, setSelectedVariants] = useState({});

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
      alert("Login failed! Please check Firebase setup.");
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully!");
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

  const handleSubProductSelect = (productId, sub) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: sub
    });
  };

  const addToCart = (product) => {
    const chosenSub = selectedVariants[product.id] || (product.subProducts ? product.subProducts[0] : null);
    const itemToAdd = {
      ...product,
      cartKey: `${product.id}-${chosenSub ? chosenSub.id : 'default'}`,
      selectedOption: chosenSub ? chosenSub.name : 'Standard',
      price: chosenSub ? chosenSub.price : product.price,
      quantity: 1
    };

    const existingIndex = cart.findIndex(item => item.cartKey === itemToAdd.cartKey);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, itemToAdd]);
    }
  };

  const updateQuantity = (cartKey, amount) => {
    setCart(cart.map(item => {
      if (item.cartKey === cartKey) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (cartKey) => {
    setCart(cart.filter(item => item.cartKey !== cartKey));
  };

  const totalCartPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleProcessOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    setIsPaid(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <button onClick={() => setCurrentPage('home')} className="text-2xl font-extrabold tracking-wide text-white focus:outline-none">
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => setCurrentPage('home')} className={`hover:text-yellow-300 transition ${currentPage === 'home' ? 'text-yellow-300 font-bold underline' : ''}`}>
            Home
          </button>
          <button onClick={() => setCurrentPage('products')} className={`hover:text-yellow-300 transition ${currentPage === 'products' ? 'text-yellow-300 font-bold underline' : ''}`}>
            Products
          </button>
          <button onClick={() => setCurrentPage('wishlist')} className={`flex items-center space-x-1 hover:text-yellow-300 transition ${currentPage === 'wishlist' ? 'text-yellow-300 font-bold underline' : ''}`}>
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current text-red-400' : ''}`} />
            <span>Wishlist ({wishlist.length})</span>
          </button>
          <button onClick={() => setCurrentPage('cart')} className={`flex items-center space-x-1 hover:text-yellow-300 transition ${currentPage === 'cart' ? 'text-yellow-300 font-bold underline' : ''}`}>
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center space-x-3">
              <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User" className="w-7 h-7 rounded-full border border-white" />
              <span className="text-yellow-300 font-semibold text-sm">
                Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}
              </span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold transition flex items-center space-x-1">
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center space-x-1 shadow">
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Home View */}
        {currentPage === 'home' && (
          <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              WELCOME TO JAWAD KHAN STORE
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-6 tracking-tight">
              Discover Premium Products &amp; Sub-items
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Explore over 15+ main items with flexible options, easy Google authentication, and instant checkout.
            </p>
            <button onClick={() => setCurrentPage('products')} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow transition">
              Explore Products 🚀
            </button>
          </div>
        )}

        {/* Products View */}
        {currentPage === 'products' && (
          <div>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Our Featured Catalog (15 Items)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => {
                const isLiked = wishlist.some(w => w.id === item.id);
                const currentSub = selectedVariants[item.id] || (item.subProducts ? item.subProducts[0] : null);
                
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative flex flex-col justify-between">
                    <button onClick={() => toggleWishlist(item)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10">
                      <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                    <div>
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                        <h2 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h2>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        
                        {/* Sub-products Selection */}
                        {item.subProducts && (
                          <div className="mt-3">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Select Option / Sub-product:</label>
                            <select 
                              onChange={(e) => {
                                const sub = item.subProducts.find(s => s.id === parseInt(e.target.value));
                                handleSubProductSelect(item.id, sub);
                              }}
                              className="w-full text-xs border border-gray-300 p-1.5 rounded-md bg-gray-50"
                            >
                              {item.subProducts.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name} - ${sub.price.toFixed(2)}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <p className="text-xl font-extrabold text-gray-900 mt-3">
                          ${currentSub ? currentSub.price.toFixed(2) : item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <button onClick={() => addToCart(item)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
                        Add Option to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cart & Payment Process View */}
        {currentPage === 'cart' && (
          <div>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Shopping Cart &amp; Checkout</h1>
            {isPaid ? (
              <div className="bg-white p-8 rounded-xl text-center border border-green-200 max-w-lg mx-auto shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Payment Method: <span className="font-bold uppercase">{paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}</span>
                </p>
                <p className="text-gray-500 text-xs mt-1">Thank you for shopping at Jawad Khan Store.</p>
                <button onClick={() => { setIsPaid(false); setCart([]); setCurrentPage('home'); }} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md font-semibold text-sm">
                  Back to Store
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">Your cart is empty!</p>
                <button onClick={() => setCurrentPage('products')} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md font-semibold">
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartKey} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">
                            Option: {item.selectedOption}
                          </span>
                          <p className="text-sm font-semibold text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => updateQuantity(item.cartKey, -1)} className="p-1 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                          <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartKey, 1)} className="p-1 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.cartKey)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout & Payment Box */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Payment &amp; Summary</h2>
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

                  {/* Payment Selection Options */}
                  <form onSubmit={handleProcessOrder} className="space-y-4">
                    <label className="block text-xs font-bold uppercase text-gray-500">Select Payment Method:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 border rounded-md text-xs font-bold flex items-center justify-center space-x-1 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 border rounded-md text-xs font-bold flex items-center justify-center space-x-1 ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Cash (COD)</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-2 mt-2">
                        <input type="text" placeholder="Card Number (e.g. 4532...)" className="w-full text-xs p-2 border border-gray-300 rounded" required />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="MM/YY" className="w-full text-xs p-2 border border-gray-300 rounded" required />
                          <input type="text" placeholder="CVV" className="w-full text-xs p-2 border border-gray-300 rounded" required />
                        </div>
                      </div>
                    )}

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition mt-4">
                      {paymentMethod === 'card' ? 'Pay Now' : 'Place Order (COD)'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wishlist View */}
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
                    <button onClick={() => toggleWishlist(item)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-red-500 hover:bg-gray-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                      <h2 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h2>
                      <p className="text-xl font-extrabold text-gray-900 mt-3">${item.price.toFixed(2)}</p>
                      <button onClick={() => addToCart(item)} className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                        Add to Cart
                      </button>
                    </div>
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