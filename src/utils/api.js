// API utility functions for NexoNurse
// Fixed version - all imports at top

// ==========================================
// IMPORTS - ALL AT TOP
// ==========================================
import {
  mockUser,
  mockPriorityQueueData,
  mockQualityMetricsData,
  mockStaffingData,
  mockConsumerInsightsData,
  mockAccessMetricsData,
  mockStaffingAlertsData,
  mockWeeklyPrioritiesData,
  mockPerformanceDistributionData,
  mockExecutiveDashboardData,
  mockRoles,
  mockChecklists,
  mockChecklistSubmissions,
  mockOrgHierarchy
} from './mockData';

// ==========================================
// CONFIG
// ==========================================
const API_DELAY = 500; // Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// USER API
// ==========================================
export async function fetchUser() {
  await delay(API_DELAY);
  return mockUser;
}

// ==========================================
// PRIORITY QUEUE API
// ==========================================
export async function fetchPriorityQueue(filters = {}) {
  await delay(API_DELAY);
  return mockPriorityQueueData;
}

// ==========================================
// QUALITY METRICS API
// ==========================================
export async function fetchQualityMetrics(filters = {}) {
  await delay(API_DELAY);
  return mockQualityMetricsData;
}

// ==========================================
// STAFFING API
// ==========================================
export async function fetchStaffing(filters = {}) {
  await delay(API_DELAY);
  return mockStaffingData;
}

// ==========================================
// CONSUMER INSIGHTS API
// ==========================================
export async function fetchConsumerInsights(filters = {}) {
  await delay(API_DELAY);
  return mockConsumerInsightsData;
}

// ==========================================
// ACCESS METRICS API
// ==========================================
export async function fetchAccessMetrics(filters = {}) {
  await delay(API_DELAY);
  return mockAccessMetricsData;
}

// ==========================================
// STAFFING ALERTS API
// ==========================================
export async function fetchStaffingAlerts(filters = {}) {
  await delay(API_DELAY);
  return mockStaffingAlertsData;
}

// ==========================================
// WEEKLY PRIORITIES API
// ==========================================
export async function fetchWeeklyPriorities(filters = {}) {
  await delay(API_DELAY);
  return mockWeeklyPrioritiesData;
}

// ==========================================
// PERFORMANCE DISTRIBUTION API
// ==========================================
export async function fetchPerformanceDistribution(filters = {}) {
  await delay(API_DELAY);
  return mockPerformanceDistributionData;
}

// ==========================================
// EXECUTIVE DASHBOARD API
// ==========================================
export async function fetchExecutiveDashboard(serviceLineId) {
  await delay(API_DELAY);
  return mockExecutiveDashboardData;
}

// ==========================================
// ROLE MANAGEMENT API
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
// CHECKLIST API
// ==========================================
export async function fetchChecklists(filters = {}) {
  await delay(API_DELAY);
  let checklists = [...mockChecklists];
  
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
// ORG HIERARCHY API
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
