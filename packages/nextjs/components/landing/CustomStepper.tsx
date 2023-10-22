import { Stepper } from "react-form-stepper";

interface ILabelProps {
  label: string;
}

interface IStepperProps {
  steps: ILabelProps[];
  activeStep: number;
}

function CustomStepper({ steps, activeStep }: IStepperProps) {
  return (
    <ul className="steps flex justify-center gap-4">
      {steps.map(({ label }, index) => (
        <li key={label} className={`step max-w-[40%] ${index > activeStep ? "step-primary" : "step-secondary"}`}>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default CustomStepper;
