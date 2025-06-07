import { useEffect, useState } from 'react';
import Template from '../components/Template';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import api from '../configs/config';
import { endpoints } from '../configs/endpoints';
import {
  setTemplateStatus,
  setAuthData,
  resetAuthData,
  setAuthDataBulk,
} from '../store/reducers/globalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pages } from '../configs/pages';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const templateStatusEnum = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
  SIX: 5,
  SEVEN: 6,
};

function CompanySignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState('');

  const templateStatus = useSelector(state => state.globalState.templateStatus);
  const { phone, name, accountId } = useSelector(
    state => state.globalState.shared
  );
  const { company_name, industry, website, description } = useSelector(
    state => state.globalState.company
  );
  const { shared, company, registerRole } = useSelector(
    state => state.globalState
  );

  const handleChange = (user, key) => value => {
    dispatch(setAuthData({ user, key, value }));
  };

  const handleForwardTemplate = (e, status) => {
    e.preventDefault();
    dispatch(setTemplateStatus(status));
  };

  const handleRegisterRole = async e => {
    e.preventDefault();
    try {
      for (let [key, value] of Object.entries(shared)) {
        if (['email', 'password', 'confirmPw', 'type'].includes(key)) continue;
        if (!value) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      for (let [key, value] of Object.entries(company)) {
        if (!value) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      const dataPayload = {
        type: registerRole,
        account_id: accountId,
        name,
        phone,
        company_name,
        industry,
        website,
        description,
      };
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = token
        ? `Bearer ${token}`
        : '';

      const {
        data: { user },
      } = await api.post(endpoints.REGISTER_ROLE, dataPayload);
      const {
        account_id,
        email,
        name: _name,
        phone: _phone,
        type: _type,
        user_id,
      } = user;

      dispatch(
        setAuthDataBulk({
          user: 'shared',
          data: {
            user_uuid: user_id,
            accountId: account_id,
            email,
            name: _name,
            phone: _phone,
            type: _type,
          },
        })
      );
      dispatch(setAuthDataBulk({ user: registerRole, data: user }));
      dispatch(setTemplateStatus(templateStatusEnum.ONE));
      navigate(pages.JOB_FINAL_EDIT);
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || 'Something went wrong.');
    }
  };

  const templates = {
    accountIdRegister: () => (
      <Template
        title="Enter a new account id"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.TWO)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Account Id"
          type="text"
          name="accountId"
          value={accountId || ''}
          onChange={handleChange('shared', 'accountId')}
        />
      </Template>
    ),

    nameRegister: () => (
      <Template
        title="Enter your fullname"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.THREE)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Full Name"
          type="text"
          name="name"
          value={name || ''}
          onChange={handleChange('shared', 'name')}
        />
      </Template>
    ),

    phoneRegister: () => (
      <Template
        title="Enter your phone number"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.FOUR)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <PhoneInput
          country={'kr'}
          value={phone || ''}
          onChange={value =>
            dispatch(setAuthData({ user: 'shared', key: 'phone', value }))
          }
          inputStyle={{ width: '100%' }}
          specialLabel=""
        />
      </Template>
    ),

    companyNameRegister: () => (
      <Template
        title="Enter your company name"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.FIVE)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Company name"
          type="text"
          name="company_name"
          value={company_name || ''}
          onChange={handleChange('company', 'company_name')}
        />
      </Template>
    ),

    industryRegister: () => (
      <Template
        title="Enter your industry"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.SIX)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Industry"
          type="text"
          name="industry"
          value={industry || ''}
          onChange={handleChange('company', 'industry')}
        />
      </Template>
    ),

    websiteRegister: () => (
      <Template
        title="Enter your website (optional)"
        theme="red"
        onSubmit={e => handleForwardTemplate(e, templateStatusEnum.SEVEN)}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Website link"
          type="text"
          name="website"
          value={website || ''}
          onChange={handleChange('company', 'website')}
        />
      </Template>
    ),

    descriptionRegister: () => (
      <Template
        title="Enter job description"
        theme="red"
        onSubmit={handleRegisterRole}
        footer={<CustomButton name="Continue" type="submit" theme="red" />}
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Description"
          type="text"
          name="description"
          value={description || ''}
          onChange={handleChange('company', 'description')}
        />
      </Template>
    ),
  };

  useEffect(() => {
    dispatch(setTemplateStatus(templateStatusEnum.ONE));
    dispatch(resetAuthData({ user: registerRole }));
  }, []);

  return (() => {
    switch (templateStatus) {
      case templateStatusEnum.ONE:
        return templates.accountIdRegister();
      case templateStatusEnum.TWO:
        return templates.nameRegister();
      case templateStatusEnum.THREE:
        return templates.phoneRegister();
      case templateStatusEnum.FOUR:
        return templates.companyNameRegister();
      case templateStatusEnum.FIVE:
        return templates.industryRegister();
      case templateStatusEnum.SIX:
        return templates.websiteRegister();
      case templateStatusEnum.SEVEN:
        return templates.descriptionRegister();
      default:
        return templates.accountIdRegister();
    }
  })();
}

export default CompanySignUp;
