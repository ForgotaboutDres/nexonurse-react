import React, { useState, useEffect } from 'react';
import { fetchRoles, saveRole, deleteRole } from '../../utils/api';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      const data = await fetchRoles();
      setRoles(data);
      setLoading(false);
    };
    
    loadRoles();
  }, []);

  const handleSaveRole = async (roleData) => {
    await saveRole(roleData);
    setShowModal(false);
    setSelectedRole(null);
    const data = await fetchRoles();
    setRoles(data);
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      await deleteRole(roleId);
      const data = await fetchRoles();
      setRoles(data);
    }
  };

  const getRoleIcon = (level) => {
    switch (level) {
      case 'superuser':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'executive':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
            <p className="text-gray-600 mt-1">
              Define roles, permissions, and access. Create superusers who can administrate the application.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedRole(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <div key={role.id} className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-colors ${
            role.level === 'superuser' 
              ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-white' 
              : 'border-gray-200 hover:border-blue-300'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  role.level === 'superuser' ? 'bg-purple-600 text-white' :
                  role.level === 'executive' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {getRoleIcon(role.level)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{role.name}</h3>
                  {role.level === 'superuser' && (
                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded font-bold">SUPER</span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-1">
                <button onClick={() => { setSelectedRole(role); setShowModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {!role.isSystem && (
                  <button onClick={() => handleDeleteRole(role.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{role.description}</p>

            {role.level === 'superuser' && (
              <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-900 mb-1">Admin Capabilities:</h4>
                <ul className="text-xs text-purple-800 space-y-1">
                  <li>✓ Create & manage checklists</li>
                  <li>✓ Configure system settings</li>
                  <li>✓ Manage all users and roles</li>
                </ul>
              </div>
            )}

            <div className="text-xs text-gray-600">
              <strong>Permissions:</strong> {Object.keys(role.permissions).filter(k => role.permissions[k]).length} enabled
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <RoleModal role={selectedRole} onSave={handleSaveRole} onClose={() => { setShowModal(false); setSelectedRole(null); }} />
      )}
    </div>
  );
}

function RoleModal({ role, onSave, onClose }) {
  const [formData, setFormData] = useState(role || {
    name: '',
    level: 'manager',
    description: '',
    permissions: {
      viewDashboard: true,
      editData: false,
      manageUsers: false,
      createChecklists: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.level === 'superuser') {
      formData.permissions = {
        viewDashboard: true,
        editData: true,
        manageUsers: true,
        createChecklists: true,
        configureSystem: true
      };
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold mb-4">{role ? 'Edit Role' : 'Create Role'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Role Name"
            required
          />
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="superuser">⭐ Superuser (Full Admin)</option>
            <option value="executive">Executive</option>
            <option value="director">Director</option>
            <option value="manager">Manager</option>
          </select>
          {formData.level === 'superuser' && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <p className="text-sm text-purple-900 font-semibold">⚠️ Superuser has full access to:</p>
              <ul className="text-sm text-purple-800 mt-2 space-y-1">
                <li>• Create and manage checklists</li>
                <li>• Configure system</li>
                <li>• Manage all users</li>
              </ul>
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleManagement;
