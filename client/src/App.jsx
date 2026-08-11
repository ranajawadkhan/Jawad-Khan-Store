import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus, Search, CheckCircle, CreditCard, DollarSign, Home } from 'lucide-react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

const categories = [
  "All", "Shoes", "Electronics", "Bags", "Clothing", "Sports", "Watches", "Skincare", "Books", "Kitchen", "Toys", "Games", "Jewelry"
];

const initialProducts = [
  // --- SHOES (10 Types) ---
  { id: 101, name: "Nike Air Max Stealth Black", category: "Shoes", price: 129.99, description: "Running Shoes - Lightweight breathable mesh.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 102, name: "Air Max Metallic Silver", category: "Shoes", price: 139.99, description: "Sneakers - Metallic finish for daily wear.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500" },
  { id: 103, name: "Electric Blue Dynamic Runners", category: "Shoes", price: 119.99, description: "Sports Shoes - Eco-friendly high elasticity.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
  { id: 104, name: "Classic Grey Retro Edition", category: "Shoes", price: 109.99, description: "Casual Shoes - Retro grey vintage design.", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
  { id: 105, name: "Premium Brown Leather Oxford", category: "Shoes", price: 149.99, description: "Formal Shoes - Genuine leather classic oxfords.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500" },
  { id: 106, name: "High-Top Leather Ankle Boots", category: "Shoes", price: 159.99, description: "Boots - Rugged leather outdoor boots.", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500" },
  { id: 107, name: "Suede Slip-On Loafers", category: "Shoes", price: 89.99, description: "Loafers - Soft suede comfortable slip-ons.", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500" },
  { id: 108, name: "Pro Court Basketball High-Tops", category: "Shoes", price: 134.99, description: "Basketball Shoes - Ankle support rubber sole.", image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500" },
  { id: 109, name: "Lightweight Trail Hiking Shoes", category: "Shoes", price: 124.99, description: "Hiking Shoes - Waterproof grip for terrains.", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500" },
  { id: 110, name: "Summer Canvas Skate Shoes", category: "Shoes", price: 49.99, description: "Canvas Shoes - Low-top daily casual wear.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500" },

  // --- SPORTS (10 Types) ---
  { id: 201, name: "Professional Match Football", category: "Sports", price: 34.99, description: "Football - FIFA standard stitched ball.", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500" },
  { id: 202, name: "English Willow Cricket Bat", category: "Sports", price: 149.99, description: "Cricket - Grade 1 English Willow professional bat.", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500" },
  { id: 203, name: "Indoor/Outdoor Basketball", category: "Sports", price: 29.99, description: "Basketball - High grip composite leather.", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500" },
  { id: 204, name: "Carbon Fiber Tennis Racket", category: "Sports", price: 89.99, description: "Tennis - Lightweight powerful string frame.", image: "https://images.unsplash.com/photo-1617083934555-56321683938f?w=500" },
  { id: 205, name: "Professional Volleyball", category: "Sports", price: 24.99, description: "Volleyball - Soft touch tournament grade ball.", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500" },
  { id: 206, name: "Badminton Racket Set with Shuttlecocks", category: "Sports", price: 39.99, description: "Badminton - Twin pack lightweight rackets.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500" },
  { id: 207, name: "Rubber Hex Dumbbell Pair (10kg)", category: "Sports", price: 59.99, description: "Gym / Fitness - Non-slip cast iron dumbbells.", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
  { id: 208, name: "Non-Slip Yoga & Exercise Mat", category: "Sports", price: 22.99, description: "Yoga - Extra thick high-density cushion mat.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500" },
  { id: 209, name: "Table Tennis Bat & Ball Kit", category: "Sports", price: 27.99, description: "Table Tennis - 2 Paddles with 3 tournament balls.", image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500" },
  { id: 210, name: "Speed Boxing Gloves 12oz", category: "Sports", price: 44.99, description: "Boxing - Synthetic leather padded gloves.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500" },

  // --- ELECTRONICS (10 Types) ---
  { id: 301, name: "Wireless ANC Headphones", category: "Electronics", price: 99.99, description: "Headphones - Active noise cancelling over-ear.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 302, name: "Smart Earbuds Pro", category: "Electronics", price: 59.99, description: "Earbuds - True wireless Bluetooth 5.3 in-ear.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500" },
  { id: 303, name: "Portable Bluetooth Speaker", category: "Electronics", price: 49.99, description: "Speakers - Waterproof bass-boosted speaker.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
  { id: 304, name: "Mechanical Gaming Keyboard RGB", category: "Electronics", price: 79.99, description: "Computer - Blue switch backlight keyboard.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" },
  { id: 305, name: "Ergonomic Wireless Mouse", category: "Electronics", price: 29.99, description: "Computer Accessories - Silent click optical mouse.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" },
  { id: 306, name: "1080p HD Webcam with Mic", category: "Electronics", price: 39.99, description: "Cameras - Auto focus widescreen streaming webcam.", image: "https://images.unsplash.com/photo-1587826080691-7235718732de?w=500" },
  { id: 307, name: "Fast Charging Power Bank 20000mAh", category: "Electronics", price: 34.99, description: "Power - Dual USB quick charge power bank.", image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500" },
  { id: 308, name: "4K Action Camera Waterproof", category: "Electronics", price: 119.99, description: "Cameras - Ultra HD helmet mount sport cam.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500" },
  { id: 309, name: "USB-C Multiport Docking Station", category: "Electronics", price: 45.99, description: "Adapters - 7-in-1 HDMI SD reader hub.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
  { id: 310, name: "Wireless Fast Charger Pad", category: "Electronics", price: 19.99, description: "Chargers - 15W Qi certified charging pad.", image: "https://images.unsplash.com/photo-1622445268121-da11d2b63941?w=500" },

  // --- CLOTHING (10 Types) ---
  { id: 401, name: "Classic Denim Jacket", category: "Clothing", price: 69.99, description: "Jackets - Rugged vintage blue cotton denim.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 402, name: "Organic Cotton Black Hoodie", category: "Clothing", price: 49.99, description: "Hoodies - Soft fleece heavy drawstring hoodie.", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
  { id: 403, name: "Slim Fit Crewneck T-Shirt", category: "Clothing", price: 19.99, description: "T-Shirts - 100% breathable pure cotton t-shirt.", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
  { id: 404, name: "Casual Oxford Button-Down Shirt", category: "Clothing", price: 39.99, description: "Shirts - Formal & semi-casual white shirt.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
  { id: 405, name: "Stretch Slim Fit Jeans", category: "Clothing", price: 54.99, description: "Jeans - Dark blue comfortable stretch denim.", image: "https://images.unsplash.com/photo-1542272604-780c36856d60?w=500" },
  { id: 406, name: "Fleece Tracksuits Joggers", category: "Clothing", price: 34.99, description: "Trousers - Athletic gym workout sweatpants.", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500" },
  { id: 407, name: "Winter Puffer Jacket", category: "Clothing", price: 99.99, description: "Coats - Warm insulated windproof coat.", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500" },
  { id: 408, name: "Summer Casual Polo Shirt", category: "Clothing", price: 29.99, description: "Polos - Collared short sleeve polo tee.", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500" },
  { id: 409, name: "Cotton Chino Shorts", category: "Clothing", price: 24.99, description: "Shorts - Breathable summer stretch shorts.", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
  { id: 410, name: "Tailored Formal Suit Blazer", category: "Clothing", price: 129.99, description: "Blazers - Elegant double-button formal blazer.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500" },

  // --- BAGS (10 Types) ---
  { id: 501, name: "Leather Laptop Backpack", category: "Bags", price: 79.99, description: "Backpacks - Waterproof vintage brown leather bag.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 502, name: "Casual Crossbody Sling Bag", category: "Bags", price: 39.99, description: "Sling Bags - Chest pouch bag for essentials.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
  { id: 503, name: "Canvas Travel Duffel Bag", category: "Bags", price: 59.99, description: "Duffel Bags - Heavy duty gym & weekend carry bag.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 504, name: "Women Leather Shoulder Tote Bag", category: "Bags", price: 69.99, description: "Totes - Spacious handbag with zip closure.", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
  { id: 505, name: "Hiking Outdoor Rucksack 50L", category: "Bags", price: 89.99, description: "Hiking Backpacks - Large capacity camping bag.", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500" },
  { id: 506, name: "Slim Leather Messenger Bag", category: "Bags", price: 64.99, description: "Messenger Bags - Office briefcase laptop shoulder bag.", image: "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=500" },
  { id: 507, name: "Waterproof Waist Fanny Pack", category: "Bags", price: 19.99, description: "Waist Bags - Travel pouch belt bag.", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500" },
  { id: 508, name: "Hard Shell Suitcase Carry-On", category: "Bags", price: 119.99, description: "Luggage - 360 spinner wheel trolley suitcase.", image: "https://images.unsplash.com/photo-1565026057447-b88efe82abb1?w=500" },
  { id: 509, name: "Insulated Lunch Cooler Bag", category: "Bags", price: 18.99, description: "Cooler Bags - Thermal insulated food storage bag.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500" },
  { id: 510, name: "Drawstring Gym Sackpack", category: "Bags", price: 14.99, description: "Drawstring - Lightweight sport shoe pouch bag.", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500" },

  // --- WATCHES (10 Types) ---
  { id: 601, name: "Smart Watch Series X", category: "Watches", price: 149.99, description: "Smartwatches - AMOLED heart rate fitness watch.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 602, name: "Minimalist Leather Chronograph", category: "Watches", price: 89.99, description: "Leather Watches - Analog classic brown leather watch.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500" },
  { id: 603, name: "Stainless Steel Silver Automatic", category: "Watches", price: 199.99, description: "Automatic Watches - Premium metallic wrist watch.", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500" },
  { id: 604, name: "Digital Sports Shock Watch", category: "Watches", price: 39.99, description: "Digital Watches - Waterproof alarm backlight watch.", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500" },
  { id: 605, name: "Luxury Rose Gold Quartz Watch", category: "Watches", price: 129.99, description: "Dress Watches - Elegant mesh band watch.", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500" },
  { id: 606, name: "Tactical Military Field Watch", category: "Watches", price: 69.99, description: "Field Watches - Heavy nylon strap rugged watch.", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500" },
  { id: 607, name: "Minimalist Black Matte Mesh Watch", category: "Watches", price: 79.99, description: "Casual Watches - All-black sleek dial watch.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" },
  { id: 608, name: "Classic Pocket Watch Antique", category: "Watches", price: 49.99, description: "Pocket Watches - Vintage bronze chain watch.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" },
  { id: 609, name: "Fitness Tracker Slim Band", category: "Watches", price: 34.99, description: "Fitness Bands - Step counter sleep monitor band.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500" },
  { id: 610, name: "Diver Style Waterproof Watch 200m", category: "Watches", price: 169.99, description: "Diving Watches - Rotating bezel luminescence watch.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },

  // --- SKINCARE (10 Types) ---
  { id: 801, name: "Hydrating Facial Moisturizer", category: "Skincare", price: 24.99, description: "Moisturizers - Deep moisture hyaluronic cream.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500" },
  { id: 802, name: "Vitamin C Brightening Serum", category: "Skincare", price: 29.99, description: "Serums - Anti-aging dark spot serum.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },
  { id: 803, name: "Gentle Foaming Face Wash", category: "Skincare", price: 16.99, description: "Cleansers - Daily deep pore face cleanser.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500" },
  { id: 804, name: "SPF 50 Sunscreen Lotion", category: "Skincare", price: 19.99, description: "Sunscreen - Non-greasy UV protector lotion.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500" },
  { id: 805, name: "Exfoliating Scrub Wash", category: "Skincare", price: 18.99, description: "Scrubs - Natural walnut dead skin scrub.", image: "https://images.unsplash.com/photo-1567928256094-1a3eb32e1f2b?w=500" },
  { id: 806, name: "Hydrating Sheet Mask Pack (5 Pcs)", category: "Skincare", price: 14.99, description: "Face Masks - Glow nourishing sheet masks.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500" },
  { id: 807, name: "Dark Circle Eye Cream", category: "Skincare", price: 22.99, description: "Eye Care - Anti-puffiness repair gel.", image: "https://images.unsplash.com/photo-1608248597261-8f336a6bc382?w=500" },
  { id: 808, name: "Organic Rose Water Toner", category: "Skincare", price: 12.99, description: "Toners - Natural skin balancing facial spray.", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500" },
  { id: 809, name: "Nourishing Night Repair Cream", category: "Skincare", price: 34.99, description: "Night Cream - Overnight skin barrier moisturizer.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500" },
  { id: 810, name: "Organic Lip Balm Mint & Honey", category: "Skincare", price: 6.99, description: "Lip Care - Dry cracked lips hydration stick.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },

  // --- BOOKS (10 Types) ---
  { id: 901, name: "Hardcover Sci-Fi Novel", category: "Books", price: 19.99, description: "Fiction - Space adventure epic story book.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { id: 902, name: "Mastering Full-Stack Web Development", category: "Books", price: 39.99, description: "Technology - Complete MERN stack coding guide.", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500" },
  { id: 903, name: "Self-Discipline & Productivity Mindset", category: "Books", price: 15.99, description: "Self-Help - Personal growth bestselling book.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { id: 904, name: "World History: Ancient to Modern", category: "Books", price: 29.99, description: "History - Illustrated hardcover history encyclopedia.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500" },
  { id: 905, name: "The Art of Business Management", category: "Books", price: 24.99, description: "Business - Entrepreneurship and leadership guide.", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500" },
  { id: 906, name: "Gourmet International Cookbook", category: "Books", price: 22.99, description: "Cooking - 100+ easy delicious recipes book.", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500" },
  { id: 907, name: "Classic Mystery Thriller Detective", category: "Books", price: 12.99, description: "Crime Fiction - Suspense novel softcover.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { id: 908, name: "Mindfulness & Meditation Daily Journal", category: "Books", price: 14.99, description: "Journals - Guided notebook for daily reflections.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { id: 909, name: "Illustrated Children Story Book", category: "Books", price: 11.99, description: "Kids Books - Bedtime colorful animal tales.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },
  { id: 910, name: "Modern Graphic Design Handbook", category: "Books", price: 34.99, description: "Design - UI/UX and typography visual book.", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500" },

  // --- KITCHEN (10 Types) ---
  { id: 1001, name: "Stainless Steel Coffee Thermos", category: "Kitchen", price: 22.99, description: "Bottles - Insulated vacuum flask 1000ml.", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500" },
  { id: 1002, name: "Non-Stick Ceramic Frying Pan", category: "Kitchen", price: 34.99, description: "Cookware - Scratch resistant induction skillet.", image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=500" },
  { id: 1003, name: "Electric Espresso Coffee Maker", category: "Kitchen", price: 89.99, description: "Appliances - High pressure Italian coffee brewer.", image: "https://images.unsplash.com/photo-1517668808822-9e4288246ede?w=500" },
  { id: 1004, name: "Japanese Chef Knife 8-Inch", category: "Kitchen", price: 45.99, description: "Cutlery - Razor sharp high carbon steel knife.", image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500" },
  { id: 1005, name: "High-Speed Countertop Blender", category: "Kitchen", price: 69.99, description: "Appliances - Smoothie maker and ice crusher.", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500" },
  { id: 1006, name: "Digital Air Fryer 5L", category: "Kitchen", price: 99.99, description: "Appliances - Oil-free healthy hot air oven.", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500" },
  { id: 1007, name: "Natural Bamboo Cutting Board", category: "Kitchen", price: 19.99, description: "Prep Utensils - Extra thick chopping board.", image: "https://images.unsplash.com/photo-1590794056226-77ef3a429598?w=500" },
  { id: 1008, name: "Silicone Cooking Utensil Set (12 Pcs)", category: "Kitchen", price: 27.99, description: "Utensils - Heat resistant spatulas and spoons.", image: "https://images.unsplash.com/photo-1590794056226-77ef3a429598?w=500" },
  { id: 1009, name: "Glass Meal Prep Food Containers (5 Pack)", category: "Kitchen", price: 31.99, description: "Storage - Airtight leak-proof glass boxes.", image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500" },
  { id: 1010, name: "Stainless Steel Electric Kettle 1.7L", category: "Kitchen", price: 29.99, description: "Appliances - Quick boil automatic shutoff kettle.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=500" },

  // --- TOYS (10 Types) ---
  { id: 1101, name: "Classic Building Bricks Set (500 Pcs)", category: "Toys", price: 39.99, description: "Building Toys - Creative block construction kit.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500" },
  { id: 1102, name: "Remote Control High-Speed Off-Road Car", category: "Toys", price: 49.99, description: "RC Toys - 4WD rechargeable monster truck.", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500" },
  { id: 1103, name: "Soft Plush Teddy Bear 12-Inch", category: "Toys", price: 16.99, description: "Plush - Ultra soft cuddly stuffed animal toy.", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500" },
  { id: 1104, name: "HD Camera Mini Quadcopter Drone", category: "Toys", price: 79.99, description: "Drones - Easy fly foldable beginner drone.", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500" },
  { id: 1105, name: "Educational Science Microscope Kit", category: "Toys", price: 34.99, description: "STEM Toys - Beginner lab microscope for kids.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500" },
  { id: 1106, name: "Water Blaster Squirt Gun", category: "Toys", price: 12.99, description: "Outdoor Toys - Summer pool beach water toy.", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500" },
  { id: 1107, name: "Mini Indoor Basketball Hoop Set", category: "Toys", price: 21.99, description: "Indoor Play - Over the door mini basket hoop.", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500" },
  { id: 1108, name: "Die-Cast Race Car Collection (5 Pack)", category: "Toys", price: 18.99, description: "Vehicles - Metallic mini racing cars set.", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500" },
  { id: 1109, name: "Interactive Robot Toy with Lights & Sound", category: "Toys", price: 29.99, description: "Electronic Toys - Dancing programmable robot.", image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500" },
  { id: 1110, name: "Kids Wooden Musical Xylophone", category: "Toys", price: 15.99, description: "Musical Toys - Rainbow colored sound instrument.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },

  // --- GAMES (10 Types) ---
  { id: 1201, name: "Speed Rubik's Cube 3x3", category: "Games", price: 14.99, description: "Puzzles - Smooth rotating brain puzzle cube.", image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500" },
  { id: 1202, name: "Wooden Chess Set Board Game", category: "Games", price: 29.99, description: "Board Games - Handcrafted folding magnetic chess.", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500" },
  { id: 1203, name: "Classic Family Card Game Pack", category: "Games", price: 9.99, description: "Card Games - Party game fun for kids & adults.", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=500" },
  { id: 1204, name: "Deluxe Monopoly Strategy Board Game", category: "Games", price: 34.99, description: "Board Games - Real estate trading classic game.", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=500" },
  { id: 1205, name: "Wood Tumble Tower Stacking Blocks", category: "Games", price: 19.99, description: "Party Games - 54 pcs natural timber blocks.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500" },
  { id: 1206, name: "Professional Dartboard Set with Darts", category: "Games", price: 39.99, description: "Pub Games - Official size bristled dart board.", image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500" },
  { id: 1207, name: "1000-Piece Jigsaw Puzzle Landscape", category: "Games", price: 16.99, description: "Puzzles - Premium cardboard scenic puzzle.", image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500" },
  { id: 1208, name: "Fast Paced Tabletop Foosball Game", category: "Games", price: 44.99, description: "Tabletop Games - Mini soccer table arcade game.", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500" },
  { id: 1209, name: "Strategy Dominoes Double Six Set", category: "Games", price: 12.99, description: "Tile Games - Durable tin box domino set.", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=500" },
  { id: 1210, name: "Magnetic Travel Backgammon & Checkers", category: "Games", price: 21.99, description: "Board Games - Portable 2-in-1 strategy set.", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500" },

  // --- JEWELRY (10 Types) ---
  { id: 1301, name: "Silver Pendant Necklace", category: "Jewelry", price: 45.00, description: "Necklaces - Sterling silver chain crystal pendant.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500" },
  { id: 1302, name: "Gold Plated Hoop Earrings", category: "Jewelry", price: 29.99, description: "Earrings - Lightweight polished gold hoops.", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500" },
  { id: 1303, name: "Adjustable Crystal Tennis Bracelet", category: "Jewelry", price: 39.99, description: "Bracelets - Sparkly cubic zirconia bracelet.", image: "https://images.unsplash.com/photo-1611591475777-233ca706508c?w=500" },
  { id: 1304, name: "Classic Solitaire Engagement Ring", category: "Jewelry", price: 89.99, description: "Rings - Sterling silver crystal solitaire ring.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500" },
  { id: 1305, name: "Freshwater Pearl Strand Necklace", category: "Jewelry", price: 79.99, description: "Pearls - Elegant cultured pearl choker necklace.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500" },
  { id: 1306, name: "Men Titanium Carbide Black Ring", category: "Jewelry", price: 24.99, description: "Rings - Matte finish durable band ring.", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500" },
  { id: 1307, name: "Rose Gold Butterfly Studs", category: "Jewelry", price: 19.99, description: "Earrings - Cute minimalist hypoallergenic studs.", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500" },
  { id: 1308, name: "Vintage Locket Necklace Silver", category: "Jewelry", price: 34.99, description: "Lockets - Openable picture holder pendant.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500" },
  { id: 1309, name: "Charm Bracelet with Beads", category: "Jewelry", price: 49.99, description: "Bracelets - Silver chain charm bead wristband.", image: "https://images.unsplash.com/photo-1611591475777-233ca706508c?w=500" },
  { id: 1310, name: "Layered Chain Anklet Silver", category: "Jewelry", price: 14.99, description: "Anklets - Beach style adjustable ankle bracelet.", image: "https://images.unsplash.com/photo-1611591475777-233ca706508c?w=500" }
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
        <button onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }} className="text-xl font-bold tracking-wider uppercase focus:outline-none">
          JAWAD KHAN STORE
        </button>

        <div className="flex items-center space-x-6 text-sm font-medium">
          {/* Home Button Added Here */}
          <button 
            onClick={() => { setCurrentPage('products'); setSelectedCategory('All'); }} 
            className={`flex items-center space-x-1 hover:text-gray-300 transition ${currentPage === 'products' ? 'text-white font-bold underline' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

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
                          <span className="text-[10px] font-bold uppercase text-amber-700">{item.category}</span>
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