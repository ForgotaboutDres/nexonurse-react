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
  },
  {
    id: 'task-004',
    category: 'Patient Follow-up',
    title: 'Post-discharge calls for 8 patients from weekend',
    dueDate: 'This Week',
    estimatedTime: 60,
    priority: 'high',
    impact: 'CAHPS scores, readmission prevention'
  },
  {
    id: 'task-005',
    category: 'Compliance',
    title: 'Monthly crash cart inspection and documentation',
    dueDate: 'Friday',
    estimatedTime: 25,
    priority: 'medium',
    impact: 'Regulatory requirement'
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
  },
  {
    id: 'metric-4',
    name: 'Preventive Care Screenings',
    current: 91,
    target: 85,
    trend: 'up',
    status: 'above',
    description: 'Annual preventive screenings completed'
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

// Executive Dashboard Data
export const mockExecutiveDashboardData = {
  kpis: {
    serviceLineAverage: 84,
    trend: 6,
    unitsOnTrack: 9,
    totalUnits: 12,
    needsAttention: 3,
    upcomingMilestones: 5
  },
  areasOfConcern: [
    {
      id: 'unit-11e',
      unit: '11 East',
      manager: 'Jennifer Adams',
      score: 64,
      status: 'critical',
      issue: 'Staffing crisis',
      description: 'Three experienced RNs left in the past month. Quality metrics declining.',
      actions: ['Schedule 1-on-1', 'Request Float Support', 'Urgent Review']
    },
    {
      id: 'unit-10w',
      unit: '10 West',
      manager: 'Michael Torres',
      score: 68,
      status: 'below',
      issue: 'New manager needs support',
      description: 'First-time manager, 2 months in role. Strong clinician but struggling with administrative tasks.',
      actions: ['Assign Mentor', 'Leadership Training', 'Weekly Check-ins']
    },
    {
      id: 'unit-3s',
      unit: '3 South',
      manager: 'Lisa Chen',
      score: 73,
      status: 'trending-down',
      issue: 'Patient satisfaction declining',
      description: 'CAHPS scores dropped 8 points last quarter. Staff morale concerns.',
      actions: ['Staff Survey', 'Rounding Increase', 'Team Building']
    }
  ],
  successStories: [
    {
      id: 'unit-5n',
      unit: '5 North',
      manager: 'David Martinez',
      score: 91,
      status: 'excellent',
      achievement: 'Top performer - 6 months running',
      description: 'Implemented daily huddles and peer mentoring program. Staff retention 100%.',
      actions: ['Schedule Best Practice Share', 'Recognition Email']
    },
    {
      id: 'unit-4e',
      unit: '4 East',
      manager: 'Sarah Johnson',
      score: 85,
      status: 'improved',
      achievement: 'Biggest improvement (+7 points)',
      description: 'Turned around struggling unit through structured quality improvement plan.',
      actions: ['Case Study Documentation', 'Present at Leaders Meeting']
    }
  ]
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

// Weekly Priorities Data
export const mockWeeklyPrioritiesData = {
  author: 'Director Martinez',
  postedDate: 'Monday 8:00 AM',
  primaryFocus: "Diabetic care outreach needs our attention this week. We're at 68% A1C completion and need to reach 75% by Friday. Let's aim for 15-20 patient contacts per day across the team.",
  urgentReminder: "RSV vaccines in Fridge A-3 expire on January 25th (Friday). Please prioritize administration or coordinate transfer with pharmacy by Wednesday EOD.",
  staffingNote: "Next week's schedule has some gaps for PM shifts (Tue/Thu). If you're available for extra shifts or know someone in the float pool, please coordinate with scheduling by Thursday.",
  celebration: "Great work last week on preventive care screenings - we exceeded our target by 12%! 🎉",
  previousMessages: [
    {
      date: 'Jan 20',
      subject: 'Q1 Quality Metrics Focus',
      preview: "This quarter we're focusing on three key metrics: diabetic A1C control, medication adherence, and preventive screenings..."
    },
    {
      date: 'Jan 13',
      subject: 'Staffing Updates & Float Pool',
      preview: 'Important updates about float pool procedures and upcoming schedule changes for February...'
    },
    {
      date: 'Jan 6',
      subject: 'New Year Priorities',
      preview: 'Happy New Year! Our 2026 focus areas include improving access metrics, enhancing patient satisfaction...'
    }
  ]
};

// Performance Distribution Data
export const mockPerformanceDistributionData = {
  units: [
    { id: '11E', name: '11E', overallScore: 69, qualityScore: 69, performanceLevel: 'critical' },
    { id: '10W', name: '10W', overallScore: 72, qualityScore: 72, performanceLevel: 'belowTarget' },
    { id: '3S', name: '3S', overallScore: 75, qualityScore: 75, performanceLevel: 'belowTarget' },
    { id: '7E', name: '7E', overallScore: 78, qualityScore: 76, performanceLevel: 'onTrack' },
    { id: '6W', name: '6W', overallScore: 80, qualityScore: 78, performanceLevel: 'onTrack' },
    { id: '2S', name: '2S', overallScore: 82, qualityScore: 82, performanceLevel: 'onTrack' },
    { id: '4E', name: '4E', overallScore: 87, qualityScore: 84, performanceLevel: 'onTrack' },
    { id: '4W', name: '4W', overallScore: 89, qualityScore: 87, performanceLevel: 'excellent' },
    { id: '5N', name: '5N', overallScore: 92, qualityScore: 88, performanceLevel: 'excellent' }
  ],
  summary: {
    excellent: 2,
    onTrack: 4,
    belowTarget: 2,
    critical: 1
  },
  targetLine: 75,
  lastUpdated: new Date().toISOString()
};
