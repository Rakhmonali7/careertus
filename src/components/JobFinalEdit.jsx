import React, { useState } from 'react';
import { Pencil } from 'lucide-react'; // Optional: use any icon library

const initialData = {
  applicationMethod: 'Email',
  requireResume: 'Yes',
  applicationUpdates: 'Yes',
  contact: 'kikimki23',
  phone: '+82-00-0000-0000',
  companyName: '',
  companyIndustry: '',
  source: '',
};

const EditableField = ({ label, field, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const save = () => {
    setEditing(false);
    onSave(field, tempValue);
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
        <button
          className="ml-2 text-gray-500 hover:text-gray-800"
          onClick={() => {
            setTempValue(value || '');
            setEditing(true);
          }}
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
};

export default function JobFinalEdit() {
  const [formData, setFormData] = useState(initialData);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md mt-14">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <EditableField
        label="Application method"
        field="applicationMethod"
        value={formData.applicationMethod}
        onSave={updateField}
      />
      <EditableField
        label="Require resume"
        field="requireResume"
        value={formData.requireResume}
        onSave={updateField}
      />
      <EditableField
        label="Application updates"
        field="applicationUpdates"
        value={formData.applicationUpdates}
        onSave={updateField}
      />

      <h2 className="text-xl font-semibold mt-6 mb-4">Account</h2>

      <EditableField
        label="Contact"
        field="contact"
        value={formData.contact}
        onSave={updateField}
      />
      <EditableField
        label="Phone number"
        field="phone"
        value={formData.phone}
        onSave={updateField}
      />
      <EditableField
        label="Your company name"
        field="companyName"
        value={formData.companyName}
        onSave={updateField}
      />
      <EditableField
        label="Your company's industry"
        field="companyIndustry"
        value={formData.companyIndustry}
        onSave={updateField}
      />
      <EditableField
        label="How you heard about indeed"
        field="source"
        value={formData.source}
        onSave={updateField}
      />

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
