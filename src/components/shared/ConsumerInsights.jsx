import React, { useState, useEffect } from 'react';
import { fetchConsumerInsights } from '../../utils/api';

function ConsumerInsights({ unitId, serviceLineId, level }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      setLoading(true);
      const data = await fetchConsumerInsights({ unitId, serviceLineId, level });
      setInsights(data);
      setLoading(false);
    };
    
    loadInsights();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading consumer insights...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">CAHPS Survey</h4>
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div className="text-4xl font-bold text-gray-900">{insights.cahps.score}</div>
          <div className="text-sm text-gray-600 mt-1">Top Box Score (0-100)</div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">National Average</span>
              <span className="font-medium">{insights.cahps.nationalAverage}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">vs Last Quarter</span>
              <span className={`font-medium ${insights.cahps.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.cahps.trend > 0 ? '↑' : '↓'} {Math.abs(insights.cahps.trend)} points
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">JD Power Rating</h4>
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <div className="text-4xl font-bold text-gray-900">{insights.jdPower.score}</div>
          <div className="text-sm text-gray-600 mt-1">Overall Score (out of 1000)</div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Industry Average</span>
              <span className="font-medium">{insights.jdPower.industryAverage}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">vs Last Year</span>
              <span className={`font-medium ${insights.jdPower.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.jdPower.trend > 0 ? '↑' : '↓'} {Math.abs(insights.jdPower.trend)} points
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Google Reviews</h4>
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div className="text-4xl font-bold text-gray-900">{insights.google.rating}</div>
          <div className="text-sm text-gray-600 mt-1">Average Rating (out of 5.0)</div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Reviews</span>
              <span className="font-medium">{insights.google.totalReviews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">Last 30 Days</span>
              <span className={`font-medium ${insights.google.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.google.trend > 0 ? '↑' : '↓'} {Math.abs(insights.google.trend).toFixed(1)} stars
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sentiment Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-6">Google Reviews - Sentiment Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">{insights.sentiment.positive}%</div>
            <div className="text-sm text-gray-600 mt-1">Positive (4-5 stars)</div>
            <div className="text-xs text-gray-500 mt-1">{insights.sentiment.positiveCount} reviews</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">{insights.sentiment.neutral}%</div>
            <div className="text-sm text-gray-600 mt-1">Neutral (3 stars)</div>
            <div className="text-xs text-gray-500 mt-1">{insights.sentiment.neutralCount} reviews</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl font-bold text-red-600">{insights.sentiment.negative}%</div>
            <div className="text-sm text-gray-600 mt-1">Negative (1-2 stars)</div>
            <div className="text-xs text-gray-500 mt-1">{insights.sentiment.negativeCount} reviews</div>
          </div>
        </div>

        {/* Common Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Most Praised
            </h4>
            <div className="space-y-2">
              {insights.themes.praised.map(theme => (
                <div key={theme.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">{theme.label}</span>
                  <span className="text-xs font-medium text-green-700">{theme.count} mentions</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              Areas for Improvement
            </h4>
            <div className="space-y-2">
              {insights.themes.improvements.map(theme => (
                <div key={theme.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-gray-700">{theme.label}</span>
                  <span className="text-xs font-medium text-red-700">{theme.count} mentions</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsumerInsights;
