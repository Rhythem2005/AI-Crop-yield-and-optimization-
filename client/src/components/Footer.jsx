// components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">🌱 FarmWise</h2>
          <p className="text-sm leading-relaxed">
            AgroAI is your AI-powered farming companion. From predicting crop yields 
            to detecting plant diseases, accessing insurance options, and connecting 
            with marketplaces — we bring smart technology to farmers for a sustainable future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/input" className="hover:text-green-400 transition">Crop Yield Prediction</a></li>
            <li><a href="/upload" className="hover:text-green-400 transition">Disease Detection</a></li>
            <li><a href="/mdashboard" className="hover:text-green-400 transition">Marketplace</a></li>
            <li><a href="/selectinsurance" className="hover:text-green-400 transition">Insurance</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-green-400 transition">About AgroAI</a></li>
            <li><a href="/contact" className="hover:text-green-400 transition">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-green-400 transition">FAQs</a></li>
            <li><a href="/support" className="hover:text-green-400 transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <form className="flex mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md text-sm text-gray-800 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-3">
            <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AgroAI. All rights reserved.  
        | Empowering Farmers with AI 🌾
      </div>
    </footer>
  );
}
