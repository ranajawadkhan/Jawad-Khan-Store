import React, { useState } from 'react';
import { Heart, Search, X } from 'lucide-react';

// Main Categories & Sub-Types Mapping
const categoryTypesMap = {
  All: ["All Types"],
  Shoes: ["All Shoes", "Running", "Sneakers", "Formal", "Boots"],
  Clothing: ["All Clothing", "Jackets", "Hoodies", "T-Shirts", "Shirts"],
  Electronics: ["All Electronics", "Headphones", "Audio", "Accessories"],
  Watches: ["All Watches", "Smartwatches", "Chronograph", "Classic"],
  Bags: ["All Bags", "Backpacks", "Travel", "Handbags"],
  Accessories: ["All Accessories", "Eyewear", "Jewelry", "Belts"]
};

const productsData = [
  // SHOES TYPES
  { id: 1, name: "Nike Black Air Running Shoes", category: "Shoes", type: "Running", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 2, name: "Metallic Silver Urban Sneakers", category: "Shoes", type: "Sneakers", price: 135, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500" },
  { id: 3, name: "Blue Sport Athletic Trainers", category: "Shoes", type: "Running", price: 110, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
  { id: 4, name: "Classic Grey Air Max Sneakers", category: "Shoes", type: "Sneakers", price: 145, image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
  { id: 5, name: "Premium Leather Formal Shoes", category: "Shoes", type: "Formal", price: 160, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500" },
  { id: 6, name: "High-Cut Leather Outdoor Boots", category: "Shoes", type: "Boots", price: 180, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500" },

  // CLOTHING TYPES
  { id: 7, name: "Casual Blue Denim Jacket", category: "Clothing", type: "Jackets", price: 75, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
  { id: 8, name: "Black Genuine Leather Jacket", category: "Clothing", type: "Jackets", price: 195, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 9, name: "Cozy Fleece Winter Hoodie", category: "Clothing", type: "Hoodies", price: 55, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
  { id: 10, name: "Minimalist Plain White T-Shirt", category: "Clothing", type: "T-Shirts", price: 25, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
  { id: 11, name: "Cotton Casual Button-Down Shirt", category: "Clothing", type: "Shirts", price: 45, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },

  // WATCHES TYPES
  { id: 12, name: "Smart Fitness Tracker Watch", category: "Watches", type: "Smartwatches", price: 199, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 13, name: "Minimalist Steel Chronograph Watch", category: "Watches", type: "Chronograph", price: 210, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500" },

  // ELECTRONICS TYPES
  { id: 14, name: "Over-Ear Wireless Headphones", category: "Electronics", type: "Headphones", price: 85, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },

  // BAGS & ACCESSORIES TYPES
  { id: 15, name: "Vintage Brown Leather Backpack", category: "Bags", type: "Backpacks", price: 95, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 16, name: "Classic Polarized Sunglasses", category: "Accessories", type: "Eyewear", price: 45, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" }
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All Types");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // Wishlist States
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Handle Main Category Change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveType(categoryTypesMap[category]?.[0] || "All Types");
  };

  // Toggle Wishlist Function
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Filter Products Logic (Category + SubType + Search)
  const filteredProducts = productsData
    .filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesType = 
        activeType === "All Types" || 
        activeType.startsWith("All") || 
        product.type === activeType;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 px-6 py-10 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs tracking-widest text-amber-800 uppercase font-semibold mb-1">
              BROWSE CATALOG
            </p>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">
              All Products
            </h1>
            <p className="text-gray-500 text-sm">
              {filteredProducts.length} items found
            </p>
          </div>

          {/* Wishlist Button */}
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

        {/* Level 1: Main Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(categoryTypesMap).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level 2: Sub-Category / Types Filter Bar */}
        {categoryTypesMap[activeCategory] && categoryTypesMap[activeCategory].length > 1 && (
          <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-2.5 rounded-2xl mb-6">
            <span className="text-xs font-bold text-gray-500 px-2 uppercase tracking-wider">Types:</span>
            {categoryTypesMap[activeCategory].map((subType) => (
              <button
                key={subType}
                onClick={() => setActiveType(subType)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  activeType === subType
                    ? "bg-amber-800 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {subType}
              </button>
            ))}
          </div>
        )}

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 pl-4 pr-9 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none bg-white text-gray-700 cursor-pointer"
          >
            <option value="default">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
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
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded">
                      {product.type}
                    </span>
                    <span className="text-xs text-gray-400">{product.category}</span>
                  </div>
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No products found matching the selected type or search filter.
          </div>
        )}
      </div>

      {/* Wishlist Drawer */}
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

              <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {wishlist.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your wishlist is empty!</p>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-2 border rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-amber-800 font-medium">{item.type}</p>
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