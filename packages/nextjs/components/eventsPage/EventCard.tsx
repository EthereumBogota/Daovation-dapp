import EventModal from "./EventModal";
import { Event } from "~~/pages/events";

type TEventCardProps = {
  event: Event;
  isLast: boolean;
};

export default function EventCard({ event, isLast }: TEventCardProps): React.ReactElement {
  const openEventModal = () => {
    (document.getElementById(`event-${event.id}`) as HTMLDialogElement).showModal();
  };

  return (
    <section
      className={`w-full flex justify-between py-8 px-0 md:px-10 gap-2 ${!isLast && "border-b-2 border-gray-700"}`}
    >
      <img
        src={event.image}
        alt={event.title}
        onClick={openEventModal}
        className="w-32 h-20 self-center md:w-48 md:h-32 lg:w-64 rounded-xl cursor-pointer"
      />
      <div className="flex flex-col justify-center text-right cursor-pointer" onClick={openEventModal}>
        <p className="text-customBlue text-[10px] md:text-sm line-clamp-1">{event.date}</p>
        <h2 className="text-sm md:text-lg text-white font-bold line-clamp-2">{event.title}</h2>
        <h3 className="text-customGold text-[10px] md:text-lg">{event.dao}</h3>
        <h3 className="text-white text-[10px] md:text-lg line-clamp-1">{event.location}</h3>
      </div>
      <EventModal
        title={event.title}
        image={event.image}
        dao={event.dao}
        location={event.location}
        id={event.id}
        date={event.date}
      />
    </section>
  );
}
