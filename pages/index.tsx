import type { NextPage } from "next";
import Link from "next/link";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";
import PublicRoute from "../hoc/PublicRoute";

const Home: NextPage = () => {
  return (
    <Layout>
      <CategoryList />
      <div className="max-w-[90rem] m-auto">
        <div className="flex flex-1">
          <div className="pt-16 px-6 md:px-10 pb-10 md:pb-24 flex-1">
            <img
              src="/logo.png"
              className="h-auto mr-0 md:mr-5 w-72"
              alt="headerImages"
            />
            <h1 className="my-4 text-lg">
              Your one stop marketplace to find scripts of all types and genres
            </h1>
            <h1 className="text-gray-800 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
            <Link href="/signin" passHref>
              <button className="my-10 px-5 py-3 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white font-normal uppercase focus:outline-none">
                Get Started
              </button>
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <img
              src="/images/pattern2.jpg"
              className="h-full w-full object-cover rounded-bl-2xl"
              alt="headerImages"
            />
          </div>
        </div>
        <div className="w-full flex justify-center my-5">
          <Banner />
        </div>
      </div>
    </Layout>
  );
};

export default PublicRoute(Home);
