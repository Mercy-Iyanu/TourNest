import React from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { useFormikContext, FieldArray } from "formik";

const AdditionalInfoSection = () => {
  const {
    values,
    handleChange,
    touched,
    errors,
    getFieldProps,
    setFieldTouched,
  } = useFormikContext();

  const contact = values.additional?.contact || {};
  const tags = values.additional?.tags || [];

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Additional Info
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={2}
        label="Tour Requirements"
        name="additional.requirements"
        {...getFieldProps("additional.requirements")}
        error={
          touched?.additional?.requirements &&
          Boolean(errors?.additional?.requirements)
        }
        helperText={
          touched?.additional?.requirements && errors?.additional?.requirements
        }
        margin="normal"
      />

      <TextField
        fullWidth
        multiline
        minRows={2}
        label="Cancellation Policies"
        name="additional.cancellationPolicy"
        {...getFieldProps("additional.cancellationPolicy")}
        error={
          touched?.additional?.cancellationPolicy &&
          Boolean(errors?.additional?.cancellationPolicy)
        }
        helperText={
          touched?.additional?.cancellationPolicy &&
          errors?.additional?.cancellationPolicy
        }
        margin="normal"
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Contact Info
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="additional.contact.name"
        {...getFieldProps("additional.contact.name")}
        error={
          touched?.additional?.contact?.name &&
          Boolean(errors?.additional?.contact?.name)
        }
        helperText={
          touched?.additional?.contact?.name &&
          errors?.additional?.contact?.name
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone"
        name="additional.contact.phone"
        {...getFieldProps("additional.contact.phone")}
        error={
          touched?.additional?.contact?.phone &&
          Boolean(errors?.additional?.contact?.phone)
        }
        helperText={
          touched?.additional?.contact?.phone &&
          errors?.additional?.contact?.phone
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="additional.contact.email"
        {...getFieldProps("additional.contact.email")}
        error={
          touched?.additional?.contact?.email &&
          Boolean(errors?.additional?.contact?.email)
        }
        helperText={
          touched?.additional?.contact?.email &&
          errors?.additional?.contact?.email
        }
        margin="normal"
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Tags
      </Typography>
      <FieldArray name="additional.tags">
        {({ push, remove }) => (
          <Stack direction="column" spacing={2}>
            {tags.map((tag, index) => (
              <Box key={index} display="flex" gap={2} alignItems="center">
                <TextField
                  label={`Tag ${index + 1}`}
                  name={`additional.tags[${index}]`}
                  value={tag}
                  onChange={handleChange}
                  fullWidth
                />
                <Button
                  color="error"
                  onClick={() => remove(index)}
                  variant="outlined"
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button onClick={() => push("")} variant="outlined">
              Add Tag
            </Button>
          </Stack>
        )}
      </FieldArray>
    </Box>
  );
};

export default AdditionalInfoSection;
