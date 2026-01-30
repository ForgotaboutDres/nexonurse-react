// COMPLETE mockData.js - COPY THIS ENTIRE FILE TO src/utils/mockData.js

// ==========================================
// USER DATA
// ==========================================
export const mockUser = {
  id: 'user-001',
  name: 'Sarah Chen',
  title: 'RN, Nurse Manager',
  unit: '4 West',
  unitId: 'unit-4w',
  serviceLineId: 'primary-care',
  lastLogin: 'Today at 8:32 AM'
};

// ==========================================
// PRIORITY QUEUE DATA
// ==========================================
export const mockPriorityQueueData = [
  {
    id: 'task-001',
    category: 'Quality Metrics',
    title: 'Complete diabetic A1C outreach for 12 patients',
    dueDate: 'Today',
    estimatedTime: 45,
    priority: 'critical',
    impact: 'High - affects monthly quality score'
  },
  {
    id: 'task-002',
    category: 'Medication Safety',
    title: 'Review and dispose of expired RSV vaccines in Fridge A-3',
    dueDate: 'By EOD Wednesday',
    estimatedTime: 20,
    priority: 'critical',
    impact: 'Safety compliance required'
  },
  {
    id: 'task-003',
    category: 'Staffing',
    title: 'Coordinate PM shift coverage for Thursday (2 RN call-outs)',
    dueDate: 'Tomorrow',
    estimatedTime: 30,
    priority: 'high',
    impact: 'Patient safety - staffing ratio'
  }
];

// ==========================================
// QUALITY METRICS DATA
// ==========================================
export const mockQualityMetricsData = [
  {
    id: 'metric-1',
    name: 'Diabetic A1C Control',
    current: 68,
    target: 75,
    trend: 'down',
    status: 'below'
  },
  {
    id: 'metric-2',
    name: 'Post-Discharge Follow-up',
    current: 85,
    target: 80,
    trend: 'up',
    status: 'above'
  },
  {
    id: 'metric-3',
    name: 'Medication Adherence',
    current: 72,
    target: 80,
    trend: 'neutral',
    status: 'below'
  }
];

// ==========================================
// STAFFING DATA
// ==========================================
export const mockStaffingData = {
  today: {
    scheduled: 12,
    callOuts: 2,
    actual: 10,
    needed: 11,
    status: 'short'
  }
};

// ==========================================
// CONSUMER INSIGHTS DATA
// ==========================================
export const mockConsumerInsightsData = {
  cahps: { score: 82, nationalAverage: 78, trend: 3 },
  jdPower: { score: 867, industryAverage: 845, trend: 12 },
  google: { rating: 4.3, totalReviews: 1247, trend: 0.2 }
};

// ==========================================
// EXECUTIVE DASHBOARD DATA
// ==========================================

export const mockExecutiveDashboardData = {
  kpis: {
    serviceLineAverage: 84,
    trend: 6,
    unitsOnTrack: 9,
    totalUnits: 12,
    needsAttention: 3
  },
  topPerformers: [
    {
      id: 'unit-5n',
      name: '5 North',
      manager: 'Jennifer Martinez',
      score: 92,
      highlight: 'Excellent diabetic care metrics'
    },
    {
      id: 'unit-3w',
      name: '3 West',
      manager: 'David Chen',
      score: 89,
      highlight: 'Outstanding patient satisfaction'
    },
    {
      id: 'unit-7e',
      name: '7 East',
      manager: 'Sarah Williams',
      score: 87,
      highlight: 'Strong access metrics'
    }
  ],
  needsAttention: [
    {
      id: 'unit-11e',
      name: '11 East',
      manager: 'Michael Brown',
      score: 69,
      target: 75,
      issue: 'Quality metrics below target'
    },
    {
      id: 'unit-10w',
      name: '10 West',
      manager: 'Lisa Anderson',
      score: 72,
      target: 75,
      issue: 'Staffing challenges affecting performance'
    }
  ],
  keyInsights: [
    {
      title: 'Diabetic Care Trending Down',
      description: 'Service line average for A1C control dropped from 75% to 68%. Focus needed.'
    },
    {
      title: 'Staffing Pressures',
      description: 'Multiple units reporting call-out issues. Consider float pool expansion.'
    },
    {
      title: 'Patient Satisfaction Strong',
      description: 'CAHPS scores up 3 points. Keep up the excellent work!'
    }
  ],
  upcomingPriorities: [
    {
      text: 'Monthly Quality Review Meeting',
      dueDate: 'Feb 5'
    },
    {
      text: 'Budget Review for Q1',
      dueDate: 'Feb 10'
    },
    {
      text: 'Staffing Model Analysis',
      dueDate: 'Feb 15'
    }
  ]
};

// ==========================================
// ACCESS METRICS DATA
// ==========================================
export const mockAccessMetricsData = {
  sameDayRate: 78,
  sameDayTarget: 85,
  sameDayTrend: 3,
  avgWaitDays: 4.2,
  waitTarget: 3,
  openSlots: 23,
  providers: 8,
  backlog: 47,
  oldestRequest: 12,
  waitByType: {
    primary: 3.1,
    specialty: 6.8,
    urgent: 0.5
  },
  providerAvailability: [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Primary Care', openSlots: 5, total: 16 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Primary Care', openSlots: 3, total: 16 }
  ]
};

// ==========================================
// STAFFING ALERTS DATA
// ==========================================
export const mockStaffingAlertsData = {
  criticalAlerts: 2,
  upcomingRisks: 3,
  floatRequests: {
    pending: 2,
    fulfilled: 5,
    failed: 1
  },
  currentCoverage: 89,
  staffNeeded: 18,
  staffScheduled: 16,
  activeAlerts: [
    {
      id: 'alert-001',
      severity: 'critical',
      title: 'PM Shift Coverage Gap - 2 RNs Short',
      timeframe: 'Today, 3:00 PM - 11:00 PM',
      description: '2 call-outs for PM shift. Currently short 2 RNs.',
      impact: 'High patient-to-nurse ratio',
      recommendation: 'Request float pool immediately',
      actions: ['Request Float Pool', 'View in Insight']
    },
    {
      id: 'alert-002',
      severity: 'high',
      title: 'Upcoming Coverage Risk - Thursday',
      timeframe: 'Thursday, Jan 30',
      description: '3 staff on PTO, below minimum coverage',
      impact: 'May need to close beds',
      recommendation: 'Review schedule and request coverage',
      actions: ['Adjust Schedule']
    }
  ]
};

// ==========================================
// WEEKLY PRIORITIES DATA
// ==========================================
export const mockWeeklyPrioritiesData = {
  author: 'Director Martinez',
  postedDate: 'Monday 8:00 AM',
  primaryFocus: "Diabetic care outreach needs our attention this week.",
  urgentReminder: "RSV vaccines in Fridge A-3 expire on January 25th (Friday).",
  staffingNote: "Next week's schedule has some gaps for PM shifts (Tue/Thu).",
  celebration: "Great work last week on preventive care screenings!"
};

// ==========================================
// PERFORMANCE DISTRIBUTION DATA
// ==========================================
export const mockPerformanceDistributionData = {
  units: [
    { id: '11E', name: '11E', overallScore: 69, qualityScore: 69, performanceLevel: 'critical' },
    { id: '10W', name: '10W', overallScore: 72, qualityScore: 72, performanceLevel: 'belowTarget' },
    { id: '5N', name: '5N', overallScore: 92, qualityScore: 88, performanceLevel: 'excellent' }
  ],
  summary: { excellent: 2, onTrack: 4, belowTarget: 2, critical: 1 }
};

// ==========================================
// PHASE 3: ROLES DATA
// ==========================================
export const mockRoles = [
  {
    id: 'role-super-1',
    name: 'System Administrator',
    level: 'superuser',
    description: 'Full system access with ability to administrate all settings.',
    visibleMetrics: ['Quality Metrics', 'Access Metrics', 'Staffing Alerts'],
    permissions: {
      viewDashboard: true,
      editData: true,
      manageUsers: true,
      configureSystem: true,
      createChecklists: true,
      manageRoles: true
    },
    userCount: 2,
    isSystem: true,
    createdDate: 'Jan 2026'
  },
  {
    id: 'role-1',
    name: 'Unit Manager',
    level: 'manager',
    description: 'Manages day-to-day operations',
    visibleMetrics: ['Quality Metrics', 'Access Metrics', 'Staffing Alerts'],
    permissions: {
      viewDashboard: true,
      editData: true,
      manageUsers: false,
      configureSystem: false,
      createChecklists: false,
      manageRoles: false
    },
    userCount: 15,
    isSystem: true,
    createdDate: 'Jan 2026'
  }
];

// ==========================================
// PHASE 3: CHECKLISTS DATA
// ==========================================
export const mockChecklists = [
  {
    id: 'cl-1',
    name: 'Monthly Expired Supplies Check',
    description: 'Check all refrigerators for expired items',
    category: 'safety',
    items: [
      { type: 'checkbox', label: 'Check Fridge A-3', required: true },
      { type: 'number', label: 'Count expired items', required: true, parLevel: null, min: 0, max: null }
    ],
    isRecurring: true,
    frequency: 'monthly',
    nextDue: 'Feb 1, 2026',
    lastSubmitted: 'Jan 1, 2026',
    requiresApproval: false,
    assignedRoles: ['Unit Manager'],
    estimatedTime: 20,
    submissionCount: 12
  }
];

// ==========================================
// PHASE 3: CHECKLIST SUBMISSIONS
// ==========================================
export const mockChecklistSubmissions = {
  'cl-1': [
    {
      id: 'sub-1',
      checklistId: 'cl-1',
      submittedBy: 'Sarah Chen, RN',
      submittedAt: 'Jan 1, 2026 10:30 AM',
      status: 'approved'
    }
  ]
};

// ==========================================
// PHASE 3: ORG HIERARCHY
// ==========================================
export const mockOrgHierarchy = {
  markets: [
    { id: 'mkt-1', name: 'Mid-Atlantic Market', code: 'MA', active: true }
  ],
  regions: [
    { id: 'reg-1', name: 'Columbia Medical Center', marketId: 'mkt-1', code: 'CMC', active: true }
  ],
  buildings: [
    { id: 'bld-1', name: '4 West Medical Office', regionId: 'reg-1', address: '10710 Charter Dr, Columbia, MD', active: true }
  ],
  serviceLines: [
    { id: 'sl-1', name: 'Primary Care', code: 'PC', regionId: 'reg-1', active: true }
  ]
};
