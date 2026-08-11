import React, { useState } from 'react';
import { Heart, Search, X, ShoppingBag } from 'lucide-react';

const categories = [
  "All",
  "Shoes",
  "Electronics",
  "Bags",
  "Clothing",
  "Accessories",
  "Sports",
  "Watches",
  "Skincare",
  "Books",
  "Kitchen",
  "Toys & Games",
  "Jewelry"
];

const productsData = [
  { id: 1, name: "Nike Black Running Shoes", category: "Shoes", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 2, name: "Metallic Silver Sneakers", category: "Shoes", price: 135, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500" },
  { id: 3, name: "Blue Sport Athletic Shoes", category: "Shoes", price: 110, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
  { id: 4, name: "Classic Grey Air Max", category: "Shoes", price: 145, image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
  { id: 5, name: "Wireless Headphones", category: "Electronics", price: 85, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 6, name: "Smart Fitness Watch", category: "Watches", price: 199, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 7, name: "Leather Backpack", category: "Bags", price: 95, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 8, name: "Casual Denim Jacket", category: "Clothing", price: 75, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
  { id: 9, name: "Polarized Sunglasses", category: "Accessories", price: 45, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" },
  { id: 10, name: "Hydrating Facial Serum", category: "Skincare", price: 35, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },
  { id: 11, name: "Pro Football Leather", category: "Sports", price: 40, image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500" },
  { id: 12, name: "Bestseller Novel Book", category: "Books", price: 20, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { id: 13, name: "Stainless Steel Chef Knife", category: "Kitchen", price: 60, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500" },
  { id: 14, name: "Wooden Building Blocks", category: "Toys & Games", price: 30, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500" },
  { id: 15, name: "18K Gold Plated Ring", category: "Jewelry", price: 150, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500" },
  { id: 16, name: "Minimalist Chronograph Watch", category: "Watches", price: 210, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500" }
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // Wishlist States
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Wishlist Toggle Function
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = productsData
    .filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 px-6 py-10 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Wishlist Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs tracking-widest text-amber-800 uppercase font-semibold mb-1">
              BROWSE
            </p>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">
              All Products
            </h1>
            <p className="text-gray-500 text-sm">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Top Wishlist Icon */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="relative flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow transition-all"
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-semibold text-sm">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-60 pl-4 pr-9 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black bg-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none bg-white text-gray-700 cursor-pointer"
            >
              <option value="default">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isLiked = wishlist.some(item => item.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Heart Button */}
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all"
                  >
                    <Heart 
                      className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600"}`} 
                    />
                  </button>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-black font-bold text-base">
                    ${product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wishlist Drawer / Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" /> My Wishlist ({wishlist.length})
                </h2>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {wishlist.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your wishlist is empty!</p>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-2 border rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-gray-500 text-xs">${item.price}</p>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="text-xs text-red-500 hover:underline px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold mt-4"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}