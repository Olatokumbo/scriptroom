import Image from "next/image";
import Link from "next/link";
import { IScript } from "../interfaces/script.interface";
import getCategory from "../utils/getCategory";
import { truncate } from "../utils/truncate";
import { format } from "date-fns";

interface IScriptCard {
  script: IScript;
}

const ScriptCard: React.FC<IScriptCard> = ({ script }) => {
  return (
    <Link href={`/scripts/${script?.id}`} passHref>
      <div className="flex flex-col rounded-t-md rounded-b-md shadow-lg hover:cursor-pointer hover:shadow-2xl">
        <img
          className="h-28 object-cover w-full rounded-t-md"
          src={script?.posterURL}
        />
        <div className="w-full h-2  bg-neutral-800"></div>
        <div className="bg-[#36395A] p-3 rounded-b-md shadow-gray-700">
          <h1 className="font-bold text-md text-neutral-100">
            {script?.title}
          </h1>
          <h1 className="text-sm font-light my-2 text-neutral-200 leading-4">
            {truncate(script?.description[0])}
          </h1>
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <Image
                objectFit="cover"
                className="rounded-full"
                src="/images/profile.jpg"
                width={25}
                height={25}
              />
              <h1 className="text-white font-medium text-sm mx-2">david0</h1>
            </div>
            <div>
              <h1 className="text-white text-xs text-right">
                {format(new Date(script.created.toDate()), "MM/yyyy")}
              </h1>
              <h1 className="text-white text-xs font-mono">
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
