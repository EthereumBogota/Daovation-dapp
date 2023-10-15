
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { MetaHeader } from "~~/components/MetaHeader";
import PolygonIDVerifier from "~~/components/card-zkid/PolygonIDVerifier";
import type { NextPage } from "next";
import Hero from "~~/components/Hero";
import LandingCards from "~~/components/LandingCards";
import Navbar from "~~/components/Navbar";

const Home: NextPage = () => {
         const [open, setOpen] = useState(false);
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (provedAccessBirthday) {
      const redirect = setTimeout(() => {
        router.push("/events");
      }, 1000);
      return () => clearTimeout(redirect);
    }
    // Make sure to clear the timeout when the component unmounts to prevent memory leaks
  }, [provedAccessBirthday, router]);
  return (
    <>
      <Navbar />
      <Hero />
      <LandingCards />
         <PolygonIDVerifier
                    publicServerURL="https://cbda-190-67-215-48.ngrok-free.app"
                    localServerURL="http://localhost:8080"
                    credentialType={"KYCAgeCredential"}
                    issuerOrHowToLink={
                      "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                    }
                    onVerificationResult={setProvedAccessBirthday}
                  />
    </>
  );
};

export default Home;
