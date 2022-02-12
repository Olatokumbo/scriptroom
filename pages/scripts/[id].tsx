import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { NextPage } from "next";
import ScriptCard from "../../components/ScriptCard";
import { Avatar, makeStyles, Theme } from "@material-ui/core";
import Link from "next/link";

const ScriptInfo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title> Script | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="flex p-3 flex-col md:flex-row max-w-6xl m-auto">
          <div className="flex-3 bg-neutral-50 p-3 md:p-8 m-0 md:m-5  rounded-md">
            <img
              className="h-32 object-cover w-full rounded-t-md"
              src="/images/leaves.jpg"
            />
            <div className="flex justify-between w-full items-center my-3">
              <h1 className="font-bold text-2xl text-[#36395A]">
                The Beginning of a New Thing
              </h1>
              <button className="px-6 py-2 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white text-sm font-normal uppercase focus:outline-none">
                View
              </button>
            </div>
            <div>
              <h1 className="font-medium">Description</h1>
              <p className="text-gray-600 text-sm my-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
            </div>
          </div>
          <div className="flex-2 bg-neutral-50 my-5 rounded-md p-5 h-fit">
            <h1 className="font-semibold text-[#36395A]">About the Author</h1>
            <Link href="/profile/123">
              <div className="flex flex-col items-center my-2">
                <img
                  src="/images/profile.jpg"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <h1 className="font-medium">david0</h1>
              </div>
            </Link>
            <p className="text-gray-600 text-sm my-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ScriptInfo;
