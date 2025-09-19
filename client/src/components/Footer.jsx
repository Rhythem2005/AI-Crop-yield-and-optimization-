// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} FarmWise – All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
