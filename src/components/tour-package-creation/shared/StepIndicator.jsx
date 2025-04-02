import React from "react";
import { Stepper, Step, StepLabel, MobileStepper, useMediaQuery } from "@mui/material";
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
    />
  ) : (
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => onStepClick(index + 1)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };
  
  export default StepIndicator;