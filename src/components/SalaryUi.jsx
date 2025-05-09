import React, { useState } from 'react';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  KRW: '₩',
  GBP: '£',
};

const currencies = Object.keys(currencySymbols);
const rates = ['per hour', 'per day', 'per week', 'per month', 'per year'];

export default function SalaryRangeSelector() {
  const [currency, setCurrency] = useState('USD');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [rate, setRate] = useState('per year');

  const symbol = currencySymbols[currency] || '$';

  return (
    <div className="flex items-end gap-2 flex-wrap ">
      {/* Currency Dropdown */}
      <div>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="border rounded-full pl-2 py-2 focus:outline-none"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum */}
      <div className="flex flex-col items-center justify-center">
        <label className="text-sm mb-1">Minimum</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {symbol}
          </span>
          <input
            type="number"
            value={min}
            onChange={e => setMin(e.target.value)}
            className="border rounded-full pl-8 pr-4 py-1.5 w-30 focus:outline-none"
          />
        </div>
      </div>

      <span className="text-sm mt-4">to</span>

      {/* Maximum */}
      <div className="flex flex-col items-center justify-center">
        <label className="text-sm mb-1">Maximum</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {symbol}
          </span>
          <input
            type="number"
            value={max}
            onChange={e => setMax(e.target.value)}
            className="border rounded-full pl-8 pr-4 py-1.5 w-30 focus:outline-none"
          />
        </div>
      </div>

      {/* Rate Dropdown */}
      <div className="flex flex-col items-center justify-center">
        <label className="text-sm mb-1">Rate</label>
        <select
          value={rate}
          onChange={e => setRate(e.target.value)}
          className="border rounded-full pl-4 py-2 focus:outline-none"
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
