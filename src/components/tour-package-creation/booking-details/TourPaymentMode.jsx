import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const paymentOptions = [
  { id: 1, name: "Paystack (NGN)", type: "local" },
  { id: 2, name: "Flutterwave", type: "local" },
  { id: 3, name: "Bank Transfer", type: "local" },
  { id: 4, name: "Opay", type: "local" },
  { id: 5, name: "Monnify", type: "local" },
  { id: 6, name: "Visa", type: "international" },
  { id: 7, name: "Mastercard", type: "international" },
  { id: 8, name: "PayPal", type: "international" },
  { id: 9, name: "Stripe", type: "international" },
  { id: 10, name: "Western Union", type: "international" },
];

const PaymentMethodSelector = () => {
  const [selectedMethods, setSelectedMethods] = useState([]);

  const handleSelect = (method) => {
    if (!selectedMethods.find((m) => m.id === method.id)) {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleRemove = (method) => {
    setSelectedMethods(selectedMethods.filter((m) => m.id !== method.id));
  };

  return (
    <div className="w-full max-w-lg mx-auto my-6">
      <label className="font-semibold text-sm block mb-2">
        Accepted mode of payment <span className="text-red-500">*</span>
      </label>
      {/* Selected Payment Methods */}
      {selectedMethods.length > 0 && (
        <div className="mb-4 p-3 border rounded-lg bg-gray-100 flex flex-wrap gap-2">
          {selectedMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
            >
              {method.name}
              <FaTimes
                className="ml-2 cursor-pointer"
                onClick={() => handleRemove(method)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Payment Method List */}
      <div className="flex flex-wrap gap-3">
        {paymentOptions
          .filter((method) => !selectedMethods.some((m) => m.id === method.id))
          .map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelect(method)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer ${
                method.type === "local"
                  ? "bg-green-200 hover:bg-green-300 text-green-800"
                  : "bg-blue-200 hover:bg-blue-300 text-blue-800"
              }`}
            >
              {method.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
