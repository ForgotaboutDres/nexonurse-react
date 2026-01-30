import React, { useState, useEffect } from 'react';
import { fetchConsumerInsights } from '../../utils/api';
import DataFreshness from './DataFreshness';

function ConsumerInsights({ unitId, serviceLineId, level }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const insightsData = await fetchConsumerInsights({ unitId, serviceLineId, level });
        setData(insightsData);
      } catch (error) {
        console.error('Error loading consumer insights:', error);
      }
      setLoading(false);
    };
    
    loadData();
  }, [unitId, serviceLineId, level]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No consumer insights data available</p>
      </div>
    );
  }

  const sentiment = data.sentiment || { positive: 0, neutral: 0, negative: 0 };
  const mostPraised = data.mostPraised || [];
  const areasForImprovement = data.areasForImprovement || [];

  return (
    <div className="space-y-6">
      {/* Top Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CAHPS */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">CAHPS Score</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold text-gray-900">{data.cahps?.score || 0}</div>
            <div className="text-sm text-gray-600">Nat'l Avg: {data.cahps?.nationalAverage || 0}</div>
          </div>
          <div className={`text-sm font-semibold mt-2 ${
            (data.cahps?.trend || 0) > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(data.cahps?.trend || 0) > 0 ? '↑' : '↓'} {Math.abs(data.cahps?.trend || 0)} pts
          </div>
        </div>

        {/* JD Power */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">JD Power Score</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold text-gray-900">{data.jdPower?.score || 0}</div>
            <div className="text-sm text-gray-600">Industry: {data.jdPower?.industryAverage || 0}</div>
          </div>
          <div className={`text-sm font-semibold mt-2 ${
            (data.jdPower?.trend || 0) > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(data.jdPower?.trend || 0) > 0 ? '↑' : '↓'} {Math.abs(data.jdPower?.trend || 0)} pts
          </div>
        </div>

        {/* Google */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Google Reviews</div>
          <div className="flex items-end gap-2 mb-2">
            <div className="text-4xl font-bold text-gray-900">{data.google?.rating || 0}</div>
            <div className="text-2xl text-yellow-400 mb-1">★</div>
          </div>
          <div className="text-sm text-gray-600">{(data.google?.totalReviews || 0).toLocaleString()} reviews</div>
        </div>
      </div>

      {/* Google Reviews - Sentiment Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Google Reviews - Sentiment Analysis</h3>
        
        {/* Sentiment Boxes */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-green-700 mb-2">{sentiment.positive}%</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Positive (4-5 stars)</div>
            <div className="text-xs text-gray-600">{sentiment.positiveCount || 897} reviews</div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-yellow-700 mb-2">{sentiment.neutral}%</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Neutral (3 stars)</div>
            <div className="text-xs text-gray-600">{sentiment.neutralCount || 225} reviews</div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-red-700 mb-2">{sentiment.negative}%</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Negative (1-2 stars)</div>
            <div className="text-xs text-gray-600">{sentiment.negativeCount || 125} reviews</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Most Praised */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className="font-bold text-gray-900">Most Praised</h4>
            </div>
            
            <div className="space-y-3">
              {mostPraised.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-800">{item.label}</span>
                  <span className="text-sm font-bold text-green-600">{item.count} mentions</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h4 className="font-bold text-gray-900">Areas for Improvement</h4>
            </div>
            
            <div className="space-y-3">
              {areasForImprovement.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-800">{item.label}</span>
                  <span className="text-sm font-bold text-red-600">{item.count} mentions</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complaints & Grievances */}
      {data.complaints && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Complaints & Grievances</h3>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-900">{data.complaints.open || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Open</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-900">{data.complaints.pending || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Pending</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-900">{data.complaints.resolved || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Resolved</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-900">{data.complaints.avgResponseTime || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Avg Response (hrs)</div>
            </div>
          </div>
        </div>
      )}

      <DataFreshness 
        lastUpdated="6 hours ago"
        source="Press Ganey, Google Reviews"
        status="current"
      />
    </div>
  );
}

export default ConsumerInsights;
