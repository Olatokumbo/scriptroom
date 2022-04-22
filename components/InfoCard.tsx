interface IInfo {
  title: string;
  subtitle: string;
  body: string;
  url: string;
}

interface IInfoCard {
  info: IInfo;
  middle?: boolean;
}

const InfoCard: React.FC<IInfoCard> = ({ info, middle }) => {
  return (
    <div
      className={`p-8 border-solid border-[1px] border-gray-200 bg-slate-100 text-center flex flex-col rounded-t-md rounded-b-md shadow-lg transition ease-in-out delay-75 ${
        middle ? `md:-translate-y-3` : ""
      }  xs:-translate-y-0  hover:scale-100`}
    >
      <img
        className="w-24 h-auto m-auto p-2 bg-slate-300 rounded-md"
        src="/logo.png"
      />
      <div className="mt-6 text-justify">
        <h1 className=" text-md mb-3 text-[#23253b]">{info.title}</h1>
        <h1 className="text-xs text-[#23253b]">{info.subtitle}</h1>
      </div>
    </div>
  );
};

export default InfoCard;
