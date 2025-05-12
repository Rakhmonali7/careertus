import React, { useState } from 'react';

import Nav from './Nav';
const mockData = {
  'Users Applicant': [
    { id: 'id23435', name: 'Mina Kim', email: 'minakim34@gmail.com' },
  ],
  'Users Company': [
    { id: 'comp1123', name: 'ABC Corp', email: 'contact@abccorp.com' },
  ],
  'Events List': [
    { id: 'evt123', name: 'Career Expo 2025', email: 'events@careerexpo.com' },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Users Applicant');
  const [data, setData] = useState(mockData);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const handleEdit = user => {
    setEditingId(user.id);
    setEditedUser(user);
  };

  const handleSave = () => {
    setData(prev => {
      const newList = prev[activeTab].map(item =>
        item.id === editingId ? editedUser : item
      );
      return { ...prev, [activeTab]: newList };
    });
    setEditingId(null);
    setEditedUser({});
  };

  const handleDelete = id => {
    setData(prev => {
      const newList = prev[activeTab].filter(item => item.id !== id);
      return { ...prev, [activeTab]: newList };
    });
  };

  return (
    <div>
      <Nav />

      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex text-gray-400 space-y-4 flex-col md:flex-row md:space-y-0 md:space-x-6">
          <div className="w-48">
            {['Events List', 'Users Applicant', 'Users Company'].map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  activeTab === tab ? 'text-black font-bold' : 'text-gray-400'
                }`}
              >
                {activeTab === tab && <span className="mr-2">●</span>}
                {tab}
              </div>
            ))}
          </div>

          <div className="flex-1 border rounded-lg shadow bg-white p-4 space-y-4 overflow-x-auto">
            {activeTab === 'Events List' ? (
              data[activeTab]?.length > 0 ? (
                data[activeTab].map(event => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row items-center bg-gray-100 rounded-xl p-4 shadow-md"
                  >
                    <img
                      src="/path/to/your/image.png"
                      alt="Event"
                      className="w-full md:w-60 h-auto rounded-lg object-cover"
                    />
                    <div className="md:ml-6 mt-4 md:mt-0 flex-1 w-full">
                      <h2 className="text-xl font-bold">{event.name}</h2>
                      <p className="text-gray-500">{event.email}</p>
                    </div>
                    <div className="text-right text-gray-500 text-sm w-full md:w-auto mt-4 md:mt-0">
                      2025-05-10{' '}
                      {/* Replace with actual event date if available */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No events available.
                </p>
              )
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">User ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data[activeTab]?.map(user => (
                    <tr key={user.id} className="text-center">
                      <td className="border px-4 py-2">{user.id}</td>
                      <td className="border px-4 py-2">
                        {editingId === user.id ? (
                          <input
                            className="border px-2"
                            value={editedUser.name}
                            onChange={e =>
                              setEditedUser({
                                ...editedUser,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editingId === user.id ? (
                          <input
                            className="border px-2"
                            value={editedUser.email}
                            onChange={e =>
                              setEditedUser({
                                ...editedUser,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="border px-4 py-2 space-x-2">
                        {editingId === user.id ? (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="bg-gray-200 px-3 py-1 rounded"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="bg-black text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data[activeTab]?.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-400"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
