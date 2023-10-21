import Image from "next/image";
import { Event } from "~~/pages/events";

export default function EventModal({
  title,
  dao,
  location,
  id,
  startDate,
  endDate,
  description,
  capacity,
}: Event): React.ReactElement {
  const closeLoginModal = () => {
    (document.getElementById(`event-${id}`) as HTMLDialogElement).close();
  };

  return (
    <dialog id={`event-${id}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-slate-900 relative flex flex-col text-center items-center gap-6">
        <button onClick={closeLoginModal} className="absolute right-5 top-5 p-1">
          <Image src={"/menu-opened.svg"} alt="icon" width={15} height={15} />
        </button>
        <img src={""} alt={title} className="w-[90%] rounded-xl mt-7" />
        <h2 className="font-bold text-white md:text-lg">{title}</h2>
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center gap-4">
            <h2 className="font-bold">Hosted by:</h2>
            <p className="text-white">{dao}</p>
          </div>
          <div className="flex justify-center gap-4">
            <h2 className="font-bold">Date:</h2>
            <p className="text-white">
              {startDate} - {endDate}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <h2 className="font-bold">At: </h2>
            <p className="text-white">{location}</p>
          </div>
        </div>
        <div className="modal-action flex items-center">
          <button className="btn">Attend</button>
        </div>
      </div>
    </dialog>
  );
}
