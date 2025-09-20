import React, { useState } from "react";
import { 
  Search, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Heart, 
  Star,
  MapPin,
  Eye
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
    const Navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(3);

  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      farm: "Green Valley Farm",
      price: 45,
      rating: 4.8,
      location: "Punjab",
      image: "🍅",
      tags: ["Organic", "Today"],
      tagColors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"]
    },
    {
      id: 2,
      name: "Fresh Potatoes",
      farm: "Sunrise Agro",
      price: 25,
      rating: 4.6,
      location: "Haryana",
      image: "🥔",
      tags: ["Yesterday"],
      tagColors: ["bg-gray-100 text-gray-800"]
    },
    {
      id: 3,
      name: "Green Lettuce",
      farm: "Organic Farm Co",
      price: 35,
      rating: 4.9,
      location: "Maharashtra",
      image: "🥬",
      tags: ["Organic", "Today"],
      tagColors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"]
    },
    {
      id: 4,
      name: "Fresh Carrots",
      farm: "Valley Fresh",
      price: 30,
      rating: 4.7,
      location: "Karnataka",
      image: "🥕",
      tags: ["Today"],
      tagColors: ["bg-blue-100 text-blue-800"]
    }
  ]);

  const [recentOrders] = useState([
    {
      id: "ORD-001",
      farm: "Green Valley Farm",
      product: "Organic Tomatoes",
      quantity: 5,
      unit: "kg",
      amount: 225,
      status: "delivered"
    },
    {
      id: "ORD-002",
      farm: "Sunrise Agro",
      product: "Fresh Potatoes",
      quantity: 10,
      unit: "kg",
      amount: 250,
      status: "in-transit"
    }
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleBrowseProducts = () => {
    console.log("Browse Products clicked");
  };

  const handleViewCart = () => {
    console.log("View Cart clicked");
  };

  const handleAddToCart = (productId) => {
    console.log("Added product to cart:", productId);
    setCartItems(prev => prev + 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-600">
              Discover fresh produce from local farmers
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={()=> Navigate('/bproduct')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </button>
            <button 
              onClick={handleViewCart}
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cartItems})
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Total Orders</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">23</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Total Spent</h3>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">₹12,450</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Saved Farmers</h3>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">8</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Favorites</h3>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">15</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for vegetables, fruits, grains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Featured Products Today</h2>
            <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.tags.map((tag, index) => (
                      <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${product.tagColors[index]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.farm}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-bold text-gray-800">₹{product.price}/kg</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.location}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-800">{order.farm}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {order.product} • {order.quantity} {order.unit}
                  </p>
                  <p className="text-sm text-gray-500">#{order.id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} mb-2 inline-block`}>
                    {order.status}
                  </span>
                  <p className="font-semibold text-gray-800">₹{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;