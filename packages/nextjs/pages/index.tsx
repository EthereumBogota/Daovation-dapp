import type { NextPage } from "next";
import Hero from "~~/components/Hero";
import Navbar from "~~/components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
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
                  Cronos apps and services connect using IBC, the inter-blockchain community protocol.This innovation
                  enables you to freely exchange assets and data across sovereign
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
