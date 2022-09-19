import { MenuAlt3Icon, SearchIcon } from "@heroicons/react/outline";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { signout } from "../firebase/auth";
import { userState } from "../store/user";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const keywordRef = useRef<any>();
  const [user, setUser] = useRecoilState(userState);

  const search = (e: any) => {
    e.preventDefault();

    router.push({
      pathname: "/search",
      query: {
        keyword: keywordRef?.current?.value,
      },
    });
  };

  const logout = async () => {
    console.log("Logging out");
    try {
      await signout();
      setUser({
        email: null,
        displayName: null,
        photoURL: null,
        uid: null,
        auth: false,
        loading: false,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <nav className="border-b-2 border-gray-100 w-full">
      <div className="py-3 px-5 flex flex-col justify-between items-center sm:flex-row max-w-[90rem] m-auto">
        <div className="flex items-start flex-col sm:flex-row sm:items-center w-full">
          <div className="flex items-center justify-between w-full sm:w-auto md:w-auto">
            <Link
              href={user.auth ? "/home" : "/"}
              passHref
            >
              <img
                src="/logo-sm.png"
                className="h-10 mr-5 w-auto hover:cursor-pointer"
                alt="headerImages"
              />
            </Link>
            <div className="lg:hidden md:hidden sm:hidden block">
              {user?.auth ? (
                <div>
                  <Avatar src={user.photoURL as string} onClick={handleClick} />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    getContentAnchorEl={null}
                  >
                    <MenuItem
                      onClick={() => router.push(`/profile/${user.uid}`)}
                    >
                      My account
                    </MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link href="/signin">
                  <button className="sm:mx-4 bg-[#36395A] py-[0.5rem] px-3 h-10 mx-auto text-white text-sm rounded-md hover:bg-gray-900 focus:outline-none">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
          <form
            onSubmit={search}
            className="flex w-full sm:w-60 h-11 my-3 sm:my-0 bg-neutral-200 justify-between p-1 rounded-3xl"
          >
            <input
              className="m-0 w-full outline-none bg-transparent text-neutral-600 ml-3 placeholder-neutral-500"
              placeholder="Search Scripts"
              ref={keywordRef}
              required
            />
            <button className="p-[10px] rounded-full bg-[#36395A]  hover:bg-slate-800 text-gray-800 font-bold uppercase focus:outline-none">
              <SearchIcon className="h-4 w-4 text-white" />
            </button>
          </form>
        </div>
        <div className="lg:block md:block sm:block hidden">
          {user?.auth ? (
            <div>
              <Avatar src={user.photoURL as string} onClick={handleClick} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                getContentAnchorEl={null}
              >
                <MenuItem onClick={() => router.push(`/profile/${user.uid}`)}>
                  My account
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href="/signin">
              <button className="sm:mx-4 bg-[#36395A] py-2 px-4 w-24 h-10 mx-auto text-white rounded-md hover:bg-gray-900 focus:outline-none">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
