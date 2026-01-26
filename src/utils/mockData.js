// Mock data for development and demo purposes
// In production, this data would come from real APIs

export const mockUser = {
  id: 'user-001',
  name: 'Sarah Chen, RN',
  title: 'Nurse Manager - 4 West',
  role: 'manager',
  unitId: 'unit-4west',
  serviceLineId: 'primary-care',
  defaultView: 'manager',
  lastLogin: 'Today, 7:45 AM'
};

export const mockPriorityQueueData = [
  {
    id: 'task-001',
    title: 'PM shift coverage gap - 1 RN needed',
    category: 'STAFFING',
    dueDate: '2026-01-16',
    estimatedTime: 20,
    impact: 'critical',
    priority: 'critical'
  },
  {
    id: 'task-002',
    title: 'Diabetic A1C outreach - 15 patients overdue',
    category: 'POPULATION HEALTH',
    dueDate: '2026-01-16',
    estimatedTime: 45,
    impact: 'high',
    priority: 'critical'
  },
  {
    id: 'task-003',
    title: 'Medication prior authorizations pending (12)',
    category: 'MEDICATIONS',
    dueDate: '2026-01-16',
    estimatedTime: 90,
    impact: 'high',
    priority: 'critical'
  },
  {
    id: 'task-004',
    title: 'Post-discharge follow-up calls (8 patients)',
    category: 'POPULATION HEALTH',
    dueDate: '2026-01-16',
    estimatedTime: 60,
    impact: 'high',
    priority: 'high'
  },
  {
    id: 'task-005',
    title: 'Monthly compliance checklist - Q1 2026',
    category: 'ADMIN',
    dueDate: '2026-01-31',
    estimatedTime: 45,
    impact: 'medium',
    priority: 'high'
  }
];

export const mockQualityMetricsData = [
  {
    id: 'metric-001',
    name: 'Diabetic A1C Testing',
    current: 68,
    target: 80,
    trend: -7,
    trendLabel: 'Declining',
    status: 'needs-attention',
    statusLabel: 'Needs Attention'
  },
  {
    id: 'metric-002',
    name: 'Post-Discharge Follow-up',
    current: 85,
    target: 90,
    trend: 6,
    trendLabel: 'Improving',
    status: 'on-track',
    statusLabel: 'On Track'
  },
  {
    id: 'metric-003',
    name: 'Medication Adherence',
    current: 72,
    target: 85,
    trend: 0,
    trendLabel: 'Stable',
    status: 'needs-attention',
    statusLabel: 'Needs Attention'
  },
  {
    id: 'metric-004',
    name: 'Preventive Care Completion',
    current: 91,
    target: 90,
    trend: 12,
    trendLabel: 'Improving',
    status: 'exceeds',
    statusLabel: 'Exceeds Target'
  }
];

export const mockStaffingData = {
  scheduled: 12,
  callOuts: 2,
  actual: 10,
  needed: 11,
  alert: {
    title: 'Staffing Alert: Short 1 RN',
    message: 'Immediate action needed - Check float pool or adjust schedules'
  },
  shifts: [
    {
      id: 'shift-am',
      name: 'AM (7a-3p)',
      actual: 3,
      needed: 4,
      status: 'short',
      statusLabel: 'Short 1'
    },
    {
      id: 'shift-pm',
      name: 'PM (3p-11p)',
      actual: 3,
      needed: 4,
      status: 'short',
      statusLabel: 'Short 1'
    },
    {
      id: 'shift-night',
      name: 'Night (11p-7a)',
      actual: 4,
      needed: 3,
      status: 'ok',
      statusLabel: 'OK'
    }
  ]
};

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
    positiveCount: 897,
    neutral: 18,
    neutralCount: 225,
    negative: 10,
    negativeCount: 125
  },
  themes: {
    praised: [
      { id: 'theme-1', label: 'Caring nursing staff', count: 348 },
      { id: 'theme-2', label: 'Clean facilities', count: 287 },
      { id: 'theme-3', label: 'Skilled doctors', count: 265 },
      { id: 'theme-4', label: 'Quick service', count: 198 }
    ],
    improvements: [
      { id: 'theme-5', label: 'Long wait times', count: 89 },
      { id: 'theme-6', label: 'Parking difficulties', count: 67 },
      { id: 'theme-7', label: 'Billing confusion', count: 54 },
      { id: 'theme-8', label: 'Noise levels', count: 43 }
    ]
  }
};

export const mockExecutiveDashboardData = {
  serviceLineAverage: 84,
  serviceLineTrend: 6,
  totalUnits: 12,
  unitsOnTrack: 9,
  needsAttention: 3,
  upcomingMilestones: 5,
  areasOfConcern: [
    {
      id: 'unit-11east',
      name: '11 East',
      manager: 'Nicole Brown',
      staffCount: 12,
      performance: 64,
      severity: 'critical',
      status: 'Critical Performance Decline',
      issue: '9% decline in completion rate over past month. Average task completion time has increased from 5.2 to 8.3 days. 23 overdue items.',
      factors: 'Recent staffing shortage (3 nurses on extended leave), high patient volume, delayed equipment maintenance.',
      primaryAction: 'Schedule 1-on-1',
      secondaryAction: 'Request Float Support'
    },
    {
      id: 'unit-10west',
      name: '10 West',
      manager: 'James Taylor',
      staffCount: 14,
      performance: 68,
      severity: 'warning',
      status: 'Below Target',
      issue: 'Consistent underperformance for 2 consecutive months. Compliance checks frequently delayed.',
      factors: 'New manager (3 months tenure), need for additional training on system processes.',
      primaryAction: 'Assign Mentor',
      secondaryAction: 'Training Plan'
    },
    {
      id: 'unit-3south',
      name: '3 South',
      manager: 'Patricia Kim',
      staffCount: 22,
      performance: 73,
      severity: 'warning',
      status: 'Trending Downward',
      issue: 'Performance declining for 3 weeks straight (79% → 76% → 73%). Watch closely.',
      factors: 'Staffing coordination issues, delayed handoffs between shifts.',
      primaryAction: 'Monitor Closely',
      secondaryAction: 'Process Review'
    }
  ],
  successStories: [
    {
      id: 'unit-5north',
      name: '5 North',
      manager: 'Lisa Anderson',
      staffCount: 20,
      performance: 91,
      status: 'Top Performer',
      achievement: 'Highest completion rate service line-wide. 3% improvement over last month. Average completion time reduced to 3.8 days.',
      practices: 'Daily 5-minute standup meetings, peer task review system, proactive float pool coordination.'
    },
    {
      id: 'unit-4east',
      name: '4 East',
      manager: 'Marcus Johnson',
      staffCount: 16,
      performance: 85,
      status: 'Biggest Improvement',
      achievement: '7% improvement month-over-month. Turned around from struggling (78%) to strong performance (85%).',
      practices: 'Implemented color-coded priority system, automated reminders for monthly checks, cross-training program.'
    }
  ]
};
