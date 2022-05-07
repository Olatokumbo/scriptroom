import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
// import { useRecoilValue } from "recoil";
// import { userState } from "../store/user";
const CategoryList = ({ id }: { id?: string | undefined }) => {
  // const { auth } = useRecoilValue(userState);
  return (
    <div className="py-2 flex overflow-auto w-full whitespace-nowrap border-b-2 border-gray-100 border-solid">
      <div className="m-auto flex">
        <Link href={"/home"} passHref>
          {/* <Link href={auth ? "/home" : "/"} passHref> */}
          <HomeIcon
            className="text-[#36395A] mx-6 cursor-pointer hover:text-[#747ab6]"
            width={25}
            height={25}
          />
        </Link>
        <Link href="/categories/full-length-movies" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "full-length-movies" && " font-semibold")
            }
          >
            Full Length Movies
          </h5>
        </Link>
        <Link href="/categories/stage-plays" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "stage-plays" && " font-semibold")
            }
          >
            Stage Plays
          </h5>
        </Link>
        <Link href="/categories/musicals" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "musicals" && " font-semibold")
            }
          >
            Musicals
          </h5>
        </Link>
        <Link href="/categories/spoken-word" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "spoken-word" && " font-semibold")
            }
          >
            Spoken Word
          </h5>
        </Link>
        <Link href="/categories/short-films" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "short-films" && " font-semibold")
            }
          >
            Short Films
          </h5>
        </Link>
        <Link href="/categories/skits" passHref>
          <h5
            className={
              "text-gray-700 mx-6 cursor-pointer hover:text-gray-500" +
              (id === "skits" && " font-semibold")
            }
          >
            Skits
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
