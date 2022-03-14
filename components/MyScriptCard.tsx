// import Image from "next/image";
import Link from "next/link";
import { IScript } from "../interfaces/script.interface";
import getCategory from "../utils/getCategory";
import { truncate } from "../utils/truncate";
import { format } from "date-fns";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface IScriptCard {
  script: IScript;
}

const ScriptCard: React.FC<IScriptCard> = ({ script }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-col shadow-lg border-2 border-slate-400">
      <img
        className="h-28 object-cover w-full"
        src={
          script?.posterURL ?? `https://source.unsplash.com/random`
          // "https://firebasestorage.googleapis.com/v0/b/script-room.appspot.com/o/ab1310c11f5f280ace9523f896ac1d56.jpg?alt=media&token=b2a510f3-0b30-4909-99b5-463141175e5f"
        }
      />
      <div className="w-full h-2  bg-neutral-800"></div>
      <div className="bg-slate-600 p-3 shadow-gray-700 flex flex-1 flex-col justify-between">
        <div>
          <h1 className="font-semibold text-md text-neutral-100 leading-4">
            {script?.title}
          </h1>
          <h1 className="text-sm font-light my-2 text-neutral-200 leading-4">
            {truncate(script?.description[0])}
          </h1>
        </div>
        <div className="w-full flex justify-between">
          <IconButton size="small" onClick={handleClick}>
            <DotsHorizontalIcon className="h-4 w-4 m-1 text-slate-200 cursor-pointer" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href={`/scripts/${script.id}`}>
              <a target="_blank">
                <MenuItem>View</MenuItem>
              </a>
            </Link>
            {/* {editable && ( */}
            <>
              <Link href={`/scripts/${script.id}/edit`}>
                <a>
                  <MenuItem>Edit</MenuItem>
                </a>
              </Link>
            </>
            {/* )} */}
          </Menu>
          <div>
            <h1 className="text-white text-xs text-right">
              {script.id && format(new Date(script.date.toDate()), "MM/yyyy")}
            </h1>
            <h1 className="text-white text-xs font-mono text-right">
              {getCategory(script.category)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;
