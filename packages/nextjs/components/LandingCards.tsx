import Image from "next/image";

export default function LandingCards(): React.ReactElement {
  return (
    <section id="cards" className="flex flex-col justify-center items-center my-5 md:my-10 text-white relative">
      <div className="max-w-[1100px] flex flex-col justify-center items-center p-5 md:p-0 gap-10 w-full">
        <h2 style={{ fontWeight: "bold" }} className="text-5xl p-5 text-center">
          Ready to Dive In? Choose Your Path to <span className="text-customGold">Participation</span>
        </h2>
        <div className="flex flex-col items-center justify-evenly md:flex-row w-full">
          <div className="flex flex-col items-center justify-center p-8 gap-8 flex-1 my-4">
            <Image src={"/create-event.svg"} alt="Create Event" width={120} height={120} />
            <h3 className="text-xl text-center">Empower Your DAO | Host Events with DAOvation</h3>
            <button className="btn">Host event</button>
          </div>
          <div className="divider md:divider-horizontal">OR</div>
          <div className="flex flex-col items-center justify-center p-8 gap-8 flex-1 my-4">
            <Image src={"/log-in.svg"} alt="Log in" width={120} height={120} />
            <h3 className="text-xl text-center">Explore exciting DAOs Events | Register with Ease</h3>
            <button className="btn">Register</button>
          </div>
        </div>
      </div>
    </section>
  );
}
