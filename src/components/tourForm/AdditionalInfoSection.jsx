import React from "react";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { useFormikContext, FieldArray } from "formik";

const AdditionalInfoSection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <>
      <Typography variant="h6" mt={4}>
        Tags
      </Typography>
      <FieldArray name="additional.tags">
        {({ push, remove }) => (
          <Stack direction="column" spacing={2}>
            {values.additional.tags.map((tag, index) => (
              <Box key={index} display="flex" gap={2} alignItems="center">
                <TextField
                  label={`Tag ${index + 1}`}
                  name={`additional.tags[${index}]`}
                  value={tag}
                  onChange={handleChange}
                />
                <Button color="error" onClick={() => remove(index)}>
                  Remove
                </Button>
              </Box>
            ))}
            <Button onClick={() => push("")}>Add Tag</Button>
          </Stack>
        )}
      </FieldArray>
    </>
  );
};

export default AdditionalInfoSection;
