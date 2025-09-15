import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/farm.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔹 Auth Box */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-gray-500 text-center mt-2">
          {isLogin
            ? "Login to continue your smart farming journey 🚜🌱"
            : "Join the smarter farming community 🌱🚜"}
        </p>

        {/* Form */}
        <form className="mt-6 flex flex-col gap-5">
          {/* Sign Up extra field */}
          {!isLogin && (
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none text-gray-700 bg-transparent"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-gray-700 bg-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-gray-700 bg-transparent"
              required
            />
          </div>

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full outline-none text-gray-700 bg-transparent"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login & Sign Up */}
        <p className="text-gray-600 text-sm text-center mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-green-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-green-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
