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
      discountValue: "",
      minGroupSize: "",
    },
  },
  availability: [
    {
      startDate: "",
      endDate: "",
      minGuests: "",
      maxGuests: "",
      isAvailable: true,
    },
  ],
  booking: {
    cancellationPolicy: "",
    paymentMethods: [{ name: "", type: "local" }],
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
