import React, { useState, useEffect } from 'react';
import { fetchExecutiveDashboard } from '../../utils/api';
import DataFreshness from '../shared/DataFreshness';

function ExecutiveDashboard({ serviceLineId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchExecutiveDashboard(serviceLineId);
        console.log('Executive Dashboard Data:', dashboardData); // DEBUG
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading executive dashboard:', error);
        setData({
          kpis: {
            serviceLineAverage: 0,
            trend: 0,
            unitsOnTrack: 0,
            totalUnits: 0,
            needsAttention: 0
          },
          topPerformers: [],
          needsAttention: [],
          keyInsights: [],
          upcomingPriorities: []
        });
      }
      setLoading(false);
    };
    
    loadData();
  }, [serviceLineId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No executive dashboard data available</p>
      </div>
    );
  }

  const kpis = data.kpis || {
    serviceLineAverage: 0,
    trend: 0,
    unitsOnTrack: 0,
    totalUnits: 0,
    needsAttention: 0
  };

  const topPerformers = Array.isArray(data.topPerformers) ? data.topPerformers : [];
  const needsAttention = Array.isArray(data.needsAttention) ? data.needsAttention : [];
  const keyInsights = Array.isArray(data.keyInsights) ? data.keyInsights : [];
  const upcomingPriorities = Array.isArray(data.upcomingPriorities) ? data.upcomingPriorities : [];

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Service Line Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <div className="text-sm uppercase tracking-wide mb-2">Avg Performance</div>
            <div className="text-4xl font-bold">{kpis.serviceLineAverage}%</div>
            <div className={`text-sm mt-2 ${kpis.trend >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {kpis.trend >= 0 ? '↑' : '↓'} {Math.abs(kpis.trend)}% from last month
            </div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <div className="text-sm uppercase tracking-wide mb-2">Units On Track</div>
            <div className="text-4xl font-bold">{kpis.unitsOnTrack}/{kpis.totalUnits}</div>
            <div className="text-sm mt-2">
              {Math.round((kpis.unitsOnTrack / kpis.totalUnits) * 100)}% meeting targets
            </div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <div className="text-sm uppercase tracking-wide mb-2">Needs Attention</div>
            <div className="text-4xl font-bold">{kpis.needsAttention}</div>
            <div className="text-sm mt-2">Units below target</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <div className="text-sm uppercase tracking-wide mb-2">Trend</div>
            <div className="text-4xl font-bold">
              {kpis.trend >= 0 ? '↗' : '↘'}
            </div>
            <div className="text-sm mt-2">
              {kpis.trend >= 0 ? 'Improving' : 'Declining'}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Top Performing Units</h3>
        
        {topPerformers.length > 0 ? (
          <div className="space-y-3">
            {topPerformers.map((unit, index) => (
              <div key={unit.id || index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-green-600">#{index + 1}</div>
                  <div>
                    <div className="font-bold text-gray-900">{unit.name || 'Unknown Unit'}</div>
                    <div className="text-sm text-gray-600">{unit.manager || 'No manager assigned'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{unit.score || 0}%</div>
                  <div className="text-sm text-gray-600">{unit.highlight || 'Excellent performance'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No top performers data available</p>
        )}
      </div>

      {/* Units Needing Attention */}
      {needsAttention.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Units Needing Attention</h3>
          
          <div className="space-y-3">
            {needsAttention.map((unit, index) => (
              <div key={unit.id || index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <div className="font-bold text-gray-900">{unit.name || 'Unknown Unit'}</div>
                  <div className="text-sm text-gray-600">{unit.manager || 'No manager assigned'}</div>
                  <div className="text-sm text-red-600 mt-1">{unit.issue || 'Below target'}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{unit.score || 0}%</div>
                  <div className="text-sm text-gray-600">Target: {unit.target || 75}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      {keyInsights.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Key Insights</h3>
          
          <div className="space-y-3">
            {keyInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="font-semibold text-gray-900 mb-1">{insight.title || 'Insight'}</div>
                <div className="text-sm text-gray-700">{insight.description || 'No description'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Priorities */}
      {upcomingPriorities.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Upcoming Priorities</h3>
          
          <div className="space-y-2">
            {upcomingPriorities.map((priority, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 text-gray-900">{priority.text || priority}</div>
                {priority.dueDate && (
                  <div className="text-sm text-gray-600">{priority.dueDate}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <DataFreshness 
        lastUpdated="4 hours ago"
        source="Performance Analytics"
        status="current"
      />
    </div>
  );
}

export default ExecutiveDashboard;
