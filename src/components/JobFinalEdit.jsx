import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useDispatch } from 'react-redux';
import { handleLogout, resetAuthData } from '../store/reducers/globalReducer';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

const mockData = [
  {
    id: 'comp123',
    companyName: 'ABC Corp',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+82-00-0000-0000',
    resume: 'Resume_Link_ABC_Corp.pdf',
  },
  {
    id: 'comp456',
    companyName: 'XYZ Ltd.',
    name: 'Mina Lee',
    email: 'minaleexyz@gmail.com',
    phone: '+82-00-0000-0000',
    resume: 'Resume_Link_XYZ_Ltd.pdf',
  },
  {
    id: 'comp789',
    companyName: 'Tech Innovations',
    name: 'James Park',
    email: 'jamespark@techinnovations.com',
    phone: '+82-00-0000-0000',
    resume: 'Resume_Link_Tech_Innovations.pdf',
  },
];

const EditableField = ({ label, field, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const save = () => {
    setEditing(false);
    onSave(field, tempValue);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
      <div className="font-medium text-gray-800 text-sm sm:text-base">
        {label}
      </div>
      <div className="flex items-center justify-between gap-2">
        {editing ? (
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 rounded w-[160px] text-sm"
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
          className="text-gray-500 hover:text-gray-800"
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Logout issue!', error.message);
        return;
      }
      dispatch(handleLogout());
      dispatch(resetAuthData({ user: 'shared' }));
      dispatch(resetAuthData({ user: 'company' }));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-full sm:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-md shadow-md mt-10 sm:mt-14">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">Settings</h2>

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

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-3">Account</h2>

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

      <div className="mt-6">
        <label className="block font-medium text-gray-700 mb-2 text-sm sm:text-base">
          Applied Positions
        </label>
        <div className="overflow-x-auto border rounded-lg shadow bg-white">
          <table className="w-full min-w-[600px] table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Applicant Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone number</th>
                <th className="px-4 py-2">Resume</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map(applicant => (
                <tr key={applicant.id} className="text-center">
                  <td className="border px-4 py-2">{applicant.name}</td>
                  <td className="border px-4 py-2">{applicant.email}</td>
                  <td className="border px-4 py-2">{applicant.phone}</td>
                  <td className="border px-4 py-2">{applicant.resume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <button
          onClick={logoutHandler}
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Logout
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Main page
        </button>
      </div>
    </div>
  );
}
