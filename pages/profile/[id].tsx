import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import ScriptCard from "../../components/ScriptCard";
import PrivateRoute from "../../hoc/PrivateRoute";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title> Script | ScriptRoom</title>
      </Head>
      <Layout>
        <div className="flex p-3 flex-col md:flex-row m-auto max-w-[90rem]">
          <div className="flex-3 p-0 md:p-10">
            <div className="w-full relative flex justify-center md:justify-start mb-32">
              <img
                className="h-40 object-cover w-full rounded-md"
                src="/images/leaves.jpg"
              />
              <div className="mx-14 absolute top-20">
                <div className="bg-white p-2 rounded-full">
                  <img
                    className="w-32 h-32 object-cover rounded-full"
                    src="/images/profile.jpg"
                  />
                </div>
                <h1 className="text-center text-xl font-medium">david0</h1>
              </div>
            </div>
            <div>
              {/* <div className="p-0">
                <h1 className="ml-2 font-bold text-lg text-slate-600">
                  MY SCRIPTS
                </h1>
                <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
                  <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
                    <ScriptCard />
                    <ScriptCard />
                    <ScriptCard />
                    <ScriptCard />
                    <ScriptCard />
                    <ScriptCard />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex-1  h-screen">{/* <h1>QWERTYUI</h1> */}</div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
