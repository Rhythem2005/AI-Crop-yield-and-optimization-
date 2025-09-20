import React, { useState } from "react";
import { 
  Plus, 
  Eye, 
  Star, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  User,
  Bell
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
    const Navigate = useNavigate()
  const [products] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 45,
      quantity: 500,
      unit: "kg",
      image: "🍅",
      status: "active"
    },
    {
      id: 2,
      name: "Fresh Potatoes",
      price: 25,
      quantity: 1000,
      unit: "kg",
      image: "🥔",
      status: "active"
    },
    {
      id: 3,
      name: "Green Lettuce",
      price: 35,
      quantity: 200,
      unit: "kg",
      image: "🥬",
      status: "sold"
    }
  ]);

  const [orders] = useState([
    {
      id: "ORD-001",
      buyer: "Green Grocers Ltd",
      product: "Organic Tomatoes",
      quantity: 50,
      unit: "kg",
      amount: 2250,
      status: "pending"
    },
    {
      id: "ORD-002",
      buyer: "Fresh Market Co",
      product: "Fresh Potatoes",
      quantity: 100,
      unit: "kg",
      amount: 2500,
      status: "confirmed"
    }
  ]);

  const handleAddProduct = () => {
    console.log("Add Product clicked");
  };

  const handleViewProfile = () => {
    console.log("View Profile clicked");
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
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
              Manage your farm business and track your success
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
            <button 
              onClick={handleViewProfile}
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Total Earnings</h3>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">₹45,280</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Active Listings</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">12</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Total Orders</h3>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">156</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Rating</h3>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-800">4.8</p>
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Products</h2>
              <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                View All
              </button>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{product.price}/kg • {product.quantity} {product.unit}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
              <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                View All
              </button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{order.buyer}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {order.product} • {order.quantity} {order.unit}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">#{order.id}</p>
                    <p className="font-semibold text-gray-800">₹{order.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => Navigate('/product')}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Product</span>
            </button>

            <button 
              onClick={() => handleQuickAction('view-orders')}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Orders</span>
            </button>

            <button 
              onClick={() => handleQuickAction('edit-profile')}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <User className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Edit Profile</span>
            </button>

            <button 
              onClick={() => handleQuickAction('notifications')}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;