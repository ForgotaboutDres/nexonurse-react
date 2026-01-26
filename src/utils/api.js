// API utility functions
// In production, these would call real backend APIs

import { 
  mockPriorityQueueData,
  mockQualityMetricsData,
  mockStaffingData,
  mockConsumerInsightsData,
  mockExecutiveDashboardData
} from './mockData';

const API_DELAY = 500; // Simulate network delay

// Simulate API call delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchPriorityQueue(unitId, filters = {}) {
  await delay(API_DELAY);
  
  let tasks = [...mockPriorityQueueData];
  
  // Apply filters
  if (filters.timeframe === 'today') {
    tasks = tasks.filter(t => t.dueDate === '2026-01-16');
  } else if (filters.timeframe === 'week') {
    // Keep all tasks for demo
  }
  
  if (filters.priority !== 'all') {
    tasks = tasks.filter(t => t.priority === filters.priority);
  }
  
  return tasks;
}

export async function fetchQualityMetrics({ unitId, serviceLineId, level }) {
  await delay(API_DELAY);
  return mockQualityMetricsData;
}

export async function fetchStaffing({ unitId, serviceLineId, level }) {
  await delay(API_DELAY);
  return mockStaffingData;
}

export async function fetchConsumerInsights({ unitId, serviceLineId, level }) {
  await delay(API_DELAY);
  return mockConsumerInsightsData;
}

export async function fetchExecutiveDashboard(serviceLineId) {
  await delay(API_DELAY);
  return mockExecutiveDashboardData;
}

export async function fetchPerformanceHeatMap(serviceLineId) {
  await delay(API_DELAY);
  // Return heat map data
  return [];
}

// Add more API functions as needed
