import Link from "next/link";
import { useRecoilValue } from "recoil";
import { scriptsByProfileId } from "../firebase/scripts";
import useScripts from "../hooks/useScripts";
import { userState } from "../store/user";
import MyScriptCard from "./MyScriptCard";

interface IProfileScripts {
  id: string;
}
const ProfileScripts: React.FC<IProfileScripts> = ({ id }) => {
  const { loading, scripts } = useScripts(
    scriptsByProfileId,
    id as string,
    true
  );
  const { uid } = useRecoilValue(userState);
  return (
    <div>
      {uid === id && (
        <div>
          <Link href="/scripts/add" passHref>
            <button className="bg-[#36395A] my-4 py-2 px-4 w-auto h-10 mx-auto text-white rounded-md hover:bg-gray-900 focus:outline-none">
              Add Script
            </button>
          </Link>
        </div>
      )}
      <h1 className="font-semibold text-slate-500">My Scripts</h1>
      <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
        {loading ? (
          "Loading...."
        ) : scripts.length == 0 ? (
          <h1 className="m-auto text-2xl">No Scripts</h1>
        ) : (
          <div className="mb-5 w-full grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {scripts.map((script, index) => (
              <>
                <MyScriptCard
                  key={index}
                  script={script}
                  owner={uid === id}
                  index={index}
                />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScripts;
