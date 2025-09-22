import React from "react";

const cropPrices = {
  wheat: { msp: 2150 }, // ₹/quintal
  rice: { msp: 1950 },
  maize: { msp: 1850 },
  sugarcane: { msp: 290 },
};

const EconomicAnalysis = ({ resultData }) => {
  if (!resultData) return null;

  const crop = resultData.crop_name?.toLowerCase();
  const area = resultData.area || 0;
  const predictedYieldKgHa = resultData.predicted_yield_kgha || 0;
  const totalProductionTonnes = resultData.total_production_tonnes || 0;
  const inputCostPerHectare = resultData.input_cost_per_hectare || 15000; // ₹/ha (assumption)

  const msp = cropPrices[crop]?.msp || 0;

  // Calculations
  const totalProductionKg = totalProductionTonnes * 1000;
  const totalProductionQuintals = totalProductionKg / 100;
  const grossRevenue = totalProductionQuintals * msp;

  const totalCost = inputCostPerHectare * area;
  const netProfit = grossRevenue - totalCost;

  const breakevenYieldQuintals = totalCost / (msp || 1);
  const breakevenYieldKgHa = (breakevenYieldQuintals * 100) / (area || 1);

  // Health Status
  let status = "⚖️ Breakeven";
  if (netProfit > 0) status = "✅ Profitable";
  if (netProfit < 0) status = "❌ Loss";

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📊 Economic Analysis
      </h2>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-green-800">Total Production</h3>
          <p className="text-gray-700">{totalProductionTonnes.toFixed(2)} tonnes</p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-yellow-800">Gross Revenue</h3>
          <p className="text-gray-700">₹ {grossRevenue.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-red-800">Total Cost</h3>
          <p className="text-gray-700">₹ {totalCost.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-blue-800">Net Profit</h3>
          <p className="text-gray-700">₹ {netProfit.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-pink-800">Health Status</h3>
          <p className="text-gray-700 font-bold">{status}</p>
        </div>
      </div>

      {/* Breakeven Analysis */}
      <div className="mt-6 p-5 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-2">📉 Breakeven Analysis</h3>
        <p className="text-gray-700">
          To cover your total cost of <b>₹ {totalCost.toLocaleString()}</b>, you need at
          least <b>{breakevenYieldQuintals.toFixed(2)} quintals</b> (
          {breakevenYieldKgHa.toFixed(2)} kg/ha) yield at current MSP rates.
        </p>
      </div>
    </div>
  );
};

export default EconomicAnalysis;
