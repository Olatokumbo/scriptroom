import type { NextPage } from "next";
import CategoryList from "../components/CategoryList";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <CategoryList id="full-length-movies" />
    </div>
  );
};

export default Home;
