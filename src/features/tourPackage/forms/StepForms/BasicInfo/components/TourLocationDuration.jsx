import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Country, State, City } from "country-state-city";

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
      setCities([]);
      setLocationData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCities(City.getCitiesOfState(country, state));
      setLocationData((prev) => ({ ...prev, city: "" }));
    }
  }, [state]);

  return (
    <Box sx={{ "& > *": { mb: 3 } }}>
      <FormControl fullWidth required>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          value={country || ""}
          onChange={(e) =>
            setLocationData((prev) => ({ ...prev, country: e.target.value }))
          }
          label="Country"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          {countries.map((c) => (
            <MenuItem key={c.isoCode} value={c.isoCode}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          value={state || ""}
          onChange={(e) =>
            setLocationData((prev) => ({ ...prev, state: e.target.value }))
          }
          label="State"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          {states.map((s) => (
            <MenuItem key={s.isoCode} value={s.isoCode}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          value={city || ""}
          onChange={(e) =>
            setLocationData((prev) => ({ ...prev, city: e.target.value }))
          }
          label="City"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          {cities.map((c) => (
            <MenuItem key={c.id} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Typography sx={{ mb: 1 }}>
          Duration <span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          type="number"
          value={duration || ""}
          onChange={(e) =>
            setLocationData((prev) => ({ ...prev, duration: e.target.value }))
          }
          placeholder="e.g. 5 hours"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default TourLocationDuration;
