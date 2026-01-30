import React, { useState, useEffect } from 'react';
import { fetchStaffingAlerts } from '../../utils/api';
import DataFreshness from './DataFreshness';

function StaffingAlerts({ unitId, serviceLineId, level }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const alertsData = await fetchStaffingAlerts({ unitId, serviceLineId, level });
        setData(alertsData);
      } catch (error) {
        console.error('Error loading staffing alerts:', error);
      }
      setLoading(false);
    };
    
    loadData();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No staffing alerts data available</p>
      </div>
    );
  }

  const activeAlerts = Array.isArray(data.activeAlerts) ? data.activeAlerts : [];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Critical Alerts */}
        <div className="bg-white rounded-lg shadow border-l-4 border-red-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Critical Alerts</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.criticalAlerts || 0}</div>
          <div className="text-sm text-gray-600">Immediate action required</div>
        </div>

        {/* Upcoming Risks */}
        <div className="bg-white rounded-lg shadow border-l-4 border-orange-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Upcoming Risks</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.upcomingRisks || 0}</div>
          <div className="text-sm text-gray-600">Next 48-72 hours</div>
        </div>

        {/* Float Requests */}
        <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Float Requests</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.floatRequests?.pending || 0}</div>
          <div className="text-sm text-gray-600">
            {data.floatRequests?.fulfilled || 0} fulfilled, {data.floatRequests?.failed || 0} failed
          </div>
        </div>

        {/* Coverage Status */}
        <div className="bg-white rounded-lg shadow border-l-4 border-green-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Coverage Status</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.currentCoverage || 0}%</div>
          <div className="text-sm text-gray-600">{data.staffScheduled || 0} positions short</div>
        </div>
      </div>

      {/* Active Staffing Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Active Staffing Alerts</h3>
          <p className="text-sm text-gray-600">Risk signals and early warnings - manage detailed schedules in Insight</p>
        </div>
        
        {activeAlerts.length > 0 ? (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5 relative"
              >
                {/* CRITICAL Badge */}
                <div className="absolute top-5 right-5">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                    CRITICAL
                  </span>
                </div>

                {/* Alert Icon */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {alert.title || 'Staffing Alert'}
                    </h4>

                    {/* Timeframe */}
                    {alert.timeframe && (
                      <div className="text-sm text-gray-700 mb-3">{alert.timeframe}</div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-800 mb-3">{alert.description || 'No description available'}</p>

                    {/* Impact */}
                    {alert.impact && (
                      <div className="mb-3">
                        <div className="font-semibold text-gray-900 text-sm mb-1">Impact:</div>
                        <div className="text-sm text-gray-700">{alert.impact}</div>
                      </div>
                    )}

                    {/* Recommendation */}
                    {alert.recommendation && (
                      <div className="mb-4">
                        <div className="font-semibold text-gray-900 text-sm mb-1">Recommendation:</div>
                        <div className="text-sm text-gray-700">{alert.recommendation}</div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm transition-colors">
                        Request Float Pool
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium text-sm transition-colors">
                        Call Supervisor
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium text-sm transition-colors">
                        View Schedule in Insight
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Staffing Alerts</h3>
            <p className="text-gray-600">All shifts are adequately staffed</p>
          </div>
        )}
      </div>

      <DataFreshness 
        lastUpdated="15 minutes ago"
        source="Insight Scheduling Platform"
        status="current"
      />
    </div>
  );
}

export default StaffingAlerts;
