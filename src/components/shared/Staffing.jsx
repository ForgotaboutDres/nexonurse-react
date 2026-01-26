import React, { useState, useEffect } from 'react';
import { fetchStaffing } from '../../utils/api';

function Staffing({ unitId, serviceLineId, level }) {
  const [staffing, setStaffing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaffing();
  }, [unitId, serviceLineId, level]);

  const loadStaffing = async () => {
    setLoading(true);
    const data = await fetchStaffing({ unitId, serviceLineId, level });
    setStaffing(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading staffing data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-xl mb-6">Today's Staffing Snapshot</h3>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{staffing.scheduled}</div>
            <div className="text-sm text-gray-600 mt-1">Scheduled</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl font-bold text-red-600">{staffing.callOuts}</div>
            <div className="text-sm text-gray-600 mt-1">Call-Outs</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">{staffing.actual}</div>
            <div className="text-sm text-gray-600 mt-1">Actual Coverage</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">{staffing.needed}</div>
            <div className="text-sm text-gray-600 mt-1">Needed</div>
          </div>
        </div>

        {/* Staffing Alert */}
        {staffing.alert && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-red-900">{staffing.alert.title}</div>
                <div className="text-sm text-red-800 mt-1">{staffing.alert.message}</div>
              </div>
            </div>
          </div>
        )}

        {/* Coverage by Shift */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Coverage by Shift</h4>
          
          {staffing.shifts.map(shift => (
            <div key={shift.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-gray-900">{shift.name}</div>
                  <div className="text-sm text-gray-600">Coverage: {shift.actual}/{shift.needed}</div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  shift.status === 'ok' ? 'bg-green-100 text-green-800' :
                  shift.status === 'short' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {shift.statusLabel}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    shift.status === 'ok' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((shift.actual / shift.needed) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staffing;
