// COMPLETE mockData.js - Replace your entire mockData.js file with this

// Mock User Data
export const mockUser = {
  id: 'user-001',
  name: 'Sarah Chen',
  title: 'RN, Nurse Manager',
  unit: '4 West',
  unitId: 'unit-4w',
  serviceLineId: 'primary-care',
  lastLogin: 'Today at 8:32 AM'
};

// Priority Queue Data
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

// Quality Metrics Data
export const mockQualityMetricsData = [
  {
    id: 'metric-1',
    name: 'Diabetic A1C Control',
    current: 68,
    target: 75,
    trend: 'down',
    status: 'below',
    description: 'Percentage of diabetic patients with A1C < 8%'
  },
  {
    id: 'metric-2',
    name: 'Post-Discharge Follow-up',
    current: 85,
    target: 80,
    trend: 'up',
    status: 'above',
    description: 'Follow-up within 7 days of discharge'
  },
  {
    id: 'metric-3',
    name: 'Medication Adherence',
    current: 72,
    target: 80,
    trend: 'neutral',
    status: 'below',
    description: 'Patients adherent to prescribed medications'
  }
];

// Staffing Data
export const mockStaffingData = {
  today: {
    scheduled: 12,
    callOuts: 2,
    actual: 10,
    needed: 11,
    status: 'short'
  },
  shifts: [
    { shift: 'AM (7a-3p)', scheduled: 4, actual: 3, needed: 4, status: 'short' },
    { shift: 'PM (3p-11p)', scheduled: 4, actual: 3, needed: 4, status: 'short' },
    { shift: 'Night (11p-7a)', scheduled: 4, actual: 4, needed: 3, status: 'ok' }
  ]
};

// Consumer Insights Data
export const mockConsumerInsightsData = {
  cahps: {
    score: 82,
    nationalAverage: 78,
    trend: 3
  },
  jdPower: {
    score: 867,
    industryAverage: 845,
    trend: 12
  },
  google: {
    rating: 4.3,
    totalReviews: 1247,
    trend: 0.2
  },
  sentiment: {
    positive: 72,
    neutral: 18,
    negative: 10
  },
  complaints: {
    open: 7,
    pending: 4,
    resolved: 23,
    avgResponseTime: 18
  }
};

// Executive Dashboard Data
export const mockExecutiveDashboardData = {
  kpis: {
    serviceLineAverage: 84,
    trend: 6,
    unitsOnTrack: 9,
    totalUnits: 12,
    needsAttention: 3
  }
};

// Access Metrics Data
export const mockAccessMetricsData = {
  sameDayRate: 78,
  sameDayTarget: 85,
  sameDayTrend: 3,
  avgWaitDays: 4.2,
  waitTarget: 3,
  openSlots: 23,
  providers: 8,
  backlog: 47,
  oldestRequest: 12
};

// Staffing Alerts Data
export const mockStaffingAlertsData = {
  criticalAlerts: 2,
  upcomingRisks: 3,
  floatRequests: {
    pending: 2,
    fulfilled: 5,
    failed: 1
  },
  currentCoverage: 89
};

// Weekly Priorities Data
export const mockWeeklyPrioritiesData = {
  author: 'Director Martinez',
  postedDate: 'Monday 8:00 AM',
  primaryFocus: "Diabetic care outreach needs our attention this week.",
  urgentReminder: "RSV vaccines in Fridge A-3 expire on January 25th (Friday).",
  staffingNote: "Next week's schedule has some gaps for PM shifts (Tue/Thu).",
  celebration: "Great work last week on preventive care screenings!"
};

// Performance Distribution Data
export const mockPerformanceDistributionData = {
  units: [
    { id: '11E', name: '11E', overallScore: 69, qualityScore: 69, performanceLevel: 'critical' },
    { id: '10W', name: '10W', overallScore: 72, qualityScore: 72, performanceLevel: 'belowTarget' },
    { id: '5N', name: '5N', overallScore: 92, qualityScore: 88, performanceLevel: 'excellent' }
  ],
  summary: {
    excellent: 2,
    onTrack: 4,
    belowTarget: 2,
    critical: 1
  }
};

// ========================================
// PHASE 3: ROLES DATA
// ========================================
export const mockRoles = [
  {
    id: 'role-super-1',
    name: 'System Administrator',
    level: 'superuser',
    description: 'Full system access with ability to administrate all settings, create checklists, and manage users.',
    visibleMetrics: [
      'Quality Metrics',
      'Access Metrics',
      'Staffing Alerts',
      'Consumer Insights',
      'Performance Distribution',
      'Weekly Priorities',
      'Priority Queue'
    ],
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
    description: 'Manages day-to-day operations of a unit',
    visibleMetrics: [
      'Quality Metrics',
      'Access Metrics', 
      'Staffing Alerts',
      'Consumer Insights',
      'Priority Queue'
    ],
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

// ========================================
// PHASE 3: CHECKLISTS DATA
// ========================================
export const mockChecklists = [
  {
    id: 'cl-1',
    name: 'Monthly Expired Supplies Check',
    description: 'Check all refrigerators and supply rooms for expired medications and supplies',
    category: 'safety',
    items: [
      { type: 'checkbox', label: 'Check Fridge A-3 for expired vaccines', required: true },
      { type: 'checkbox', label: 'Check medication storage room', required: true },
      { type: 'number', label: 'Count expired items found', required: true, parLevel: null, min: 0, max: null },
      { type: 'text', label: 'List any critical expired items', required: false },
      { type: 'date', label: 'Date of oldest expired item', required: false }
    ],
    isRecurring: true,
    frequency: 'monthly',
    nextDue: 'Feb 1, 2026',
    lastSubmitted: 'Jan 1, 2026',
    requiresApproval: false,
    assignedRoles: ['Unit Manager', 'Charge Nurse'],
    estimatedTime: 20,
    submissionCount: 12
  },
  {
    id: 'cl-2',
    name: 'Crash Cart Inspection',
    description: 'Monthly inspection of crash cart equipment',
    category: 'compliance',
    items: [
      { type: 'checkbox', label: 'Check all medications present', required: true },
      { type: 'checkbox', label: 'Verify defibrillator functional', required: true },
      { type: 'number', label: 'Oxygen tank PSI level', required: true, parLevel: 2000, min: 1500, max: 2200 },
      { type: 'date', label: 'Date inspection completed', required: true }
    ],
    isRecurring: true,
    frequency: 'monthly',
    nextDue: 'Feb 1, 2026',
    lastSubmitted: 'Dec 28, 2025',
    requiresApproval: true,
    assignedRoles: ['Unit Manager'],
    estimatedTime: 25,
    submissionCount: 18
  },
  {
    id: 'cl-3',
    name: 'IV Supply Par Level Check',
    description: 'Weekly check of IV supply inventory',
    category: 'inventory',
    items: [
      { type: 'number', label: 'IV Catheters 20g', required: true, parLevel: 50, min: 40, max: 60 },
      { type: 'number', label: 'IV Catheters 22g', required: true, parLevel: 50, min: 40, max: 60 },
      { type: 'number', label: 'Saline Flush 10ml', required: true, parLevel: 100, min: 80, max: 120 }
    ],
    isRecurring: true,
    frequency: 'weekly',
    nextDue: 'Feb 3, 2026',
    lastSubmitted: 'Jan 27, 2026',
    requiresApproval: false,
    assignedRoles: ['Unit Manager', 'Charge Nurse'],
    estimatedTime: 15,
    submissionCount: 48
  }
];

// ========================================
// PHASE 3: CHECKLIST SUBMISSIONS
// ========================================
export const mockChecklistSubmissions = {
  'cl-1': [
    {
      id: 'sub-1',
      checklistId: 'cl-1',
      submittedBy: 'Sarah Chen, RN',
      submittedAt: 'Jan 1, 2026 10:30 AM',
      status: 'approved'
    }
  ],
  'cl-2': [
    {
      id: 'sub-4',
      checklistId: 'cl-2',
      submittedBy: 'David Martinez',
      submittedAt: 'Dec 28, 2025 3:00 PM',
      status: 'pending'
    }
  ]
};

// ========================================
// PHASE 3: ORG HIERARCHY
// ========================================
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
    { id: 'sl-1', name: 'Primary Care', code: 'PC', regionId: 'reg-1', active: true },
    { id: 'sl-2', name: 'Pediatrics', code: 'PED', regionId: 'reg-1', active: true }
  ]
};
