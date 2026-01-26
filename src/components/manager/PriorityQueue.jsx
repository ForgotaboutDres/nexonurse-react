import React, { useState, useEffect } from 'react';
import { fetchPriorityQueue } from '../../utils/api';

function PriorityQueue({ unitId }) {
  const [tasks, setTasks] = useState([]);
  const [timeframe, setTimeframe] = useState('today');
  const [priority, setPriority] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const data = await fetchPriorityQueue(unitId, { timeframe, priority });
      setTasks(data);
      setLoading(false);
    };
    
    loadTasks();
  }, [unitId, timeframe, priority]);

  const handleComplete = (taskId) => {
    // In production, this would call an API
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading priority queue...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-3">Timeframe</h3>
            <div className="flex gap-2">
              {['today', 'week', 'all'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Priority</h3>
            <div className="flex gap-2">
              {['all', 'critical', 'high', 'medium'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priority === p
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Queue List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Priority Queue ({tasks.length} tasks)</h3>
          <p className="text-sm text-gray-600 mt-1">Automatically sorted by urgency, impact, and due date</p>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`border-l-4 ${
                task.priority === 'critical' ? 'border-red-500' : 'border-orange-500'
              } bg-white rounded-r-lg shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">{task.category}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">{task.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Due: {task.dueDate}</span>
                    <span>Time: {task.estimatedTime} min</span>
                    <span>Impact: {task.impact}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    task.priority === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriorityQueue;
