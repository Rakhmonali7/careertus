import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobData } from "../store/reducers/globalReducer";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  KRW: "₩",
  GBP: "£",
};

const currencies = Object.keys(currencySymbols);
const rates = ["per hour", "per day", "per week", "per month", "per year"];

export default function SalaryRangeSelector() {
  const dispatch = useDispatch();
  const { wage_max, wage_min, rate, currency } = useSelector(
    (state) => state.globalState.job
  );

  const symbol = currencySymbols[currency] || "$";

  return (
    <div className="flex items-end gap-2 flex-wrap ">
      {/* Currency Dropdown */}
      <div>
        <select
          value={currency}
          onChange={(e) =>
            dispatch(
              setJobData({ key: "currency", value: e.target.value || currency })
            )
          }
          className="border rounded-full pl-2 py-2 focus:outline-none"
        >
          {currencies.map((cur) => (
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
            value={wage_min}
            onChange={(e) =>
              dispatch(setJobData({ key: "wage_min", value: e.target.value }))
            }
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
            value={wage_max}
            onChange={(e) =>
              dispatch(setJobData({ key: "wage_max", value: e.target.value }))
            }
            className="border rounded-full pl-8 pr-4 py-1.5 w-30 focus:outline-none"
          />
        </div>
      </div>

      {/* Rate Dropdown */}
      <div className="flex flex-col items-center justify-center">
        <label className="text-sm mb-1">Rate</label>
        <select
          value={rate}
          onChange={(e) =>
            dispatch(setJobData({ key: "rate", value: e.target.value }))
          }
          className="border rounded-full pl-4 py-2 focus:outline-none"
        >
          {rates.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
