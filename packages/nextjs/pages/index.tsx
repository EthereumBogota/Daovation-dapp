import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Hero from "~~/components/landing/Hero";
import LandingCards from "~~/components/landing/LandingCards";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <LandingCards />
    </>
  );
};

export default Home;
