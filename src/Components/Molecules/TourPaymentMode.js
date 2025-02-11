import React, { useState } from 'react';

const PaymentOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState(['bankTransfer']); // Default selected option

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option) => selectedOptions.includes(option);

  return (
    <div className="payment-options">
      <p className="payment-title">Accepted mode of payment*</p>

      <div className="option-group">
        <div 
          className={`option-box ${isOptionSelected('bankTransfer') ? 'selected' : ''}`}
          onClick={() => handleOptionChange('bankTransfer')}
        >
          Bank transfer
          {isOptionSelected('bankTransfer') && <span className="remove-icon"> x </span>}
        </div>

        <div 
          className={`option-box ${isOptionSelected('creditCard') ? 'selected' : ''}`}
          onClick={() => handleOptionChange('creditCard')}
        >
          Credit/Debit card
        </div>

        <div 
          className={`option-box ${isOptionSelected('paypal') ? 'selected' : ''}`}
          onClick={() => handleOptionChange('paypal')}
        >
          PayPal
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;