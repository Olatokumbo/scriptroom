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
      <div className="flex flex-col rounded-t-md rounded-b-md shadow-lg hover:cursor-pointer hover:shadow-2xl transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-100">
        <img
          className="h-28 object-cover w-full rounded-t-md"
          src={
            script?.posterURL ?? `https://source.unsplash.com/random`
            // "https://firebasestorage.googleapis.com/v0/b/script-room.appspot.com/o/ab1310c11f5f280ace9523f896ac1d56.jpg?alt=media&token=b2a510f3-0b30-4909-99b5-463141175e5f"
          }
        />
        <div className="w-full h-2  bg-neutral-800"></div>
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
            <div className="flex items-center">
              <Image
                objectFit="cover"
                className="rounded-full"
                src={script.user?.photoURL}
                width={25}
                height={25}
              />
              <h1 className="text-white font-medium text-sm mx-2">
                {script.user?.displayName ?? "N/A"}
              </h1>
            </div>
            <div>
              <h1 className="text-white text-xs text-right">
                {format(new Date(script.date.toDate()), "MM/yyyy")}
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
