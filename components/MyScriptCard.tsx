import { IScript } from "../interfaces/script.interface";
import getCategory from "../utils/getCategory";
import { truncate } from "../utils/helpers";
import { format } from "date-fns";
import Image from "next/image";
import { getCategoryColor } from "../utils/getCategoryColor";
import Link from "next/link";

interface IScriptCard {
  script: IScript;
  owner: boolean;
  index: number;
}

const ScriptCard: React.FC<IScriptCard> = ({ script, owner, index }) => {
  return (
    <Link href={`/scripts/${script.id}`} passHref>
      <div
        className={
          "flex flex-col shadow-lg border-2 border-slate-400 hover:cursor-pointer hover:-translate-y-1 transition ease-in-out delay-75"
        }
      >
        <Image
          key={script.scriptURL}
          width={600}
          height={300}
          objectFit="cover"
          quality="100"
          alt={script.title}
          className="h-28 object-cover w-full"
          src={
            script?.posterURL ??
            `https://source.unsplash.com/random?scripts&${index}`
          }
        />
        <div
          className={`w-full h-2 ${getCategoryColor(script.category)} `}
        ></div>
        <div className="bg-slate-600 p-3 shadow-gray-700 flex flex-1 flex-col justify-between">
          <div>
            <h1 className="font-semibold text-md text-neutral-100 leading-4">
              {script?.title}
            </h1>
            <h1 className="text-sm font-light my-2 text-neutral-200 leading-4">
              {truncate(script?.description[0])}
            </h1>
          </div>
          <div className="`w-full flex justify-end">
            <div>
              <h1 className="text-white text-xs text-right">
                {script.id && format(new Date(script.date.toDate()), "MM/yyyy")}
              </h1>
              <h1 className="text-white text-xs font-mono text-right">
                {getCategory(script.category)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptCard;
