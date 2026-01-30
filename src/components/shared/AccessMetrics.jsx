import React, { useState, useEffect } from 'react';
import { fetchAccessMetrics } from '../../utils/api';
import DataFreshness from './DataFreshness';

function AccessMetrics({ unitId, serviceLineId, level }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const metricsData = await fetchAccessMetrics({ unitId, serviceLineId, level });
        setData(metricsData);
      } catch (error) {
        console.error('Error loading access metrics:', error);
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
        <p className="text-gray-600">No access metrics data available</p>
      </div>
    );
  }

  const waitByType = data.waitByType || { primary: 0, specialty: 0, urgent: 0 };
  const providerAvailability = data.providerAvailability || [];

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Same-Day Access Rate */}
        <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Same-Day Access Rate</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.sameDayRate || 0}%</div>
          <div className={`text-sm font-semibold ${
            (data.sameDayTrend || 0) > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(data.sameDayTrend || 0) > 0 ? '↑' : '↓'} {Math.abs(data.sameDayTrend || 0)}% vs last week
          </div>
          <div className="text-xs text-gray-500 mt-2">Target: {data.sameDayTarget || 0}%</div>
        </div>

        {/* Average Wait Time */}
        <div className="bg-white rounded-lg shadow border-l-4 border-purple-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Average Wait Time</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.avgWaitDays || 0}</div>
          <div className="text-sm text-gray-600">days</div>
          <div className="text-xs text-gray-500 mt-2">Target: {data.waitTarget || 0} days</div>
        </div>

        {/* Open Slots Today */}
        <div className="bg-white rounded-lg shadow border-l-4 border-green-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Open Slots Today</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.openSlots || 0}</div>
          <div className="text-sm text-gray-600">appointments available</div>
          <div className="text-xs text-gray-500 mt-2">Across {data.providers || 0} providers</div>
        </div>

        {/* Backlog */}
        <div className="bg-white rounded-lg shadow border-l-4 border-orange-500 p-6">
          <div className="text-sm text-gray-600 mb-1">Backlog</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.backlog || 0}</div>
          <div className="text-sm text-gray-600">requests pending</div>
          <div className="text-xs text-gray-500 mt-2">Oldest: {data.oldestRequest || 0} days</div>
        </div>
      </div>

      {/* Access Performance Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Performance Details</h3>
        
        {/* Same-Day Access Rate Detail */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold text-gray-900">Same-Day Access Rate</div>
              <div className="text-sm text-gray-600">Percentage of patients requesting same-day appointments who received them</div>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
              Below Target
            </span>
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Current: {data.sameDayRate || 0}%</strong> &nbsp;
            <strong>Target: {data.sameDayTarget || 0}%</strong> &nbsp;
            <span className="text-gray-600">This Week: {data.sameDayThisWeek || 0} appointments</span>
          </div>
          {/* Progress Bar */}
          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-red-500 transition-all duration-500"
              style={{ width: `${Math.min((data.sameDayRate || 0), 100)}%` }}
            />
            <div 
              className="absolute h-full border-l-2 border-gray-400"
              style={{ left: `${data.sameDayTarget || 0}%` }}
            />
          </div>
        </div>

        {/* Next Available Appointment */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900">Next Available Appointment</div>
              <div className="text-sm text-gray-600">Average days until next available appointment slot</div>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
              Needs Improvement
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Primary Care</div>
              <div className="text-3xl font-bold text-gray-900">{waitByType.primary || 0}</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Specialty</div>
              <div className="text-3xl font-bold text-gray-900">{waitByType.specialty || 0}</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Urgent Care</div>
              <div className="text-3xl font-bold text-gray-900">{waitByType.urgent || 0}</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Availability Today */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Availability Today</h3>
        
        {providerAvailability.length > 0 ? (
          <div className="space-y-3">
            {providerAvailability.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{provider.name}</div>
                  <div className="text-sm text-gray-600">{provider.specialty}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-600 uppercase">Available</div>
                    <div className="text-lg font-bold text-green-600">{provider.openSlots || 0} slots</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600 uppercase">Total</div>
                    <div className="text-lg font-bold text-gray-900">{provider.total || 0} slots</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No provider availability data</p>
        )}
      </div>

      <DataFreshness 
        lastUpdated="2 hours ago"
        source="Epic Reporting"
        status="current"
      />
    </div>
  );
}

export default AccessMetrics;
