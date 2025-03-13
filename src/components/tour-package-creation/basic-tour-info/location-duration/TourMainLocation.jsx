import React from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";

const TourMainLocation = ({ country, setCountry, setStates }) => {
  const countries = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const handleCountryChange = (selected) => {
    setCountry(selected?.value || "");
    setStates(State.getStatesOfCountry(selected?.value || "").map((s) => ({
      value: s.isoCode,
      label: s.name,
    })));
  };

  return (
    <div className="w-full max-w-sm">
      <label className="block text-gray-700 font-semibold mb-2">Select Country</label>
      <Select
        options={countries}
        value={countries.find((c) => c.value === country)}
        onChange={handleCountryChange}
        placeholder="Choose a country"
        className="w-full"
      />
    </div>
  );
};

export default TourMainLocation;