// API utility functions
// In production, these would call real backend APIs

import { 
  mockPriorityQueueData,
  mockQualityMetricsData,
  mockStaffingData,
  mockConsumerInsightsData,
  mockExecutiveDashboardData,
  mockAccessMetricsData,
  mockStaffingAlertsData
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

export async function fetchAccessMetrics({ unitId, serviceLineId, level }) {
  await delay(API_DELAY);
  return mockAccessMetricsData;
}

export async function fetchStaffingAlerts({ unitId, serviceLineId, level }) {
  await delay(API_DELAY);
  return mockStaffingAlertsData;
}
// ==========================================
// ADD THESE TO YOUR api.js FILE
// ==========================================

// Add these imports at the top if not already there:
import {
  mockRoles,
  mockChecklists,
  mockChecklistSubmissions
} from './mockData';

// ==========================================
// ROLE MANAGEMENT API FUNCTIONS
// ==========================================

export async function fetchRoles() {
  await delay(API_DELAY);
  return mockRoles;
}

export async function saveRole(roleData) {
  await delay(API_DELAY);
  console.log('Saving role:', roleData);
  return { success: true, roleId: `role-${Date.now()}` };
}

export async function deleteRole(roleId) {
  await delay(API_DELAY);
  console.log('Deleting role:', roleId);
  return { success: true };
}

// ==========================================
// CHECKLIST API FUNCTIONS
// ==========================================

export async function fetchChecklists(filters = {}) {
  await delay(API_DELAY);
  let checklists = [...mockChecklists];
  
  // Filter if needed
  if (filters.isRecurring !== undefined) {
    checklists = checklists.filter(c => c.isRecurring === filters.isRecurring);
  }
  
  return checklists;
}

export async function saveChecklist(checklistData) {
  await delay(API_DELAY);
  console.log('Saving checklist:', checklistData);
  return { success: true, checklistId: `cl-${Date.now()}` };
}

export async function deleteChecklist(checklistId) {
  await delay(API_DELAY);
  console.log('Archiving checklist:', checklistId);
  return { success: true };
}

export async function getChecklistSubmissions(checklistId) {
  await delay(API_DELAY);
  return mockChecklistSubmissions[checklistId] || [];
}

// ==========================================
// ORGANIZATION HIERARCHY API FUNCTIONS
// ==========================================

export async function fetchOrgHierarchy() {
  await delay(API_DELAY);
  return mockOrgHierarchy;
}

export async function saveOrgHierarchy(data) {
  await delay(API_DELAY);
  console.log('Saving org hierarchy:', data);
  return { success: true };
}