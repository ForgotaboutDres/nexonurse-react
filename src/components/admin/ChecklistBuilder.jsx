import React, { useState, useEffect } from 'react';
import { fetchChecklists, saveChecklist, deleteChecklist, getChecklistSubmissions } from '../../utils/api';

function ChecklistBuilder() {
  const [checklists, setChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChecklists = async () => {
      setLoading(true);
      const data = await fetchChecklists();
      setChecklists(data);
      setLoading(false);
    };
    
    loadChecklists();
  }, []);

  const handleSaveChecklist = async (checklistData) => {
    await saveChecklist(checklistData);
    setShowModal(false);
    setSelectedChecklist(null);
    // Reload checklists
    const data = await fetchChecklists();
    setChecklists(data);
  };

  const handleDeleteChecklist = async (checklistId) => {
    if (window.confirm('Are you sure you want to delete this checklist? All submission history will be preserved but the checklist will be archived.')) {
      await deleteChecklist(checklistId);
      // Reload checklists
      const data = await fetchChecklists();
      setChecklists(data);
    }
  };

  const handleViewSubmissions = (checklist) => {
    setSelectedChecklist(checklist);
    setShowSubmissionsModal(true);
  };

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

  const getFrequencyLabel = (frequency) => {
    const labels = {
      weekly: 'Weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      semiannually: 'Semi-Annually',
      annually: 'Annually'
    };
    return labels[frequency] || frequency;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checklists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Checklist Builder</h2>
            <p className="text-gray-600 mt-1">
              Create questionnaires with text fields, checkboxes, numbers (for par levels), and dates. Set recurring schedules.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedChecklist(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Checklist
          </button>
        </div>

        {/* Category Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {['safety', 'compliance', 'quality', 'operations', 'inventory'].map(cat => (
              <span key={cat} className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(cat)}`}>
                {cat.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Checklists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklists.map(checklist => (
          <div key={checklist.id} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-colors overflow-hidden">
            {/* Header */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(checklist.category)}`}>
                      {checklist.category.toUpperCase()}
                    </span>
                    {checklist.isRecurring && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded border border-indigo-200">
                        {getFrequencyLabel(checklist.frequency)}
                      </span>
                    )}
                    {checklist.requiresApproval && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded border border-yellow-200">
                        Approval Required
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{checklist.name}</h3>
                  <p className="text-sm text-gray-600">{checklist.description}</p>
                </div>
                
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => {
                      setSelectedChecklist(checklist);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit checklist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteChecklist(checklist.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Archive checklist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Recurring Schedule */}
              {checklist.isRecurring && (
                <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-indigo-900 font-medium">
                        Recurs: {getFrequencyLabel(checklist.frequency)}
                      </div>
                      <div className="text-indigo-700 text-xs mt-1">
                        Next due: {checklist.nextDue || 'Not scheduled'}
                      </div>
                      {checklist.lastSubmitted && (
                        <div className="text-indigo-600 text-xs mt-1">
                          Last completed: {checklist.lastSubmitted}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Question Types Summary */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {checklist.items.length} Questions:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {checklist.items.filter(i => i.type === 'text').length > 0 && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200">
                      {checklist.items.filter(i => i.type === 'text').length} Text
                    </span>
                  )}
                  {checklist.items.filter(i => i.type === 'checkbox').length > 0 && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200">
                      {checklist.items.filter(i => i.type === 'checkbox').length} Checkbox
                    </span>
                  )}
                  {checklist.items.filter(i => i.type === 'number').length > 0 && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded border border-purple-200">
                      {checklist.items.filter(i => i.type === 'number').length} Number
                    </span>
                  )}
                  {checklist.items.filter(i => i.type === 'date').length > 0 && (
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded border border-orange-200">
                      {checklist.items.filter(i => i.type === 'date').length} Date
                    </span>
                  )}
                </div>
              </div>

              {/* Items Preview */}
              <div className="mb-3">
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {checklist.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm p-2 bg-gray-50 rounded">
                      <div className="mt-0.5">
                        {item.type === 'text' && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {item.type === 'checkbox' && (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        )}
                        {item.type === 'number' && (
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        )}
                        {item.type === 'date' && (
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 line-clamp-2">{item.label}</span>
                        {item.type === 'number' && item.parLevel && (
                          <span className="text-xs text-purple-600 block mt-1">
                            Par Level: {item.parLevel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {checklist.items.length > 3 && (
                    <div className="text-sm text-gray-500 italic text-center py-2">
                      +{checklist.items.length - 3} more questions...
                    </div>
                  )}
                </div>
              </div>

              {/* Submission History Button */}
              <button
                onClick={() => handleViewSubmissions(checklist)}
                className="w-full py-2 px-3 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Submission History
              </button>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {checklist.assignedRoles.length} roles
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ~{checklist.estimatedTime} min
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {checklist.submissionCount || 0} submissions
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {checklists.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Checklists Yet</h3>
          <p className="text-gray-600 mb-4">Create your first questionnaire to start tracking operational tasks</p>
          <button
            onClick={() => {
              setSelectedChecklist(null);
              setShowModal(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create First Checklist
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <ChecklistModal
          checklist={selectedChecklist}
          onSave={handleSaveChecklist}
          onClose={() => {
            setShowModal(false);
            setSelectedChecklist(null);
          }}
        />
      )}

      {/* Submissions Modal */}
      {showSubmissionsModal && selectedChecklist && (
        <SubmissionsModal
          checklist={selectedChecklist}
          onClose={() => {
            setShowSubmissionsModal(false);
            setSelectedChecklist(null);
          }}
        />
      )}
    </div>
  );
}

// Checklist Modal Component
function ChecklistModal({ checklist, onSave, onClose }) {
  const [formData, setFormData] = useState(checklist || {
    name: '',
    description: '',
    category: 'operations',
    items: [{ type: 'checkbox', label: '', required: true }],
    isRecurring: false,
    frequency: 'monthly',
    requiresApproval: false,
    assignedRoles: [],
    estimatedTime: 15
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = (type = 'checkbox') => {
    const newItem = {
      type,
      label: '',
      required: true
    };
    
    if (type === 'number') {
      newItem.parLevel = null;
      newItem.min = null;
      newItem.max = null;
    }
    
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const availableRoles = ['Unit Manager', 'Director', 'Staff RN', 'Charge Nurse', 'Administrator', 'Superuser'];

  const questionTypes = [
    { value: 'text', label: 'Text Field', icon: '📝' },
    { value: 'checkbox', label: 'Checkbox', icon: '✅' },
    { value: 'number', label: 'Number (Par Level)', icon: '🔢' },
    { value: 'date', label: 'Date', icon: '📅' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {checklist ? 'Edit Checklist' : 'Create New Checklist / Questionnaire'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Checklist Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Monthly Expired Supplies Check"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="safety">Safety</option>
                <option value="compliance">Compliance</option>
                <option value="quality">Quality</option>
                <option value="operations">Operations</option>
                <option value="inventory">Inventory / Par Levels</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              placeholder="Brief description of this checklist..."
            />
          </div>

          {/* Questions/Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Questions / Items *
              </label>
              <div className="flex gap-2">
                {questionTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => addItem(type.value)}
                    className="text-xs px-3 py-1 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-1"
                    title={`Add ${type.label}`}
                  >
                    <span>{type.icon}</span>
                    <span>Add {type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {formData.items.map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-2">
                      <select
                        value={item.type}
                        onChange={(e) => updateItem(index, 'type', e.target.value)}
                        className="text-sm px-2 py-1 border border-gray-300 rounded"
                      >
                        {questionTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateItem(index, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                        placeholder={`Question ${index + 1}`}
                        required
                      />
                      
                      {/* Number type - Par Level fields */}
                      {item.type === 'number' && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Par Level</label>
                            <input
                              type="number"
                              value={item.parLevel || ''}
                              onChange={(e) => updateItem(index, 'parLevel', parseInt(e.target.value))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Target qty"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Min</label>
                            <input
                              type="number"
                              value={item.min || ''}
                              onChange={(e) => updateItem(index, 'min', parseInt(e.target.value))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Min"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Max</label>
                            <input
                              type="number"
                              value={item.max || ''}
                              onChange={(e) => updateItem(index, 'max', parseInt(e.target.value))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Max"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mt-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.required}
                            onChange={(e) => updateItem(index, 'required', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Required</span>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                      disabled={formData.items.length === 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring Settings */}
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-gray-900">Make this a recurring task</span>
            </label>

            {formData.isRecurring && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency *
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly (Every 3 months)</option>
                    <option value="semiannually">Semi-Annually (Every 6 months)</option>
                    <option value="annually">Annually (Once per year)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Est. Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="5"
                    step="5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresApproval}
                onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
                className="rounded text-yellow-600 focus:ring-yellow-500"
              />
              <div>
                <span className="font-medium text-gray-900 block">Requires Approval</span>
                <span className="text-xs text-gray-600">Supervisor must approve submissions</span>
              </div>
            </label>
          </div>

          {/* Assign to Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Roles
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableRoles.map(role => (
                <label key={role} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.assignedRoles || []).includes(role)}
                    onChange={(e) => {
                      const current = formData.assignedRoles || [];
                      if (e.target.checked) {
                        setFormData({ ...formData, assignedRoles: [...current, role] });
                      } else {
                        setFormData({ ...formData, assignedRoles: current.filter(r => r !== role) });
                      }
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 -mb-6 px-6 py-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {checklist ? 'Save Changes' : 'Create Checklist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Submissions Modal Component
function SubmissionsModal({ checklist, onClose }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      const data = await getChecklistSubmissions(checklist.id);
      setSubmissions(data);
      setLoading(false);
    };
    
    loadSubmissions();
  }, [checklist.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{checklist.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Submission History</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Submissions Yet</h3>
              <p className="text-gray-600">This checklist hasn't been completed yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Submitted by {submission.submittedBy}
                      </h4>
                      <p className="text-sm text-gray-600">{submission.submittedAt}</p>
                    </div>
                    {submission.status && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {submission.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChecklistBuilder;
