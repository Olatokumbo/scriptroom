import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
// import Loading from "../sections/Loading";

// export type ProtectedRouteProps = {
//     isAuthenticated: boolean;
//     authenticationPath: string;
//     outlet: JSX.Element;
//   };

const PrivateRoute = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [{ auth, loading }, _] = useRecoilState(userState);
      useEffect(() => {
        if (!auth && !loading) {
          router.replace("/");
        }
      }, [auth, loading]);
      if (auth && !loading) {
        return <WrappedComponent {...props} />;
      }
    }
    return <h1>Loading</h1>;
  };
};

export default PrivateRoute;
