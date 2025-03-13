import React, {useState} from "react";
import TourMainLocation from "./TourMainLocation";
import TourLocationState from "./TourLocationState";
import TourDuration from "./TourDuration";

const TourLocationDuration = ({ formData, updateFormData }) => {
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [locations, setLocations] = useState([]);
  const [activityLocation, setActivityLocation] = useState("");

  return (
    <div className="flex flex-wrap gap-6">
      <TourMainLocation country={country} setCountry={setCountry} setStates={setStates} formData={formData} updateFormData={updateFormData} />
      
      <TourLocationState country={country} state={state} setState={setState} setLocations={setLocations} formData={formData} updateFormData={updateFormData} />
      
      <TourDuration />
    </div>
  );
};

export default TourLocationDuration;