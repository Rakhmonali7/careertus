import React, { useState, useRef } from 'react';
import { Pencil, UploadCloud } from 'lucide-react';

const initialData = {
  id: 'user123',
  name: 'John Doe',
  email: 'user@example.com',
  phone: '+82-10-1234-5678',
  birthDay: '1990-01-01',
  gender: 'male',
  language: 'English',
  country: 'South Korea',
};

const fieldLabels = {
  id: 'User ID',
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  birthDay: 'Birthday',
  gender: 'Gender',
  language: 'Preferred Language',
  country: 'Country',
};

const EditableField = ({ label, field, value, editable, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const save = () => {
    setEditing(false);
    if (tempValue !== value) onSave(field, tempValue);
  };

  return (
    <div className="flex justify-between items-center py-2">
      <div className="w-1/2 font-medium text-gray-800">{label}</div>
      <div className="w-1/2 flex items-center justify-between">
        {editing ? (
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 rounded w-full text-sm"
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
            onBlur={save}
            onKeyDown={e => e.key === 'Enter' && save()}
            autoFocus
          />
        ) : (
          <span className="text-gray-700 text-sm">{value || '-'}</span>
        )}
        {editable && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-800"
            onClick={() => {
              setTempValue(value || '');
              setEditing(true);
            }}
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default function AccountSetting() {
  const [formData, setFormData] = useState(initialData);
  const [resume, setResume] = useState(null);
  const fileInputRef = useRef();

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleResumeUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File must be smaller than 15MB.');
      return;
    }

    setResume(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md mt-14">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {Object.keys(formData).map(field => (
        <EditableField
          key={field}
          label={fieldLabels[field]}
          field={field}
          value={formData[field]}
          editable={field !== 'id'}
          onSave={updateField}
        />
      ))}

      {/* Resume Upload */}
      <div className="mt-6">
        <label className="block font-medium text-gray-700 mb-2">
          Resume Upload (PDF only, max 5MB)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleResumeUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
          >
            <UploadCloud size={16} className="mr-2" />
            Upload Resume
          </button>
          {resume && (
            <span className="text-sm text-gray-600">{resume.name}</span>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Back
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Continue
        </button>
      </div>
    </div>
  );
}
