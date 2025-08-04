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
  media: {
    tourImages: [],
    tourVideos: [],
    additionalFiles: [],
  },
  additional: {
    requirements: "",
    cancellationPolicy: "",
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    tags: [],
  },
};
