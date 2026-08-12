import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus, Search, CheckCircle, Home, ShoppingBag, ArrowRight } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase';

const categories = [
  "All", "Shoes", "Electronics", "Bags", "Clothing", "Sports", "Watches", "Skincare", "Books", "Kitchen", "Toys", "Games", "Jewelry"
];

// 10+ Products per category with verified HD Unsplash images
const initialProducts = [
  // --- SHOES (10 Products) ---
  { id: 101, name: "Nike Air Max Black", category: "Shoes", price: 129.99, description: "Lightweight breathable mesh running shoes.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 102, name: "Air Max Silver Sneakers", category: "Shoes", price: 139.99, description: "Metallic finish for stylish daily wear.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80" },
  { id: 103, name: "Dynamic Blue Runners", category: "Shoes", price: 119.99, description: "Eco-friendly high elasticity sports shoes.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80" },
  { id: 104, name: "Classic Retro Grey", category: "Shoes", price: 109.99, description: "Casual retro grey vintage sneakers.", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80" },
  { id: 105, name: "Brown Leather Oxfords", category: "Shoes", price: 149.99, description: "Genuine formal leather classic shoes.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80" },
  { id: 106, name: "Red Sport Endurance", category: "Shoes", price: 124.99, description: "Pro sports cushioned running sneakers.", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80" },
  { id: 107, name: "White High-Top Streetwear", category: "Shoes", price: 115.00, description: "Urban high-top stylish sneakers.", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
  { id: 108, name: "Black Slip-On Loafers", category: "Shoes", price: 89.99, description: "Comfortable easy-wear suede loafers.", image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=600&q=80" },
  { id: 109, name: "Neon Athletic Trainers", category: "Shoes", price: 134.50, description: "High impact grip training shoes.", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
  { id: 110, name: "Classic Canvas Kicks", category: "Shoes", price: 59.99, description: "All-day lightweight canvas sneakers.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },

  // --- ELECTRONICS (10 Products) ---
  { id: 201, name: "Wireless ANC Headphones", category: "Electronics", price: 199.99, description: "Active noise cancelling premium over-ear headphones.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { id: 202, name: "True Wireless Earbuds", category: "Electronics", price: 79.99, description: "Bluetooth 5.3 in-ear deep bass earbuds.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80" },
  { id: 203, name: "Portable Bass Speaker", category: "Electronics", price: 49.99, description: "Waterproof outdoor loud Bluetooth speaker.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80" },
  { id: 204, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 89.99, description: "RGB mechanical backlit tactile keyboard.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
  { id: 205, name: "Precision Wireless Mouse", category: "Electronics", price: 39.99, description: "Ergonomic high-DPI silent clicking mouse.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80" },
  { id: 206, name: "Ultra HD Action Camera", category: "Electronics", price: 149.99, description: "4K waterproof sports camera.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80" },
  { id: 207, name: "Smart Fitness Band", category: "Electronics", price: 34.99, description: "OLED heart rate & step tracker.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80" },
  { id: 208, name: "Fast Wireless Charger", category: "Electronics", price: 29.99, description: "15W qi fast charging pad.", image: "https://images.unsplash.com/photo-1622445268465-843d183d2899?auto=format&fit=crop&w=600&q=80" },
  { id: 209, name: "Studio Microphone Kit", category: "Electronics", price: 119.99, description: "USB condenser microphone for streaming.", image: "https://images.unsplash.com/photo-1590658006821-04f4008d5717?auto=format&fit=crop&w=600&q=80" },
  { id: 210, name: "Smart LED Desk Lamp", category: "Electronics", price: 44.99, description: "Dimmable eye-care touch sensor lamp.", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80" },

  // --- BAGS (10 Products) ---
  { id: 301, name: "Vintage Leather Backpack", category: "Bags", price: 89.99, description: "Waterproof brown laptop travel bag.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
  { id: 302, name: "Urban Travel Duffel", category: "Bags", price: 69.99, description: "Heavy-duty canvas weekend tote bag.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80" },
  { id: 303, name: "Classic Leather Crossbody", category: "Bags", price: 54.99, description: "Compact everyday shoulder bag.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },
  { id: 304, name: "Minimalist Tote Bag", category: "Bags", price: 39.99, description: "Eco cotton shopping handbag.", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
  { id: 305, name: "Slim Messenger Bag", category: "Bags", price: 74.99, description: "Business office laptop satchel.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" },
  { id: 306, name: "Tactical Hiking Rucksack", category: "Bags", price: 99.99, description: "Large capacity camping backpack.", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80" },
  { id: 307, name: "Designer Clutch Purse", category: "Bags", price: 119.99, description: "Elegant evening handbag.", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80" },
  { id: 308, name: "Sport Gym Sackpack", category: "Bags", price: 24.99, description: "Lightweight drawstring gym bag.", image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=600&q=80" },
  { id: 309, name: "Anti-Theft Laptop Bag", category: "Bags", price: 84.99, description: "USB charging port commuter bag.", image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=600&q=80" },
  { id: 310, name: "Leather Travel Wallet", category: "Bags", price: 34.99, description: "RFID blocking passport holder.", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },

  // --- CLOTHING (10 Products) ---
  { id: 401, name: "Classic Denim Jacket", category: "Clothing", price: 69.99, description: "Rugged vintage blue cotton denim.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
  { id: 402, name: "Black Cotton Hoodie", category: "Clothing", price: 49.99, description: "Soft fleece heavy drawstring hoodie.", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
  { id: 403, name: "Slim Fit Crewneck T-Shirt", category: "Clothing", price: 24.99, description: "100% organic soft cotton t-shirt.", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },
  { id: 404, name: "Casual Flannel Shirt", category: "Clothing", price: 39.99, description: "Plaid button-down warm winter shirt.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
  { id: 405, name: "Tailored Blazer Jacket", category: "Clothing", price: 129.99, description: "Formal classic suit jacket.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
  { id: 406, name: "Athletic Sweatpants", category: "Clothing", price: 44.99, description: "Comfortable jogger pants with pockets.", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80" },
  { id: 407, name: "Winter Puffer Coat", category: "Clothing", price: 139.99, description: "Insulated windproof winter coat.", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80" },
  { id: 408, name: "Chino Dress Trousers", category: "Clothing", price: 54.99, description: "Smart casual stretch cotton pants.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80" },
  { id: 409, name: "Summer Linen Shirt", category: "Clothing", price: 45.00, description: "Breathable light linen polo.", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80" },
  { id: 410, name: "Graphic Streetwear Tee", category: "Clothing", price: 29.99, description: "Oversized printed urban t-shirt.", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80" },

  // --- SPORTS (10 Products) ---
  { id: 501, name: "Professional Football", category: "Sports", price: 34.99, description: "FIFA standard stitched match ball.", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=600&q=80" },
  { id: 502, name: "Pro Basketball", category: "Sports", price: 39.99, description: "Official indoor/outdoor grip basketball.", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80" },
  { id: 503, name: "Carbon Tennis Racket", category: "Sports", price: 119.99, description: "Lightweight high power tennis racket.", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80" },
  { id: 504, name: "Non-Slip Yoga Mat", category: "Sports", price: 29.99, description: "6mm extra thick cushioned fitness mat.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80" },
  { id: 505, name: "Adjustable Dumbbells Set", category: "Sports", price: 149.99, description: "Heavy duty gym weight set.", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80" },
  { id: 506, name: "Boxing Training Gloves", category: "Sports", price: 49.99, description: "Pro padded wrist support gloves.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80" },
  { id: 507, name: "Speed Jump Rope", category: "Sports", price: 14.99, description: "Tangle-free cardio training rope.", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80" },
  { id: 508, name: "Resistance Fitness Bands", category: "Sports", price: 19.99, description: "Set of 5 elastic exercise loop bands.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" },
  { id: 509, name: "Cycling Safety Helmet", category: "Sports", price: 44.99, description: "Aerodynamic ventilated road helmet.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80" },
  { id: 510, name: "Hydration Sports Bottle", category: "Sports", price: 18.99, description: "BPA-free 1L leakproof water bottle.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },

  // --- WATCHES (10 Products) ---
  { id: 601, name: "Smart Watch Series X", category: "Watches", price: 149.99, description: "AMOLED fitness & heart rate tracker.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
  { id: 602, name: "Classic Leather Analog", category: "Watches", price: 89.99, description: "Vintage brown leather strap watch.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" },
  { id: 603, name: "Luxury Gold Chronograph", category: "Watches", price: 219.99, description: "Stainless steel metallic luxury watch.", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80" },
  { id: 604, name: "Minimalist Black Mesh", category: "Watches", price: 79.99, description: "Sleek ultra-thin wrist watch.", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80" },
  { id: 605, name: "Tactical Military Sports", category: "Watches", price: 59.99, description: "Shockproof digital backlight watch.", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80" },
  { id: 606, name: "Silver Diver Automatic", category: "Watches", price: 189.99, description: "200m waterproof mechanical watch.", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=600&q=80" },
  { id: 607, name: "Rose Gold Quartz", category: "Watches", price: 110.00, description: "Elegant crystal dial women watch.", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80" },
  { id: 608, name: "Retro Digital Classic", category: "Watches", price: 34.99, description: "Vintage steel digital alarm watch.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80" },
  { id: 609, name: "Titanium Solar Watch", category: "Watches", price: 249.99, description: "Solar powered durable watch.", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80" },
  { id: 610, name: "Smart Fitness Watch Lite", category: "Watches", price: 69.99, description: "Slim fitness smartwatch.", image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=600&q=80" },

  // --- SKINCARE (10 Products) ---
  { id: 701, name: "Hydrating Facial Cream", category: "Skincare", price: 24.99, description: "Deep moisture hyaluronic acid cream.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
  { id: 702, name: "Vitamin C Brightening Serum", category: "Skincare", price: 32.99, description: "Glow boosting facial oil serum.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
  { id: 703, name: "Gentle Foam Cleanser", category: "Skincare", price: 18.99, description: "Soothing face wash cleanser.", image: "https://images.unsplash.com/photo-1556228722-d11925b6a71e?auto=format&fit=crop&w=600&q=80" },
  { id: 704, name: "SPF 50 Sunscreen", category: "Skincare", price: 22.50, description: "Non-greasy UV protection lotion.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80" },
  { id: 705, name: "Exfoliating Scrub", category: "Skincare", price: 19.99, description: "Natural pore refining scrub.", image: "https://images.unsplash.com/photo-1608248597261-83325803d450?auto=format&fit=crop&w=600&q=80" },
  { id: 706, name: "Rose Water Toner", category: "Skincare", price: 15.99, description: "Refreshing botanical facial mist.", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80" },
  { id: 707, name: "Charcoal Face Mask", category: "Skincare", price: 16.99, description: "Deep detoxifying clay mask.", image: "https://images.unsplash.com/photo-1567928256511-0fd5051a0682?auto=format&fit=crop&w=600&q=80" },
  { id: 708, name: "Eye Repair Gel", category: "Skincare", price: 28.00, description: "Anti-dark circle cooling gel.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80" },
  { id: 709, name: "Organic Aloe Lotion", category: "Skincare", price: 14.50, description: "Pure aloe soothing body lotion.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
  { id: 710, name: "Nourishing Night Balm", category: "Skincare", price: 34.99, description: "Overnight intense repair butter.", image: "https://images.unsplash.com/photo-1512290900676-26c2a4d4b51b?auto=format&fit=crop&w=600&q=80" },

  // --- BOOKS (10 Products) ---
  { id: 801, name: "Hardcover Sci-Fi Epic", category: "Books", price: 19.99, description: "Space adventure best-selling fiction.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
  { id: 802, name: "Modern Code & Tech Guide", category: "Books", price: 29.99, description: "Full-stack web developer handbook.", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80" },
  { id: 803, name: "Mindset & Productivity", category: "Books", price: 16.99, description: "Personal development best seller.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" },
  { id: 804, name: "Mystery Crime Thriller", category: "Books", price: 18.50, description: "Gripping detective investigation novel.", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80" },
  { id: 805, name: "World History Encyclopedia", category: "Books", price: 35.00, description: "Illustrated hardcover history guide.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80" },
  { id: 806, name: "Gourmet Cookbook Collection", category: "Books", price: 24.99, description: "100+ chef recipes step-by-step.", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80" },
  { id: 807, name: "Fantasy World Chronicles", category: "Books", price: 22.99, description: "Magical epic story series.", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80" },
  { id: 808, name: "Financial Freedom 101", category: "Books", price: 21.00, description: "Smart investing strategies.", image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80" },
  { id: 809, name: "Creative Art & Sketching", category: "Books", price: 17.99, description: "Drawing techniques manual.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80" },
  { id: 810, name: "Inspiring Poetry Poems", category: "Books", price: 14.99, description: "Collection of modern literature poems.", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80" },

  // --- KITCHEN (10 Products) ---
  { id: 901, name: "Stainless Steel Flask", category: "Kitchen", price: 22.99, description: "1000ml vacuum thermal water bottle.", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80" },
  { id: 902, name: "Barista Espresso Maker", category: "Kitchen", price: 129.99, description: "Manual Italian coffee maker.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
  { id: 903, name: "Non-Stick Frying Pan", category: "Kitchen", price: 34.99, description: "Ceramic granite cookware pan.", image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&w=600&q=80" },
  { id: 904, name: "Chef Knife Set", category: "Kitchen", price: 59.99, description: "Ultra sharp stainless steel Japanese knives.", image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80" },
  { id: 905, name: "Electric Smoothie Blender", category: "Kitchen", price: 49.99, description: "High speed personal blender.", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80" },
  { id: 906, name: "Bamboo Cutting Board", category: "Kitchen", price: 19.99, description: "Natural antibacterial chopping board.", image: "https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?auto=format&fit=crop&w=600&q=80" },
  { id: 907, name: "Glass Storage Containers", category: "Kitchen", price: 29.99, description: "Airtight meal prep container set.", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80" },
  { id: 908, name: "Cast Iron Dutch Oven", category: "Kitchen", price: 89.99, description: "Heavy enamel cooking pot.", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
  { id: 909, name: "Digital Kitchen Scale", category: "Kitchen", price: 15.99, description: "Precision food measurement scale.", image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=600&q=80" },
  { id: 910, name: "Ceramic Tea Mug Set", category: "Kitchen", price: 24.99, description: "Set of 4 handcrafted tea coffee cups.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },

  // --- TOYS (10 Products) ---
  { id: 1001, name: "Creative Building Bricks", category: "Toys", price: 39.99, description: "Block construction creative set.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80" },
  { id: 1002, name: "RC High-Speed Stunt Car", category: "Toys", price: 34.99, description: "Remote control 360 flip racing car.", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80" },
  { id: 1003, name: "Plush Soft Teddy Bear", category: "Toys", price: 19.99, description: "Ultra soft washable stuffed plush toy.", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80" },
  { id: 1004, name: "Wooden Educational Puzzle", category: "Toys", price: 14.99, description: "Montessori learning shape puzzle.", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80" },
  { id: 1005, name: "Mini Quadcopter Drone", category: "Toys", price: 49.99, description: "Easy fly beginner drone with lights.", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80" },
  { id: 1006, name: "Kids Drawing Tablet", category: "Toys", price: 21.99, description: "LCD digital doodle pad.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80" },
  { id: 1007, name: "Die-Cast Race Track", category: "Toys", price: 29.99, description: "Multiple track speed loop set.", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80" },
  { id: 1008, name: "Doll House Furniture Set", category: "Toys", price: 45.00, description: "Miniature wooden playhouse kit.", image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&w=600&q=80" },
  { id: 1009, name: "Action Robot Warrior", category: "Toys", price: 27.99, description: "Sound and light interactive robot.", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" },
  { id: 1010, name: "Outdoor Bubble Blower", category: "Toys", price: 16.99, description: "Automatic bubble machine gun.", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80" },

  // --- GAMES (10 Products) ---
  { id: 1101, name: "Speed Rubik's Cube 3x3", category: "Games", price: 14.99, description: "Smooth rotating brain puzzle cube.", image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80" },
  { id: 1102, name: "Wooden Chess Set", category: "Games", price: 39.99, description: "Handcrafted magnetic folding board.", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80" },
  { id: 1103, name: "Strategy Board Game", category: "Games", price: 44.99, description: "Multiplayer family strategy game.", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80" },
  { id: 1104, name: "Pro Gaming Wireless Controller", category: "Games", price: 59.99, description: "Vibration feedback gamepad.", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80" },
  { id: 1105, name: "Tabletop Foosball", category: "Games", price: 34.99, description: "Mini portable arcade soccer table.", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
  { id: 1106, name: "Classic Playing Cards", category: "Games", price: 9.99, description: "Waterproof plastic poker deck.", image: "https://images.unsplash.com/photo-1541278107931-e006523892df?auto=format&fit=crop&w=600&q=80" },
  { id: 1107, name: "Darts Board Game", category: "Games", price: 29.99, description: "Safety magnetic dartboard set.", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80" },
  { id: 1108, name: "VR Headset Goggles", category: "Games", price: 99.99, description: "3D virtual reality immersive gaming mask.", image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80" },
  { id: 1109, name: "Tumbling Tower Blocks", category: "Games", price: 18.99, description: "Stacking wooden block game.", image: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=600&q=80" },
  { id: 1110, name: "Arcade Handheld Console", category: "Games", price: 29.99, description: "500 retro 8-bit classic games.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" },

  // --- JEWELRY (10 Products) ---
  { id: 1201, name: "Silver Pendant Necklace", category: "Jewelry", price: 45.00, description: "Sterling silver chain with crystal pendant.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
  { id: 1202, name: "Gold Plated Hoop Earrings", category: "Jewelry", price: 35.00, description: "Hypoallergenic elegant metallic hoops.", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80" },
  { id: 1203, name: "Diamond Accent Solitaire Ring", category: "Jewelry", price: 149.99, description: "Classic engagement style ring.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
  { id: 1204, name: "Pearl Charm Bracelet", category: "Jewelry", price: 49.99, description: "Handcrafted freshwater pearl bracelet.", image: "https://images.unsplash.com/photo-1611591475155-4284fa289351?auto=format&fit=crop&w=600&q=80" },
  { id: 1205, name: "Men Stainless Steel Bangle", category: "Jewelry", price: 29.99, description: "Minimalist titanium cuff bracelet.", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80" },
  { id: 1206, name: "Gemstone Vintage Brooch", category: "Jewelry", price: 39.99, description: "Emerald green crystal pin brooch.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
  { id: 1207, name: "Layered Gold Choker", category: "Jewelry", price: 38.00, description: "Trendy multi-strand chain necklace.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80" },
  { id: 1208, name: "Sapphire Drop Earrings", category: "Jewelry", price: 89.99, description: "Deep blue stone dangle earrings.", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=80" },
  { id: 1209, name: "Rose Gold Adjustable Ring", category: "Jewelry", price: 32.50, description: "Contemporary geometric ring.", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80" },
  { id: 1210, name: "Leather Cord Pendant", category: "Jewelry", price: 22.00, description: "Unisex casual tribe pendant.", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80" }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Default to All
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Sign in failed! Make sure your domain is added in Firebase Authorized Domains.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <button 
          onClick={() => { setCurrentPage('home'); }} 
          className="text-xl font-bold tracking-wider uppercase focus:outline-none hover:text-gray-300 transition"
        >
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'home' ? 'text-amber-400 font-bold underline' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button 
            onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }} 
            className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'products' ? 'text-amber-400 font-bold underline' : ''}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button onClick={() => setCurrentPage('wishlist')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'wishlist' ? 'text-amber-400 font-bold underline' : ''}`}>
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current text-red-500' : ''}`} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button onClick={() => setCurrentPage('cart')} className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'cart' ? 'text-amber-400 font-bold underline' : ''}`}>
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>

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

      <main className="max-w-7xl mx-auto py-8 px-6">
        {currentPage === 'home' && (
          <div className="space-y-12">
            <div className="relative bg-slate-900 text-white rounded-3xl p-8 md:p-16 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 z-10 space-y-4">
                <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Welcome To Jawad Khan Store
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-tight">
                  Discover Quality Products Everyday
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  Explore our massive catalog with 100+ items across all categories.
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
          </div>
        )}

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

            {/* Search Box & Sorting */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search products..."
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

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm font-medium">No products found!</p>
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

        {currentPage === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
            {isPaid ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-green-200 shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
                <button onClick={() => { setIsPaid(false); setCart([]); setCurrentPage('products'); }} className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-semibold text-xs">
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
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
                  <div className="flex justify-between text-sm font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>

                  <form onSubmit={handleProcessOrder} className="space-y-4">
                    <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-lg text-xs transition mt-4">
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

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