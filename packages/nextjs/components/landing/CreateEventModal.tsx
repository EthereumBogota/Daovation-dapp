import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Event } from "../../pages/events";
import CustomStepper from "./CustomStepper";
import { SubmitHandler, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function CreateEventModal(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [{ label: "DAO registration" }, { label: "Event Creation" }];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <DAORegistry activeStep={activeStep} setActiveStep={setActiveStep} />;
      case 1:
        return <Payment />;
      default:
        return null;
    }
  }

  const closeModal = () => {
    (document.getElementById(`create-event`) as HTMLDialogElement).close();
  };

  return (
    <dialog id={"create-event"} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-slate-900 relative flex flex-col text-center items-center gap-6">
        <button onClick={closeModal} className="absolute right-5 top-5 p-1">
          <Image src={"/menu-opened.svg"} alt="icon" width={15} height={15} />
        </button>
        <div>
          <CustomStepper steps={steps} activeStep={activeStep} />
          <div className="py-5 w-full flex flex-col items-center first-letter:justify-around">
            {getSectionComponent()}
            {activeStep !== 0 && <button onClick={() => setActiveStep(activeStep - 1)}>Previous</button>}
          </div>
        </div>
      </div>
    </dialog>
  );
}

interface IDAOForm {
  name: string;
  address: string;
}

interface Props {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

function DAORegistry({ activeStep, setActiveStep }: Props) {
  const [isDaoLoading, setIsDaoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDAOForm>();

  const { writeAsync: registerdao } = useScaffoldContractWrite({
    contractName: "AppDaoManagement",
    functionName: "registerDao",
    args: ["",""],
  });

  const onSubmit: SubmitHandler<IDAOForm> = async data => {
    setIsDaoLoading(true);

    try {
      await registerdao({
        args: [data.name, data.address],
      });
      setIsDaoLoading(false);
      setActiveStep(activeStep + 1);
    } catch (error) {
      setIsDaoLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-lg md:text-2xl font-bold p-5 text-customBlue">Your DAO metadata</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.name && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Address"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.address && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("address", { required: true })}
          />
          {errors.address && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <button className={`btn mt-8 w-fit mx-auto ${isDaoLoading && "pointer-events-none"}`} value={"Register"}>
          {isDaoLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

function Payment() {
  const [isDaoLoading, setIsDaoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Event>();

  const onSubmit: SubmitHandler<Event> = async data => {
    setIsDaoLoading(true);
  };

  return (
    <div className="w-full">
      <h1 className="text-lg md:text-2xl font-bold p-5 text-customBlue">Your DAO metadata</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
          errors.name && "border-2 border-red-700"
        }`}
        autoComplete="off"
        {...register("name", { required: true })}
      />
      {errors.name && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
    </div>

    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Address"
        className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
          errors.address && "border-2 border-red-700"
        }`}
        autoComplete="off"
        {...register("address", { required: true })}
      />
      {errors.address && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
    </div>

    <button className={`btn mt-8 w-fit mx-auto ${isDaoLoading && "pointer-events-none"}`} value={"Register"}>
      {isDaoLoading ? "Loading..." : "Register"}
    </button>
  </form> */}
    </div>
  );
}
