import React from "react";

const InsuranceRecommendations = () => {
  const usdToInrRate = 74.5;
  const convertToINR = (amount) => amount * usdToInrRate;

  const policies = [
    {
      title: "Drought Protection Plus",
      field: "Corn Field A - 125 acres",
      priority: "High Priority",
      priorityColor: "bg-red-500",
      risk: "High drought probability (65%)",
      riskColor: "text-red-600",
      confidence: 92,
      factors: [
        "Extended dry period forecasted",
        "Soil moisture levels below 30%",
        "Historical drought patterns indicate risk",
      ],
      protection: 4200,
      cost: 750,
      image: "https://images.pexels.com/photos/2252580/pexels-photo-2252580.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", // Green corn field
    },
    {
      title: "Flood & Excess Moisture",
      field: "Soybean Field B - 87 acres",
      priority: "Medium Priority",
      priorityColor: "bg-yellow-500",
      risk: "Medium flood probability (35%)",
      riskColor: "text-yellow-600",
      confidence: 78,
      factors: [
        "Heavy rainfall expected next month",
        "Low-lying field prone to waterlogging",
        "Nearby river levels rising",
      ],
      protection: 3100,
      cost: 600,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", // Soybean field
    },
    {
      title: "Pest & Disease Shield",
      field: "Wheat Field C - 65 acres",
      priority: "Low Priority",
      priorityColor: "bg-green-500",
      risk: "Medium pest outbreak risk (40%)",
      riskColor: "text-green-600",
      confidence: 85,
      factors: [
        "Aphid population increasing in region",
        "Temperature conditions favor pest growth",
        "Neighboring farms reporting issues",
      ],
      protection: 2500,
      cost: 500,
      image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", // Golden wheat field
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span role="img" aria-label="insurance">📊</span>{" "}
          AI-Powered Insurance Recommendations
        </h1>
        <p className="text-gray-600 mt-1">
          Based on weather forecasts, crop conditions, and historical data
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
          <span>✅ Real-time risk assessment</span>
          <span>📈 Predictive modeling</span>
          <span>⚡ Instant claim processing</span>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/4 relative">
                <img
                  src={policy.image}
                  alt={policy.title}
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full ${policy.priorityColor}`}
                >
                  {policy.priority}
                </span>
              </div>

              {/* Content Area */}
              <div className="md:w-3/4 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{policy.title}</h2>
                  <p className="text-gray-600">{policy.field}</p>
                  <p className={`mt-2 font-medium ${policy.riskColor}`}>
                    ⚠️ Risk Factor: {policy.risk}
                  </p>

                  {/* Key Risk Factors */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">Key Risk Factors:</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {policy.factors.map((factor, i) => (
                        <li key={i}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm mb-1">
                      AI Confidence Score: {policy.confidence}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${policy.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats & Actions */}
                <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      Estimated Loss Protection:
                    </p>
                    <p className="text-green-600 font-semibold text-lg">
                      ₹{convertToINR(policy.protection).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Annual Cost:</p>
                    <p className="text-blue-600 font-semibold text-lg">
                      ₹{convertToINR(policy.cost).toLocaleString()}/year
                    </p>
                  </div>
                  <div className="ml-auto">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-all">
                      Apply Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceRecommendations;