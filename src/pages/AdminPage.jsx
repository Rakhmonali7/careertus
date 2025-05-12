import React, { useState } from 'react';
import Nav from './Nav';

const mockData = {
  'Events List': [
    {
      id: 'evt123',
      name: 'ISF2025 Spring',
      text: 'The 5th International Student Job & Startup Fair',
      image: '/path/to/your/image.png',
    },
  ],
  'Users Applicant': [
    { id: 'id23435', name: 'Mina Kim', email: 'minakim34@gmail.com' },
  ],
  'Users Company': [
    { id: 'comp1123', name: 'ABC Corp', email: 'contact@abccorp.com' },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Events List');
  const [data, setData] = useState(mockData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const [editingRowId, setEditingRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  const handleEventClick = event => {
    setSelectedEvent(event);
    setIsEditing(false);
    setEditForm(event);
    setPreviewImage(event.image);
  };

  const handleDelete = id => {
    setData(prev => {
      const newList = prev[activeTab].filter(item => item.id !== id);
      return { ...prev, [activeTab]: newList };
    });

    if (selectedEvent?.id === id) setSelectedEvent(null);
    if (editingRowId === id) {
      setEditingRowId(null);
      setEditRowData({});
    }
  };

  const handleSaveEvent = () => {
    setData(prev => {
      const newList = [...prev[activeTab]];
      const isNew = !editForm.id;

      if (isNew) {
        const newEvent = {
          ...editForm,
          id: `evt${Date.now()}`,
          image: previewImage,
        };
        newList.push(newEvent);
      } else {
        const index = newList.findIndex(item => item.id === editForm.id);
        if (index !== -1) {
          newList[index] = { ...editForm, image: previewImage };
        }
      }

      return { ...prev, [activeTab]: newList };
    });

    setIsEditing(false);
    setSelectedEvent(null);
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSaveRow = () => {
    setData(prev => {
      const updatedList = prev[activeTab].map(item =>
        item.id === editingRowId ? { ...item, ...editRowData } : item
      );
      return { ...prev, [activeTab]: updatedList };
    });
    setEditingRowId(null);
    setEditRowData({});
  };

  return (
    <div>
      <Nav />
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex text-gray-400 space-y-4 flex-col md:flex-row md:space-y-0 md:space-x-6">
          {/* Sidebar */}
          <div className="w-48">
            {Object.keys(mockData).map(tab => (
              <div
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedEvent(null);
                  setIsEditing(false);
                  setEditingRowId(null);
                }}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  activeTab === tab ? 'text-black font-bold' : 'text-gray-400'
                }`}
              >
                {activeTab === tab && <span className="mr-2">●</span>}
                {tab}
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 border rounded-lg shadow bg-white p-4 space-y-4 overflow-x-auto">
            {/* Create Event Button */}
            {activeTab === 'Events List' && !selectedEvent && (
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsEditing(true);
                    setEditForm({ id: '', name: '', email: '', image: '' });
                    setPreviewImage('');
                  }}
                >
                  + Create Event
                </button>
              </div>
            )}

            {/* Event Detail or Edit View */}
            {selectedEvent || isEditing ? (
              <div className="relative">
                {isEditing ? (
                  <>
                    <input
                      className="text-xl font-bold border-b w-full mb-2"
                      placeholder="Event Name"
                      value={editForm.name}
                      onChange={e =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                    <input
                      className="text-gray-600 border-b w-full mb-4"
                      placeholder="Event Description"
                      value={editForm.email}
                      onChange={e =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                    />

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7h4l2-3h6l2 3h4v13H3V7z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11v6m0 0l-2-2m2 2l2-2"
                          />
                        </svg>
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full md:w-96 h-auto rounded border"
                      />
                    )}

                    <div className="mt-4 space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleSaveEvent}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedEvent(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                    <p className="text-gray-500 ">{selectedEvent.text}</p>
                    <img
                      src={selectedEvent.image}
                      alt="Event"
                      className="w-full md:w-96 h-auto rounded border my-4"
                    />
                    <div className="space-x-2">
                      <button
                        className="bg-gray-200 px-4 py-2 rounded"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(selectedEvent.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : activeTab === 'Events List' ? (
              data[activeTab]?.length > 0 ? (
                data[activeTab].map(event => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="cursor-pointer flex flex-col md:flex-row items-center bg-gray-100 rounded-xl p-4 shadow-md"
                  >
                    <img
                      src={event.image}
                      alt="Event"
                      className="w-full md:w-60 h-auto rounded-lg object-cover"
                    />
                    <div className="md:ml-6 mt-4 md:mt-0 flex-1 w-full">
                      <h2 className="text-xl font-bold">{event.name}</h2>
                      <p className="text-gray-500 truncate w-[200px]">
                        {event.text}
                      </p>
                    </div>
                    <div className="text-right text-gray-500 text-sm w-full md:w-auto mt-4 md:mt-0">
                      2025-05-10
                    </div>{' '}
                    //find it
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No events available.
                </p>
              )
            ) : (
              // Editable Table for Users
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
                        {editingRowId === user.id ? (
                          <input
                            className="border px-2 py-1 rounded"
                            value={editRowData.name}
                            onChange={e =>
                              setEditRowData({
                                ...editRowData,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editingRowId === user.id ? (
                          <input
                            className="border px-2 py-1 rounded"
                            value={editRowData.email}
                            onChange={e =>
                              setEditRowData({
                                ...editRowData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="border px-4 py-2 space-x-2">
                        {editingRowId === user.id ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded"
                              onClick={handleSaveRow}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 px-2 py-1 rounded"
                              onClick={() => {
                                setEditingRowId(null);
                                setEditRowData({});
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                              onClick={() => {
                                setEditingRowId(user.id);
                                setEditRowData(user);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
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
