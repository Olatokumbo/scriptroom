import { CircularProgress } from "@material-ui/core";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image
        src="/logo-sm.png"
        layout="fixed"
        width={106}
        height={40}
        alt="logo"
      />
      <CircularProgress style={{ margin: 10 }} />
    </div>
  );
};

export default Loading;
