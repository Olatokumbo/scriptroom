import Link from "next/link";
const CategoryList = ({ id }: { id: string }) => {
  return (
    <div className="py-2 flex overflow-auto w-full whitespace-nowrap border-b-2 border-gray-100 border-solid">
      <div className="m-auto flex">
        <Link href="/categories/full-length-movies">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "full-length-movies" && " font-semibold")
            }
          >
            Full Length Movies
          </h5>
        </Link>
        <Link href="/categories/stage-plays">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "stage-plays" && " font-semibold")
            }
          >
            Stage Plays
          </h5>
        </Link>
        <Link href="/categories/dramas">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "dramas" && " font-semibold")
            }
          >
            Dramas
          </h5>
        </Link>
        <Link href="/categories/musicals">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "musicals" && " font-semibold")
            }
          >
            Musicals
          </h5>
        </Link>
        <Link href="/categories/spoken-word">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "spoken-word" && " font-semibold")
            }
          >
            Spoken Word
          </h5>
        </Link>
        <Link href="/categories/short-films">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "short-films" && " font-semibold")
            }
          >
            Short Films
          </h5>
        </Link>
        <Link href="/categories/skits">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
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
