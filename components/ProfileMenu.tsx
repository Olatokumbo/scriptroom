import { Dispatch, SetStateAction } from "react";
import { ProfileMenuEnum } from "../utils/enum";
import ProfileScripts from "./ProfileScripts";

interface IProfileMenu {
  id: string;
  menu: ProfileMenuEnum;
  setMenu: Dispatch<SetStateAction<ProfileMenuEnum>>;
}
const ProfileMenu: React.FC<IProfileMenu> = ({ id, menu, setMenu }) => {
  const active = "border-b-4 border-gray-600 font-semibold";
  return (
    <div>
      <div className="flex border-t border-gray-300">
        <h1
          onClick={() => setMenu(ProfileMenuEnum.SCRIPTS)}
          className={`transition duration-500 ease-in-out mr-2 py-5 cursor-pointer ${
            menu === ProfileMenuEnum.SCRIPTS && active
          }`}
        >
          Scripts
        </h1>
        <h1
          onClick={() => setMenu(ProfileMenuEnum.ABOUT)}
          className={`transition duration-500 ease-in-out mx-2 py-5 cursor-pointer ${
            menu === ProfileMenuEnum.ABOUT && active
          }`}
        >
          About
        </h1>
        <h1
          onClick={() => setMenu(ProfileMenuEnum.FOLLOWERS)}
          className={`transition duration-500 ease-in-out mx-2 py-5 cursor-pointer ${
            menu === ProfileMenuEnum.FOLLOWERS && active
          }`}
        >
          Followers
        </h1>
      </div>
      <div className="py-5">
        {
          {
            SCRIPTS: <ProfileScripts id={id} />,
            ABOUT: <h1>About Section</h1>,
            FOLLOWERS: <h1>Followers Section</h1>,
          }[menu]
        }
      </div>
    </div>
  );
};

export default ProfileMenu;
