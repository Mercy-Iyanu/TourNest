import * as Yup from "yup";

export const tourValidationSchema = Yup.object().shape({
  basicInfo: Yup.object().shape({
    tour_name: Yup.string().required("Tour name is required"),
    description: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    duration: Yup.string(),
    tour_type: Yup.string(),
  }),

  itinerary: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string(),
        title: Yup.string(),
        description: Yup.string(),
        location: Yup.string(),
        startTime: Yup.string(),
        endTime: Yup.string(),
      })
    )
    .min(1, "At least one day is required")
    .required("Itinerary is required"),

  pricing: Yup.object().shape({
    pricePerPerson: Yup.number().typeError("Price must be a number"),
    currency: Yup.string(),
    discount: Yup.object()
      .nullable()
      .shape({
        discountValue: Yup.number()
          .typeError("Discount must be a number")
          .positive("Discount must be greater than zero")
          .required("Discount value is required"),
        minGroupSize: Yup.number()
          .typeError("Minimum group size must be a number")
          .integer("Group size must be a whole number")
          .min(1, "Minimum group size must be at least 1")
          .required("Minimum group size is required"),
      }),
  }),

  availability: Yup.array()
    .of(
      Yup.object().shape({
        startDate: Yup.string(),
        endDate: Yup.string(),
        minGuests: Yup.number().typeError("Min guests must be a number"),
        maxGuests: Yup.number().typeError("Max guests must be a number"),
        isAvailable: Yup.boolean(),
      })
    )
    .min(1, "At least one availability period is required")
    .required("Availability is required"),

  booking: Yup.object().shape({
    cancellationPolicy: Yup.string(),
    paymentMethods: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required("ID is required"),
        name: Yup.string().required("Name is required"),
        type: Yup.string()
          .oneOf(["local", "international"])
          .required("Payment type is required"),
      })
    ),
  }),

  additional: Yup.object().shape({
    requirements: Yup.string(),
    contact: Yup.object().shape({
      name: Yup.string(),
      phone: Yup.string().matches(
        /^[\d+()\s-]{7,20}$/,
        "Phone number is not valid"
      ),
      email: Yup.string().email("Invalid email"),
    }),
    tags: Yup.array().of(Yup.string()),
  }),

  media: Yup.object().shape({
    tourImages: Yup.array().of(Yup.string().url("Invalid image URL")),
    tourVideos: Yup.array().of(Yup.string().url("Invalid video URL")),
    additionalFiles: Yup.array().of(Yup.string().url("Invalid file URL")),
  }),
});
