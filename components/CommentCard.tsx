// interface ICommentCard {
//   comment: {
//     text: string;
//     scriptId: string;
//     user: any;
//     date: firebase.default.firestore.Timestamp;
//   };

// import { format } from "date-fns";

const CommentCard: React.FC<any> = ({ comment }) => {
  return (
    <div className="flex p-2 rounded-md bg-white my-2">
      <img
        // objectFit="cover"
        className="rounded-full h-8 w-8 m-1 object-cover"
        src={comment.user?.photoURL}
        // width={40}
        // height={40}
      />
      <div className="mx-2">
        <div className="flex items-center">
          <h1 className="font-semibold text-sm">{comment.user?.displayName}</h1>
          <h1 className="ml-3 text-xs font-medium  text-slate-500">
            {/* {format(new Date(comment.date?.toDate()), "hh:mm:ss")} */}
          </h1>
        </div>
        <h1 className="text-[0.7rem] text-gray-600 leading-3">
          {comment?.text}
        </h1>
      </div>
    </div>
  );
};
export default CommentCard;
