import { Button, Box, Container, Stack } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <Box
      position="sticky"
      bottom={0}
      bgcolor="background.paper"
      boxShadow={2}
      py={2}
      zIndex={10}
    >
      <Container maxWidth="lg">
        <Stack direction="row" spacing={2} justifyContent="center">
          {currentStep > 1 && (
            <Button
              onClick={onPrevious}
              variant="contained"
              color="secondary"
              startIcon={<FaArrowLeft />}
            >
              Previous
            </Button>
          )}

          {currentStep < totalSteps ? (
            <Button
              onClick={onNext}
              variant="contained"
              sx={{
                backgroundColor: "#1D777D",
                "&:hover": { backgroundColor: "#145b5f" },
              }}
              endIcon={<FaArrowRight />}
            >
              Next
            </Button>
          ) : (
            <Button onClick={onSubmit} variant="contained" color="success">
              Create Package
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default FormNavigation;
