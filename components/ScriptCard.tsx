import { Avatar, makeStyles, Theme } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 25,
    height: 25,
  },
}));

const ScriptCard = () => {
  const classes = useStyles();
  return (
    <Link href="/scripts/12345" passHref>
      <div className="flex flex-col rounded-t-md rounded-b-md shadow-lg hover:cursor-pointer hover:shadow-2xl">
        <img
          className="h-28 object-cover w-full rounded-t-md"
          src="/images/leaves.jpg"
        />
        <div className="w-full h-2  bg-neutral-800"></div>
        <div className="bg-[#36395A] p-3 rounded-b-md shadow-gray-700">
          <h1 className="font-bold text-sm text-neutral-100">
            The Beginning of a New Thing
          </h1>
          <h1 className="text-sm font-light my-2 text-neutral-200 leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna....
          </h1>
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <Avatar
                alt="Remy Sharp"
                className={classes.avatar}
                src="/images/profile.jpg"
              />
              <h1 className="text-white font-medium text-sm">david0</h1>
            </div>
            <div>
              <h1 className="text-white text-xs text-right">12/12/2021</h1>
              <h1 className="text-white text-sm font-bold">Short Films </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptCard;
