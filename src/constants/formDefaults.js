export const tourInitialValues = {
  basicInfo: {
    tour_name: "",
    description: "",
    tour_type: "",
    country: "",
    state: "",
    city: "",
    duration: "",
  },
  itinerary: [
    {
      day: "",
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
    },
  ],
  pricing: {
    pricePerPerson: "",
    currency: "",
    discount: {
      discountType: "",
      discountValue: "",
      minGroupSize: "",
      startDate: "",
      endDate: "",
    },
    availability: [],
  },
  booking: {
    cancellationPolicy: "",
    paymentMethods: [{ id: "", name: "", type: "local" }],
    minGroupSize: "",
    maxGroupSize: "",
  },
  media: {
    tourImages: [],
    tourVideos: [],
    additionalFiles: [],
  },
  additional: {
    requirements: "",
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    tags: [],
  },
};
