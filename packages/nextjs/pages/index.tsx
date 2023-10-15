import type { NextPage } from "next";
import Hero from "~~/components/Hero";
import LandingCards from "~~/components/LandingCards";
import Navbar from "~~/components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <LandingCards />
    </>
  );
};

export default Home;
