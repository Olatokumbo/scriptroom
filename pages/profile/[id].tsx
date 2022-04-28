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
import Spinner from "../../widgets/spinner";

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
                      <Spinner />
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
