import { useRouter } from "next/router";
import { ProfileMenuEnum } from "../utils/enums";
import ProfileAbout from "./ProfileAbout";
import ProfileScripts from "./ProfileScripts";

interface IProfileMenu {
  id: string;
  menu: ProfileMenuEnum;
}
const ProfileMenu: React.FC<IProfileMenu> = ({ id, menu }) => {
  const { push, query } = useRouter();

  const handleMenuChange = (option: ProfileMenuEnum) => {

    push({ query: { ...query, sk: option } }, undefined, {
      shallow: true,
    });
  };
  const active = "border-b-4 border-gray-600 font-semibold";
  return (
    <div>
      <div className="flex border-t border-gray-300">
        <h1
          onClick={() => handleMenuChange(ProfileMenuEnum.SCRIPTS)}
          className={`transition duration-500 ease-in-out mr-2 py-5 cursor-pointer ${
            menu === ProfileMenuEnum.SCRIPTS && active
          }`}
        >
          Scripts
        </h1>
        <h1
          onClick={() => handleMenuChange(ProfileMenuEnum.ABOUT)}
          className={`transition duration-500 ease-in-out mx-2 py-5 cursor-pointer ${
            menu === ProfileMenuEnum.ABOUT && active
          }`}
        >
          About
        </h1>
        <h1
          onClick={() => handleMenuChange(ProfileMenuEnum.FOLLOWERS)}
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
            scripts: <ProfileScripts id={id} />,
            about: <ProfileAbout id={id} />,
            followers: <h1>Followers Section</h1>,
          }[menu]
        }
      </div>
    </div>
  );
};

export default ProfileMenu;
