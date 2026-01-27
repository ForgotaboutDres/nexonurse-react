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
  complaints: {
    open: 7,
    pending: 4,
    resolved: 23,
    avgResponseTime: 18,
    active: [
      {
        id: 'c001',
        caseNumber: '2026-0123',
        priority: 'urgent',
        category: 'Wait Time',
        summary: 'Patient waited 4 hours in ER with chest pain before being seen',
        status: 'new',
        dateSubmitted: 'Jan 24, 2026',
        daysOpen: 2,
        assignedTo: 'J. Martinez'
      },
      {
        id: 'c002',
        caseNumber: '2026-0118',
        priority: 'high',
        category: 'Staff Behavior',
        summary: 'Complaint about RN being dismissive during discharge instructions',
        status: 'investigating',
        dateSubmitted: 'Jan 21, 2026',
        daysOpen: 5,
        assignedTo: 'S. Chen'
      },
      {
        id: 'c003',
        caseNumber: '2026-0115',
        priority: 'high',
        category: 'Billing Issues',
        summary: 'Incorrect charges for services not received, patient disputing $2,300',
        status: 'investigating',
        dateSubmitted: 'Jan 19, 2026',
        daysOpen: 7,
        assignedTo: 'Billing Dept'
      }
    ],
    byCategory: [
      { id: 1, category: 'Wait Time', count: 12, trend: 8 },
      { id: 2, category: 'Staff Behavior', count: 8, trend: -5 },
      { id: 3, category: 'Billing Issues', count: 7, trend: 15 },
      { id: 4, category: 'Cleanliness', count: 4, trend: -10 },
      { id: 5, category: 'Communication', count: 6, trend: 0 },
      { id: 6, category: 'Other', count: 3, trend: -20 }
    ]
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

// Access Metrics Data
export const mockAccessMetricsData = {
  sameDayRate: 78,
  sameDayTarget: 85,
  sameDayTrend: 3,
  sameDayThisWeek: 156,
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
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Primary Care', openSlots: 5, booked: 11, total: 16 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Primary Care', openSlots: 3, booked: 13, total: 16 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Cardiology', openSlots: 7, booked: 9, total: 16 },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Internal Medicine', openSlots: 2, booked: 10, total: 12 },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Family Medicine', openSlots: 6, booked: 14, total: 20 }
  ],
  weeklyTrend: [
    { label: 'Mon', rate: 76 },
    { label: 'Tue', rate: 79 },
    { label: 'Wed', rate: 74 },
    { label: 'Thu', rate: 80 },
    { label: 'Fri', rate: 78 },
    { label: 'Sat', rate: 81 },
    { label: 'Today', rate: 78 }
  ],
  lastUpdated: new Date().toISOString()
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
  currentCoverage: 89,
  staffNeeded: 18,
  staffScheduled: 16,
  activeAlerts: [
    {
      id: 'alert-001',
      severity: 'critical',
      title: 'PM Shift Coverage Gap - 2 RNs Short',
      timeframe: 'Today, 3:00 PM - 11:00 PM',
      description: '2 call-outs for PM shift (3p-11p). Currently short 2 RNs. Patient load: 24 patients.',
      impact: 'High patient-to-nurse ratio (12:1 vs target 6:1). Safety concern.',
      recommendation: 'Request float pool immediately. Consider mandatory overtime or shift extension for AM staff.',
      actions: ['Request Float Pool', 'Call Supervisor', 'View Schedule in Insight']
    },
    {
      id: 'alert-002',
      severity: 'critical',
      title: 'Float Pool Request Failed - ICU Overflow',
      timeframe: 'Today, 7:00 PM - 7:00 AM',
      description: 'Float pool request for night shift was denied due to system-wide shortage. ICU overflow needs coverage.',
      impact: 'Unable to accommodate ICU overflow patients without additional staff.',
      recommendation: 'Escalate to Director. Consider diverting non-urgent admissions.',
      actions: ['Escalate to Director', 'Review Diversion Protocol', 'View Details']
    },
    {
      id: 'alert-003',
      severity: 'high',
      title: 'Deployment Failure - 3 South Short Staffed',
      timeframe: 'Tomorrow, 7:00 AM - 3:00 PM',
      description: 'Scheduled deployment of float RN to 3 South was cancelled. Unit remains 1 RN short.',
      impact: 'Moderate - can manage with current staff but no flexibility for emergencies.',
      recommendation: 'Monitor closely. Have backup plan if patient census increases.',
      actions: ['Request Replacement', 'Notify Unit Manager', 'View Staffing Details']
    },
    {
      id: 'alert-004',
      severity: 'medium',
      title: 'High PTO Volume Next Week',
      timeframe: 'February 3-7, 2026',
      description: '5 staff members on PTO next week (Feb 3-7). Potential coverage issues if additional call-outs occur.',
      impact: 'Low current impact but increased vulnerability to staffing gaps.',
      recommendation: 'Pre-arrange float pool coverage. Consider incentive pay for extra shifts.',
      actions: ['Pre-book Float Pool', 'Send Incentive Pay Offer', 'View Schedule']
    }
  ],
  predictiveWarnings: [
    {
      date: 'Wednesday, Jan 29',
      message: 'Predicted staffing gap: 3 nurses scheduled but 4 typically needed based on historical Wednesday volumes.'
    },
    {
      date: 'Friday, Jan 31',
      message: 'High risk: End of month typically sees 15% increase in call-outs. Consider pre-booking float pool.'
    }
  ],
  floatPoolRequests: [
    { id: 1, shift: 'PM (3p-11p)', date: 'Today', positions: '2 RN', status: 'pending' },
    { id: 2, shift: 'Night (11p-7a)', date: 'Today', positions: '1 RN', status: 'failed' },
    { id: 3, shift: 'AM (7a-3p)', date: 'Tomorrow', positions: '1 RN', status: 'fulfilled' },
    { id: 4, shift: 'PM (3p-11p)', date: 'Tomorrow', positions: '1 RN', status: 'pending' }
  ],
  lastUpdated: new Date().toISOString()
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
