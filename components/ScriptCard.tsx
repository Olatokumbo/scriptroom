import Image from "next/image";
import Link from "next/link";
import { IScript } from "../interfaces/script.interface";
import getCategory from "../utils/getCategory";
import { truncate } from "../utils/helpers";
import { format } from "date-fns";
import { getCategoryColor } from "../utils/getCategoryColor";

interface IScriptCard {
  script: IScript;
  index: number;
}

const ScriptCard: React.FC<IScriptCard> = ({ script, index }) => {
  return (
    <Link href={`/scripts/${script?.id || script.objectID}`} passHref>
      <div className="flex flex-col rounded-t-md rounded-b-md shadow-lg hover:cursor-pointer hover:shadow-2xl transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-100">
        <Image
          key={script.scriptURL}
          width={600}
          height={300}
          objectFit="cover"
          quality="100"
          className="h-28 w-full rounded-t-md"
          alt={script.title}
          src={
            script?.posterURL ??
            `https://source.unsplash.com/random?scripts&${index}`
          }
        />
        <div
          className={`w-full h-2 ${getCategoryColor(script.category)} `}
        ></div>
        <div className="bg-[#36395A] p-3 rounded-b-md shadow-gray-700 flex flex-1 flex-col justify-between">
          <div>
            <h1 className="font-semibold text-md text-neutral-100 leading-4">
              {script?.title}
            </h1>
            <h1 className="text-sm font-light my-2 text-neutral-200 leading-4">
              {truncate(script?.description[0])}
            </h1>
          </div>
          <div className="w-full flex justify-between">
            {script.user && (
              <div className="flex items-center">
                <Image
                  objectFit="cover"
                  className="rounded-full"
                  src={script.user?.photoURL}
                  alt={script.user.displayName}
                  width={25}
                  height={25}
                />
                <h1 className="text-white font-medium text-sm mx-2">
                  {script.user?.displayName ?? "N/A"}
                </h1>
              </div>
            )}
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
