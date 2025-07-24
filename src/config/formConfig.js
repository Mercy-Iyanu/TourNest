import { tourInitialValues } from "../constants/formDefaults";
import { tourValidationSchema } from "../validation/tourSchema";

export const tourFormConfig = {
  initialValues: tourInitialValues,
  validationSchema: tourValidationSchema,
};
