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
    discount: Yup.object().shape({
      discountType: Yup.string().oneOf(["percentage", "fixed"]).nullable(),
      iscountValue: Yup.number()
        .nullable()
        .when("discountType", {
          is: "percentage",
          then: (schema) =>
            schema.max(100, "Percentage discount cannot exceed 100%"),
        }),
      minGroupSize: Yup.number().nullable(),
      startDate: Yup.date().nullable(),
      endDate: Yup.date()
        .nullable()
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
    availability: Yup.array()
      .of(
        Yup.object().shape({
          start_date: Yup.string(),
          end_date: Yup.string(),
          max_guests: Yup.number().typeError("Max guests must be a number"),
          is_available: Yup.boolean(),
        })
      )
      .min(1, "At least one availability period is required")
      .required("Availability is required"),
  }),

  booking: Yup.object().shape({
    cancellationPolicy: Yup.string(),
    paymentMethods: Yup.array().of(
      Yup.object().shape({
        id: Yup.number()
          .typeError("ID must be a number")
          .required("ID is required"),
        name: Yup.string().required("Name is required"),
        type: Yup.string()
          .oneOf(["local", "international"])
          .required("Payment type is required"),
      })
    ),
    minGroupSize: Yup.number().typeError("Min group size must be a number"),
    maxGroupSize: Yup.number().typeError("Max group size must be a number"),
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
