import React, { useState, useEffect } from 'react';

function OrganizationHierarchyBuilder() {
  const [orgData, setOrgData] = useState({
    markets: [],
    regions: [],
    buildings: [],
    serviceLines: []
  });
  
  const [activeTab, setActiveTab] = useState('markets');
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});

  // Load existing org structure (would come from API)
  useEffect(() => {
    // Mock data - in production, fetch from API
    setOrgData({
      markets: [
        { id: 'mkt-1', name: 'Mid-Atlantic Market', code: 'MA', active: true }
      ],
      regions: [
        { id: 'reg-1', name: 'Columbia Medical Center', marketId: 'mkt-1', code: 'CMC', active: true },
        { id: 'reg-2', name: 'Baltimore Region', marketId: 'mkt-1', code: 'BAL', active: true }
      ],
      buildings: [
        { id: 'bld-1', name: '4 West Medical Office', regionId: 'reg-1', address: '10710 Charter Dr, Columbia, MD', active: true },
        { id: 'bld-2', name: '5 North Clinic', regionId: 'reg-1', address: '5900 Symphony Woods Rd, Columbia, MD', active: true }
      ],
      serviceLines: [
        { id: 'sl-1', name: 'Primary Care', code: 'PC', regionId: 'reg-1', active: true },
        { id: 'sl-2', name: 'Pediatrics', code: 'PED', regionId: 'reg-1', active: true },
        { id: 'sl-3', name: 'Orthopedics', code: 'ORTH', regionId: 'reg-1', active: true }
      ]
    });
  }, []);

  const handleAdd = (type) => {
    setEditMode({ type, mode: 'add', data: {} });
    setFormData({});
  };

  const handleEdit = (type, item) => {
    setEditMode({ type, mode: 'edit', data: item });
    setFormData(item);
  };

  const handleSave = () => {
    const { type, mode } = editMode;
    
    if (mode === 'add') {
      const newItem = {
        id: `${type}-${Date.now()}`,
        ...formData,
        active: true
      };
      setOrgData(prev => ({
        ...prev,
        [type]: [...prev[type], newItem]
      }));
    } else {
      setOrgData(prev => ({
        ...prev,
        [type]: prev[type].map(item => 
          item.id === formData.id ? formData : item
        )
      }));
    }
    
    setEditMode(null);
    setFormData({});
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item? This will affect all child items.')) {
      setOrgData(prev => ({
        ...prev,
        [type]: prev[type].map(item => 
          item.id === id ? { ...item, active: false } : item
        )
      }));
    }
  };

  const tabs = [
    { id: 'markets', label: 'Markets', icon: '🌎' },
    { id: 'regions', label: 'Regions/Hubs', icon: '🏢' },
    { id: 'buildings', label: 'Buildings', icon: '🏥' },
    { id: 'serviceLines', label: 'Service Lines', icon: '🩺' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Hierarchy Builder</h1>
          <p className="text-gray-600">Configure your organizational structure: Markets → Regions → Buildings & Service Lines</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            
            {/* Markets Tab */}
            {activeTab === 'markets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Markets</h2>
                  <button
                    onClick={() => handleAdd('markets')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    + Add Market
                  </button>
                </div>

                <div className="space-y-3">
                  {orgData.markets.filter(m => m.active).map(market => (
                    <div key={market.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{market.name}</h3>
                        <p className="text-sm text-gray-600">Code: {market.code}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit('markets', market)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('markets', market.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regions Tab */}
            {activeTab === 'regions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Regions / Hubs / Areas</h2>
                  <button
                    onClick={() => handleAdd('regions')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    + Add Region
                  </button>
                </div>

                <div className="space-y-3">
                  {orgData.regions.filter(r => r.active).map(region => {
                    const market = orgData.markets.find(m => m.id === region.marketId);
                    return (
                      <div key={region.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div>
                          <h3 className="font-semibold text-gray-900">{region.name}</h3>
                          <p className="text-sm text-gray-600">
                            Market: {market?.name} | Code: {region.code}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('regions', region)}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('regions', region.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Buildings Tab */}
            {activeTab === 'buildings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Medical Office Buildings</h2>
                  <button
                    onClick={() => handleAdd('buildings')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    + Add Building
                  </button>
                </div>

                <div className="space-y-3">
                  {orgData.buildings.filter(b => b.active).map(building => {
                    const region = orgData.regions.find(r => r.id === building.regionId);
                    return (
                      <div key={building.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div>
                          <h3 className="font-semibold text-gray-900">{building.name}</h3>
                          <p className="text-sm text-gray-600">
                            Region: {region?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{building.address}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('buildings', building)}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('buildings', building.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Service Lines Tab */}
            {activeTab === 'serviceLines' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Service Lines</h2>
                  <button
                    onClick={() => handleAdd('serviceLines')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    + Add Service Line
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orgData.serviceLines.filter(sl => sl.active).map(serviceLine => {
                    const region = orgData.regions.find(r => r.id === serviceLine.regionId);
                    return (
                      <div key={serviceLine.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{serviceLine.name}</h3>
                            <p className="text-sm text-gray-600">Code: {serviceLine.code}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {serviceLine.code}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Region: {region?.name}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit('serviceLines', serviceLine)}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded flex-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('serviceLines', serviceLine.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded flex-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hierarchy Visualization */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Structure Overview</h2>
          <div className="space-y-4">
            {orgData.markets.filter(m => m.active).map(market => (
              <div key={market.id} className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-lg text-gray-900 mb-3">
                  🌎 {market.name}
                </div>
                <div className="ml-6 space-y-3">
                  {orgData.regions.filter(r => r.active && r.marketId === market.id).map(region => (
                    <div key={region.id} className="border-l-2 border-blue-300 pl-4">
                      <div className="font-medium text-gray-900">🏢 {region.name}</div>
                      <div className="ml-4 mt-2 space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Buildings:</strong> {orgData.buildings.filter(b => b.active && b.regionId === region.id).length}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Service Lines:</strong> {orgData.serviceLines.filter(sl => sl.active && sl.regionId === region.id).map(sl => sl.name).join(', ') || 'None'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {editMode.mode === 'add' ? 'Add' : 'Edit'} {editMode.type.slice(0, -1)}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                />
              </div>

              {(editMode.type === 'markets' || editMode.type === 'regions' || editMode.type === 'serviceLines') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter code (e.g., MA, CMC)"
                  />
                </div>
              )}

              {editMode.type === 'regions' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
                  <select
                    value={formData.marketId || ''}
                    onChange={(e) => setFormData({ ...formData, marketId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select market...</option>
                    {orgData.markets.filter(m => m.active).map(market => (
                      <option key={market.id} value={market.id}>{market.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {editMode.type === 'buildings' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                      value={formData.regionId || ''}
                      onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select region...</option>
                      {orgData.regions.filter(r => r.active).map(region => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Street address, City, State ZIP"
                    />
                  </div>
                </>
              )}

              {editMode.type === 'serviceLines' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select
                    value={formData.regionId || ''}
                    onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select region...</option>
                    {orgData.regions.filter(r => r.active).map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setEditMode(null);
                  setFormData({});
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationHierarchyBuilder;
