import React from "react";
import { FaTimes } from "react-icons/fa";
import { Box, Typography, Button } from "@mui/material";

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

const PaymentMethodSelector = ({ selectedMethods, onChange }) => {
  const handleSelect = (method) => {
    if (!selectedMethods.find((m) => m.id === method.id)) {
      onChange([...selectedMethods, method]);
    }
  };

  const handleRemove = (method) => {
    onChange(selectedMethods.filter((m) => m.id !== method.id));
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
        Accepted Payment Methods <span className="text-red-500">*</span>
      </Typography>

      {selectedMethods.length > 0 && (
        <Box className="mb-4 p-3 border rounded-lg bg-gray-100 flex flex-wrap gap-2">
          {selectedMethods.map((method) => (
            <Box
              key={method.id}
              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
            >
              {method.name}
              <FaTimes
                className="ml-2 cursor-pointer"
                onClick={() => handleRemove(method)}
              />
            </Box>
          ))}
        </Box>
      )}

      <Box className="flex flex-wrap gap-3">
        {paymentOptions
          .filter((method) => !selectedMethods.some((m) => m.id === method.id))
          .map((method) => (
            <Button
              key={method.id}
              onClick={() => handleSelect(method)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer ${
                method.type === "local"
                  ? "bg-green-200 hover:bg-green-300 text-green-800"
                  : "bg-blue-200 hover:bg-blue-300 text-blue-800"
              }`}
            >
              {method.name}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default PaymentMethodSelector;