import { useState } from "react";

export default function ClaimSection() {
  const [claims] = useState([
    {
      id: "CLM-2024-001",
      field: "Corn Field A",
      damage: "Drought Damage",
      submitted: "2024-09-15",
      payout: 1250000,
      confidence: 94,
      status: "Processing",
      progress: 75,
    },
    {
      id: "CLM-2024-002",
      field: "Soybean Field B",
      damage: "Hail Damage",
      submitted: "2024-08-22",
      payout: 820000,
      confidence: 98,
      status: "Approved",
      progress: 100,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">🌱 AI-Powered Digital Claims</h1>
        <p className="text-gray-600 mt-2">Instant damage assessment and fast-track claim processing</p>
      </div>

      {/* File New Claim */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">File New Claim</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500">
            <option value="">Select affected field...</option>
            <option value="corn">Corn Field A</option>
            <option value="soybean">Soybean Field B</option>
            <option value="wheat">Wheat Field C</option>
            <option value="rice">Rice Field D</option>
          </select>

          <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500">
            <option value="">Select damage type...</option>
            <option value="drought">Drought</option>
            <option value="hail">Hail</option>
            <option value="flood">Flood</option>
            <option value="pest">Pest Infestation</option>
            <option value="disease">Crop Disease</option>
          </select>

          <textarea
            placeholder="Describe the damage to your crops..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 col-span-1 md:col-span-3"
          />
        </div>
        <button className="mt-6 w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-all duration-300">
          Continue to AI Analysis
        </button>
      </div>

      {/* Claims History */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Claims History</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">{claim.id}</h3>
                  <p className="text-sm text-gray-500">
                    {claim.field} – {claim.damage}
                  </p>
                  <p className="text-xs text-gray-400">Submitted: {claim.submitted}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    ₹{claim.payout.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">AI Confidence: {claim.confidence}%</p>
                </div>
              </div>

              {claim.status === "Processing" && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{claim.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-2 rounded-full animate-pulse"
                      style={{ width: `${claim.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition">
                  View Details
                </button>
                {claim.status === "Processing" && (
                  <button className="px-4 py-2 rounded-lg border border-yellow-400 text-yellow-600 text-sm hover:bg-yellow-50 transition">
                    Add Evidence
                  </button>
                )}
                {claim.status === "Approved" && (
                  <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition">
                    View Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10">
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-2xl font-bold text-gray-800">2</p>
          <p className="text-sm text-gray-500">Total Claims</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-2xl font-bold text-green-600">₹20,70,000</p>
          <p className="text-sm text-gray-500">Total Payouts</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-2xl font-bold text-blue-600">96%</p>
          <p className="text-sm text-gray-500">Avg AI Confidence</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-2xl font-bold text-orange-500">4 days</p>
          <p className="text-sm text-gray-500">Avg Processing Time</p>
        </div>
      </div>
    </div>
  );
}