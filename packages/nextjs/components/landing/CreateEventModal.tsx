import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Event } from "../../pages/events";
import CustomStepper from "./CustomStepper";
import { Spinner } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function CreateEventModal(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const [eventMetadata, setEventMetadata] = useState<Event | {}>({});

  const steps = [{ label: "DAO registration" }, { label: "Event Creation" }];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <DAORegistry
            eventMetadata={eventMetadata}
            setEventMetadata={setEventMetadata}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return <EventCreation eventMetadata={eventMetadata} setEventMetadata={setEventMetadata} />;
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
  eventMetadata: Event | {};
  setEventMetadata: Dispatch<SetStateAction<Event>>;
}

function DAORegistry({ activeStep, setActiveStep, eventMetadata, setEventMetadata }: Props) {
  const [isDaoLoading, setIsDaoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDAOForm>();

  const { writeAsync: registerDao } = useScaffoldContractWrite({
    contractName: "AppEventFactory",
    functionName: "registerDao",
    args: ["", ""],
  });

  const onSubmit: SubmitHandler<IDAOForm> = async data => {
    setIsDaoLoading(true);

    try {
      await registerDao({
        args: [data.name, data.address],
      });
      setIsDaoLoading(false);
      setEventMetadata({
        ...eventMetadata,
        dao: data.address,
      });
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

        <button
          className={`btn mt-8 w-fit mx-auto ${isDaoLoading && "pointer-events-none opacity-80"}`}
          value={"Register"}
        >
          {isDaoLoading ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
}

interface IEventCreation {
  eventMetadata: Event | {};
  setEventMetadata: Dispatch<SetStateAction<Event>>;
}

function EventCreation({ eventMetadata, setEventMetadata }: IEventCreation) {
  const [isEventCreating, setIsEventCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>();

  const parseDateToUnix = (date: string): number => {
    return Math.floor(new Date(date).getTime() / 1000);
  };

  const { writeAsync: createEvent } = useScaffoldContractWrite({
    contractName: "AppEventFactory",
    functionName: "createEvent",
    args: ["", [], []],
  });

  const onSubmit: SubmitHandler<Event> = async data => {
    setIsEventCreating(true);
    setEventMetadata({
      ...eventMetadata,
      id: uuidv4(),
      title: data.title,
      startDate: parseDateToUnix(String(data.startDate)),
      endDate: parseDateToUnix(String(data.endDate)),
      location: data.location,
      description: data.description,
      capacity: data.capacity,
    });

    console.log(eventMetadata as Event);

    try {
      const dao = (eventMetadata as Event).dao;

      const id = (eventMetadata as Event).id ?? "";
      const title = (eventMetadata as Event).title ?? "";
      const location = (eventMetadata as Event).location ?? "";
      const description = (eventMetadata as Event).description ?? "";

      const startDate = BigInt((eventMetadata as Event).startDate ?? "0");
      const endDate = BigInt((eventMetadata as Event).endDate ?? "0");
      const capacity = BigInt((eventMetadata as Event).capacity ?? 0);

      await createEvent({
        args: [dao, [id, title, description, location], [startDate, endDate, capacity]],
      });
      setIsEventCreating(false);
    } catch (error) {
      setIsEventCreating(false);
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-lg md:text-2xl font-bold p-5 text-customBlue">Your Event metadata</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.title && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Description"
            className={`input input-ghost rounded-lg h-[200px] resize-none w-full max-w-xs focus:bg-slate-700 ${
              errors.description && "border-2 border-red-700"
            }`}
            autoComplete="off"
            maxLength={100}
            minLength={10}
            {...register("description", { required: true })}
          ></textarea>

          {errors.description && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Capacity of attendants"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.capacity && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("capacity", { required: true })}
          />
          {errors.capacity && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <input
            type="datetime-local"
            placeholder="Start Date"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.startDate && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("startDate", { required: true })}
          />
          {errors.startDate && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <input
            type="datetime-local"
            placeholder="End Date"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.endDate && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("endDate", { required: true })}
          />
          {errors.endDate && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Location"
            className={`input input-ghost w-full max-w-xs focus:bg-slate-700 ${
              errors.location && "border-2 border-red-700"
            }`}
            autoComplete="off"
            {...register("location", { required: true })}
          />
          {errors.location && <span className="text-red-700 font-bold text-left px-4">This field is required</span>}
        </div>

        <button
          className={`btn mt-8 w-fit mx-auto ${isEventCreating && "pointer-events-none opacity-80"}`}
          value={"Register"}
        >
          {isEventCreating ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
}
