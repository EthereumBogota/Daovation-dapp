import router from "next/router";
import type { NextPage } from "next";
import DAOCard from "~~/components/daosPage/DAOCard";

export type DAO = {
  id: number;
  name: string;
  image: string;
  logo: string;
  pastEvents: number;
  integrants: number;
};

const daos: DAO[] = [
  {
    id: 1,
    name: "ETH Bogotá",
    image: "/dao1.png",
    logo: "/ethbog-logo.jpeg",
    pastEvents: 5,
    integrants: 10,
  },
  {
    id: 2,
    name: "ETH KIPU",
    image: "/dao2.png",
    logo: "/logo-ethkipu.png",
    pastEvents: 5,
    integrants: 10,
  },
  {
    id: 3,
    name: "H.E.R. DAO Latam",
    image: "/dao3.png",
    logo: "/logo-her-dao.png",
    pastEvents: 5,
    integrants: 10,
  },
];

const goHome = () => {
  router.push("/");
};

const Daos: NextPage = () => {
  return (
    <article className="flex flex-col justify-center items-center gap-10 w-full px-5 max-w-[1100px] mx-auto">
      <h1 className="text-3xl md:text-6xl p-4 font-bold  text-center">DAOs for you</h1>
      {daos.length ? (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10 w-full">
          {daos.map(dao => (
            <DAOCard key={dao.id} dao={dao} />
          ))}
        </section>
      ) : (
        <>
          <p className="mt-12">{`There are no DAOs yet :(`}</p>
          <button className="btn mt-5" onClick={goHome}>
            Back to Home
          </button>
        </>
      )}
    </article>
  );
};

export default Daos;
