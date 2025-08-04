const formatDate = (iso) => (iso ? iso.slice(0, 10) : "");

export const mapApiToFormik = (data) => ({
  basicInfo: {
    tour_name: data.basicInfo?.tour_name || "",
    description: data.basicInfo?.description || "",
    tour_type: data.basicInfo?.tour_type || "",
    country: data.basicInfo?.country || "",
    state: data.basicInfo?.state || "",
    city: data.basicInfo?.city || "",
    duration: data.basicInfo?.duration || "",
  },

  itinerary:
    Array.isArray(data.itinerary) && data.itinerary.length
      ? data.itinerary.map((item) => ({
          day: item.day || "",
          title: item.title || "",
          description: item.description || "",
          location: item.location || "",
          startTime: item.startTime || "",
          endTime: item.endTime || "",
        }))
      : [
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
    pricePerPerson: data.pricing?.pricePerPerson ?? "",
    currency: data.pricing?.currency || "",
    discount: {
      discountValue: data.pricing?.discount?.discountValue ?? "",
      minGroupSize: data.pricing?.discount?.minGroupSize ?? "",
    },
  },

  availability: Array.isArray(data.availability)
    ? data.availability.map((item) => ({
        startDate: formatDate(item.startDate),
        endDate: formatDate(item.endDate),
        minGuests: item.minGuests ?? "",
        maxGuests: item.maxGuests ?? "",
        isAvailable: item.isAvailable ?? true,
      }))
    : [
        {
          startDate: "",
          endDate: "",
          minGuests: "",
          maxGuests: "",
          isAvailable: true,
        },
      ],

  media: {
    tourImages: data.media?.tourImages || [],
    tourVideos: data.media?.tourVideos || [],
    additionalFiles: data.media?.additionalFiles || [],
  },

  additional: {
    requirements: data.additional?.requirements || "",
    cancellationPolicy: data.booking?.cancellationPolicy || "",
    contact: {
      name: data.additional?.contact?.name || "",
      phone: data.additional?.contact?.phone || "",
      email: data.additional?.contact?.email || "",
    },
    tags: Array.isArray(data.additional?.tags) ? data.additional.tags : [],
  },
});
