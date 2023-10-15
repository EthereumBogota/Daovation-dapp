export default function Hero(): React.ReactElement {
  return (
    <header className="text-white text-sm py-8 flex flex-col items-center justify-center relative bg-hero-image bg-no-repeat bg-cover bg-bottom bg-fixed">
      <div className="absolute inset-0 bg-shadow"></div>
      <section className="flex flex-col max-w-[1100px] mx-auto w-full gap-7 md:gap-9 relative z-[5] my-6 md:my-10 items-center justify-center">
        <h1 className="md:text-[88px] text-center text-5xl font-bold px-5 md:px-0 leading-tight">
          Transforming Governance with <span className="text-customGold">Active Participation</span>
        </h1>
        <p className="text-xl md:text-2xl text-center px-5 md:px-0 md:w-[70%]">
          DAOvation catalyzes a new era of transparent, participatory, and equitable governance. We are set to redefine
          how communities collaborate and make decisions.
        </p>
        <a href="#cards" className="btn">
          Get Started
        </a>
      </section>
    </header>
  );
}
