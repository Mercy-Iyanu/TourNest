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
      discountType: data.pricing?.discount?.discountType || "",
      discountValue: data.pricing?.discount?.discountValue ?? "",
      minGroupSize: data.pricing?.discount?.minGroupSize ?? "",
      startDate: data.pricing?.discount?.startDate || "",
      endDate: data.pricing?.discount?.endDate || "",
    },
    availability: Array.isArray(data.pricing?.availability)
      ? data.pricing.availability.map((item) => ({
          start_date: item.start_date || "",
          end_date: item.end_date || "",
          max_guests: item.max_guests ?? "",
          is_available: item.is_available ?? true,
        }))
      : [],
  },

  booking: {
    cancellationPolicy: data.booking?.cancellationPolicy || "",
    paymentMethods: Array.isArray(data.booking?.paymentMethods)
      ? data.booking.paymentMethods.map((method) => ({
          id: method.id ?? "",
          name: method.name || "",
          type: method.type || "local",
        }))
      : [{ id: "", name: "", type: "local" }],
    minGroupSize: data.booking?.minGroupSize ?? "",
    maxGroupSize: data.booking?.maxGroupSize ?? "",
  },

  media: {
    tourImages: Array.isArray(data.media?.tourImages)
      ? data.media.tourImages
      : [],
    tourVideos: Array.isArray(data.media?.tourVideos)
      ? data.media.tourVideos
      : [],
    additionalFiles: Array.isArray(data.media?.additionalFiles)
      ? data.media.additionalFiles
      : [],
  },

  additional: {
    requirements: data.additional?.requirements || "",
    contact: {
      name: data.additional?.contact?.name || "",
      phone: data.additional?.contact?.phone || "",
      email: data.additional?.contact?.email || "",
    },
    tags: Array.isArray(data.additional?.tags) ? data.additional.tags : [],
  },
});
