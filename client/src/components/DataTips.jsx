import React from 'react';

const DataTips = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Smart Data Entry Tips
      </h2>
      
      {/* Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* pH Levels */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full  mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">Ph Levels</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                Green = Optimal (6.0-8.0)
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                Yellow = Caution (5.5-6.0, 8.0-8.5)
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                Red = Critical (&lt;5.5, &gt;8.5)
              </span>
            </div>
          </div>
        </div>
        
        {/* Humidity */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full  mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">Humidity</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                Blue = Good (40-80%)
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                Red = Too dry/humid
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Affects disease risk</p>
          </div>
        </div>
        
        {/* Temperature */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full  mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">Temperature</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
                Orange = Good (15-35°C)
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                Red = Extreme temps
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Seasonal average recommended</p>
          </div>
        </div>
        
        {/* NPK Format */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full  mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">NPK Format</h3>
            <p className="text-gray-700 text-sm">Nitrogen-Phosphorus-Potassium</p>
            <p className="text-gray-700 text-sm">Example: 20-10-10</p>
            <p className="text-xs text-gray-600 mt-1">Higher N for leafy crops</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTips;
