import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-1xl font-medium text-black">ChitChat</h1>
        <p className="text-slate-500">You have a new message!</p>
        <h1 className="text-center my-24 font-black tracking-tight text-6xl">Our homepage</h1>
      </div>
    </div>
  );
};

export default Home;
