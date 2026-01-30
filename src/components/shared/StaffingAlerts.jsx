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
        console.log('Staffing Alerts Data:', alertsData); // DEBUG
        setData(alertsData);
      } catch (error) {
        console.error('Error loading staffing alerts:', error);
        setData({
          criticalAlerts: 0,
          upcomingRisks: 0,
          currentCoverage: 0,
          activeAlerts: []
        });
      }
      setLoading(false);
    };
    
    loadData();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="text-3xl font-bold text-gray-900">{data.criticalAlerts || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Critical Alerts</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="text-3xl font-bold text-gray-900">{data.upcomingRisks || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Upcoming Risks</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-3xl font-bold text-gray-900">{data.currentCoverage || 0}%</div>
          <div className="text-sm text-gray-600 mt-1">Current Coverage</div>
        </div>
      </div>

      {/* Float Pool */}
      {data.floatRequests && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Float Pool Requests</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-900">{data.floatRequests.pending || 0}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">{data.floatRequests.fulfilled || 0}</div>
              <div className="text-sm text-gray-600">Fulfilled</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-900">{data.floatRequests.failed || 0}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>
        </div>
      )}

      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
        
        {Array.isArray(data.activeAlerts) && data.activeAlerts.length > 0 ? (
          <div className="space-y-4">
            {data.activeAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50"
              >
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{alert.title || 'Alert'}</h4>
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                      {(alert.severity || 'medium').toUpperCase()}
                    </span>
                  </div>
                  {alert.timeframe && (
                    <div className="text-sm text-gray-600 mb-2">{alert.timeframe}</div>
                  )}
                  <p className="text-gray-700 mb-2">{alert.description || 'No description'}</p>
                  {alert.impact && (
                    <div className="text-sm text-gray-600">
                      <strong>Impact:</strong> {alert.impact}
                    </div>
                  )}
                  {alert.recommendation && (
                    <div className="text-sm text-gray-700 mt-1">
                      <strong>Recommendation:</strong> {alert.recommendation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No active staffing alerts</p>
            <p className="text-sm">All shifts are adequately staffed</p>
          </div>
        )}
      </div>

      <DataFreshness 
        lastUpdated="15 minutes ago"
        source="Insight Scheduling"
        status="current"
      />
    </div>
  );
}

export default StaffingAlerts;
