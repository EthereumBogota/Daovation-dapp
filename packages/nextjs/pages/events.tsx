import { useEffect, useState } from "react";
import router from "next/router";
import { getAccount } from "@wagmi/core";
import type { NextPage } from "next";
import EventCard from "~~/components/eventsPage/EventCard";

export type Event = {
  id: number;
  start_date: string;
  end_date: string;
  title: string;
  dao: string;
  location: string;
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Side Event Blockchain Summit Latam 2023",
    start_date: "October 5th, 2023 at 6:00pm",
    end_date: "October 5th, 2023 at 8:00pm",
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
  },
  {
    id: 1,
    title: "Side Event Blockchain Summit Latam 2023",
    start_date: "October 5th, 2023 at 6:00pm",
    end_date: "October 5th, 2023 at 8:00pm",
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
  },
  {
    id: 1,
    title: "Side Event Blockchain Summit Latam 2023",
    start_date: "October 5th, 2023 at 6:00pm",
    end_date: "October 5th, 2023 at 8:00pm",
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
  },
];

const goHome = () => {
  router.push("/");
};

const Events: NextPage = () => {
  const [connectedAddress, setConnectedAddress]: any = useState();
  const [addressIsConnected, setAddressIsConnected] = useState(false);
  useEffect(() => {
    // interval check whether user has connected or disconnected wallet
    const interval = setInterval(() => {
      const { address, isConnected } = getAccount();
      setConnectedAddress(address);
      setAddressIsConnected(isConnected);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <article className="flex flex-col items-center justify-center w-full px-5 max-w-[1100px] mx-auto">
      <h1 className="text-3xl md:text-6xl p-4 font-bold  text-center">Upcoming Events</h1>
      {events.length ? (
        events.map((event, index) => <EventCard key={event.id} event={event} isLast={index === events.length - 1} />)
      ) : (
        <>
          <p className="mt-12">{`There are no sheduled events :(`}</p>
          <button className="btn mt-5" onClick={goHome}>
            Back to Home
          </button>
        </>
      )}
    </article>
  );
};

export default Events;
