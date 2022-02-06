import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { signinGoogle } from "../firebase/auth";
// import { signinEaP, signinFacebook, signinGoogle } from "../redux/actions/auth";
// import { CircularProgress } from "@material-ui/core";
// import PublicRoute from "../hoc/PublicRoute";
const Signin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signin = () => {};
  return (
    <>
      <Head>
        <title>Sign in | ScriptRoom</title>
      </Head>
      <div className="w-full flex min-h-screen">
        <div className="flex-1 relative hidden sm:block">
          <Image
            src="/images/pattern.jpg"
            className="object-cover w-full h-full"
            layout="fill"
            alt="logo"
          />
        </div>
        <div className="flex flex-col flex-2 py-12 px-4 items-center sm:px-8 ">
          <div className="flex justify-between w-full items-center">
            <Link href="/">
              <img
                src="/logo.png"
                className="h-10 mr-5 w-auto object-left"
                alt="headerImages"
              />
            </Link>
            <h5 className="text-sm">
              Don&#39;t have an Account
              <Link passHref href="/signup">
                <span className="text-base text-blue-700 font-semibold">
                  Signup
                </span>
              </Link>
            </h5>
          </div>
          <div className="flex flex-col p-3 items-center my-8 w-full md:w-96">
            <h1 className="self-start text-4xl font-bold my-4 text-gray-600">
              Sign in
            </h1>
            <button
              onClick={signinGoogle}
              className=" my-1 flex items-center justify-center w-full text-gray-600  text-sm border-2 rounded-md py-3 focus:outline-none hover:bg-gray-100"
            >
              <img className="h-5 mx-3" src="/google.svg" alt="google" />{" "}
              Continue with Google
            </button>
            <h5 className="text-gray-500 my-3">or</h5>
            <form
              onSubmit={signin}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full mb-2">
                <label htmlFor="email" className="text-gray-700 text-sm">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Email"
                  value={email}
                />
              </div>
              <div className="w-full mb-2">
                <label htmlFor="password" className="text-gray-700 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="password"
                  placeholder="Password"
                  value={password}
                />
              </div>
              {email && password && (
                <button
                  disabled={loading}
                  type="submit"
                  className="my-5 w-full bg-gradient-to-r from-blue-500 to-indigo-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-900  text-white rounded-md py-4 focus:outline-none"
                >
                  Sign in
                </button>
              )}
              {/* {loading && <CircularProgress />} */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
// export default PublicRoute(Signin);
