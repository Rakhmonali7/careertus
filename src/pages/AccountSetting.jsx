import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Pencil, UploadCloud } from 'lucide-react';
import api from '../configs/config';
import { endpoints } from '../configs/endpoints';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout, resetAuthData } from '../store/reducers/globalReducer';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const initialData = {
  accountId: '',
  name: '',
  email: '',
  phone: '',
  birthdate: '',
  gender: '',
  language: '',
  country: '',
};

const fieldLabels = {
  accountId: 'User ID',
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  birthdate: 'Birthdate',
  gender: 'Gender',
  language: 'Preferred Language',
  country: 'Country',
};

// mockData for applications
const mockData = [
  {
    id: 'id23435',
    name: 'LG Electronics',
    positionName: 'HR Manager',
    email: 'lg123@gmail.com',
  },
  {
    id: 'id235',
    name: 'Samsung',
    positionName: 'AI Engineer',
    email: 'samsung123@gmail.com',
  },
  {
    id: 'id2335',
    name: 'CompanyName',
    positionName: 'PositionName',
    email: 'minakim34@gmail.com',
  },
];

const EditableField = ({ label, field, value, editable, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const save = () => {
    setEditing(false);
    if (tempValue !== value) onSave(field, tempValue);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2">
      <div className="font-medium text-gray-800 text-sm sm:text-base">
        {label}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-1/2">
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
            className="text-gray-500 hover:text-gray-800"
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerRole } = useSelector(state => state.globalState);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleResumeUpload = async e => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      if (
        ![
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type)
      ) {
        alert('Only PDF files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File must be smaller than 5MB.');
        return;
      }

      setResume(file);
      const formData = new FormData();
      formData.append('resume', file);
      await api.post(endpoints.RESUME_UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Logout issue!', error.message);
        return;
      }
      dispatch(handleLogout());
      dispatch(resetAuthData({ user: 'shared' }));
      dispatch(resetAuthData({ user: 'applicant' }));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const queryAndSetAccountSettings = async () => {
    try {
      const {
        data: { user },
      } = await api.get(endpoints.USER_INFO(registerRole));
      const { account_id, name, email, phone, birthdate, language, country } =
        user;
      setFormData({
        accountId: account_id,
        name,
        email,
        phone,
        birthdate,
        gender: 'male',
        language,
        country,
      });
    } catch (err) {
      console.log('Account settings query error:', err.message);
    }
  };

  useEffect(() => {
    queryAndSetAccountSettings();
  }, []);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-md shadow-md mt-10 sm:mt-14">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Account Settings
      </h2>

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
        <label className="block font-medium text-gray-700 mb-2 text-sm sm:text-base">
          Resume Upload (PDF only, max 5MB)
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleResumeUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
          >
            <UploadCloud size={16} className="mr-2" /> Upload Resume
          </button>
          {resume && (
            <span className="text-sm text-gray-600">{resume.name}</span>
          )}
        </div>
      </div>

      {/* Applied Positions */}
      <div className="mt-6">
        <label className="block font-medium text-gray-700 mb-2 text-sm sm:text-base">
          Applied Positions
        </label>
        <div className="overflow-x-auto border rounded-lg shadow bg-white">
          <table className="w-full min-w-[600px] table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Company Name</th>
                <th className="px-4 py-2">Position Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map(company => (
                <tr key={company.id} className="text-center">
                  <td className="border px-4 py-2">{company.name}</td>
                  <td className="border px-4 py-2">{company.positionName}</td>
                  <td className="border px-4 py-2">{company.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Buttons */}
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
