// Add these to your mockData.js file at the end

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
      preview: 'This quarter we\'re focusing on three key metrics: diabetic A1C control, medication adherence, and preventive screenings...'
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
