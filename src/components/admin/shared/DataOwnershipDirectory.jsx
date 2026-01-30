import React, { useState } from 'react';

function DataOwnershipDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  const dataSources = [
    {
      id: 'ds-1',
      name: 'Quality Metrics',
      description: 'HEDIS measures, A1C control, medication adherence',
      owner: 'Quality Department',
      contact: 'quality@hospital.org',
      system: 'Tableau Quality Dashboard',
      accessUrl: 'https://tableau.hospital.org/quality',
      requestAccess: 'Submit ticket to IT Help Desk (#quality-access)',
      updateFrequency: 'Daily at 6:00 AM',
      dataType: 'Clinical Metrics',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'ds-2',
      name: 'Staffing Data',
      description: 'Schedules, call-outs, float pool requests, coverage',
      owner: 'HR Operations',
      contact: 'hr-ops@hospital.org',
      system: 'Insight Scheduling Platform',
      accessUrl: 'https://insight.kaiserpermanente.org',
      requestAccess: 'Manager approval required - contact hr-ops@hospital.org',
      updateFrequency: 'Real-time',
      dataType: 'HR Data',
      lastUpdated: 'Live'
    },
    {
      id: 'ds-3',
      name: 'Access Metrics',
      description: 'Same-day access, wait times, appointment availability',
      owner: 'Operations',
      contact: 'ops@hospital.org',
      system: 'Epic Reporting',
      accessUrl: 'https://epic.hospital.org/reports',
      requestAccess: 'Request through Epic UserWeb',
      updateFrequency: 'Hourly',
      dataType: 'Operational Metrics',
      lastUpdated: '45 min ago'
    },
    {
      id: 'ds-4',
      name: 'Consumer Insights (CAHPS, JD Power)',
      description: 'Patient satisfaction scores, survey responses',
      owner: 'Patient Experience',
      contact: 'patient-experience@hospital.org',
      system: 'Press Ganey Dashboard',
      accessUrl: 'https://pressganey.hospital.org',
      requestAccess: 'Email patient-experience@hospital.org for access',
      updateFrequency: 'Monthly on 5th',
      dataType: 'Patient Satisfaction',
      lastUpdated: 'Jan 5, 2026'
    },
    {
      id: 'ds-5',
      name: 'Financial Data',
      description: 'Budget, expenses, revenue, cost per patient',
      owner: 'Finance Department',
      contact: 'finance@hospital.org',
      system: 'Oracle Financial Cloud',
      accessUrl: 'https://oracle.hospital.org/finance',
      requestAccess: 'VP approval required - contact finance@hospital.org',
      updateFrequency: 'Daily at midnight',
      dataType: 'Financial',
      lastUpdated: '12 hours ago'
    },
    {
      id: 'ds-6',
      name: 'Complaints & Grievances',
      description: 'Patient complaints, grievance tracking, resolution status',
      owner: 'Risk Management',
      contact: 'risk-mgmt@hospital.org',
      system: 'RLDatix',
      accessUrl: 'https://datix.hospital.org',
      requestAccess: 'Manager level or above - auto-approved',
      updateFrequency: 'Real-time',
      dataType: 'Risk Management',
      lastUpdated: 'Live'
    },
    {
      id: 'ds-7',
      name: 'Performance Scorecards',
      description: 'Unit performance scores, benchmarking data',
      owner: 'Performance Improvement',
      contact: 'pi@hospital.org',
      system: 'Power BI',
      accessUrl: 'https://powerbi.hospital.org',
      requestAccess: 'Self-service - sign in with SSO',
      updateFrequency: 'Weekly on Monday',
      dataType: 'Performance Metrics',
      lastUpdated: 'Jan 27, 2026'
    }
  ];

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Ownership Directory</h2>
        <p className="text-gray-600 mb-4">
          Find out who owns each data source, how to get access, and when it's updated.
        </p>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search data sources..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Data Sources */}
      <div className="space-y-4">
        {filteredSources.map(source => (
          <div key={source.id} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-colors overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{source.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {source.dataType}
                    </span>
                  </div>
                  <p className="text-gray-600">{source.description}</p>
                </div>
                <div className="ml-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    {source.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Owner */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600 uppercase">Data Owner</span>
                  </div>
                  <div className="font-semibold text-gray-900">{source.owner}</div>
                  <a href={`mailto:${source.contact}`} className="text-sm text-blue-600 hover:text-blue-700">
                    {source.contact}
                  </a>
                </div>

                {/* System */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600 uppercase">System</span>
                  </div>
                  <div className="font-semibold text-gray-900">{source.system}</div>
                  <a href={source.accessUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
                    Access System →
                  </a>
                </div>

                {/* How to Request Access */}
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-semibold text-yellow-800 uppercase">How to Get Access</span>
                  </div>
                  <div className="text-sm text-yellow-900">{source.requestAccess}</div>
                </div>

                {/* Update Frequency */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-blue-800 uppercase">Update Frequency</span>
                  </div>
                  <div className="text-sm text-blue-900">{source.updateFrequency}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a 
                  href={source.accessUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center"
                >
                  Access Data Source
                </a>
                <a 
                  href={`mailto:${source.contact}`}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-center"
                >
                  Contact Owner
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No data sources found</h3>
          <p className="text-gray-600">Try a different search term</p>
        </div>
      )}
    </div>
  );
}

export default DataOwnershipDirectory;
