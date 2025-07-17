import React from "react";
import { FaTimes } from "react-icons/fa";
import { Box, Typography, Button, Chip } from "@mui/material";

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
    <Box mb={4}>
      <Typography variant="subtitle1" gutterBottom>
        Accepted Payment Methods <span style={{ color: "red" }}>*</span>
      </Typography>

      {selectedMethods.length > 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          p={2}
          mb={2}
          borderRadius={2}
          bgcolor="#f5f5f5"
          border="1px solid #ccc"
        >
          {selectedMethods.map((method) => (
            <Chip
              key={method.id}
              label={method.name}
              onDelete={() => handleRemove(method)}
              deleteIcon={<FaTimes />}
              sx={{
                backgroundColor:
                  method.type === "local" ? "#4caf50" : "#2196f3",
                color: "#fff",
              }}
            />
          ))}
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" gap={2}>
        {paymentOptions
          .filter((method) => !selectedMethods.some((m) => m.id === method.id))
          .map((method) => (
            <Button
              key={method.id}
              variant="outlined"
              size="small"
              onClick={() => handleSelect(method)}
              sx={{
                backgroundColor:
                  method.type === "local" ? "#e8f5e9" : "#e3f2fd",
                color: method.type === "local" ? "#2e7d32" : "#1565c0",
                borderColor: method.type === "local" ? "#81c784" : "#64b5f6",
                "&:hover": {
                  backgroundColor:
                    method.type === "local" ? "#c8e6c9" : "#bbdefb",
                },
              }}
            >
              {method.name}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default PaymentMethodSelector;
