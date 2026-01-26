import React from 'react';

function PerformanceHeatMap({ serviceLineId }) {
  const units = [
    { id: '5n', name: '5 North', manager: 'Lisa Anderson', staff: 20, score: 91, status: 'excellent' },
    { id: '4w', name: '4 West', manager: 'Sarah Chen', staff: 18, score: 88, status: 'excellent' },
    { id: '4e', name: '4 East', manager: 'Marcus Johnson', staff: 16, score: 85, status: 'excellent' },
    { id: '6w', name: '6 West', manager: 'Robert Davis', staff: 19, score: 82, status: 'good' },
    { id: '2s', name: '2 South', manager: 'Amanda Foster', staff: 17, score: 81, status: 'good' },
    { id: '7e', name: '7 East', manager: 'Kevin Park', staff: 21, score: 79, status: 'good' },
    { id: '8n', name: '8 North', manager: 'Rachel Green', staff: 15, score: 78, status: 'good' },
    { id: '1w', name: '1 West', manager: 'Thomas Wright', staff: 18, score: 77, status: 'good' },
    { id: '9s', name: '9 South', manager: 'Diane Miller', staff: 19, score: 76, status: 'good' },
    { id: '3s', name: '3 South', manager: 'Patricia Kim', staff: 22, score: 73, status: 'warning' },
    { id: '10w', name: '10 West', manager: 'James Taylor', staff: 14, score: 68, status: 'warning' },
    { id: '11e', name: '11 East', manager: 'Nicole Brown', staff: 12, score: 64, status: 'critical' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'border-green-500 bg-green-50';
      case 'good': return 'border-blue-400 bg-blue-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'critical': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getScoreBadge = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-600 text-white';
      case 'good': return 'bg-blue-500 text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'critical': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900">Unit Performance Heat Map</h3>
        <p className="text-sm text-gray-600 mt-1">Visual snapshot of performance across all units - January 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {units.map(unit => (
          <div
            key={unit.id}
            className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition ${getStatusColor(unit.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{unit.name}</h4>
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${getScoreBadge(unit.status)}`}>
                {unit.score}%
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-2">{unit.manager}</div>
            <div className="text-xs text-gray-600">{unit.staff} staff</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Excellent (≥85%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600">On Track (75-84%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Below Target (70-74%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Critical (&lt;70%)</span>
        </div>
      </div>
    </div>
  );
}

export default PerformanceHeatMap;
