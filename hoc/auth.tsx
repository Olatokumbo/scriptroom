import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../firebase/config";
import { userState } from "../store/user";

interface IAuth {
  children: React.ReactNode;
}

const Auth: React.FC<IAuth> = ({ children }) => {
  const [_, setUser] = useRecoilState(userState);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          auth: true,
          loading: false,
        });
        console.log("Logged in");
      } else {
        setUser({
          email: null,
          photoURL: null,
          uid: null,
          auth: false,
          loading: false,
        });

        console.log("Logged out");
      }
    });
  }, []);
  return <div>{children}</div>;
};

export default Auth;
