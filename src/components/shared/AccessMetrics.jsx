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
        <p className="text-gray-600">No access metrics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Same-Day Access Rate */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Same-Day Access Rate</h3>
            <p className="text-sm text-gray-600">Percentage of patients seen same day</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {data.sameDayRate || 0}%
            </div>
            <div className="text-sm text-gray-600">
              Target: {data.sameDayTarget || 0}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${Math.min((data.sameDayRate || 0), 100)}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                (data.sameDayRate || 0) >= (data.sameDayTarget || 0) ? 'bg-green-500' : 'bg-orange-500'
              }`}
            />
          </div>
        </div>

        <div className="mt-4">
          <DataFreshness 
            lastUpdated="2 hours ago"
            source="Epic Reporting"
            status="current"
          />
        </div>
      </div>

      {/* Average Wait Times */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Wait Times by Type</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Primary Care</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.waitByType?.primary || 0} days
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Specialty</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.waitByType?.specialty || 0} days
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Urgent</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.waitByType?.urgent || 0} days
            </div>
          </div>
        </div>
      </div>

      {/* Provider Availability */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Availability Today</h3>
        
        <div className="space-y-3">
          {data.providerAvailability && data.providerAvailability.length > 0 ? (
            data.providerAvailability.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{provider.name}</div>
                  <div className="text-sm text-gray-600">{provider.specialty}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Available</div>
                    <div className="font-bold text-green-600">{provider.openSlots || 0} slots</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="font-bold text-gray-900">{provider.total || 0} slots</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">No provider availability data</p>
          )}
        </div>
      </div>

      {/* Backlog */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Appointment Backlog</h3>
            <p className="text-sm text-gray-600 mt-1">Pending appointments</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600">{data.backlog || 0}</div>
            <div className="text-sm text-gray-600">Oldest: {data.oldestRequest || 0} days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessMetrics;
