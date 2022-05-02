import Image from "next/image";

const CommentCard: React.FC<any> = () => {
  return (
    <div className="flex p-2 rounded-md bg-white my-2">
      <img
        // objectFit="cover"
        className="rounded-full h-8 w-8 m-1 object-cover"
        src="/images/profile.jpg"
        // width={40}
        // height={40}
      />
      <div>
        <div className="flex items-center">
          <h1 className="font-semibold text-sm">david0</h1>
          <h1 className="ml-3 text-xs font-thin text-slate-500">5 mins ago</h1>
        </div>
        <h1 className="text-[0.7rem] text-gray-600 leading-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam ....
        </h1>
      </div>
    </div>
  );
};
export default CommentCard;
