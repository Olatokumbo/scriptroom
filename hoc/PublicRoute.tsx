/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
const PublicRoute = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [{ auth }, _] = useRecoilState(userState);
      useEffect(() => {
        if (auth) {
          router.replace("/home");
        }
      }, [auth, router]);
    }
    return <WrappedComponent {...props} />;
  };
};

export default PublicRoute;
