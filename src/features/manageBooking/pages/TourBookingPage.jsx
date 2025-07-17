import React from "react";
import { useParams, useLocation } from "react-router-dom";
import TourBookingForm from "../form/TourBookingForm";

const TourBookingPage = () => {
  const { tourId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const distributorId = query.get("distributorId");
  const tourTitle = query.get("tourTitle");

  if (!distributorId || !tourTitle) {
    return <p>Missing tour information. Please use a valid booking link.</p>;
  }

  return (
    <TourBookingForm
      tourId={tourId}
      distributorId={distributorId}
      tourTitle={tourTitle}
    />
  );
};

export default TourBookingPage;
