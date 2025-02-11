import React, { useState } from 'react';
import currencyCodes from 'currency-codes';

const TourCurrencyDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const currencies = currencyCodes.data;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
      Currency code <span className="text-red-500">*</span>
      </label>
      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none"
      >
        <option value="" disabled>
          Choose currency
        </option>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {`${currency.currency} (${currency.code})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TourCurrencyDropdown;
