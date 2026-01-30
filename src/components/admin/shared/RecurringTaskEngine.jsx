import React, { useState, useEffect } from 'react';

function RecurringTaskEngine() {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueT tasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // Mock data - in production this would come from API
    setUpcomingTasks([
      {
        id: 'task-1',
        checklistName: 'Monthly Expired Supplies Check',
        dueDate: 'Feb 1, 2026',
        daysUntilDue: 3,
        assignedTo: 'Unit Manager',
        estimatedTime: 20,
        priority: 'high',
        category: 'safety'
      },
      {
        id: 'task-2',
        checklistName: 'IV Supply Par Level Check',
        dueDate: 'Feb 3, 2026',
        daysUntilDue: 5,
        assignedTo: 'Charge Nurse',
        estimatedTime: 15,
        priority: 'medium',
        category: 'inventory'
      },
      {
        id: 'task-3',
        checklistName: 'Weekly Priorities Review',
        dueDate: 'Feb 2, 2026',
        daysUntilDue: 4,
        assignedTo: 'Director',
        estimatedTime: 10,
        priority: 'medium',
        category: 'operations'
      }
    ]);

    setOverdueTasks([
      {
        id: 'task-4',
        checklistName: 'Crash Cart Inspection',
        dueDate: 'Jan 28, 2026',
        daysOverdue: 1,
        assignedTo: 'Unit Manager',
        estimatedTime: 25,
        priority: 'critical',
        category: 'compliance'
      }
    ]);

    setCompletedTasks([
      {
        id: 'task-5',
        checklistName: 'IV Supply Par Level Check',
        completedDate: 'Jan 27, 2026',
        completedBy: 'Jennifer Adams',
        assignedTo: 'Charge Nurse',
        category: 'inventory'
      },
      {
        id: 'task-6',
        checklistName: 'Monthly Expired Supplies Check',
        completedDate: 'Jan 1, 2026',
        completedBy: 'Sarah Chen',
        assignedTo: 'Unit Manager',
        category: 'safety'
      }
    ]);
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'safety': return 'bg-red-100 text-red-800 border-red-200';
      case 'compliance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'quality': return 'bg-green-100 text-green-800 border-green-200';
      case 'operations': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'inventory': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recurring Task Engine</h2>
        <p className="text-gray-600">
          Automatically generated tasks from your recurring checklists. No more "random person sending reminders."
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <div className="text-3xl font-bold text-gray-900">{overdueTasks.length}</div>
          <div className="text-sm text-gray-600 mt-1">Overdue Tasks</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="text-3xl font-bold text-gray-900">
            {upcomingTasks.filter(t => t.daysUntilDue <= 3).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Due Within 3 Days</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="text-3xl font-bold text-gray-900">{upcomingTasks.length}</div>
          <div className="text-sm text-gray-600 mt-1">Upcoming Tasks</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-3xl font-bold text-gray-900">{completedTasks.length}</div>
          <div className="text-sm text-gray-600 mt-1">Completed This Month</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('overdue')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'overdue'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overdue ({overdueTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({upcomingTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'completed'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedTasks.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overdue Tasks */}
          {activeTab === 'overdue' && (
            <div className="space-y-4">
              {overdueTasks.map(task => (
                <div key={task.id} className="border-2 border-red-300 bg-red-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{task.checklistName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(task.category)}`}>
                          {task.category.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Was due {task.dueDate}
                        </span>
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {task.daysOverdue} {task.daysOverdue === 1 ? 'day' : 'days'} overdue
                        </span>
                        <span>Assigned to: {task.assignedTo}</span>
                        <span>~{task.estimatedTime} min</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                      Complete Now
                    </button>
                  </div>
                </div>
              ))}
              {overdueTasks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">No overdue tasks</p>
                  <p className="text-sm">Great job staying on top of everything!</p>
                </div>
              )}
            </div>
          )}

          {/* Upcoming Tasks */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">{task.checklistName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(task.category)}`}>
                          {task.category.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due {task.dueDate}
                        </span>
                        <span className={task.daysUntilDue <= 3 ? 'text-orange-600 font-semibold' : ''}>
                          ({task.daysUntilDue} {task.daysUntilDue === 1 ? 'day' : 'days'} remaining)
                        </span>
                        <span>Assigned to: {task.assignedTo}</span>
                        <span>~{task.estimatedTime} min</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Start Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Tasks */}
          {activeTab === 'completed' && (
            <div className="space-y-4">
              {completedTasks.map(task => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-bold text-gray-900">{task.checklistName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(task.category)}`}>
                          {task.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Completed {task.completedDate}</span>
                        <span>By: {task.completedBy}</span>
                        <span>Assigned to: {task.assignedTo}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                      View Submission
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecurringTaskEngine;
