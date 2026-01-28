import React, { useState, useEffect } from 'react';
import { fetchWeeklyPriorities } from '../../utils/api';
import DataFreshness from './DataFreshness';

function WeeklyPriorities({ unitId, serviceLineId, level }) {
  const [priorities, setPriorities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPriorities = async () => {
      setLoading(true);
      const data = await fetchWeeklyPriorities({ unitId, serviceLineId, level });
      setPriorities(data);
      setLoading(false);
    };
    
    loadPriorities();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading priorities...</div>;
  }

  return (
    <div className="space-y-4">
      {/* This Week's Priorities from Director */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">This Week's Priorities</h3>
            <p className="text-sm text-gray-700 mt-1">
              From {priorities.author} • Posted {priorities.postedDate}
            </p>
          </div>
        </div>

        {/* Primary Focus */}
        <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-gray-900 text-lg mb-2">Primary Focus:</h4>
          <p className="text-gray-800 leading-relaxed">{priorities.primaryFocus}</p>
        </div>

        {/* Urgent Reminder */}
        {priorities.urgentReminder && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-red-900 mb-1">Urgent Reminder:</h4>
                <p className="text-red-800">{priorities.urgentReminder}</p>
              </div>
            </div>
          </div>
        )}

        {/* Staffing Note */}
        {priorities.staffingNote && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-yellow-900 mb-1">Staffing Note:</h4>
                <p className="text-yellow-800">{priorities.staffingNote}</p>
              </div>
            </div>
          </div>
        )}

        {/* Celebration */}
        {priorities.celebration && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-green-800 italic">{priorities.celebration}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <DataFreshness 
            lastUpdated={priorities.postedDate}
            source="Director Communication"
            status="current"
          />
        </div>
      </div>

      {/* Previous Messages Archive */}
      {priorities.previousMessages && priorities.previousMessages.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Previous Messages</h3>
          <div className="space-y-3">
            {priorities.previousMessages.map((msg, idx) => (
              <div key={idx} className="border-l-2 border-gray-300 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{msg.subject}</span>
                  <span className="text-sm text-gray-500">{msg.date}</span>
                </div>
                <p className="text-sm text-gray-600">{msg.preview}</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                  Read full message →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyPriorities;
