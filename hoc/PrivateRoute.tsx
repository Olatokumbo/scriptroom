/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import Loading from "../components/Loading";

// export type ProtectedRouteProps = {
//     isAuthenticated: boolean;
//     authenticationPath: string;
//     outlet: JSX.Element;
//   };

const PrivateRoute = (WrappedComponent: FunctionComponent<any>) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [{ auth, loading }, _] = useRecoilState(userState);
      useEffect(() => {
        if (!auth && !loading) {
          router.replace("/");
        }
      }, [auth, loading, router]);
      if (auth && !loading) {
        return <WrappedComponent {...props} />;
      }
    }
    return <Loading />;
  };
};

export default PrivateRoute;
