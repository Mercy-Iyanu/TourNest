import React, {useState, useEffect} from "react";
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Country, State, City } from 'country-state-city';

const TourLocationDuration = ({ locationData, setLocationData }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { country, state, city, duration } = locationData;

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country));
      setLocationData({ state: '', city: '' });
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCities(City.getCitiesOfState(country, state));
      setLocationData({ city: '' });
    }
  }, [state]);
  return (
    <Box className="space-y-6">
      <Box className="mb-6">
        <FormControl fullWidth required>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            value={country || ''}
            onChange={(e) => setLocationData({ country: e.target.value })}
            label="Country"
            className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((c) => (
              <MenuItem key={c.isoCode} value={c.isoCode}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-6">
        <FormControl fullWidth required>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            value={state || ''}
            onChange={(e) => setLocationData({ state: e.target.value })}
            label="State"
            className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {states.map((s) => (
              <MenuItem key={s.isoCode} value={s.isoCode}>{s.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

        <Box className="mb-6">
          <FormControl fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              value={city || ''}
              onChange={(e) => setLocationData({ city: e.target.value })}
              label="City"
              className="bg-white rounded-md border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

      <Box className="mb-6">
        <Typography className="text-base md:text-sm text-gray-800">
          Duration <span className="text-red-500">*</span>
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          type="number"
          value={duration || ''}
          onChange={(e) => setLocationData({ duration: e.target.value })}
          placeholder="e.g 5 hours"
          className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      </Box>
    </Box>
  );
};

export default TourLocationDuration;