import React from 'react';

function TeamHierarchy({ serviceLineId }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Organizational Structure</h3>
        <p className="text-sm text-gray-600 mb-6">View and navigate your reporting structure</p>
        
        {/* Tree View */}
        <div className="space-y-4">
          {/* Level 1: System/Regional */}
          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Mid-Atlantic Region</div>
                <div className="text-sm text-gray-600">Dr. Michael Rodriguez, System Director</div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">8</span> Medical Centers
              </div>
            </div>
            
            {/* Level 2: Medical Center/Geography */}
            <div className="ml-6 mt-3 border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Columbia Medical Center</div>
                  <div className="text-sm text-gray-600">Jennifer Williams, Regional Director</div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">5</span> Service Lines
                </div>
              </div>
              
              {/* Level 3: Service Line */}
              <div className="ml-6 mt-3 border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Primary Care Service Line</div>
                    <div className="text-sm text-gray-600">David Martinez, Service Line Director</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">12</span> Units
                  </div>
                </div>
                
                {/* Level 4: Units (showing a few) */}
                <div className="ml-6 mt-3 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-white border-2 border-blue-300 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">4 West (You are here)</div>
                      <div className="text-sm text-gray-600">Sarah Chen, Nurse Manager</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">18</span> Staff
                    </div>
                  </div>
                  
                  <button className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>View all 12 units</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats by Level */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Rollup Statistics</h3>
        <p className="text-sm text-gray-600 mb-6">Performance metrics aggregated at each level</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Your Unit (4 West)</div>
            <div className="text-2xl font-bold text-gray-900">75%</div>
            <div className="text-sm text-green-600 mt-1">Task completion rate</div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Primary Care Service Line</div>
            <div className="text-2xl font-bold text-gray-900">79%</div>
            <div className="text-sm text-blue-600 mt-1">Avg across 12 units</div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Columbia Medical Center</div>
            <div className="text-2xl font-bold text-gray-900">82%</div>
            <div className="text-sm text-purple-600 mt-1">Avg across 5 service lines</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamHierarchy;
