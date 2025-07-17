import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/system";

const StepIndicator = ({ currentStep, steps, onStepClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <MobileStepper
      variant="dots"
      steps={steps.length}
      position="static"
      activeStep={currentStep - 1}
      nextButton={null}
      backButton={null}
      sx={{ justifyContent: "center", mt: 2, mb: 2 }}
    />
  ) : (
    <Stepper activeStep={currentStep - 1} alternativeLabel sx={{ my: 3 }}>
      {steps.map((label, index) => (
        <Step
          key={label}
          onClick={() => onStepClick?.(index + 1)}
          sx={{ cursor: onStepClick ? "pointer" : "default" }}
        >
          <Tooltip title={label}>
            <StepLabel>{label}</StepLabel>
          </Tooltip>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepIndicator;
