import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
const PublicRoute = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [{ auth, loading }, _] = useRecoilState(userState);
      useEffect(() => {
        if (auth) {
            router.replace("/home");
        }
      }, [auth]);
    }
    return <WrappedComponent {...props} />;
  };
};

export default PublicRoute;
