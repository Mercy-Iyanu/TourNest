import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';

const categories = ['Adventure', 'Cultural', 'Beach'];
const partnerTypes = ['Reseller', 'Affiliate', 'Corporate'];
const adjustmentTypes = ['Markup', 'Markdown'];

const PricingRuleForm = ({ onAddRule }) => {
  const [formData, setFormData] = useState({
    category: '',
    partner: '',
    adjustmentType: '',
    percentage: ''
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    onAddRule(formData);
    setFormData({ category: '', partner: '', adjustmentType: '', percentage: '' });
  };

  return (
    <Box className="p-4 rounded-xl border shadow bg-white max-w-md mx-auto mb-6">
      <Typography variant="h6" className="mb-4 font-bold text-center">
        New Pricing Rule
      </Typography>

      <TextField select fullWidth label="Tour Category" value={formData.category}
        onChange={handleChange('category')} className="mb-3">
        {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
      </TextField>

      <TextField select fullWidth label="Partner Type" value={formData.partner}
        onChange={handleChange('partner')} className="mb-3">
        {partnerTypes.map((pt) => <MenuItem key={pt} value={pt}>{pt}</MenuItem>)}
      </TextField>

      <TextField select fullWidth label="Adjustment Type" value={formData.adjustmentType}
        onChange={handleChange('adjustmentType')} className="mb-3">
        {adjustmentTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
      </TextField>

      <Box className="flex items-center mb-4">
        <TextField fullWidth type="number" label="Adjustment (%)"
          value={formData.percentage} onChange={handleChange('percentage')} />
        <Typography className="ml-2 text-lg">%</Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Add Pricing Rule
      </Button>
    </Box>
  );
};

export default PricingRuleForm;