import { tourInitialValues } from "../constants/formDefaults";
import { tourValidationSchema } from "../validations/tourSchema";

export const tourFormConfig = {
  initialValues: tourInitialValues,
  validationSchema: tourValidationSchema,
};
