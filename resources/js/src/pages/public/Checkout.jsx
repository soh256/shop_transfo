import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";

export const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const steps = [
        {
            title: "livraisons",
            content: (
                <>
                    <Step1 setActiveStep={setActiveStep} />
                </>
            ),
        },
        {
            title: " paiements",
            content: (
                <>
                    <Step2 setActiveStep={setActiveStep} />
                </>
            ),
        },

        {
            title: "Fin ",
            content: <Step3 />,
        },
    ];

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className="flex bg-white  justify-center items-center my-5 ">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center ",
                    width: "50%",
                }}
            >
                <div className="my-5 flex justify-center w-full text-xs capitalize">
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index} completed={completed[index]}>
                                <StepButton
                                    color="inherit"

                                    // onClick={handleStep(index)}
                                >
                                    {step.title}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    {allStepsCompleted() ? (
                        <React.Fragment
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <div className="w-full">
                                <Typography
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                >
                                    {/* All steps completed - you&apos;re finished */}
                                    <div className="focus-within:outline-none">
                                        {steps[2].content}
                                    </div>
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        pt: 2,
                                    }}
                                >
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                {steps[activeStep].content}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            ></Box>
                        </React.Fragment>
                    )}
                </div>
            </Box>
        </div>
    );
};
