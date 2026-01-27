import React, { useState, useEffect } from 'react';
import { fetchStaffingAlerts } from '../../utils/api';
import DataFreshness from './DataFreshness';

function StaffingAlerts({ unitId, serviceLineId, level }) {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      setLoading(true);
      const data = await fetchStaffingAlerts({ unitId, serviceLineId, level });
      setAlerts(data);
      setLoading(false);
    };
    
    loadAlerts();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading staffing alerts...</div>;
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getSeverityIcon = (severity) => {
    const colors = {
      critical: 'text-red-600',
      high: 'text-orange-600',
      medium: 'text-yellow-600',
      info: 'text-blue-600'
    };

    return (
      <svg className={`w-6 h-6 ${colors[severity]} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`rounded-lg shadow p-6 ${
          alerts.criticalAlerts > 0 ? 'bg-red-50 border-l-4 border-red-500' : 'bg-white border-l-4 border-gray-300'
        }`}>
          <div className="text-sm text-gray-600 mb-2">Critical Alerts</div>
          <div className="text-3xl font-bold text-gray-900">{alerts.criticalAlerts}</div>
          <div className="text-xs text-gray-600 mt-2">Immediate action required</div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          alerts.upcomingRisks > 0 ? 'bg-orange-50 border-l-4 border-orange-500' : 'bg-white border-l-4 border-gray-300'
        }`}>
          <div className="text-sm text-gray-600 mb-2">Upcoming Risks</div>
          <div className="text-3xl font-bold text-gray-900">{alerts.upcomingRisks}</div>
          <div className="text-xs text-gray-600 mt-2">Next 48-72 hours</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-2">Float Requests</div>
          <div className="text-3xl font-bold text-gray-900">{alerts.floatRequests.pending}</div>
          <div className="text-xs text-gray-600 mt-2">
            {alerts.floatRequests.fulfilled} fulfilled, {alerts.floatRequests.failed} failed
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-2">Coverage Status</div>
          <div className="text-3xl font-bold text-gray-900">{alerts.currentCoverage}%</div>
          <div className="text-xs text-gray-600 mt-2">
            {alerts.staffNeeded - alerts.staffScheduled} positions short
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Active Staffing Alerts</h3>
          <p className="text-sm text-gray-600 mt-1">
            Risk signals and early warnings - manage detailed schedules in <a href="#" className="text-blue-600 underline hover:text-blue-700">Insight →</a>
          </p>
        </div>

        <div className="space-y-4">
          {alerts.activeAlerts.map(alert => (
            <div key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)} p-4 rounded-r-lg`}>
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      <div className="text-sm text-gray-600 mt-1">{alert.timeframe}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      alert.severity === 'critical' ? 'bg-red-600 text-white' :
                      alert.severity === 'high' ? 'bg-orange-600 text-white' :
                      alert.severity === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
                  
                  {alert.impact && (
                    <div className="text-sm text-gray-700 mb-3">
                      <strong>Impact:</strong> {alert.impact}
                    </div>
                  )}

                  {alert.recommendation && (
                    <div className="text-sm bg-white bg-opacity-60 p-3 rounded-lg mb-3">
                      <strong className="text-gray-900">Recommendation:</strong>
                      <p className="text-gray-700 mt-1">{alert.recommendation}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap">
                    {alert.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className={`px-3 py-1 text-sm rounded-lg font-medium ${
                          idx === 0 
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Warnings */}
      {alerts.predictiveWarnings && alerts.predictiveWarnings.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">Early Warning System</h3>
              <p className="text-sm text-gray-700 mt-1">Potential staffing issues detected in the next 48-72 hours</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {alerts.predictiveWarnings.map((warning, idx) => (
              <div key={idx} className="bg-white bg-opacity-60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">{warning.date}</span>
                </div>
                <p className="text-sm text-gray-700">{warning.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Float Pool Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Float Pool Requests</h3>
        
        <div className="space-y-3">
          {alerts.floatPoolRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{request.shift} - {request.date}</div>
                <div className="text-sm text-gray-600">{request.positions} needed</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status === 'fulfilled' ? 'Fulfilled' :
                 request.status === 'pending' ? 'Pending' :
                 'Failed'}
              </span>
            </div>
          ))}
        </div>

        {alerts.floatRequests.failed > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>{alerts.floatRequests.failed} float requests failed</strong> to fill. 
              Consider alternative solutions or schedule adjustments.
            </p>
          </div>
        )}
      </div>

      {/* Data Freshness */}
      <div className="bg-white rounded-lg shadow p-4">
        <DataFreshness 
          lastUpdated="30 minutes ago"
          source="Insight Staffing System"
          nextRefresh="3:00 PM"
          status="current"
        />
      </div>
    </div>
  );
}

export default StaffingAlerts;
