import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { MetaHeader } from "~~/components/MetaHeader";
import PolygonIDVerifier from "~~/components/card-zkid/PolygonIDVerifier";

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
      {" "}
      {provedAccessBirthday ? (
        console.log()
      ) : (
        <>
          <nav className="text-white flex md:justify-around items-center p-[40px] justify-between">
            <div>
              <h1 className="text-2xl">DAOVATION</h1>
            </div>

            <div>
              <ul className="md:flex gap-[50px] text-sm hidden">
                <li>Home</li>
                <li>Eventos</li>
                <li>Explore</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl md:block hidden">Crear eventos</h3>
            </div>

            <div
              onClick={() => setOpen(!open)}
              className={`z-[500px]  ${open ? "text-gray-900" : ""} text-3xl md:hidden `}
            >
              {/*   <Image src={open ? "/icon-close.svg" : "/icon-hamburger.svg"} alt="icon" width={20} height={20}></Image> */}
            </div>
          </nav>
          <header className="text-white text-sm mt-[100px] flex flex-col items-center justify-center   ">
            <div>
              <div>
                <h3 className="text-center text-3xl">WELCOME TO DAOVATION</h3>
              </div>
              <div className="relative z-10">
                <div className="overflow-hidden absolute -top-[30px] -left-[50px] indexz10 ">
                  <Image src="/Icosahedron.png" width={180} height={350} alt="icon" className="z-10"></Image>
                </div>
                <div className="z-20 flex">
                  <h1 className="md:text-8xl text-center mt-[60px] z-20 flex text-5xl font-bold">
                    Platform to create events <br />
                    and generate rewards.
                  </h1>
                </div>
                <p className="text-2xl mt-[30px] text-center ">
                  DAOVATION is an ever expanding ecosystem connected
                  <br /> Events and rewards,built for a decentralized future
                </p>
              </div>
              <div className="absolute right-0 top-[350px] overflow-hidden">
                <Image src="/Icosahedron.png" width={350} height={350} alt="icon" className="overflow-hidden"></Image>
              </div>
            </div>
          </header>

          <div className="mt-[300px]">
            <div className="">
              <div className="flex justify-around flex-col md:flex-row">
                <div className="relative border border-blue-800">
                  <div className=" top-[40px] md:left-[150px] md:w-[500px]  px-4 md:px-0">
                    <h1 className="md:text-6xl  md:w-[500px] leading-[70px] mb-[40px] text-5xl">
                      Enter a Universe <br />
                      of Connected Services
                    </h1>
                    <p className="md:w-[400px]">
                      Cronos apps and services connect using IBC, the inter-blockchain community protocol.This
                      innovation enables you to freely exchange assets and data across sovereign
                    </p>
                  </div>
                </div>

                <div className="mr-[200px] flex flex-col gap-[100px] mt-[150px] md:mt-0 px-3 md:px-0 border border-blue-800">
                  <div>
                    <h1 className="text-8xl">265+</h1>
                    <p>Apps $ Services</p>
                  </div>

                  <div>
                    <h1 className="text-8xl">$63B+</h1>
                    <p>Digital Assets</p>
                  </div>
                  <PolygonIDVerifier
                    publicServerURL="https://cbda-190-67-215-48.ngrok-free.app"
                    localServerURL="http://localhost:8080"
                    credentialType={"KYCAgeCredential"}
                    issuerOrHowToLink={
                      "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                    }
                    onVerificationResult={setProvedAccessBirthday}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
