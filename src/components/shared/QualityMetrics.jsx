import React, { useState, useEffect } from 'react';
import { fetchQualityMetrics } from '../../utils/api';

function QualityMetrics({ unitId, serviceLineId, level }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, [unitId, serviceLineId, level]);

  const loadMetrics = async () => {
    setLoading(true);
    const data = await fetchQualityMetrics({ unitId, serviceLineId, level });
    setMetrics(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading quality metrics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-xl mb-2">Consolidated Quality Metrics</h3>
        <p className="text-sm text-gray-600 mb-6">
          All your metrics in one place - no more jumping between Tableau, PowerBI, and Insight
        </p>
        
        <div className="space-y-6">
          {metrics.map(metric => (
            <div key={metric.id} className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{metric.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Current:</span> {metric.current}%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Target:</span> {metric.target}%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Trend:</span>
                      <span className={`ml-1 ${
                        metric.trend > 0 ? 'text-green-600' : 
                        metric.trend < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : '→'} {metric.trendLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  metric.status === 'exceeds' ? 'bg-green-100 text-green-800' :
                  metric.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metric.statusLabel}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    metric.status === 'exceeds' || metric.status === 'on-track' 
                      ? 'bg-green-500' 
                      : metric.current >= metric.target * 0.9 
                        ? 'bg-blue-500' 
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(metric.current, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QualityMetrics;
