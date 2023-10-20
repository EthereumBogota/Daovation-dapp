import { DAO } from "~~/pages/daos";

export default function DAOCard({ dao }: { dao: DAO }): React.ReactElement {
  return (
    <div className="flex flex-col justify-center items-center rounded-xl overflow-hidden bg-slate-900">
      <div className="w-full relative">
        <img src={dao.image} className="w-full" alt={dao.name} />
        <div
          style={{ backgroundImage: `url(${dao.logo})` }}
          className="w-14 h-14 absolute left-1/2 transform -translate-x-1/2 bottom-[-27px] border-2 border-slate-950 bg-slate-900 z-10 bg-cover bg-center rounded-full"
        ></div>
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <h1 className="text-md md:text-xl p-4 font-bold text-center">{dao.name}</h1>
        <button className="btn">future events</button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:gap-8 my-5 text-center">
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg md:text-xl font-bold text-customGold">{dao.pastEvents}</span>
          <h2 className="text-white text-[10px] md:text-lg">Hosted events</h2>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <span className="text-lg md:text-xl font-bold text-customGold">{dao.integrants}</span>
          <h2 className="text-white text-[10px] md:text-lg">Members</h2>
        </div>
      </div>
    </div>
  );
}
