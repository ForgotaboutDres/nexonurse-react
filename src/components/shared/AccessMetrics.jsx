import React, { useState, useEffect } from 'react';
import { fetchAccessMetrics } from '../../utils/api';
import DataFreshness from './DataFreshness';

function AccessMetrics({ unitId, serviceLineId, level }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      const data = await fetchAccessMetrics({ unitId, serviceLineId, level });
      setMetrics(data);
      setLoading(false);
    };
    
    loadMetrics();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading access metrics...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-2">Same-Day Access Rate</div>
          <div className="text-3xl font-bold text-gray-900">{metrics.sameDayRate}%</div>
          <div className={`text-sm mt-1 ${metrics.sameDayTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.sameDayTrend >= 0 ? '↑' : '↓'} {Math.abs(metrics.sameDayTrend)}% vs last week
          </div>
          <div className="text-xs text-gray-500 mt-2">Target: {metrics.sameDayTarget}%</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-2">Average Wait Time</div>
          <div className="text-3xl font-bold text-gray-900">{metrics.avgWaitDays}</div>
          <div className="text-sm text-gray-600 mt-1">days</div>
          <div className="text-xs text-gray-500 mt-2">Target: {metrics.waitTarget} days</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-2">Open Slots Today</div>
          <div className="text-3xl font-bold text-gray-900">{metrics.openSlots}</div>
          <div className="text-sm text-gray-600 mt-1">appointments available</div>
          <div className="text-xs text-gray-500 mt-2">Across {metrics.providers} providers</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="text-sm text-gray-600 mb-2">Backlog</div>
          <div className="text-3xl font-bold text-gray-900">{metrics.backlog}</div>
          <div className="text-sm text-gray-600 mt-1">requests pending</div>
          <div className="text-xs text-gray-500 mt-2">Oldest: {metrics.oldestRequest} days</div>
        </div>
      </div>

      {/* Detailed Access Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Access Performance Details</h3>
        
        <div className="space-y-6">
          {/* Same-Day Access */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">Same-Day Access Rate</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Percentage of patients requesting same-day appointments who received them
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                metrics.sameDayRate >= metrics.sameDayTarget 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {metrics.sameDayRate >= metrics.sameDayTarget ? 'On Target' : 'Below Target'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm mb-2">
              <span><strong>Current:</strong> {metrics.sameDayRate}%</span>
              <span><strong>Target:</strong> {metrics.sameDayTarget}%</span>
              <span><strong>This Week:</strong> {metrics.sameDayThisWeek} appointments</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${
                  metrics.sameDayRate >= metrics.sameDayTarget ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(metrics.sameDayRate, 100)}%` }}
              />
            </div>
          </div>

          {/* Next Available Appointment */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">Next Available Appointment</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Average days until next available appointment slot
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                metrics.avgWaitDays <= metrics.waitTarget 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {metrics.avgWaitDays <= metrics.waitTarget ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 text-xs">Primary Care</div>
                <div className="text-xl font-bold text-gray-900 mt-1">{metrics.waitByType.primary} days</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 text-xs">Specialty</div>
                <div className="text-xl font-bold text-gray-900 mt-1">{metrics.waitByType.specialty} days</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 text-xs">Urgent Care</div>
                <div className="text-xl font-bold text-gray-900 mt-1">{metrics.waitByType.urgent} days</div>
              </div>
            </div>
          </div>

          {/* Provider Availability */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Provider Availability Today</h4>
            <div className="space-y-2">
              {metrics.providerAvailability.map(provider => (
                <div key={provider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{provider.name}</div>
                    <div className="text-sm text-gray-600">{provider.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{provider.openSlots} slots open</div>
                    <div className="text-xs text-gray-600">
                      {provider.booked}/{provider.total} booked
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Backlog */}
          {metrics.backlog > 0 && (
            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900">Appointment Backlog Alert</h4>
                  <p className="text-sm text-orange-800 mt-1">
                    <strong>{metrics.backlog} patients</strong> waiting for appointments. 
                    Oldest request is <strong>{metrics.oldestRequest} days</strong> old.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
                      Review Backlog
                    </button>
                    <button className="px-3 py-1 bg-white border border-orange-600 text-orange-600 text-sm rounded-lg hover:bg-orange-50">
                      Add Capacity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Freshness */}
        <div className="mt-6">
          <DataFreshness 
            lastUpdated="15 minutes ago"
            source="Scheduling System (Epic)"
            nextRefresh="2:00 PM"
            status="current"
          />
        </div>
      </div>

      {/* Historical Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">7-Day Access Trend</h3>
        <div className="text-sm text-gray-600 mb-4">
          Same-day access rate over the past week
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {metrics.weeklyTrend.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t-lg ${
                  day.rate >= metrics.sameDayTarget ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ height: `${(day.rate / 100) * 100}%` }}
              />
              <div className="text-xs text-gray-600 mt-2">{day.label}</div>
              <div className="text-xs font-medium text-gray-900">{day.rate}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccessMetrics;
