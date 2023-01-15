import { PaperAirplaneIcon } from "@heroicons/react/outline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createRef, RefObject, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { createComment } from "../firebase/comment";
import useFetchComments from "../hooks/useFetchComments";
import { userState } from "../store/user";
import CommentCard from "./CommentCard";

interface IComment {
  scriptId?: string;
}

const Comments: React.FC<IComment> = ({ scriptId }) => {
  const [comment, setComment] = useState<string>("");
  const { uid } = useRecoilValue(userState);
  const { comments, loading } = useFetchComments(scriptId);
  const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);

  const hasComments = comments.length > 0;

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(comments.length)
        //@ts-ignore
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [comments]);

  const addComment = async (e: any) => {
    e.preventDefault();
    try {
      if (!uid) {
        alert("Please Login to Comment");
        return;
      }
      await createComment(uid, scriptId as string, comment);
      setComment("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex  flex-col bg-neutral-100 my-2 rounded-md p-3 h-96">
      <h1 className="font-semibold text-[#36395A] mb-2">Comments</h1>
      <div className="flex flex-col flex-1 justify-between overflow-auto">
        <div
          className={`h-full overflow-auto ${
            (!hasComments || loading) && "flex flex-col"
          }`}
        >
          {loading ? (
            <CircularProgress style={{ margin: "auto" }} />
          ) : hasComments ? (
            comments.map((comment, index) => (
              <CommentCard
                key={comment.id}
                loading={loading}
                comment={comment}
                refProps={elRefs[index]}
                isLast={comments.length - 1 === index}
              />
            ))
          ) : (
            <p className="m-auto text-[#36395A]">No Comments</p>
          )}
        </div>
        <form className="w-full" onSubmit={addComment}>
          <div className="flex items-center pt-2 pb-1">
            <input
              className="bg-white flex-1 rounded-md appearance-none border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Write a Comment..."
              aria-label="Full name"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              maxLength={200}
            />
            <button
              disabled={!comment}
              className="disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-gray-500 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-md"
              type="submit"
            >
              <PaperAirplaneIcon width={18} height={18} className="rotate-45" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
