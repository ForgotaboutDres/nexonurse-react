// Phase 3 Mock Data - Add to your mockData.js file

// ===================================
// ROLES DATA
// ===================================
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
      'Complaints & Grievances',
      'Performance Distribution',
      'Weekly Priorities',
      'Priority Queue',
      'Team Hierarchy',
      'Executive Dashboard'
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
  },
  {
    id: 'role-2',
    name: 'Director/VP',
    level: 'director',
    description: 'Oversees multiple units or service line',
    visibleMetrics: [
      'Performance Distribution',
      'Team Hierarchy',
      'Weekly Priorities',
      'Access Metrics',
      'Consumer Insights',
      'Executive Dashboard'
    ],
    permissions: {
      viewDashboard: true,
      editData: true,
      manageUsers: true,
      configureSystem: false,
      createChecklists: true,
      manageRoles: false
    },
    userCount: 8,
    isSystem: true,
    createdDate: 'Jan 2026'
  },
  {
    id: 'role-3',
    name: 'Charge Nurse',
    level: 'staff',
    description: 'Senior clinical staff with shift leadership responsibilities',
    visibleMetrics: [
      'Staffing Alerts',
      'Quality Metrics',
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
    userCount: 24,
    isSystem: false,
    createdDate: 'Jan 2026'
  }
];

// ===================================
// CHECKLISTS DATA
// ===================================
export const mockChecklists = [
  {
    id: 'cl-1',
    name: 'Monthly Expired Supplies Check',
    description: 'Check all refrigerators and supply rooms for expired medications and supplies',
    category: 'safety',
    items: [
      { 
        type: 'checkbox', 
        label: 'Check Fridge A-3 for expired vaccines', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Check medication storage room for expired items', 
        required: true 
      },
      { 
        type: 'number', 
        label: 'Count expired items found', 
        required: true,
        parLevel: null,
        min: 0,
        max: null
      },
      { 
        type: 'text', 
        label: 'List any critical expired items found', 
        required: false 
      },
      { 
        type: 'date', 
        label: 'Date of oldest expired item', 
        required: false 
      },
      { 
        type: 'checkbox', 
        label: 'Document findings in safety log', 
        required: true 
      }
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
    description: 'Monthly inspection and documentation of crash cart equipment and supplies',
    category: 'compliance',
    items: [
      { 
        type: 'checkbox', 
        label: 'Check all medications present and not expired', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Verify defibrillator functional', 
        required: true 
      },
      { 
        type: 'number', 
        label: 'Oxygen tank PSI level', 
        required: true,
        parLevel: 2000,
        min: 1500,
        max: 2200
      },
      { 
        type: 'checkbox', 
        label: 'Verify all supplies stocked per checklist', 
        required: true 
      },
      { 
        type: 'text', 
        label: 'Any missing items or concerns?', 
        required: false 
      },
      { 
        type: 'date', 
        label: 'Date inspection completed', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Sign and date inspection log', 
        required: true 
      }
    ],
    isRecurring: true,
    frequency: 'monthly',
    nextDue: 'Feb 1, 2026',
    lastSubmitted: 'Dec 28, 2025',
    requiresApproval: true,
    assignedRoles: ['Unit Manager', 'Superuser'],
    estimatedTime: 25,
    submissionCount: 18
  },
  {
    id: 'cl-3',
    name: 'IV Supply Par Level Check',
    description: 'Weekly check of IV supply inventory against par levels',
    category: 'inventory',
    items: [
      { 
        type: 'number', 
        label: 'IV Catheters 20g - Current Count', 
        required: true,
        parLevel: 50,
        min: 40,
        max: 60
      },
      { 
        type: 'number', 
        label: 'IV Catheters 22g - Current Count', 
        required: true,
        parLevel: 50,
        min: 40,
        max: 60
      },
      { 
        type: 'number', 
        label: 'IV Start Kits - Current Count', 
        required: true,
        parLevel: 25,
        min: 20,
        max: 30
      },
      { 
        type: 'number', 
        label: 'IV Tubing Standard - Current Count', 
        required: true,
        parLevel: 40,
        min: 30,
        max: 50
      },
      { 
        type: 'number', 
        label: 'Saline Flush 10ml - Current Count', 
        required: true,
        parLevel: 100,
        min: 80,
        max: 120
      },
      { 
        type: 'checkbox', 
        label: 'Order placed for items below par level', 
        required: false 
      },
      { 
        type: 'text', 
        label: 'Notes on supply issues or concerns', 
        required: false 
      }
    ],
    isRecurring: true,
    frequency: 'weekly',
    nextDue: 'Feb 3, 2026',
    lastSubmitted: 'Jan 27, 2026',
    requiresApproval: false,
    assignedRoles: ['Unit Manager', 'Charge Nurse', 'Staff RN'],
    estimatedTime: 15,
    submissionCount: 48
  },
  {
    id: 'cl-4',
    name: 'Quarterly Safety Equipment Audit',
    description: 'Comprehensive safety equipment check required quarterly',
    category: 'compliance',
    items: [
      { 
        type: 'checkbox', 
        label: 'Fire extinguishers inspected and tagged', 
        required: true 
      },
      { 
        type: 'number', 
        label: 'Number of fire extinguishers on unit', 
        required: true,
        parLevel: 6,
        min: 6,
        max: null
      },
      { 
        type: 'checkbox', 
        label: 'Emergency lighting tested and functional', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Eyewash stations tested', 
        required: true 
      },
      { 
        type: 'date', 
        label: 'Last evacuation drill date', 
        required: true 
      },
      { 
        type: 'text', 
        label: 'Any safety concerns identified?', 
        required: false 
      },
      { 
        type: 'checkbox', 
        label: 'All exit signs illuminated', 
        required: true 
      }
    ],
    isRecurring: true,
    frequency: 'quarterly',
    nextDue: 'April 1, 2026',
    lastSubmitted: 'Oct 15, 2025',
    requiresApproval: true,
    assignedRoles: ['Unit Manager', 'Director'],
    estimatedTime: 45,
    submissionCount: 4
  },
  {
    id: 'cl-5',
    name: 'Annual Equipment Calibration',
    description: 'Annual calibration check for all medical equipment',
    category: 'quality',
    items: [
      { 
        type: 'text', 
        label: 'Equipment ID/Serial Number', 
        required: true 
      },
      { 
        type: 'text', 
        label: 'Equipment Type', 
        required: true 
      },
      { 
        type: 'date', 
        label: 'Last calibration date', 
        required: true 
      },
      { 
        type: 'date', 
        label: 'Next calibration due date', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Calibration sticker applied', 
        required: true 
      },
      { 
        type: 'text', 
        label: 'Technician name who performed calibration', 
        required: true 
      },
      { 
        type: 'checkbox', 
        label: 'Equipment functional after calibration', 
        required: true 
      }
    ],
    isRecurring: true,
    frequency: 'annually',
    nextDue: 'Dec 1, 2026',
    lastSubmitted: 'Dec 5, 2025',
    requiresApproval: true,
    assignedRoles: ['Superuser', 'Director'],
    estimatedTime: 30,
    submissionCount: 1
  },
  {
    id: 'cl-6',
    name: 'Semi-Annual Medication Room Audit',
    description: 'Comprehensive medication storage and handling audit',
    category: 'compliance',
    items: [
      { 
        type: 'checkbox', 
        label: 'Temperature logs reviewed and within range', 
        required: true 
      },
      { 
        type: 'number', 
        label: 'Current fridge temperature (°F)', 
        required: true,
        parLevel: 38,
        min: 36,
        max: 46
      },
      { 
        type: 'number', 
        label: 'Controlled substances count matches log', 
        required: true,
        parLevel: null,
        min: null,
        max: null
      },
      { 
        type: 'checkbox', 
        label: 'Medication storage organized and labeled', 
        required: true 
      },
      { 
        type: 'text', 
        label: 'Any discrepancies found?', 
        required: false 
      },
      { 
        type: 'checkbox', 
        label: 'Look-alike/sound-alike medications separated', 
        required: true 
      },
      { 
        type: 'date', 
        label: 'Audit completion date', 
        required: true 
      }
    ],
    isRecurring: true,
    frequency: 'semiannually',
    nextDue: 'June 15, 2026',
    lastSubmitted: 'Dec 18, 2025',
    requiresApproval: true,
    assignedRoles: ['Unit Manager', 'Director', 'Superuser'],
    estimatedTime: 60,
    submissionCount: 2
  }
];

// ===================================
// CHECKLIST SUBMISSIONS DATA
// ===================================
export const mockChecklistSubmissions = {
  'cl-1': [
    {
      id: 'sub-1',
      checklistId: 'cl-1',
      submittedBy: 'Sarah Chen, RN',
      submittedAt: 'Jan 1, 2026 10:30 AM',
      status: 'approved',
      responses: {
        // Would contain actual response data
      }
    },
    {
      id: 'sub-2',
      checklistId: 'cl-1',
      submittedBy: 'Michael Torres',
      submittedAt: 'Dec 1, 2025 2:15 PM',
      status: 'approved',
      responses: {}
    },
    {
      id: 'sub-3',
      checklistId: 'cl-1',
      submittedBy: 'Lisa Anderson',
      submittedAt: 'Nov 1, 2025 9:45 AM',
      status: 'approved',
      responses: {}
    }
  ],
  'cl-2': [
    {
      id: 'sub-4',
      checklistId: 'cl-2',
      submittedBy: 'David Martinez',
      submittedAt: 'Dec 28, 2025 3:00 PM',
      status: 'pending',
      responses: {}
    }
  ],
  'cl-3': [
    {
      id: 'sub-5',
      checklistId: 'cl-3',
      submittedBy: 'Jennifer Adams',
      submittedAt: 'Jan 27, 2026 11:00 AM',
      status: 'approved',
      responses: {}
    }
  ]
};

// ===================================
// API FUNCTIONS TO ADD
// ===================================

// Add these to your api.js file:

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
