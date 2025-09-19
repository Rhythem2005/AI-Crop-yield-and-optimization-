import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  MapPin, 
  ShoppingCart,
  ChevronDown
} from "lucide-react";

const Bmarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    "All Categories",
    "Vegetables",
    "Fruits", 
    "Grains",
    "Pulses",
    "Herbs",
    "Organic Produce"
  ];

  const priceRanges = [
    "All Prices",
    "Under ₹50",
    "₹50 - ₹100",
    "₹100 - ₹200",
    "Above ₹200"
  ];

  const [products] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      description: "Fresh, vine-ripened organic tomatoes",
      price: 45,
      rating: 4.8,
      reviewCount: 124,
      farm: "Green Valley Farm",
      farmRating: 4.8,
      location: "Punjab",
      available: 500,
      unit: "kg",
      image: "🍅",
      tags: ["Organic", "Today"],
      tagColors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"]
    },
    {
      id: 2,
      name: "Fresh Potatoes",
      description: "High quality fresh potatoes",
      price: 25,
      rating: 4.6,
      reviewCount: 89,
      farm: "Sunrise Agro",
      farmRating: 4.6,
      location: "Haryana",
      available: 1000,
      unit: "kg",
      image: "🥔",
      tags: ["Yesterday"],
      tagColors: ["bg-gray-100 text-gray-800"]
    },
    {
      id: 3,
      name: "Green Lettuce",
      description: "Crisp, fresh organic lettuce",
      price: 35,
      rating: 4.9,
      reviewCount: 67,
      farm: "Organic Farms Co",
      farmRating: 4.9,
      location: "Maharashtra",
      available: 200,
      unit: "kg",
      image: "🥬",
      tags: ["Organic", "Today"],
      tagColors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"]
    },
    {
      id: 4,
      name: "Fresh Carrots",
      description: "Sweet, crunchy fresh carrots",
      price: 30,
      rating: 4.7,
      reviewCount: 156,
      farm: "Valley Fresh",
      farmRating: 4.7,
      location: "Karnataka",
      available: 750,
      unit: "kg",
      image: "🥕",
      tags: ["Today"],
      tagColors: ["bg-blue-100 text-blue-800"]
    },
    {
      id: 5,
      name: "Organic Apples",
      description: "Fresh, crisp organic apples",
      price: 120,
      rating: 4.8,
      reviewCount: 203,
      farm: "Mountain Orchards",
      farmRating: 4.8,
      location: "Himachal Pradesh",
      available: 300,
      unit: "kg",
      image: "🍎",
      tags: ["Organic", "Today"],
      tagColors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"]
    },
    {
      id: 6,
      name: "Basmati Rice",
      description: "Premium quality Basmati rice",
      price: 80,
      rating: 4.9,
      reviewCount: 342,
      farm: "Golden Grain Farm",
      farmRating: 4.9,
      location: "Punjab",
      available: 2000,
      unit: "kg",
      image: "🌾",
      tags: ["This week"],
      tagColors: ["bg-yellow-100 text-yellow-800"]
    }
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (productId) => {
    console.log("Added to cart:", productId);
  };

  const handleViewDetails = (productId) => {
    console.log("View details:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover fresh produce from verified farmers across India</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, farmers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
              >
                {priceRanges.map((price) => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* More Filters Button */}
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">More Filters</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-600">
          Showing {products.length} of {products.length} products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-6xl">{product.image}</div>
                
                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${product.tagColors[index]}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      favorites.has(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-bold text-gray-800">₹{product.price}/{product.unit}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Farm Info */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">{product.farm}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{product.farmRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{product.location}</span>
                    <span className="text-xs text-gray-500 ml-auto">{product.available} {product.unit} available</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleViewDetails(product.id)}
                    className="border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bmarketplace;