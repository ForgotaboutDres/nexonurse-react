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
        console.log('Consumer Insights Data:', insightsData); // DEBUG
        setData(insightsData);
      } catch (error) {
        console.error('Error loading consumer insights:', error);
        setData({
          cahps: { score: 0, nationalAverage: 0, trend: 0 },
          jdPower: { score: 0, industryAverage: 0, trend: 0 },
          google: { rating: 0, totalReviews: 0, trend: 0 },
          sentiment: { positive: 0, neutral: 0, negative: 0 },
          complaints: { open: 0, pending: 0, resolved: 0, avgResponseTime: 0 }
        });
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
        <p className="text-gray-600">No consumer insights data available</p>
      </div>
    );
  }

  const cahps = data.cahps || { score: 0, nationalAverage: 0, trend: 0 };
  const jdPower = data.jdPower || { score: 0, industryAverage: 0, trend: 0 };
  const google = data.google || { rating: 0, totalReviews: 0, trend: 0 };
  const sentiment = data.sentiment || { positive: 0, neutral: 0, negative: 0 };
  const complaints = data.complaints || { open: 0, pending: 0, resolved: 0, avgResponseTime: 0 };

  return (
    <div className="space-y-6">
      {/* CAHPS Score */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">CAHPS Score</h3>
            <p className="text-sm text-gray-600">Consumer Assessment of Healthcare Providers</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{cahps.score}</div>
            <div className="text-sm text-gray-600">National Avg: {cahps.nationalAverage}</div>
            <div className={`text-sm font-semibold ${
              cahps.trend > 0 ? 'text-green-600' : cahps.trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {cahps.trend > 0 ? '↑' : cahps.trend < 0 ? '↓' : '→'} {Math.abs(cahps.trend)} pts
            </div>
          </div>
        </div>
      </div>

      {/* JD Power Score */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">JD Power Score</h3>
            <p className="text-sm text-gray-600">Member Satisfaction Index</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{jdPower.score}</div>
            <div className="text-sm text-gray-600">Industry Avg: {jdPower.industryAverage}</div>
            <div className={`text-sm font-semibold ${
              jdPower.trend > 0 ? 'text-green-600' : jdPower.trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {jdPower.trend > 0 ? '↑' : jdPower.trend < 0 ? '↓' : '→'} {Math.abs(jdPower.trend)} pts
            </div>
          </div>
        </div>
      </div>

      {/* Google Reviews */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Google Reviews</h3>
            <p className="text-sm text-gray-600">Public online ratings</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-gray-900">{google.rating}</div>
              <div className="text-yellow-500 text-2xl">★</div>
            </div>
            <div className="text-sm text-gray-600">{google.totalReviews.toLocaleString()} reviews</div>
            <div className={`text-sm font-semibold ${
              google.trend > 0 ? 'text-green-600' : google.trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {google.trend > 0 ? '↑' : google.trend < 0 ? '↓' : '→'} {Math.abs(google.trend).toFixed(1)} stars
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Sentiment</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Positive</span>
              <span className="text-sm font-bold text-green-600">{sentiment.positive}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full" 
                style={{ width: `${sentiment.positive}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Neutral</span>
              <span className="text-sm font-bold text-gray-600">{sentiment.neutral}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gray-400 h-3 rounded-full" 
                style={{ width: `${sentiment.neutral}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Negative</span>
              <span className="text-sm font-bold text-red-600">{sentiment.negative}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full" 
                style={{ width: `${sentiment.negative}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complaints & Grievances */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaints & Grievances</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-900">{complaints.open || 0}</div>
            <div className="text-sm text-gray-600">Open</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-900">{complaints.pending || 0}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-900">{complaints.resolved || 0}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-900">{complaints.avgResponseTime || 0}</div>
            <div className="text-sm text-gray-600">Avg Response (hrs)</div>
          </div>
        </div>
      </div>

      <DataFreshness 
        lastUpdated="6 hours ago"
        source="Press Ganey, Google Reviews"
        status="current"
      />
    </div>
  );
}

export default ConsumerInsights;
