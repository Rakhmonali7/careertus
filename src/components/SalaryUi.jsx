import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobData } from '../store/reducers/globalReducer';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  KRW: '₩',
  GBP: '£',
};

const currencies = Object.keys(currencySymbols);
const rates = ['per hour', 'per day', 'per week', 'per month', 'per year'];

export default function SalaryRangeSelector() {
  const dispatch = useDispatch();
  const { wage_max, wage_min, rate, currency } = useSelector(
    state => state.globalState.job
  );

  const symbol = currencySymbols[currency] || '$';

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
      {/* Currency Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Currency</label>
        <select
          value={currency}
          onChange={e =>
            dispatch(
              setJobData({ key: 'currency', value: e.target.value || currency })
            )
          }
          className="border rounded-md px-3 py-2 focus:outline-none text-sm sm:text-base"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Minimum</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {symbol}
          </span>
          <input
            type="number"
            value={wage_min}
            onChange={e =>
              dispatch(setJobData({ key: 'wage_min', value: e.target.value }))
            }
            className="border rounded-md pl-8 pr-4 py-2 w-full sm:w-[140px] focus:outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-6 sm:mt-0">
        <span className="text-sm text-gray-600">to</span>
      </div>

      {/* Maximum */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Maximum</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {symbol}
          </span>
          <input
            type="number"
            value={wage_max}
            onChange={e =>
              dispatch(setJobData({ key: 'wage_max', value: e.target.value }))
            }
            className="border rounded-md pl-8 pr-4 py-2 w-full sm:w-[140px] focus:outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Rate Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Rate</label>
        <select
          value={rate}
          onChange={e =>
            dispatch(setJobData({ key: 'rate', value: e.target.value }))
          }
          className="border rounded-md px-3 py-2 focus:outline-none text-sm sm:text-base"
        >
          {rates.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
