import React, {useState, useEffect} from "react";
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Country, State, City } from 'country-state-city';

const TourLocationDuration = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [duration, setDuration] = React.useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry);
      setStates(stateList);
      setSelectedState('');
      setCities([]);
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(cityList);
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDurationChange = (event) => setDuration(event.target.value);

  return (
    <Box className="space-y-6">
      <Box className="mb-6">
        <FormControl fullWidth required>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            value={selectedCountry}
            onChange={handleCountryChange}
            label="Country"
            className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country) => (
              <MenuItem key={country.isoCode} value={country.isoCode}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedCountry && (
        <Box className="mb-6">
          <FormControl fullWidth required>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              value={selectedState}
              onChange={handleStateChange}
              label="State"
              className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {states.map((state) => (
                <MenuItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {selectedState && (
        <Box className="mb-6">
          <FormControl fullWidth required>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              value={selectedCity}
              onChange={handleCityChange}
              label="City"
              className="bg-white rounded-md border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box className="mb-6">
            <Typography className="text-base md:text-sm text-gray-800">
              Duration <span className="text-red-500">*</span>
            </Typography>
            <TextField
              fullWidth
              required
              variant="outlined"
              type="number"
              value={duration}
              onChange={handleDurationChange}
              placeholder="Enter the tour duration in hours or days"
              className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Box>
    </Box>
  );
};

export default TourLocationDuration;