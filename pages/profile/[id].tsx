import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import CategoryList from "../../components/CategoryList";
import Layout from "../../components/Layout";
import MyScriptCard from "../../components/MyScriptCard";
import { scriptsByProfileId } from "../../firebase/scripts";
import useProfile from "../../hooks/useProfile";
import useScripts from "../../hooks/useScripts";
import { userState } from "../../store/user";
import { PencilIcon } from "@heroicons/react/solid";
import { updateCoverPhoto } from "../../firebase/user";
import { useState } from "react";

const Profile: NextPage = () => {
  const {
    query: { id },
    reload,
  } = useRouter();

  const { profile, notFound } = useProfile(id as string);
  const { loading, scripts } = useScripts(scriptsByProfileId, id as string);
  const [photoLoading, setPhotoLoading] = useState<boolean>(false);
  const { uid } = useRecoilValue(userState);

  const handleUploadCoverPhoto = async (e: any) => {
    const file = e.target.files[0];
    if (uid) {
      try {
        setPhotoLoading(true);
        await updateCoverPhoto(uid, file);
        reload();
      } catch (error) {
        alert(error);
      }
      setPhotoLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title> Script | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="flex p-3 md:p-5 flex-col md:flex-row m-auto max-w-[90rem]">
          <div className="flex-1  h-screen p-1 md:p-2"></div>
          <div className="flex-3 p-1 md:p-2">
            <div className="w-full relative flex justify-center md:justify-start mb-32">
              <div className="h-40 w-full rounded-md relative">
                {/* <button className="m-3 right-0 p-3 rounded-full absolute bg-gray-300 hover:bg-gray-200 bg-opacity-60"> */}
                {/* <PencilIcon
                    width={25}
                    height={25}
                    className="text-slate-800"
                  ></PencilIcon> */}

                {uid === id && (
                  <div className="m-3 right-0 rounded-full absolute">
                    {photoLoading ? (
                      <svg
                        role="status"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <div>
                        <label htmlFor="photos">
                          <div className="p-3 rounded-full bg-gray-300 hover:bg-gray-200 hover:bg-opacity-90 bg-opacity-60 transition ease-in-out">
                            <PencilIcon
                              width={25}
                              height={25}
                              className="text-slate-800"
                            ></PencilIcon>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="photos"
                          hidden
                          accept=".jpeg, .jpg, .png"
                          onChange={handleUploadCoverPhoto}
                          required
                        />
                      </div>
                    )}
                  </div>
                )}
                <img
                  className="h-full w-full object-cover rounded-md"
                  src={profile?.coverURL}
                />
              </div>
              <div className="mx-14 absolute top-20">
                <div className="bg-white p-2 rounded-full">
                  <img
                    className="w-32 h-32 object-cover rounded-full"
                    src={profile?.photoURL ?? "/images/default.jpg"}
                  />
                </div>
                <h1 className="text-center text-xl font-medium">
                  {profile?.displayName}
                </h1>
              </div>
            </div>
            {uid === id && (
              <div>
                <Link href="/scripts/add">
                  <button className="sm:mx-4 bg-[#36395A] py-2 px-4 w-auto h-10 mx-auto text-white rounded-md hover:bg-gray-900 focus:outline-none">
                    Add Script
                  </button>
                </Link>
              </div>
            )}
            <div>
              <div className="py-5">
                <h1 className="ml-2 font-bold text-lg text-slate-600">
                  MY SCRIPTS
                </h1>
                <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
                  {loading ? (
                    "Loading...."
                  ) : scripts.length == 0 ? (
                    <h1 className="m-auto text-2xl">No Scripts</h1>
                  ) : (
                    <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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
            </div>
          </div>
          <div className="flex-1  h-screen p-1 md:p-2">
            {/* <div className="p-4 md:p-2 rounded-md border-2 border-slate-500">
              <div className="flex justify-between w-full">
                <h1 className="font-semibold text-[#36395A]">
                  About the Author
                </h1>
                <h1 className="text-gray-700 hover:underline hover:cursor-pointer">
                  Edit
                </h1>
              </div>
              <p className="text-gray-600 text-sm my-1">
                {profile?.description}
              </p>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
