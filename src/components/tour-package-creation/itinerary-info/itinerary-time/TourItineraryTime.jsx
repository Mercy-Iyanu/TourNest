import React, {useState} from "react";
import TourActivityLocation from "./TourActivityLocation";
import TourActivityStartTime from "./TourActivityStartTime";
import TourActivityEndTime from "./TourActivityEndTime";

const TourItineraryTime = () => {
  const [locations, setLocations] = useState([]);
  const [activityLocation, setActivityLocation] = useState("");

  return (
    <div className="flex flex-wrap gap-6">
      <TourActivityLocation locations={locations} activityLocation={activityLocation} setActivityLocation={setActivityLocation} />
      <TourActivityStartTime />
      <TourActivityEndTime />
    </div>
  );
};

export default TourItineraryTime;