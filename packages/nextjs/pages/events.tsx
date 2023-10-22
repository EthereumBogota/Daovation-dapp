import { useEffect, useState } from "react";
import router from "next/router";
import { getAccount } from "@wagmi/core";
import type { NextPage } from "next";
import EventCard from "~~/components/eventsPage/EventCard";

export type Event = {
  id?: string;
  startDate?: number | string;
  endDate?: number | string;
  title?: string;
  dao?: string;
  location?: string;
  description?: string;
  capacity?: number;
};

const events: Event[] = [
  {
    id: "1",
    title: "Side Event Blockchain Summit Latam 2023",
    startDate: 2,
    endDate: 2,
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
    capacity: 10,
  },
  {
    id: "1",
    title: "Side Event Blockchain Summit Latam 2023",
    startDate: 36,
    endDate: 36,
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
    capacity: 10,
  },
  {
    id: "1",
    title: "Side Event Blockchain Summit Latam 2023",
    startDate: 239,
    endDate: 239,
    description: "lorem smwomdpmdpmdpemdpempdmepdmpemdpemdepdmpedmpedmpemdpe",
    dao: "Ethereum Bogota",
    location: "Life 72 - AV. caracas # 71 - 44",
    capacity: 10,
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
