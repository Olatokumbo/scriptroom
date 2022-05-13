// interface ICommentCard {
//   comment: {
//     text: string;
//     scriptId: string;
//     user: any;
//     date: firebase.default.firestore.Timestamp;
//   };

import { TrashIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { removeComment } from "../firebase/comment";
import { userState } from "../store/user";

// import { format } from "date-fns";

const CommentCard: React.FC<any> = ({ comment }) => {
  const { uid } = useRecoilValue(userState);
  const owner = uid === comment.user.id;

  const deleteComment = async () => {
    removeComment(comment.id);
  };
  return (
    <div className="flex p-2 rounded-md bg-white my-2">
      <img
        // objectFit="cover"
        className="rounded-full h-8 w-8 m-1 object-cover"
        src={comment.user?.photoURL}
        // width={40}
        // height={40}
      />
      <div className="mx-2 flex-1">
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
      {owner && (
        <button
          onClick={deleteComment}
          className="self-center p-2 rounded-full bg-gray-200 hover:bg-gray-100 hover:bg-opacity-90 bg-opacity-60 transition ease-in-out"
        >
          <TrashIcon className="text-gray-600" width={20} height={20} />
        </button>
      )}
    </div>
  );
};
export default CommentCard;
