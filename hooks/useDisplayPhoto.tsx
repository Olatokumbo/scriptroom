import { useEffect, useState } from "react";

const useDisplayPhoto = (photo: File | null) => {
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    if (photo !== null && photo !== undefined) {
      setDisplay(URL.createObjectURL(photo));
    }
  }, [photo]);

  return display;
};

export default useDisplayPhoto;
