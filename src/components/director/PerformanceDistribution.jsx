import React, { useState, useEffect } from 'react';
import { fetchPerformanceDistribution } from '../../utils/api';
import DataFreshness from './DataFreshness';

function PerformanceDistribution({ serviceLineId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState('overallScore');
  const [yAxis, setYAxis] = useState('quality');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const distributionData = await fetchPerformanceDistribution(serviceLineId);
      setData(distributionData);
      setLoading(false);
    };
    
    loadData();
  }, [serviceLineId]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading performance distribution...</div>;
  }

  const getPerformanceColor = (level) => {
    switch (level) {
      case 'excellent': return '#10B981'; // green
      case 'onTrack': return '#3B82F6';   // blue
      case 'belowTarget': return '#F59E0B'; // orange
      case 'critical': return '#EF4444';  // red
      default: return '#6B7280';
    }
  };

  const getPerformanceLevelText = (level) => {
    switch (level) {
      case 'excellent': return 'Excellent (≥85%)';
      case 'onTrack': return 'On Track (75-84%)';
      case 'belowTarget': return 'Below Target (70-74%)';
      case 'critical': return 'Critical (<70%)';
      default: return level;
    }
  };

  // Calculate SVG coordinates
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 60;
  const chartWidth = svgWidth - (padding * 2);
  const chartHeight = svgHeight - (padding * 2);

  const xMin = 50;
  const xMax = 100;
  const yMin = 50;
  const yMax = 90;

  const getX = (value) => padding + ((value - xMin) / (xMax - xMin)) * chartWidth;
  const getY = (value) => svgHeight - padding - ((value - yMin) / (yMax - yMin)) * chartHeight;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Distribution Analysis</h3>
        <p className="text-sm text-gray-600">
          Visualize unit performance across two dimensions
        </p>
      </div>

      {/* Axis Selectors */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">X: Overall Score</label>
          <select 
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="overallScore">Overall Performance Score (%)</option>
            <option value="quality">Quality Score</option>
            <option value="access">Access Metrics</option>
            <option value="satisfaction">Patient Satisfaction</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Y: Quality</label>
          <select 
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="quality">Quality Metrics Score (%)</option>
            <option value="access">Access Metrics</option>
            <option value="satisfaction">Patient Satisfaction</option>
            <option value="staffing">Staffing Effectiveness</option>
          </select>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <svg width="100%" height="450" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x={padding} y={padding} width={chartWidth} height={chartHeight} fill="url(#grid)" />

          {/* Target line (75%) */}
          <line 
            x1={getX(75)} 
            y1={padding} 
            x2={getX(75)} 
            y2={svgHeight - padding} 
            stroke="#F59E0B" 
            strokeWidth="2" 
            strokeDasharray="5,5"
          />
          <text x={getX(75)} y={padding - 10} fill="#F59E0B" fontSize="12" textAnchor="middle">
            Target: 75%
          </text>

          {/* Performance zones */}
          {/* High Performance zone (top right) */}
          <text x={svgWidth - padding - 80} y={padding + 40} fill="#10B981" fontSize="12" opacity="0.6">
            High Performance
          </text>
          
          {/* Needs Improvement zone (bottom left) */}
          <text x={padding + 40} y={svgHeight - padding - 40} fill="#EF4444" fontSize="12" opacity="0.6">
            Needs Improvement
          </text>

          {/* Axes */}
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#374151" strokeWidth="2"/>
          <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#374151" strokeWidth="2"/>

          {/* X-axis labels */}
          {[50, 60, 70, 80, 90, 100].map(val => (
            <g key={val}>
              <line x1={getX(val)} y1={svgHeight - padding} x2={getX(val)} y2={svgHeight - padding + 5} stroke="#374151" strokeWidth="1"/>
              <text x={getX(val)} y={svgHeight - padding + 20} fill="#374151" fontSize="12" textAnchor="middle">{val}</text>
            </g>
          ))}

          {/* Y-axis labels */}
          {[50, 60, 70, 80, 90].map(val => (
            <g key={val}>
              <line x1={padding - 5} y1={getY(val)} x2={padding} y2={getY(val)} stroke="#374151" strokeWidth="1"/>
              <text x={padding - 10} y={getY(val) + 4} fill="#374151" fontSize="12" textAnchor="end">{val}</text>
            </g>
          ))}

          {/* Axis titles */}
          <text x={svgWidth / 2} y={svgHeight - 10} fill="#374151" fontSize="14" fontWeight="600" textAnchor="middle">
            Overall Performance Score (%)
          </text>
          <text 
            x={20} 
            y={svgHeight / 2} 
            fill="#374151" 
            fontSize="14" 
            fontWeight="600" 
            textAnchor="middle"
            transform={`rotate(-90, 20, ${svgHeight / 2})`}
          >
            Quality Metrics Score (%)
          </text>

          {/* Data points */}
          {data.units.map(unit => (
            <g key={unit.id}>
              <circle
                cx={getX(unit.overallScore)}
                cy={getY(unit.qualityScore)}
                r="12"
                fill={getPerformanceColor(unit.performanceLevel)}
                opacity="0.8"
                className="cursor-pointer hover:opacity-100"
              />
              <text
                x={getX(unit.overallScore)}
                y={getY(unit.qualityScore) - 15}
                fill="#374151"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
              >
                {unit.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="text-sm">
            <div className="font-semibold text-gray-700 mb-2">Performance Level</div>
            <div className="space-y-2">
              {['excellent', 'onTrack', 'belowTarget', 'critical'].map(level => (
                <div key={level} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getPerformanceColor(level) }}
                  />
                  <span className="text-gray-700">{getPerformanceLevelText(level)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-600 self-end">
            Click any point for details
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{data.summary.excellent}</div>
          <div className="text-sm text-gray-600">Excellent</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{data.summary.onTrack}</div>
          <div className="text-sm text-gray-600">On Track</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{data.summary.belowTarget}</div>
          <div className="text-sm text-gray-600">Below Target</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{data.summary.critical}</div>
          <div className="text-sm text-gray-600">Critical</div>
        </div>
      </div>

      <div className="mt-6">
        <DataFreshness 
          lastUpdated="2 hours ago"
          source="Tableau Performance Dashboard"
          status="current"
        />
      </div>
    </div>
  );
}

export default PerformanceDistribution;
