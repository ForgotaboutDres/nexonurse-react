import React from 'react';

function Dashboard({ unitId }) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-sm text-gray-600">Quality Performance</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">85%</div>
          <div className="text-xs text-green-600 mt-1">↑ 3% vs last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600">Staffing Status</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">12/13</div>
          <div className="text-xs text-yellow-600 mt-1">1 RN short today</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600">Patient Satisfaction</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">4.3/5.0</div>
          <div className="text-xs text-green-600 mt-1">↑ 0.2 vs last quarter</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="text-sm text-gray-600">Priority Tasks</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">8</div>
          <div className="text-xs text-gray-600 mt-1">Due this week</div>
        </div>
      </div>

      {/* Today's Focus */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Your Focus Today</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm">Diabetic A1C Outreach</div>
              <div className="text-xs text-gray-600 mt-0.5">15 patients overdue • ~45 min</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm">Med Adherence Follow-ups</div>
              <div className="text-xs text-gray-600 mt-0.5">12 pending authorizations • ~90 min</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm">Post-Discharge Calls</div>
              <div className="text-xs text-gray-600 mt-0.5">8 patients • ~60 min</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 italic">Estimated: 3.25 hours</span>
            <span className="text-blue-600 font-medium">18/24 tasks (75%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
