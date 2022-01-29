import { MenuAlt3Icon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full p-3 flex flex-col justify-between sm:flex-row border-b-2 border-gray-100">
      <div className="flex items-start flex-col sm:flex-row sm:items-center w-full">
        <div className="flex items-center justify-between w-full sm:w-auto md:w-auto">
          <img src="/logo.png" className="h-10 mr-5 w-auto" alt="headerImages" />
          <MenuAlt3Icon className="h-6 w-6 lg:hidden md:hidden sm:hidden cursor-pointer block" />
        </div>
        <form className="flex w-full sm:w-60 h-11 my-3 sm:my-0 bg-neutral-200 justify-between p-1 rounded-3xl">
          <input
            className="m-0 w-full outline-none bg-transparent text-neutral-600 ml-3 placeholder-neutral-500"
            placeholder="Search Scripts"
            required
          />
          <button className="px-3 rounded-full bg-[#36395A]  hover:bg-slate-800 text-gray-800 font-bold py-2 uppercase focus:outline-none">
            <SearchIcon className="h-4 w-4 text-white" />
          </button>
        </form>
      </div>
      <Link href="#">
        <button className="sm:mx-4 bg-[#36395A] py-2 px-4 w-20 h-10 mx-auto text-white rounded-md hover:bg-gray-900 focus:outline-none">
          Signin
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
